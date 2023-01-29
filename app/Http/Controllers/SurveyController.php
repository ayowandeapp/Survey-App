<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use App\Http\Requests\StoreSurveyRequest;
use App\Http\Requests\UpdateSurveyRequest;
use Illuminate\Http\Request;
use App\Http\Resources\SurveyResource;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use App\Models\SurveyQuestion;
use Illuminate\Support\Facades\validator;
use Illuminate\Support\Arr;

class SurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user =auth()->user()->id;
        return SurveyResource::collection(Survey::where('user_id', $user)->paginate());
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreSurveyRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSurveyRequest $request)
    {
        $data = $request->validated();
        //check if image was given and save on local file system
        if (isset($data['image'])){
            $relativePath = $this->saveImage($data['image']);
            $data['image'] = $relativePath;
        }
        $survey = Survey::create($data);

        //create new questions
        foreach ($data['questions'] as $question) {
            // add a key and value
            $question['survey_id'] = $survey->id;
            $this->createQuestion($question);
        }
        return new SurveyResource($survey);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\Response
     */
    public function show(Survey $survey, Request $request)
    {
        $user = $request->user();
        if ($user->id !== $survey->user_id){
            return abort(403, 'Unauthorized action.');
        }
        return new SurveyResource($survey);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateSurveyRequest  $request
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateSurveyRequest $request, Survey $survey)
    {
        $data = $request->validated();
        if(isset($data['image'])) {
            $relativePath = $this->saveImage($data['image']);
            $data['image'] = $relativePath;
        }
        //if there is an old image
        if($survey->image){
            $absolutePath = public_path($survey->image);
            File::delete($absolutePath);
        }
        $survey->update($data);

        //get ids as plain array of existing questions

        //returns collections of the id and make it an array
        $existingIds = $survey->questions()->pluck('id')->toArray();

        //get ids as plain array of new questions
        $newIds = Arr::pluck($data['questions'], 'id');

        //find questions to delete
        $toDelete = array_diff($existingIds, $newIds);

        //find questions to add
        $toAdd = array_diff($newIds, $existingIds);

        //delete questions by todelete array
        SurveyQuestion::destroy($toDelete);

        //create new questions
        foreach ($data['questions'] as $question) {
            if(in_array($question['id'], $toAdd)){
                $question['survey_id'] = $survey->id;
                $this->createQuestion($question);

            }
        }
        //update existing questions
        $questionMap = collect($data['questions'])->keyBy('id');
        foreach ($survey->questions as $question) {
            if (isset($questionMap[$question->id])) {
                $this->updateQuestion($question, $questionMap[$question->id]);
            }
        }


        return new SurveyResource($survey);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\Response
     */
    public function destroy(Survey $survey)
    {
        $user = auth()->user();
        if ($user->id !== $survey->user_id){
            return abort(403, 'Unauthorized action.');
        }
        $survey->delete();
        //if there is an old image
        if($survey->image){
            $absolutePath = public_path($survey->image);
            File::delete($absolutePath);

        }
        return response('', 204);
    }

    public function saveImage($image)
    {
        if(preg_match('/^data:image\/(\w+);base64,/', $image, $type)){
            //take out the base64 without the comma
            $image = substr($image, strpos($image, ',') + 1);
            //get file extension
            $type = strtolower($type[1]); //jpg, png,gif
            //check if the file is an image
            if(!in_array($type, ['jpg','jpeg', 'gif', 'png'] )){
                throw new \Exception('invalid image');
            }
            $image = str_replace('', '+', $image);
            $image = base64_decode($image);

        }else{
            throw new \Exception('invalid image');

        }
        $dir = 'images/';
        $file = Str::random().'.'.$type;
        $absolutePath = public_path($dir);
        $relativePath = $dir.$file;
        if(!File::exists($absolutePath)){
            File::makeDirectory($absolutePath, 0755, true);
        }
        file_put_contents($relativePath, $image);
        return $relativePath;
        
    }
    private function createQuestion($question){
        if(is_array($question['data'])) {
            //encode the json
            $question['data'] = json_encode($question['data']);
        }
        $validator = Validator::make($question,[
            'question' => 'required|string',
            'type' => ['required', Rule::in([
                Survey::TYPE_TEXT,
                Survey::TYPE_TEXTAREA,
                Survey::TYPE_SELECT,
                Survey::TYPE_RADIO,
                Survey::TYPE_CHECKBOX,
                ])],
            'description' => 'nullable|string',
            'data' => 'present',
            'survey_id' => 'exists:App\Models\Survey,id'
        ]);
        return SurveyQuestion::create($validator->validated());

    }

    private function updateQuestion(SurveyQuestion $question, $data)
    {
        if(is_array($data['data'])){
            $data['data'] = json_encode($data['data']);
        }
        $validator = Validator::make($data,[
            'id' => 'exists:App\Models\SurveyQuestion,id',
            'question' => 'required|string',
            'type' => ['required', Rule::in([
                Survey::TYPE_TEXT,
                Survey::TYPE_TEXTAREA,
                Survey::TYPE_SELECT,
                Survey::TYPE_RADIO,
                Survey::TYPE_CHECKBOX,
                ])],
            'description' => 'nullable|string',
            'data' => 'present',
        ]);
        return $question->update($validator->validated());

    }
}

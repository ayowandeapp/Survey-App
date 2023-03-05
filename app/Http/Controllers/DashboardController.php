<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Survey;
use App\Models\SurveyAnswer;
use App\Http\Resources\SurveyResourceDashboard;
use App\Http\Resources\SurveyAnswerResource;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        //get the number of survey
        $total = Survey::query()->where('user_id', $user->id)->count();

        //latest survey
        $latest = Survey::query()->where('user_id', $user->id)->latest('created_at')->first();

        //total number of answer
        $totalAnswers = SurveyAnswer::query()
            ->join('surveys', 'survey_answers.survey_id', '=', 'surveys.id')
            ->where('surveys.user_id', $user->id)
            ->count();

        //latest 5 answer
        $latestAnswer = SurveyAnswer::query()
        ->join('surveys', 'survey_answers.survey_id', '=', 'surveys.id')
        ->where('surveys.user_id', $user->id)
        ->orderBy('end_date', 'DESC')
        ->limit(5)
        ->getModels('survey_answers.*');
        return [
            'totalSurveys' => $total,
            'latestSurvey' => $latest ? new SurveyResourceDashboard($latest): null,
            'totalAnswers' => $totalAnswers,
            'latestAnswers' => SurveyAnswerResource::collection($latestAnswer)
             ];

    }
}

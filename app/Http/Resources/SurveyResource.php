<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use URL;
use App\Http\Resources\SurveyQuestionResource;

class SurveyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'image_url' => $this->image ? URL::to($this->image) : null,
            'status' => $this->status !== 'draft',//if status is not equal draft, true, else false
            'description' => $this->description,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'expire_date' => $this->expire_date,
            'questions' => SurveyQuestionResource::collection($this->questions), //call the relationship 
        ];
    }
}

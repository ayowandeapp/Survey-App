<?php

namespace App\Listeners;

use App\Events\SurveyAnswered;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendSurveyAnsweredNotification
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\SurveyAnswered  $event
     * @return void
     */
    public function handle(SurveyAnswered $event)
    {
        //
    }
}

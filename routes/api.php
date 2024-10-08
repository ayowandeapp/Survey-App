<?php

use App\Events\SurveyAnswered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SurveyController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => ['auth:sanctum']], function () {

    // Route::get('/user', function (Request $request) {
    // return $request->user();
    // });
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::resource('/survey', SurveyController::class);
    Route::get('/dashboard',  [DashboardController::class, 'index']);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/survey-by-slug/{survey:slug}',  [SurveyController::class, 'showForGuest']);

Route::post('/survey/{survey}/answer',  [SurveyController::class, 'storeAnswer']);


Route::get('/broadcast', function () {
    SurveyAnswered::dispatch();
    return 'sent';
});

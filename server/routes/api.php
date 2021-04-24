<?php

use App\Http\Controllers\TransactionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::post('/account/create', 'AccountController@register');
Route::post('/transactions/increase', [TransactionController::class, 'increase']);
Route::post('/transactions/decrease', [TransactionController::class, 'decrease']);
Route::post('/transactions/amount', [TransactionController::class, 'getAmount']);

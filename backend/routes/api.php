<?php

use App\Http\Controllers\ProductController;
use App\Models\User;
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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('products', [ProductController::class, 'getAllProducts']);
Route::get('products/{product}', [ProductController::class, 'getProductById']);
Route::post('products', [ProductController::class, 'addProduct']);
Route::put('products/{product}', [ProductController::class, 'updateProduct']);
Route::delete('products/{product}', [ProductController::class, 'destroyProduct']);

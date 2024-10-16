<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\KategoriController;
use App\Http\Controllers\HitungProdukController;
use App\Http\Controllers\MasterProductController;
use App\Http\Controllers\ProdukBundlingController;
use App\Http\Controllers\HitungPengunjungController;
use App\Http\Controllers\UserController;

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

//Authentication
Route::post('/admin/login', [UserController::class, 'login']);
Route::post('/admin/logout', [AdminController::class, 'logout']);


//Master Produk
Route::middleware('admin.auth')->group(function () {
    Route::post('master-products', [MasterProductController::class, 'store'])->name('master-products.store');
    Route::put('master-products/{id}', [MasterProductController::class, 'update'])->name('master-products.update');    
    Route::delete('master-products/{id}', [MasterProductController::class, 'destroy'])->name('master-products.destroy');
    Route::get('chartdata', [MasterProductController::class, 'chartdata']);
    Route::get('count-products', [HitungProdukController::class, 'countProducts']);
<<<<<<< HEAD
    Route::get('count', [MasterProductController::class, 'count'])->name('master-products.count');
=======
    Route::get('count', [MasterProductController::class, 'count']);
>>>>>>> 98c4d66a849d5a75922f2bee33dbb63d4aa75403
});
    Route::get('master-products/{id}', [MasterProductController::class, 'show'])->name('master-products.show');
    Route::get('master-products', [MasterProductController::class, 'index'])->name('master-products.index');
    

//Produk Bundlings
Route::middleware('admin.auth')->group(function () {
    Route::post('produk-bundlings', [ProdukBundlingController::class, 'store'])->name('produk-bundlings.store');
    Route::put('produk-bundlings/{id}', [ProdukBundlingController::class, 'update'])->name('produk-bundlings.update');    
    Route::delete('produk-bundlings/{id}', [ProdukBundlingController::class, 'destroy'])->name('produk-bundlings.destroy');
});
    Route::get('produk-bundlings', [ProdukBundlingController::class, 'index'])->name('produk-bundlings.index');
    Route::get('produk-bundlings/{id}', [ProdukBundlingController::class, 'show'])->name('produk-bundlings.show');

//kategoris
Route::middleware('admin.auth')->group(function () {
    Route::post('kategoris', [KategoriController::class, 'store'])->name('kategoris.store');
    Route::put('kategoris/{id}', [KategoriController::class, 'update'])->name('kategoris.update');    
    Route::delete('kategoris/{id}', [KategoriController::class, 'destroy'])->name('kategoris.destroy');
});
    Route::get('kategoris', [KategoriController::class, 'index'])->name('kategoris.index');
    Route::get('kategoris/{id}', [KategoriController::class, 'show'])->name('kategoris.show');

//Hitung Pengunjung
Route::post('/track-visitor', [HitungPengunjungController::class, 'trackVisitor']);
Route::get('/visitor-stats', [HitungPengunjungController::class, 'getVisitorStatsApi']);
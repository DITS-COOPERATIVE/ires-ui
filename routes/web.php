<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\api\OrderController;
use App\Http\Controllers\api\ProductController;
use App\Http\Controllers\api\CustomerController;
use App\Http\Controllers\api\DashboardController;
use App\Http\Controllers\api\TransactionController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get(
    '/dashboard',
    [DashboardController::class, 'show'],
)->middleware(['auth'])->name('dashboard');

Route::middleware('auth')->group(function () {

    Route::get('/products', [ProductController::class, 'index'])->name('products.index');
    Route::get('/products/{id}', [ProductController::class, 'show'])->name('products-view');
    Route::get('/products-create', [ProductController::class, 'create'])->name('products.create');
    Route::post('/products/add', [ProductController::class, 'store'])->name('products.add');

    Route::get('/customers', [CustomerController::class, 'index'])->name('customers.index');
    Route::get('/customers/{id}', [CustomerController::class, 'show'])->name('customers-view');
    Route::get('/customers-create', [CustomerController::class, 'create'])->name('customers.create');
    Route::post('/customers/add', [CustomerController::class, 'store'])->name('customers.add');

    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/{id}', [OrderController::class, 'show'])->name('orders-view');
    Route::get('/orders-create', [OrderController::class, 'create'])->name('orders.create');
    Route::post('/orders/add', [OrderController::class, 'store'])->name('orders.add');

    Route::get('/transactions', [TransactionController::class, 'index'])->name('transactions.index');
    Route::get('/transactions/{id}', [TransactionController::class, 'show'])->name('transactions-view');
    Route::get('orders/transactions-create/{id}', [TransactionController::class, 'create',])->name('transactions.create');
    Route::post('/transactions/add', [TransactionController::class, 'store'])->name('transactions.add');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';

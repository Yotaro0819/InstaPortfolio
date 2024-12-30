<?php

use App\Http\Controllers\FollowController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PhotoController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
   Route::get('/', [HomeController::class, 'index'])->name('home');
});


Route::get('/home', function () {
    return Inertia::render('Home');
})->middleware(['auth', 'verified'])->name('dashboard');






Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/{id}/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/profile/{id}/show', [ProfileController::class, 'show'])->name('profile.show');
    Route::get('/profile/{id}/follower', [ProfileController::class, 'follower'])->name('profile.follower');
    Route::get('/profile/{id}/following', [ProfileController::class, 'following'])->name('profile.following');
    Route::resource('posts', PostController::class);

    #likes
    Route::post('/like/{id}/store', [LikeController::class, 'store'])->name('like.store');
    ROute::delete('/like/{id}/destroy', [LikeController::class, 'destroy'])->name('like.destroy');

    #follow
    Route::post('/follow/{id}/store', [FollowController::class, 'store'])->name('follow.store');
    Route::delete('/follow/{id}/destroy', [FollowController::class, 'destroy'])->name('follow.destroy');
});

require __DIR__.'/auth.php';

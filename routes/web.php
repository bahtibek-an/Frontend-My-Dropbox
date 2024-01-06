<?php

use App\Http\Controllers\MainController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('auth.login');
});

Route::middleware('auth')->group(function () {
    // Profile section
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    //folder section 
    Route::post('/folders', [MainController::class, 'folderStore'])->name('folders.store');
    Route::get('/dashboard', [MainController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');
    Route::get('folders/{id}', [MainController::class, 'show'])->name('folders.show');
    Route::post('/subfolders', [MainController::class, 'subFolderStore'])->name('subfolders.store');

    // files section
    Route::post('/files', [MainController::class, 'fileStore'])->name('files.store');
    Route::delete('/files/{file}', [MainController::class, 'deleteFile'])->name('files.destroy');
    Route::post('/subfiles/{folder}', [MainController::class, 'subFileStore'])->name('subfiles.store');
    Route::delete('/subfiles/{subfile}', [MainController::class, 'subFileDelete'])->name('subfiles.destroy');
});

require __DIR__ . '/auth.php';

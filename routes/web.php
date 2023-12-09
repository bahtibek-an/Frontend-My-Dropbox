<?php

use App\Http\Controllers\FileController;
use App\Http\Controllers\FolderController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Models\File;
use App\Models\Folder;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index']);

Route::get('/dashboard', function () {
    $folders = Folder::whereNull('parent_id')->get();
    $files = File::whereNull('folder_id')->get();
    return view('dashboard', compact('folders', 'files'));
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


        // Folder Routes
    Route::post('/folders', [FolderController::class, 'store'])->name('folders.store');
    Route::post('/subfolders', [FolderController::class, 'storeSubfolder'])->name('subfolders.store');
    Route::get('folders/{id}', [FolderController::class, 'show'])->name('folders.show');
    // File Routes
    // Route::get('/files/{id}', [FileController::class, 'show'])->name('files.show');
    Route::post('/files', [FileController::class, 'store'])->name('files.store');
    Route::delete('/files/{file}', [FileController::class, 'destroy'])->name('files.destroy');

    Route::post('/subfiles/{folder}', [FileController::class, 'storeSubfile'])->name('subfiles.store');
    Route::delete('/subfiles/{subfile}', [FileController::class, 'destroySubfile'])->name('subfiles.destroy');

    Route::get('shared/{encrypted_id}', [FileController::class, 'show'])->name('shared.link');
    // Route::get('/files/{file}/share', [FileController::class,'share'])->name('files.share');
    Route::get('/shared/{encryptedId}', [FileController::class,'accessSharedFile'])->name('files.shared');
    Route::post('/share/{file}', [FileController::class, 'share'])->name('files.share');
    // Route::post('share/{file}',[FileController::class,'share'])->name('share_file');

});

require __DIR__.'/auth.php';
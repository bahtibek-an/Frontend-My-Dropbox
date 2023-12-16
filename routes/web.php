<?php

use App\Http\Controllers\FileController;
use App\Http\Controllers\FolderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SubFileController;
use App\Http\Controllers\SubFolderController;
use App\Models\Folder;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    //folder section 
    Route::post('/folders', [FolderController::class, 'store'])->name('folders.store');
    Route::get('/dashboard', [FolderController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');
    Route::get('folders/{id}', [FolderController::class, 'show'])->name('folders.show');


    // files section
    Route::post('/files', [FileController::class, 'store'])->name('files.store');
    Route::delete('/files/{file}', [FileController::class, 'deleteFile'])->name('files.destroy');

    // subfolder section
    Route::post('/subfolders', [SubFolderController::class, 'subFolderStore'])->name('subfolders.store');

    // subfiles section 
    Route::post('/subfiles/{folder}', [SubFileController::class, 'subFileStore'])->name('subfiles.store');
    Route::delete('/subfiles/{subfile}', [SubFileController::class, 'subFileDelete'])->name('subfiles.destroy');
});

require __DIR__ . '/auth.php';

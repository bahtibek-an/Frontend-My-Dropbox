<?php

namespace App\Http\Controllers;

use App\Models\Folder;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $folders = Folder::all(); // Assuming 'Folder' is your model for folders

        return view('welcome', ['folders' => $folders]);
    }
}

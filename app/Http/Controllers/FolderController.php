<?php

namespace App\Http\Controllers;

use App\Models\FileModel;
use App\Models\Folder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FolderController extends Controller
{
    public function index()
    {
        $folders = Folder::whereNull('base_id')->get();
        $files = FileModel::whereNull('folder_id')->get();
        return view('dashboard', compact('folders', 'files'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'base_id' => 'nullable|exists:folders_tables,id',
            'folder_name' => 'required|string|max:255',
        ]);

        Folder::create([
            'base_id' => $request->input('base_id'),
            'folder_name' => $request->input('folder_name'),
            'user_id' => Auth::user()->id,
        ]);

        return redirect()->back()->with('success', 'Folder created successfully.');
    }

    public function show($id)
    {
        $folder = Folder::find($id);
        $subfolders = $folder->subfolders;
        $ancestors = $folder->getAncestors();
        $subfiles = $folder->files;

        return view('index', compact('folder', 'subfolders', 'ancestors', 'subfiles'));
    }
}

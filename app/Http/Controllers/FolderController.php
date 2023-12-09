<?php

namespace App\Http\Controllers;

use App\Models\Folder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;

class FolderController extends Controller
{
    // ...

    public function store(Request $request)
    {
        $request->validate([
            'parent_id' => 'nullable|exists:folders,id',
            'name' => 'required|string|max:255',
        ]);

        Folder::create([
            'parent_id' => $request->input('parent_id'),
            'name' => $request->input('name'),
            'user_id' => Auth::user()->id,
        ]);

        return redirect()->back()->with('success', 'Folder created successfully.');
    }

    public function show($id)
    {
        $folder = Folder::findOrFail($id);
        $subfolders = $folder->subfolders;
        $ancestors = $folder->getAncestors();
        $subfiles = $folder->files;

        return view('folder.show', compact('folder', 'subfolders', 'ancestors', 'subfiles'));
    }


    public function storeSubfolder(Request $request)
    {
        $request->validate([
            'parent_id' => 'required|exists:folders,id',
            'name' => 'required|string|max:255',
        ]);

        Folder::create([
            'parent_id' => $request->input('parent_id'),
            'name' => $request->input('name'),
            'user_id' => Auth::user()->id,
        ]);

        return redirect()->back()->with('success', 'Subfolder created successfully.');
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Folder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SubFolderController extends Controller
{
    public function subFolderStore(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'base_id' => 'required|exists:folders_tables,id',
            'folder_name' => 'required|string|max:255',
        ]);

        Folder::create([
            'base_id' => $request->input('base_id'),
            'folder_name' => $request->input('folder_name'),
            'user_id' => Auth::user()->id,
        ]);

        return redirect()->back()->with('success', 'Subfolder created successfully.');
    }
}

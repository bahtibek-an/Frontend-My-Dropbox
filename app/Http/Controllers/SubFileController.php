<?php

namespace App\Http\Controllers;

use App\Models\FileModel;
use App\Models\Folder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class SubFileController extends Controller
{
    public function subFileStore(Request $request, Folder $folder)
    {
        $request->validate([
            'file_name' => 'required|file',
        ]);

        $file = $request->file('file_name');
        $save = $file->store('public/subfolder_files');
        $path = str_replace("public/", "", $save);

        FileModel::create([
            'file_name' => $file->getClientOriginalName(),
            'file_path' => 'storage/' . $path,
            'folder_id' => $folder->id,
            'user_id' => Auth::user()->id,
        ]);

        return redirect()->back()->with('success', 'File uploaded successfully.');
    }

    public function subFileDelete(FileModel $subfile)
    {
        Storage::delete($subfile->file_path);
        $subfile->delete();

        return redirect()->back()->with('success', 'Subfile deleted successfully.');
    }
}

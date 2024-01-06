<?php

namespace App\Http\Controllers;

use App\Models\FileModel;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'folder_id' => 'nullable|exists:folders_tables,id',
            'file_name' => 'required|file',
        ]);

        $file = $request->file('file_name');
        $folderId = $request->input('folder_id');
        $user_id = Auth::user()->id;


        $save = $file->store('public/files');
        $path = str_replace("public/", "", $save);


        FileModel::create([
            'file_name' => $file->getClientOriginalName(),
            'file_path' => 'storage/'.$path,
            'folder_id' => $folderId,
            'user_id' =>  $user_id
        ]);

        return redirect()->back()->with('success', 'File uploaded successfully.');
    }

    public function deleteFile(FileModel $file)
    {
        Storage::delete($file->file_path);
        $file->delete();

        return redirect()->back()->with('success', 'File deleted successfully.');
    }


}

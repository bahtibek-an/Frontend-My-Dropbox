<?php

namespace App\Http\Controllers;

use App\Models\FileModel;
use App\Models\Folder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class MainController extends Controller
{
    // File section
    public function fileStore(Request $request)
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
            'file_path' => 'storage/' . $path,
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

    // Folder section
    public function index()
    {
        $folders = Folder::whereNull('base_id')->get();
        $files = FileModel::whereNull('folder_id')->get();
        return view('dashboard', compact('folders', 'files'));
    }

    public function folderStore(Request $request)
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

    // Subfile section
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

    // Subfolder Section
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

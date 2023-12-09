<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Folder;
use App\Models\SharedFiles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Response;

class FileController extends Controller
{
    public function show($encrypted_id)
{
    try {
        $file_id = Crypt::decrypt($encrypted_id);
        $file = File::findOrFail($file_id);

        // Check if the shared link has expired
        if ($file->expires_at && now()->gte($file->expires_at)) {
            return redirect()->route('dashboard')->with('error', 'The shared link has expired.');
        }

        $filePath = $file->path;

        if (Storage::exists($filePath)) {
            $mimeType = Storage::mimeType($filePath);

            // Check if the file is an image (you can add more image mime types if needed)
            $isImage = strpos($mimeType, 'image') === 0;

            if ($isImage) {
                // Display images in the browser
                $fileContents = Storage::get($filePath);
                return new Response($fileContents, 200, ['Content-Type' => $mimeType]);
            } else {
                // Force download for other file types
                return Storage::download($filePath, $file->name);
            }
        } else {
            return redirect()->route('dashboard')->with('error', 'File not found.');
        }
    } catch (\Illuminate\Contracts\Encryption\DecryptException $e) {
        return redirect()->route('dashboard')->with('error', 'Invalid shared link.');
    }
}

    public function store(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'folder_id' => 'nullable|exists:folders,id',
            'file' => 'required|mimes:jpeg,png,pdf,docx|max:2048', // Add other allowed file types as needed
        ]);

        $file = $request->file('file');
        $folderId = $request->input('folder_id');
        $user_id = Auth::user()->id;


        $save = $file->store('public/files');
        // dd($save);
        $path = str_replace("public/", "", $save);
        // Storage::disk('local')->put('path/to/store/'.$file->getClientOriginalName(), file_get_contents($file));


        File::create([
            'name' => $file->getClientOriginalName(),
            'path' => 'storage/'.$path,
            'folder_id' => $folderId,
            'user_id' =>  $user_id
        ]);

        return redirect()->back()->with('success', 'File uploaded successfully.');
    }

    public function destroy(File $file)
    {
        Storage::delete($file->path);
        $file->delete();

        return redirect()->back()->with('success', 'File deleted successfully.');
    }


    public function getSharedLink($encrypted_id)
    {
        $file_id = decrypt($encrypted_id);
        $file = File::find($file_id);

        if (!$file) {
            return redirect()->back()->with('error', 'File not found');
        }

        $url = route('files.show', ['id' => $file_id]);

        return view('shared.link', ['url' => $url]);
    }


    public function storeSubfile(Request $request, Folder $folder)
    {
        $request->validate([
            'file' => 'required|mimes:jpeg,png,pdf,docx|max:2048', // Add other allowed file types as needed
        ]);

        $file = $request->file('file');
        $save = $file->store('public/subfolder_files');
        // dd($save);
        $path = str_replace("public/", "", $save);
        // Storage::disk('local')->put('path/to/store/'.$file->getClientOriginalName(), file_get_contents($file));


        // $path = $file->store('subfolder_files/' . $folder->id);

        File::create([
            'name' => $file->getClientOriginalName(),
            'path' => 'storage/'.$path,
            'folder_id' => $folder->id,
            'user_id'=> Auth::user()->id,
        ]);

        return redirect()->back()->with('success', 'File uploaded successfully.');
    }

    public function destroySubfile(File $subfile)
    {
        Storage::delete($subfile->path);
        $subfile->delete();

        return redirect()->back()->with('success', 'Subfile deleted successfully.');
    }
    public function share(File $file)
    {
        $link = $file->path;
        $file_id = $file->id;
        $encrypt_file = Crypt::encrypt($link) and $decrypt_val = Crypt::decrypt($encrypt_file );

        SharedFiles::create([
            'file_id'=> $file_id,
            'file_url'=> $link,
            'file_encrypted'=> $encrypt_file,
        ]);

        return view('shared.link',compact('link','encrypt_file'));

    }
}

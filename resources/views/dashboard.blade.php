<x-app-layout>
    <link rel="stylesheet" href="{{asset('style.css')}}">
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 bg-white border-b border-gray-200">
                    <nav class="m-1 p-4 text-indigo-500">
                        <ul>
                            <li><a href="{{ url('/') }}" class="text-pink">HOME/</a></li>
                        </ul>
                    </nav>
                    <div class="flex justify-around">
                        <div>
                            <h3 class="text-lg font-semibold mb-4">Create Folder</h3>
                            <form action="{{ route('folders.store') }}" method="post" class="mb-4">
                                @csrf
                                <div class="flex items-center">
                                    <input type="text" name="name" class="form-input rounded-l-md" placeholder="Folder Name" required>
                                    <button type="submit" class="bg-pink-500 text-white px-4 py-2 rounded-r-md hover:bg-indigo-600 transition duration-300 ease-in-out">Create</button>
                                </div>
                            </form>
                        </div>

                        <div>
                            <h3 class="text-lg font-semibold mb-4">Upload File</h3>
                            <form action="{{ route('files.store') }}" method="post" enctype="multipart/form-data">
                                @csrf
                                <div class="flex items-center">
                                    <input type="file" name="file" class="form-input rounded-l-md" required>
                                    <button type="submit" class="bg-pink-500 text-white px-4 py-2 rounded-r-md  transition duration-300 ease-in-out">Upload</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="p-6 bg-white border-b border-gray-200">
                    <!-- Folders Section -->
                    <h3 class="text-lg text-pink font-semibold mb-4">Folders</h3>
                    <div class="grid grid-cols-3 gap-4">
                        @foreach ($folders as $folder)
                        <a href="{{ route('folders.show', ['id' => $folder->id]) }}" class="rounded-lg p-4 text-gray-800 hover:bg-gray-100 transition duration-300 ease-in-out">
                            <img src="https://static.vecteezy.com/system/resources/previews/007/980/030/original/eps10-pink-folder-solid-icon-in-simple-flat-trendy-style-isolated-on-white-background-vector.jpg" width="100px">
                            {{ $folder->name }}
                        </a>
                        @endforeach
                    </div>
                </div>
                <div class="p-6 bg-white border-b border-gray-200">
                    <!-- Files Section -->
                    <h3 class="text-lg text-pink font-semibold mt-3 mb-4">Files</h3>
                    <div class="grid grid-cols-3 gap-4">
                        @foreach ($files as $file)
                            <div class="rounded-lg p-4 text-gray-800 hover:bg-gray-100 transition duration-300 ease-in-out">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9y815E0kLt2Qj6jKuvcmCNkfzCVEMJU2ZlQ&usqp=CAU" width="100px">
                                <p>{{ $file->name }}</p>
                                <span class="m-2 mt-1 text-sm text-gray-500">
                                    Expires on
                                    @if ($file->expires_at)
                                        {{ $file->expires_at->format('Y-m-d H:i') }}
                                    @else
                                        after 2 days
                                    @endif
                                </span>
                    
                                @if (auth()->user()->id == $file->user_id)
                                    <form action="{{ route('files.destroy', ['file' => $file]) }}" method="post" onsubmit="return confirm('Are you sure you want to delete this file?');">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="bg-red-500 text-white px-4 py-2 rounded hover-bg-red-600 transition duration-300 ease-in-out">Delete</button>
                                    </form>
                                    <form action="{{ route('files.share', ['file'=>$file->id] ) }}" method="POST">
                                        @csrf
                                        <input type="hidden" value="{{$file->id}}">
                                        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover-bg-blue-600 transition duration-300 ease-in-out mt-3">Share</button>

                                    </form>
                                    <a href="storage/{{$file->path}}">Show file</a>

                                @endif
                            </div>
                        @endforeach
                    </div>
                    
                    
                </div>
            </div>
        </div>
    </div>
    
</x-app-layout>

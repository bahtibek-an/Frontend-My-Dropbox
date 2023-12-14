<x-app-layout>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 bg-white border-b border-gray-200">
                   <!-- Navigation -->
                    <nav class="m-1 p-4" style="color: rgb(52, 114, 213)">
                        <ul style="display: flex">
                            <li><a href="{{ url('/dashboard') }}">HOME / </a></li>
                            @if (isset($folder))
                                @foreach ($ancestors as $ancestor)
                                    <li><a href="{{ route('folders.show', ['id' => $ancestor->id]) }}"> {{ $ancestor->name }} </a>  /  </li>
                                @endforeach
                                <li> {{ $folder->name }} </li>
                            @endif
                        </ul>
                    </nav>


                    <!-- Create Folder Section -->
                    <div style="display: flex; justify-content: space-around">
                        <div>
                            <h3 class="text-lg font-semibold mb-4">Create Folder</h3>
                            <form action="{{ route('subfolders.store') }}" method="post" class="mb-4">
                                @csrf
                                <input type="hidden" name="parent_id" value="{{ $folder ? $folder->id : null }}">
                                <div class="flex">
                                    <input type="text" name="name" class="form-input rounded-l-md" placeholder="Folder Name" required>
                                    <button type="submit" class="bg-blue-500 btn text-white px-4 py-2 rounded-r-md" style="background-color: rgb(38, 110, 191);">Create</button>
                                </div>
                            </form>
                        </div>
                            <!-- Upload Subfile Section -->
                            <div class="">
                                <h3 class="text-lg font-semibold mb-4">Upload File</h3>
                                <form action="{{ route('subfiles.store', ['folder' => $folder->id]) }}" method="post" enctype="multipart/form-data" class="mb-4">
                                    @csrf
                                    <div class="flex">
                                        <input type="file" name="file" class="form-input rounded-l-md" required>
                                        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-r-md" style="background-color: rgb(38, 110, 191);">Upload</button>
                                    </div>
                                </form>
                            </div>
                    </div>
                    <div class="p-6 bg-white border-b border-gray-200">
                        <!-- Folders Section -->
                        <h3 class="text-lg font-semibold mb-4">Folders</h3>
                        <div class="grid grid-cols-3 gap-4">
                            @foreach ($subfolders as $subfolder)
                            <div class="rounded-lg p-4 text-dark" style="background-color: rgba(233, 232, 232, 0.635)">
                                        <a href="{{ route('folders.show', ['id' => $subfolder->id]) }}" class="block font-semibold text-blue-500">
                                        <img src="https://cdn.icon-icons.com/icons2/2963/PNG/512/macos_big_sur_folder_icon_186046.png" width="100px">
                                        {{ $subfolder->name }}</a>
                                    </div>
                            @endforeach
                        </div>
                    </div>

                    <div class="p-6 bg-white border-b border-gray-200">
                    
                        <!-- Files Section -->
                        <h3 class="text-lg font-semibold mt-3 mb-4">Files</h3>
                        <div class="grid grid-cols-3 gap-4">
                            @foreach ($subfiles as $subfile)
                                <div class=" rounded">
                                    <a href="{{ route('shared.link', ['encrypted_id' => Crypt::encrypt($subfile->id)]) }}" class="block font-semibold text-blue-500" style="background-color: rgba(233, 232, 232, 0.635)">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9y815E0kLt2Qj6jKuvcmCNkfzCVEMJU2ZlQ&usqp=CAU" width="100px">
                                        {{ $subfile->name }}
                                        <br>
                                        <span class="m-2 mt-1 text-sm text-gray-500">
                                            Expires on
                                            @if ($subfile->expires_at)
                                                after 2 days
                                            @else 
                                                after 4 days
                                            @endif
                                        </span>

                                        <form action="{{ route('subfiles.destroy', ['subfile' => $subfile]) }}" method="post" onsubmit="return confirm('Are you sure you want to delete this subfile?');">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="bg-red-500 btn text-white px-4 py-2 rounded" style="color: red;">Delete</button>
                                        </form>
                                    </a>
                                    <!-- You can add additional details or actions for each subfile here -->
                                </div>
                            @endforeach
                        </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</x-app-layout>

<x-app-layout>
    <link rel="stylesheet" href="{{ asset('style.css') }}">
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 bg-white  border-gray-200">
                    <!-- Navigation -->
                    <div class="max-w-7xl mx-auto flex justify-between items-start sm:px-6 lg:px-8" style="height: 90px">
                        <nav style="color:#33d638; max-width: 400px">
                            <ul style="list-style: none; padding: 0;">
                                <ul style="display: flex">
                                    <li><a href="{{ url('/dashboard') }}">HOME / </a></li>
                                    @if (isset($folder))
                                        @foreach ($ancestors as $ancestor)
                                            <li><a href="{{ route('folders.show', ['id' => $ancestor->id]) }}">
                                                    {{ $ancestor->name }} </a> / </li>
                                        @endforeach
                                        <li> {{ $folder->name }} </li>
                                    @endif
                                </ul>
                        </nav>

                        <!-- Create Folder and Upload File Buttons -->
                        <div class="flex items-start relative">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" id="openMenuButton"
                                fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                <path
                                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                            </svg>

                            <ul id="menuList" class="hidden bg-white border p-2 absolute"
                                style="margin-top: 25px; margin-left: -80px; width: 100px; border-radius: 4px ">
                                <li>
                                    <a type="button" style="display: flex; color: blue;" data-toggle="modal"
                                        data-target="#createFolderModal">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="mt-1 mr-1 bi bi-folder" viewBox="0 0 16 16">
                                            <path
                                                d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z" />
                                        </svg> Folder
                                    </a>
                                </li>
                                <li>
                                    <a type="button" style="display: flex; color: blue;" data-toggle="modal" data-target="#uploadFileModal">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="mt-1 mr-1 bi bi-file-earmark-arrow-up" viewBox="0 0 16 16">
                                            <path
                                                d="M8.5 11.5a.5.5 0 0 1-1 0V7.707L6.354 8.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 7.707z" />
                                            <path
                                                d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
                                        </svg> File
                                    </a>
                                </li>
                            </ul>
                        </div>

                    </div>

                    <!-- Folders and Files Sections -->
                    <div class="row">
                        <!-- Left Side: Folders Section -->
                        <div class="col-md-6 pr-3 border-right">
                            <div class="p-6 bg-white  border-gray-200">
                                <h3 class="text-lg text-green font-semibold mb-4">Folders</h3>
                                <div class="grid grid-cols-3 gap-4">
                                    @foreach ($subfolders as $subfolder)
                                        <div class="rounded-lg p-4 text-dark"
                                            style="background-color: rgba(233, 232, 232, 0.635)">
                                            <a href="{{ route('folders.show', ['id' => $subfolder->id]) }}"
                                                class="block font-semibold text-blue-500">
                                                <img src="https://icones.pro/wp-content/uploads/2021/04/icone-de-dossier-symbole-png-verte.png"
                                                    width="100px">
                                                {{ $subfolder->name }}
                                            </a>
                                        </div>
                                    @endforeach
                                </div>
                            </div>
                        </div>

                        <!-- Right Side: Files Section -->
                        <div class="col-md-6 pl-3">
                            <div class="p-6 bg-white  border-gray-200">
                                <h3 class="text-lg text-green font-semibold mb-4">Files</h3>
                                <div class="grid grid-cols-3 gap-4">
                                    @foreach ($subfiles as $subfile)
                                        <div
                                            class="rounded-lg text-gray-800  transition duration-300 ease-in-out" style="background-color: rgba(233, 232, 232, 0.635)">
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9y815E0kLt2Qj6jKuvcmCNkfzCVEMJU2ZlQ&usqp=CAU"
                                                width="100px">
                                            <p class="file-name" title="{{ $subfile->name }}">
                                                {{ \Illuminate\Support\Str::limit($subfile->name, 18) }}
                                            </p>

                                            @if (auth()->user()->id == $subfile->user_id)
                                                <div
                                                    style="display: flex; margin-top: 10px; align-items: center; justify-content: center;">
                                                    <form action="{{ route('files.destroy', ['file' => $subfile]) }}"
                                                        method="post"
                                                        onsubmit="return confirm('Are you sure you want to delete this file?');">
                                                        @csrf
                                                        @method('DELETE')
                                                        <button type="submit"
                                                            class="bg-red-500 text-white px-2 py-2 rounded hover-bg-red-600 transition duration-300 ease-in-out"><svg
                                                                xmlns="http://www.w3.org/2000/svg" width="16"
                                                                height="16" fill="currentColor" class="bi bi-trash"
                                                                viewBox="0 0 16 16">
                                                                <path
                                                                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                                <path
                                                                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                                            </svg>
                                                        </button>
                                                    </form>
                                                    <form action="{{ route('files.share', ['file' => $subfile->id]) }}"
                                                        method="POST">
                                                        @csrf
                                                        <input type="hidden" value="{{ $subfile->id }}">
                                                        <button type="submit"
                                                            class="bg-blue-500 text-white px-2 py-2 rounded hover-bg-blue-600 transition duration-300 ease-in-out ml-2 ">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16"
                                                                height="16" fill="currentColor" class="bi bi-share"
                                                                viewBox="0 0 16 16">
                                                                <path
                                                                    d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3" />
                                                            </svg>
                                                        </button>
                                                    </form>
                                                    <a class="bg-yellow-500 text-white px-2 py-2 rounded hover-bg-blue-600 transition duration-300 ease-in-out ml-2 "
                                                        href="/{{ $subfile->path }}"><svg
                                                            xmlns="http://www.w3.org/2000/svg" width="16"
                                                            height="16" fill="currentColor" class="bi bi-eye"
                                                            viewBox="0 0 16 16">
                                                            <path
                                                                d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                                            <path
                                                                d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                                        </svg>
                                                    </a>
                                                </div>
                                            @endif
                                        </div>
                                    @endforeach
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Create Folder Modal -->
    <div class="modal fade" id="createFolderModal" tabindex="-1" role="dialog"
        aria-labelledby="createFolderModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="createFolderModalLabel">Create Folder</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form action="{{ route('subfolders.store') }}" method="post">
                        @csrf
                        <input type="hidden" name="parent_id" value="{{ $folder ? $folder->id : null }}">
                        <div class="form-group">
                            <label for="folderName">Folder Name</label>
                            <input type="text" name="name" class="form-control" id="folderName" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Upload File Modal -->
    <div class="modal fade" id="uploadFileModal" tabindex="-1" role="dialog"
        aria-labelledby="uploadFileModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="uploadFileModalLabel">Upload File</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form action="{{ route('subfiles.store', ['folder' => $folder->id]) }}" method="post"
                        enctype="multipart/form-data">
                        @csrf
                        <div class="form-group">
                            <label for="fileInput">Choose File</label>
                            <input type="file" name="file" class="form-control-file" id="fileInput" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Upload</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script>
        document.getElementById('openMenuButton').addEventListener('click', function() {
            document.getElementById('menuList').classList.toggle('hidden');
        });
    </script>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.0.7/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</x-app-layout>

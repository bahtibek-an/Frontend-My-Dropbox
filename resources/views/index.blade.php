<x-app-layout>

    <div class="modal fade" id="createFolderModal" tabindex="-1" role="dialog" aria-labelledby="createFolderModalLabel"
        aria-hidden="true">
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
                        <div class="form-group">
                            <label for="folderName">Folder Name</label>
                            <input type="hidden" name="base_id" value="{{ $folder ? $folder->id : null }}">
                            <input type="text" name="folder_name" class="form-control" id="folderName" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="uploadFileModal" tabindex="-1" role="dialog" aria-labelledby="uploadFileModalLabel"
        aria-hidden="true">
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
                            <input type="file" name="file_name" class="form-control-file" id="fileInput" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Upload</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 ">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-2">
                <nav style="padding: 10px; color:#a44bc7;">
                    <ul class="m-2" style="list-style: none; padding: 0; display: flex">
                        <li><a href="{{ url('/dashboard') }}" style="margin-right: 2px;">HOME </a><span
                                style="margin-right: 5px;">/</span> </li>
                        @if (isset($folder))
                            @foreach ($ancestors as $ancestor)
                                <li><a href="{{ route('folders.show', ['id' => $ancestor->id]) }}">
                                        {{ $ancestor->folder_name }} </a> <span style="margin-right: 5px;">/</span>
                                </li>
                            @endforeach
                            <li> {{ $folder->folder_name }} </li>
                        @endif
                    </ul>
                </nav>
            </div>
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <button class="back" id="plusButton">
                    <i class="mdi mdi-plus"></i>
                </button>

                <div id="listContainer"
                    style="display: none; background-color: #f3f3f3; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); border-radius: 5px; position: absolute; bottom: 360px; right: 1230px; z-index: 200;">
                    <ul id="optionsList" style="list-style: none; padding: 5px; margin: 0;">
                        <li style="padding: 8px;">
                            <a type="button" style="display: flex; color: blue;" data-toggle="modal"
                                data-target="#createFolderModal">
                                Create Folder
                            </a>
                        </li>
                        <li style="padding: 8px;">
                            <a type="button" style="display: flex; color: blue;" data-toggle="modal"
                                data-target="#uploadFileModal">
                                Upload File
                            </a>
                        </li>
                    </ul>
                </div>

                <div class="stage">

                    <div class="folder-wrap level-current scrolling">

                        @foreach ($subfolders as $subfolder)
                            @if (auth()->user()->id == $subfolder->user_id)
                                <div class="tile folder" style="margin-top: 10px;">
                                    <a href="{{ route('folders.show', ['id' => $subfolder->id]) }}"
                                        class="block font-semibold text-blue-500">
                                        <i class="mdi mdi-folder" style="margin-top: 30%"></i>
                                        <h5>{{ $subfolder->folder_name }}</h5>
                                    </a>
                                </div><!-- .tile.folder -->
                            @endif
                        @endforeach

                        @foreach ($subfiles as $subfile)
                            @if (auth()->user()->id == $subfile->user_id)
                                <div class="tile form" style="margin-top: 10px;">
                                    <button style="border: none;" class="copyButton"
                                        data-url="{{ url('/' . $subfile->file_path) }}">
                                        <i class="mdi mdi-content-copy"
                                            style="font-size: 30px; margin: 0; margin-right: 120px; padding: 0;"></i>
                                    </button>
                                    <i class="mdi mdi-file-document"></i>
                                    <h6>{{ $subfile->file_name }}</h6>
                                    <div class="d-flex"
                                        style="margin-right: 7px; padding-bottom: 0; display: flex; justify-content:end;">
                                        @if (auth()->user()->id == $subfile->user_id)
                                            <form action="{{ route('files.destroy', ['file' => $subfile]) }}"
                                                method="post"
                                                onsubmit="return confirm('Are you sure you want to delete this file?');">
                                                @csrf
                                                @method('DELETE')
                                                <button type="submit" class="delete-button">
                                                    <i class="mdi mdi-delete-empty"
                                                        style="font-size: 30px; margin: 0"></i>
                                                </button>
                                            </form>
                                        @endif
                                        <a class="" href="/{{ $subfile->file_path }}">
                                            <i class="mdi mdi-eye-outline" style="font-size: 30px; margin: 0"></i>
                                        </a>
                                    </div>
                                </div><!-- .tile.form -->
                            @endif
                        @endforeach

                    </div><!-- .folder-wrap -->




                </div><!-- .stage -->
            </div>
        </div>
    </div>



</x-app-layout>

<script>
    document.getElementById('plusButton').addEventListener('click', function() {
        var listContainer = document.getElementById('listContainer');
        listContainer.style.display = (listContainer.style.display === 'none' || listContainer.style.display ===
            '') ? 'block' : 'none';

        // Dynamically set styles for the list
        var optionsList = document.getElementById('optionsList');
        if (listContainer.style.display === 'block') {
            optionsList.style.listStyle = 'none';
            optionsList.style.padding = '0';
            optionsList.style.margin = '0';
        } else {
            // Reset styles when hiding the list
            optionsList.style = '';
        }
    });

    document.addEventListener("DOMContentLoaded", function() {
        const shareButtons = document.querySelectorAll(".copyButton");
        shareButtons.forEach(function(button) {
            button.addEventListener("click", function() {
                const urlToCopy = this.getAttribute("data-url");
                const tempInput = document.createElement("input");
                tempInput.setAttribute("value", urlToCopy);
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand("copy");
                document.body.removeChild(tempInput);
                alert("URL copied to clipboard: " + urlToCopy);
            });
        });
    });
</script>

<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.0.7/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

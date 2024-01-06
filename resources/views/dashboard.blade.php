<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />

    <title>
        file manager with folders recent files and members - Bootdey.com
    </title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" />
    <style type="text/css">
        body {
            margin-top: 20px;
            background-color: #f1f3f7;
        }

        .search-box .form-control {
            border-radius: 10px;
            padding-left: 40px;
        }

        .search-box .search-icon {
            position: absolute;
            left: 13px;
            top: 50%;
            -webkit-transform: translateY(-50%);
            transform: translateY(-50%);
            fill: #545965;
            width: 16px;
            height: 16px;
        }

        .card {
            margin-bottom: 24px;
            -webkit-box-shadow: 0 2px 3px #e4e8f0;
            box-shadow: 0 2px 3px #e4e8f0;
        }

        .card {
            position: relative;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
            min-width: 0;
            word-wrap: break-word;
            background-color: #fff;
            background-clip: border-box;
            border: 1px solid #eff0f2;
            border-radius: 1rem;
        }

        .me-3 {
            margin-right: 1rem !important;
        }

        .font-size-24 {
            font-size: 24px !important;
        }

        .avatar-title {
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            background-color: #3b76e1;
            color: #fff;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            font-weight: 500;
            height: 100%;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            width: 100%;
        }

        .bg-soft-info {
            background-color: rgba(87, 201, 235, 0.25) !important;
        }

        .bg-soft-primary {
            background-color: rgba(59, 118, 225, 0.25) !important;
        }

        .avatar-xs {
            height: 1rem;
            width: 1rem;
        }

        .avatar-sm {
            height: 2rem;
            width: 2rem;
        }

        .avatar {
            height: 3rem;
            width: 3rem;
        }

        .avatar-md {
            height: 4rem;
            width: 4rem;
        }

        .avatar-lg {
            height: 5rem;
            width: 5rem;
        }

        .avatar-xl {
            height: 6rem;
            width: 6rem;
        }

        .avatar-title {
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            background-color: #3b76e1;
            color: #fff;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            font-weight: 500;
            height: 100%;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            width: 100%;
        }

        .avatar-group {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            padding-left: 8px;
        }

        .avatar-group .avatar-group-item {
            margin-left: -8px;
            border: 2px solid #fff;
            border-radius: 50%;
            -webkit-transition: all 0.2s;
            transition: all 0.2s;
        }

        .avatar-group .avatar-group-item:hover {
            position: relative;
            -webkit-transform: translateY(-2px);
            transform: translateY(-2px);
        }

        .fw-medium {
            font-weight: 500;
        }

        a {
            text-decoration: none !important;
        }
    </style>
</head>

<body>
    <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.css"
        integrity="sha256-NAxhqDvtY0l4xn+YVa6WjAcmd94NNfttjNsDmNatFVc=" crossorigin="anonymous" />
    <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
    <div class="container">
        <div class="row">
            <div class="col-xl-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row mb-3">
                            <div class="col-lg-4 col-sm-6">
                                <div class="search-box mb-2 me-2">
                                    <div class="position-relative">
                                        <nav style="color:#336cd6; max-width: 400px;">
                                            <ul class="m-1" style="list-style: none; padding: 0; display: flex">
                                                <li><a href="{{ url('/dashboard') }}">HOME </a></li>
                                            </ul>
                                        </nav>

                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-8 col-sm-6">
                                <div class="mt-4 mt-sm-0 d-flex align-items-center justify-content-sm-end">
                                    <div class="mb-2 me-2">
                                        <div class="dropdown">
                                            <button type="button" class="btn btn-primary dropdown-toggle"
                                                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i class="mdi mdi-plus me-1"></i> Create New
                                            </button>
                                            <div class="dropdown-menu dropdown-menu-end">
                                                <a type="button" class="dropdown-item" data-bs-toggle="modal"
                                                    data-bs-target="#createFolderModal">
                                                    <i class="mdi mdi-folder-outline me-1"></i> Folder
                                                </a>

                                                <a class="dropdown-item" type="button" data-bs-toggle="modal"
                                                    data-bs-target="#uploadFileModal"><i
                                                        class="mdi mdi-file-outline me-1"></i> File</a>
                                            </div>
                                        </div>
                                        <div class="modal fade" id="createFolderModal" tabindex="-1"
                                            aria-labelledby="createFolderModalLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="createFolderModalLabel">Create
                                                            Folder</h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                            aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <form action="{{ route('folders.store') }}" method="post">
                                                            @csrf
                                                            <div class="mb-3">
                                                                <label for="folderName" class="form-label">Folder
                                                                    Name</label>
                                                                <input type="text" class="form-control"
                                                                    id="folderName" name="folder_name" required>
                                                            </div>
                                                            <button type="submit" class="btn btn-primary">Create
                                                                Folder</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal fade" id="uploadFileModal" tabindex="-1" role="dialog"
                                            aria-labelledby="uploadFileModalLabel" aria-hidden="true">
                                            <div class="modal-dialog" role="document">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="uploadFileModalLabel">Upload File
                                                        </h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                            aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <form action="{{ route('files.store') }}" method="post"
                                                            enctype="multipart/form-data">
                                                            @csrf
                                                            <div class="mb-3">
                                                                <input type="file" name="file"
                                                                    class="form-control" id="fileInput" required>
                                                            </div>
                                                            <button type="submit"
                                                                class="btn btn-primary">Upload</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="dropdown mb-0">
                                        <a class="btn btn-link text-muted dropdown-toggle p-1 mt-n2" role="button"
                                            data-bs-toggle="dropdown" aria-haspopup="true">
                                            {{ auth()->user()->name }}
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-end">
                                            <a class="dropdown-item" href="{{ route('profile.edit') }}">Profile</a>
                                            <form method="POST" action="{{ route('logout') }}">
                                                @csrf
                                                <a href="{{ route('logout') }}" class="dropdown-item"
                                                    onclick="event.preventDefault(); this.closest('form').submit();">
                                                    Logout
                                                </a>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h5 class="font-size-16 me-3 mb-0">Folders</h5>
                        <div class="row mt-4">
                            @foreach ($folders as $folder)
                                @if (auth()->user()->id == $folder->user_id)
                                    <div class="col-xl-4 col-sm-6">
                                        <div class="card shadow-none border">
                                            <div class="card-body p-3">
                                                <div class>
                                                    <a href="{{ route('folders.show', ['id' => $folder->id]) }}"
                                                        style="display: flex;">
                                                        <div class="d-flex justify-content-between align-items-center">
                                                            <div>
                                                                <i class="bx bxs-folder h1 mb-0 text-warning"></i>
                                                            </div>
                                                        </div>
                                                        <div class="d-flex mt-3">
                                                            <div class="overflow-hidden me-auto">
                                                                <h5 class="font-size-15 text-truncate mb-1">
                                                                    <a href="{{ route('folders.show', ['id' => $folder->id]) }}"
                                                                        class="text-body">{{ $folder->folder_name }}</a>
                                                                </h5>
                                                            </div>
                                                            <div class="align-self-end ms-2">
                                                                <p class="text-muted mb-0 font-size-13">
                                                                    <i class="mdi mdi-clock"></i>
                                                                    {{ $folder->created_at }}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                @endif
                            @endforeach
                        </div>

                        <div class="d-flex flex-wrap">
                            <h5 class="font-size-16 me-3">Files</h5>
                        </div>
                        <hr class="mt-2" />
                        <div class="table-responsive">
                            <table class="table table-nowrap table-hover mb-0">
                                <thead class="table-light">
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Date modified</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($files as $file)
                                        @if (auth()->user()->id == $file->user_id)
                                            <tr>
                                                <td class="text-dark fw-medium">
                                                    {{ $file->file_name }}
                                                </td>
                                                <td>{{ $file->created_at }}</td>
                                                <td>
                                                    <div class="dropdown">
                                                        <a class="font-size-16 text-muted" role="button"
                                                            data-bs-toggle="dropdown" aria-haspopup="true">
                                                            <i class="mdi mdi-dots-horizontal"></i>
                                                        </a>
                                                        <div class="dropdown-menu dropdown-menu-end">
                                                            <button style="border: none;"
                                                                class="copyButton dropdown-item"
                                                                data-url="{{ url('/' . $file->file_path) }}">
                                                                Share
                                                            </button>
                                                            <a class="dropdown-item" target="_blank"
                                                                href="/{{ $file->file_path }}">Preview</a>
                                                            <form
                                                                action="{{ route('files.destroy', ['file' => $file]) }}"
                                                                method="post">
                                                                @csrf
                                                                @method('DELETE')
                                                                <button type="submit" class="dropdown-item">
                                                                    Remove
                                                                </button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        @endif
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js"></script>

    <script>
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
</body>

</html>

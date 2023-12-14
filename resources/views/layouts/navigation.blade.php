<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Laravel Dropbox Clone</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet">

</head>
<body>
    <div class="nav-container">
        <div class="nav-content">
            <div class="nav-bar">
                <div class="logo">
                    <a href="{{ route('dashboard') }}">
                        <img src="https://www.techrepublic.com/wp-content/uploads/2017/03/dropboxhero.jpg" alt="Dropbox Logo">
                    </a>
                </div>
                <button class="hamburger-button" id="hamburgerButton">
                    <svg class="hamburger-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
                <div class="nav-links" id="navLinks">
                    <a href="{{ route('dashboard') }}" class="nav-link">Dashboard</a>
                </div>
                <div class="user-dropdown">
                    <div style="display: flex;">
                        <div class="user-name">{{ Auth::user()->name }}</div>
                        <button>
                            <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                    <div class="user-menu">
                        <form method="POST" action="{{ route('logout') }}">
                            @csrf
                            <button type="submit">Logout</button>
                        </form>
                        <a href="{{ route('profile.edit') }}">
                            <button>Profile</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        const hamburgerButton = document.getElementById('hamburgerButton');
        const navLinks = document.getElementById('navLinks');
        const mobileNavLinks = document.getElementById('mobileNavLinks');

        hamburgerButton.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        mobileNavLinks.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    </script>
</body>
</html>

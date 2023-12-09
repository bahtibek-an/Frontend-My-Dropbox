<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Laravel Dropbox Clone</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet">

    <!-- Styles -->
    <style>
        body {
            font-family: 'Figtree', sans-serif;
            line-height: 1.6;
            background-color: #F3F4F6;
            margin: 0;
        }

        .nav-container {
            background-color: #FFF;
            border-bottom: 1px solid #E5E7EB;
        }

        .nav-content {
            max-width: 1024px;
            margin: auto;
            padding: 0.5rem 1rem;
        }

        .nav-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 3rem;
        }

        .logo {
            display: flex;
            align-items: center;
        }

        .logo img {
            width: 35px;
            height: auto;
            margin-right: 0.5rem;
        }

        .nav-links {
            display: flex;
            gap: 1rem;
        }

        .nav-link {
            font-weight: 600;
            color: #33d63b;
            text-decoration: none;
            transition: color 0.2s ease;
        }

        .nav-link:hover {
            color: #4ed633;
        }

        .user-dropdown {
            position: relative; /* Added to create a positioning context for the dropdown */
        }
        
        .user-menu {
            position: absolute;
            top: 100%;
            right: 0;
            background-color: #FFF;
            border: 1px solid #d1d5db;
            border-radius: 0.25rem;
            z-index: 1000;
            display: none;
        }
        
        .user-dropdown:hover .user-menu {
            display: block;
        }
        
        .user-menu button {
            padding: 0.25rem 0.5rem;
            font-size: 0.875rem;
            font-weight: 500;
            color: #4a4a4a;
            width: 100%;
            text-align: left;
            background-color: transparent;
            border: none;
            border-top: 1px solid #d1d5db;
            cursor: pointer;
            transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
            width: 135px;
        }

        .user-menu button:first-child {
            border-top: none;
        }

        .user-menu button:hover {
            background-color: #f3f4f6;
        }

        .hamburger-button {
            display: none;
            background-color: transparent;
            border: none;
            cursor: pointer;
        }

        .hamburger-icon {
            width: 1.5rem;
            height: 1.5rem;
            fill: #4a4a4a;
        }

        @media (max-width: 640px) {
            .nav-bar {
                justify-content: space-between;
            }

            .hamburger-button {
                display: block;
            }

            .nav-links {
                display: none;
                flex-direction: column;
                background-color: #FFF;
                position: absolute;
                top: 3rem;
                left: 0;
                width: 100%;
                border: 1px solid #E5E7EB;
                border-top: none;
            }

            .nav-link {
                padding: 0.5rem 1rem;
                width: 100%;
                text-align: center;
                color: #33d661;
                transition: background-color 0.2s ease, color 0.2s ease;
            }

            .nav-link:hover {
                background-color: #f3f4f6;
            }

            .nav-links.active {
                display: flex;
            }
        }
    </style>
</head>
<body>
    <div class="nav-container">
        <div class="nav-content">
            <div class="nav-bar">
                <div class="logo">
                    <a href="{{ route('dashboard') }}">
                        DROPBOX
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

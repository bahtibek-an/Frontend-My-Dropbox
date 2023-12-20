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
            background-color: #1b2539;
            margin-top: 100px
        }

        .form-container {
            max-width: 400px;
            margin: auto;
            padding: 2rem;
            background-color: #FFF;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 0.5rem;
            text-align: center;
        }

        .form-heading {
            font-size: 30px;
            margin-bottom: 1rem;
        }

        .input-group {
            margin-bottom: 1.5rem;
        }

        .input-label {
            font-weight: 600;
            display: block;
            text-align: left;
        }

        .text-input {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #E5E7EB;
            border-radius: 0.25rem;
        }

        .input-error {
            color: #e74c3c;
            text-align: left;
            margin-top: 0.25rem;
        }

        .flex {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 1.5rem;
        }

        .link {
            color: #0eccee;
            text-decoration: none;
            transition: color 0.2s ease;
        }

        .link:hover {
            color: #0eccee;
        }

        .primary-button {
            display: inline-block;
            padding: 0.75rem 1.5rem;
            font-size: 1rem;
            font-weight: 600;
            text-align: center;
            text-decoration: none;
            color: #FFF;
            background-color: #0eccee;
            border-radius: 0.25rem;
            transition: background-color 0.2s ease;
            cursor: pointer;
        }

        .primary-button:hover {
            background-color: #0eccee;
        }
    </style>
</head>
<body>
    <div class="form-container">
        <!-- Session Status -->
        <div class="mb-4">
            @if (session('status'))
                <div class="input-error">{{ session('status') }}</div>
            @endif
        </div>

        <div class="form-heading">Login</div>

        <form method="POST" action="{{ route('login') }}">
            @csrf

            <div class="input-group">
                <label for="email" class="input-label">Email</label>
                <input id="email" class="text-input" type="email" name="email" value="{{ old('email') }}" required autofocus autocomplete="email" />
                @if ($errors->has('email'))
                    <div class="input-error">{{ $errors->first('email') }}</div>
                @endif
            </div>

            <div class="input-group">
                <label for="password" class="input-label">Password</label>
                <input id="password" class="text-input" type="password" name="password" required autocomplete="current-password" />
                @if ($errors->has('password'))
                    <div class="input-error">{{ $errors->first('password') }}</div>
                @endif
            </div>

            <div class="input-group">
                <label for="remember_me" class="inline-flex items-center">
                    <input id="remember_me" type="checkbox" class="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500" name="remember">
                    <span class="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
            </div>

            <div class="flex">
                @if (Route::has('password.request'))
                    <a class="link" href="{{ route('register') }}">Don't have account, yet? Register</a>
                @endif
                <button type="submit" class="primary-button">Log in</button>
            </div>
        </form>
    </div>
</body>
</html>

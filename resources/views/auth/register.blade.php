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

</head>
<body>
    <div class="form-container">
        <div class="form-heading">Register</div>

        <form method="POST" action="{{ route('register') }}">
            @csrf

            <div class="input-group">
                <label for="name" class="input-label">Name</label>
                <input id="name" class="text-input" type="text" name="name" value="{{ old('name') }}" required autofocus autocomplete="name" />
                @if ($errors->has('name'))
                    <div class="input-error">{{ $errors->first('name') }}</div>
                @endif
            </div>

            <div class="input-group">
                <label for="email" class="input-label">Email</label>
                <input id="email" class="text-input" type="email" name="email" value="{{ old('email') }}" required autocomplete="email" />
                @if ($errors->has('email'))
                    <div class="input-error">{{ $errors->first('email') }}</div>
                @endif
            </div>

            <div class="input-group">
                <label for="password" class="input-label">Password</label>
                <input id="password" class="text-input" type="password" name="password" required autocomplete="new-password" />
                @if ($errors->has('password'))
                    <div class="input-error">{{ $errors->first('password') }}</div>
                @endif
            </div>

            <div class="input-group">
                <label for="password_confirmation" class="input-label">Confirm Password</label>
                <input id="password_confirmation" class="text-input" type="password" name="password_confirmation" required autocomplete="new-password" />
                @if ($errors->has('password_confirmation'))
                    <div class="input-error">{{ $errors->first('password_confirmation') }}</div>
                @endif
            </div>

            <div class="flex">
                <a class="link" href="{{ route('login') }}">Already registered? Login</a>
                <button type="submit" class="primary-button">Register</button>
            </div>
        </form>
    </div>
</body>
</html>

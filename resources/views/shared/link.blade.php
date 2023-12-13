<x-app-layout>
    <link rel="stylesheet" href="{{ asset('style.css') }}">
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 bg-white border-b border-gray-200 d-block">
                    <p>Here is your shared link: {{ $link }}</p>
                    <button class="btn btn-primary share-button mt-2" data-url="{{ url('/' . $link) }}">Copy
                        URL</button>

                </div>
            </div>
        </div>
    </div>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            const shareButtons = document.querySelectorAll(".share-button");

            shareButtons.forEach(function(button) {
                button.addEventListener("click", function() {
                    const urlToCopy = this.getAttribute("data-url");

                    // Create a temporary input element to copy the URL
                    const tempInput = document.createElement("input");
                    tempInput.setAttribute("value", urlToCopy);
                    document.body.appendChild(tempInput);

                    // Select and copy the URL
                    tempInput.select();
                    document.execCommand("copy");

                    // Remove the temporary input element
                    document.body.removeChild(tempInput);

                    // Provide feedback to the user (you can customize this part)
                    alert("URL copied to clipboard: " + urlToCopy);
                });
            });
        });
    </script>

</x-app-layout>

<x-app-layout>
  <x-slot name="header">
      <h2 class="font-semibold text-xl text-gray-800 leading-tight">
          {{ __('File Details') }}
      </h2>
  </x-slot>

  <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <div class="p-6 bg-white border-b border-gray-200">
                  <h3 class="text-xl font-semibold">{{ $file->name }}</h3>
                  <p>File Size: {{ $file->size }}</p>
                  <p>Uploaded By: {{ $file->user->name }}</p>
              </div>
          </div>
      </div>
  </div>
</x-app-layout>

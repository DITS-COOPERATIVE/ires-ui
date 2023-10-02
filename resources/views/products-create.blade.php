<x-guest-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Add Products') }}
        </h2>
    </x-slot>
    <form method="POST" action="{{ route('products.add') }}">
        @csrf

        <!-- Name -->
        <div>
            <x-input-label for="name" :value="__('Product Name')" />
            <x-text-input id="name" class="block mt-1 w-full" type="text" name="name" :value="old('name')" required autofocus autocomplete="name" />
            <x-input-error :messages="$errors->get('name')" class="mt-2" />
        </div>

        <!-- Model -->
        <div class="mt-4">
            <x-input-label for="model" :value="__('Product Model')" />
            <x-text-input id="model" class="block mt-1 w-full" type="text" name="model" :value="old('model')" required autocomplete="model" />
            <x-input-error :messages="$errors->get('model')" class="mt-2" />
        </div>

        <!-- Barcode -->
        <div class="mt-4">
            <x-input-label for="code" :value="__('Product Code')" />
            <x-text-input id="code" class="block mt-1 w-full" type="text" name="code" :value="old('code')" required autocomplete="code" />
            <x-input-error :messages="$errors->get('code')" class="mt-2" />
        </div>

        <!-- Price -->
        <div class="mt-4">
            <x-input-label for="price" :value="__('Price')" />
            <x-text-input id="price" class="block mt-1 w-full" type="text" name="price" :value="old('price')" required autocomplete="price" />
            <x-input-error :messages="$errors->get('price')" class="mt-2" />
        </div>

        <!-- Quantity -->
        <div class="mt-4">
            <x-input-label for="quantity" :value="__('Quantity')" />
            <x-text-input id="quantity" class="block mt-1 w-full" type="text" name="quantity" :value="old('quantity')" required autocomplete="quantity" />
            <x-input-error :messages="$errors->get('quantity')" class="mt-2" />
        </div>

        <!-- Points -->
        <div class="mt-4">
            <x-input-label for="points" :value="__('Points')" />
            <x-text-input id="points" class="block mt-1 w-full" type="text" name="points" :value="old('points')" required autocomplete="points" />
            <x-input-error :messages="$errors->get('points')" class="mt-2" />
        </div>

        <div class="mt-4">
            <x-primary-button class="ml-4">
                {{ __('Add Order') }}
            </x-primary-button>
        </div>
    </form>
</x-guest-layout>
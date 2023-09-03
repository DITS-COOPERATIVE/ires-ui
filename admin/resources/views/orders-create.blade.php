<x-guest-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Add Order') }}
        </h2>
    </x-slot>
    <form method="POST" action="{{ route('orders.add') }}">
        @csrf

        <!-- Product ID -->
        <div>
            <x-input-label for="product_id" :value="__('Product ID')" />
            <x-text-input id="product_id" class="block mt-1 w-full" type="text" name="product_id" :value="old('product_id')" required autofocus autocomplete="product_id" />
            <x-input-error :messages="$errors->get('product_id')" class="mt-2" />
        </div>

        <!-- Customer ID -->
        <div class="mt-4">
            <x-input-label for="customer_id" :value="__('Customer ID')" />
            <x-text-input id="customer_id" class="block mt-1 w-full" type="text" name="customer_id" :value="old('customer_id')" required autocomplete="customer_id" />
            <x-input-error :messages="$errors->get('customer_id')" class="mt-2" />
        </div>

        <!-- Quantity -->
        <div class="mt-4">
            <x-input-label for="quantity" :value="__('Quantity')" />
            <x-text-input id="quantity" class="block mt-1 w-full" type="text" name="quantity" :value="old('quantity')" required autocomplete="quantity" />
            <x-input-error :messages="$errors->get('quantity')" class="mt-2" />
        </div>

        <div class="mt-4">
            <x-primary-button class="ml-4">
                {{ __('Add Order') }}
            </x-primary-button>
        </div>
    </form>
</x-guest-layout>
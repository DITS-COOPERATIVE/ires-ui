<x-guest-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Add Transaction') }}
        </h2>
    </x-slot>
    <form method="POST" action="{{ route('transactions.add') }}">
        @csrf

        <!-- Order ID -->
        <div>
            <x-input-label for="sale_id" :value="__('Sales ID')" />
            <x-text-input id="sale_id" class="block mt-1 w-full" type="text" name="sale_id" :value="$sales->id" required autofocus autocomplete="sale_id" />
            <x-input-error :messages="$errors->get('sale_id')" class="mt-2" />
        </div>

        <!-- Total Amount -->
        <div class="mt-4">
            <x-input-label for="total_price" :value="__('Total Amount')" />
            <x-text-input id="total_price" class="block mt-1 w-full" type="text" name="total_price" :value="$amount" required autocomplete="total_price" />
            <x-input-error :messages="$errors->get('total_price')" class="mt-2" />
        </div>

        <!--Amount Rendered-->
        <div class="mt-4">
            <x-input-label for="amount_rendered" :value="__('Amount Rendered')" />
            <x-text-input id="amount_rendered" class="block mt-1 w-full" type="text" name="amount_rendered" :value="old('amount_rendered')" required autocomplete="quantity" />
            <x-input-error :messages="$errors->get('amount_rendered')" class="mt-2" />
        </div>

        <div class="mt-4">
            <x-primary-button class="ml-4">
                {{ __('Add Order') }}
            </x-primary-button>
        </div>
    </form>
</x-guest-layout>
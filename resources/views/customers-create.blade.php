<x-guest-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Add Customer') }}
        </h2>
    </x-slot>
    <form method="POST" action="{{ route('customers.add') }}">
        @csrf

        <!-- First Name -->
        <div class="mt-4">
            <x-input-label for="first_name" :value="__('First Name')" />
            <x-text-input id="first_name" class="block mt-1 w-full" type="text" name="first_name" :value="old('first_name')" required autocomplete="first_name" />
            <x-input-error :messages="$errors->get('first_name')" class="mt-2" />
        </div>

        <!-- Last Name -->
        <div class="mt-4">
            <x-input-label for="last_name" :value="__('Last Name')" />
            <x-text-input id="last_name" class="block mt-1 w-full" type="text" name="last_name" :value="old('last_name')" required autocomplete="last_name" />
            <x-input-error :messages="$errors->get('last_name')" class="mt-2" />
        </div>

        <!-- Gender -->
        <div class="mt-4">
            <x-input-label for="gender" :value="__('Gender')" />
            <x-text-input id="gender" class="block mt-1 w-full" type="text" name="gender" :value="old('gender')" required autocomplete="gender" />
            <x-input-error :messages="$errors->get('gender')" class="mt-2" />
        </div>

        <!-- Email -->
        <div class="mt-4">
            <x-input-label for="email" :value="__('E-mail')" />
            <x-text-input id="email" class="block mt-1 w-full" type="text" name="email" :value="old('email')" required autocomplete="email" />
            <x-input-error :messages="$errors->get('email')" class="mt-2" />
        </div>

        <!-- Mobile Number -->
        <div class="mt-4">
            <x-input-label for="mobile_no" :value="__('Mobile Number')" />
            <x-text-input id="mobile_no" class="block mt-1 w-full" type="text" name="mobile_no" :value="old('mobile_no')" required autocomplete="mobile_no" />
            <x-input-error :messages="$errors->get('mobile_no')" class="mt-2" />
        </div>

        <!-- Bdate -->
        <div class="mt-4">
            <x-input-label for="birth_date" :value="__('Birth Date')" />
            <x-text-input id="birth_date" class="block mt-1 w-full" type="text" name="birth_date" :value="old('birth_date')" required autocomplete="birth_date" />
            <x-input-error :messages="$errors->get('birth_date')" class="mt-2" />
        </div>

        <!-- Address -->
        <div class="mt-4">
            <x-input-label for="address" :value="__('Address')" />
            <x-text-input id="address" class="block mt-1 w-full" type="text" name="address" :value="old('address')" required autocomplete="address" />
            <x-input-error :messages="$errors->get('address')" class="mt-2" />
        </div>

        <div class="mt-4">
            <x-primary-button class="ml-4">
                {{ __('Add Order') }}
            </x-primary-button>
        </div>
    </form>
</x-guest-layout>
<x-app-layout>
    <x-slot name="header" class="flow-root">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight ">
            {{ __('Products Details') }}

        </h2>
    </x-slot>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Products ID
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Model
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Code
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <span class="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {{$products->id}}
                            </th>
                            <td class="px-6 py-4">
                                {{$products->name}}
                            </td>
                            <td class="px-6 py-4">
                                {{$products->model}}
                            </td>
                            <td class="px-6 py-4">
                                {{$products->code}}
                            </td>
                            <td class="px-6 py-4 text-right">
                                <a href="" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Checkout</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
</x-app-layout>
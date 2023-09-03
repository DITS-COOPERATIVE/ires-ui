<x-app-layout>
    <x-slot name="header" class="flow-root">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight ">
            {{ __('Orders') }}

        </h2>
    </x-slot>

    @if(count($orders) > 0)
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">

            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Order ID
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Customer Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Product Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Quantity
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Total Price
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Total Points
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <span class="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($orders as $order)
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {{$order->id}}
                            </th>
                            <td class="px-6 py-4">
                                {{$order->customer->first_name}} {{$order->customer->last_name}}
                            </td>
                            <td class="px-6 py-4">
                                {{$order->product->value('name')}}
                            </td>
                            <td class="px-6 py-4">
                                {{$order->quantity}}
                            </td>
                            <td class="px-6 py-4">
                                {{("PHP")}} {{$order->sale->total_price}}
                            </td>
                            <td class="px-6 py-4">
                                {{$order->sale->total_points}}
                            </td>
                            <td class="px-6 py-4 text-right">
                                <a href="orders/{{$order->id}}" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div><br>
            <a href="orders-create">
                <button class="w-full h-12 px-6 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">+</button>
            </a>
        </div>
    </div>

    @else
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    {{$result}}
                </div>
            </div>
        </div>
        <br>
        <a href="order-create">
            <button class="w-full h-12 px-6 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">+</button>
        </a>
    </div>
    @endif
</x-app-layout>
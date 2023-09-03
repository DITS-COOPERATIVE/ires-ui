<?php

namespace App\Http\Controllers\api;

use App\Models\Sales;
use App\Models\Customers;
use App\Models\Transactions;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Orders;
use Illuminate\Support\Facades\Validator;

class TransactionController extends Controller
{
    public function create($id)
    {
        $sales = Sales::with('orders')->where('id', $id)->get()->flatten()->first();
        $orders = $sales->orders->flatten()->first();
        $customer_id = $orders->customer_id;
        $count = Orders::where('customer_id', $customer_id)->count();
        $amount = $sales->total_price;
        return view('transactions-create', [
            'sales' => $sales,
            'orders' => $orders,
            'amount' => $amount,
            'count' => $count,
        ]);
    }

    public function index()
    {
        $transactions = Transactions::all();
        if ($transactions->count() > 0) {
            $data = [
                'status' => 200,
                'result' => $transactions,
            ];
        } else {
            $data = [
                'status' => 404,
                'result' => 'No Records Found'
            ];
        }
        return view('transactions', [
            'transactions' => $transactions,
            'status' => $data['status'],
            'result' => $data['result'],
        ]);
    }
    public function store(Request $request)
    {
        $change = $request->amount_rendered - $request->total_price;

        $validator = Validator::make($request->all(), [
            'sale_id'              => 'required',
            'amount_rendered'       => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status'    => 422,
                'errors'    => $validator->messages()
            ], 422);
        } else {;

            $transaction = Transactions::create([
                'sale_id'           =>  $request->sale_id,
                'amount_rendered'   =>  $request->amount_rendered,
                'change'            =>  $change,
            ]);

            if ($transaction) {

                $points = Transactions::with([
                    'sale' => function ($query) {
                        $query->select('id', 'total_points');
                    }
                ])
                    ->get()
                    ->pluck('sale')
                    ->first()
                    ->value('total_points');

                $customer_id = Transactions::with([
                    'sale.orders' => function ($query) {
                        $query->select('id', 'customer_id');
                    }
                ])
                    ->get()
                    ->pluck('sale.orders')
                    ->first()
                    ->flatten()
                    ->value('customer_id');

                $customer = Customers::where('id', '=', $customer_id)->first();
                $new_points = $customer->points + $points;
                $customer->points = $new_points;
                $customer->save();

                return redirect('/transactions');
            } else {

                return response()->json([
                    'status'    =>  500,
                    'message'   => "Something went wrong!"
                ], 500);
            }
        }
    }

    public function show($id)
    {
        $transaction = Transactions::find($id);
        if ($transaction) {
            return response()->json([
                'status'    =>  200,
                'userinfo'   => $transaction
            ], 200);
        } else {
            return response()->json([
                'status'    =>  404,
                'message'   => "No Data Found!"
            ], 404);
        }
    }

    public function destroy(string $id)
    {
        $transactions = Transactions::find($id);
        if ($transactions) {
            $transactions->delete();
            return response()->json([
                'status'    =>  200,
                'message'   => "Transaction Delete successfully!"
            ], 200);
        } else {

            return response()->json([
                'status'    =>  404,
                'message'   => "No Data Found!"
            ], 404);
        }
    }
}

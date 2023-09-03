<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
    use HasFactory;

    protected $table = "orders";

    protected $fillable = [
        'customer_id',
        'product_id',
        'quantity',
    ];

    public function product()
    {
        return $this->hasMany(Products::class, 'id', 'product_id');
    }
    public function customer()
    {
        return $this->hasOne(Customers::class, 'id', 'customer_id');
    }
    public function sale()
    {
        return $this->belongsTo(Sales::class, 'id');
    }
    
}

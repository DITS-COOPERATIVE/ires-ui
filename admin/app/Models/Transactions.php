<?php

namespace App\Models;

use App\Models\Products;
use App\Models\Customers;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Transactions extends Model
{
    use HasFactory;

    protected $table = "transactions";

    protected $fillable = [
        'sale_id',
        'amount_rendered',
        'change',
    ];
    
    public function sale()
    {
        return $this->hasOne(Sales::class, 'id', 'sale_id');
    }
}

<?php

namespace App\Models;

use App\Models\Transactions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Customers extends Model
{
    use HasFactory;
    
    protected $table = "customers";

    protected $fillable = [
        'first_name',
        'last_name',
        'gender',
        'email',
        'birth_date',
        'mobile_no',
        'address',
        'points',
    ];
    
}

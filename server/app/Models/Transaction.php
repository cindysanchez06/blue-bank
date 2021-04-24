<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    CONST TYPE_INCREASE = 'INCREASE';
    CONST TYPE_DECREASE = 'DECREASE';

    use HasFactory;

    //protected $table = 'transaction';

    protected $primaryKey = 'user_id';
}

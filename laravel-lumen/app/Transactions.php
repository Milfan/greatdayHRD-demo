<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Transactions extends Model 
{

    protected $table = 'transactions';
    public $timestamps = false;
    protected $fillable = array('accountId', 'type', 'amount', 'date');

}
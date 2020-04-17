<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateTransactionsTable extends Migration {

	public function up()
	{
		Schema::create('transactions', function(Blueprint $table) {
			$table->increments('id');
			$table->integer('accountId');
			$table->string('type', 50);
			$table->double('amount');
			$table->timestamp('date');
		});
	}

	public function down()
	{
		Schema::drop('transactions');
	}
}
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateAccountsTable extends Migration {

	public function up()
	{
		Schema::create('accounts', function(Blueprint $table) {
			$table->increments('id');
			$table->integer('userId');
			$table->string('accountNumber', 50);
		});
	}

	public function down()
	{
		Schema::drop('accounts');
	}
}
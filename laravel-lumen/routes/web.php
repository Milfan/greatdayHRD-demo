<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

/**
 * Routes for resource users
 */
$router->get('user', 'UsersController@all');
$router->post('user', 'UsersController@add');

/**
 * Routes for resource transactions
 */
$router->post('transactions/simpan', 'TransactionsController@simpanUang');
$router->post('transactions/ambil', 'TransactionsController@ambilUang');
$router->post('transactions/check', 'TransactionsController@cekSaldo');

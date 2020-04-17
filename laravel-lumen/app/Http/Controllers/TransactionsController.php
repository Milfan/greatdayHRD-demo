<?php namespace App\Http\Controllers;

use App\Accounts;
use App\Transactions;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class TransactionsController extends Controller {

    const MODEL = "App\Transactions";

    use RESTActions;

    public function simpanUang(Request $request){
        $result = false;
        DB::beginTransaction();
        try {

            $account = Accounts::where('accountNumber', $request->account_number)->first();

            if(!$account){
                $result = false;
                $message = "Account number not found";
            }
            else{

                $transaction = Transactions::create([
                    "accountId" => $account->id,
                    "type"      => "SIMPAN",
                    "amount"    => $request->amount,
                    "date"      => Carbon::parse($request->date),
                ]);

                $result = true;
                $message = "Data saved successfully";
            }
        }
        catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
        DB::commit();

        $arr_data = [
            "status"        => $result,
            "message"       => $message
        ];

        return response()->json([$arr_data], 200);
    }

    public function ambilUang(Request $request){
        $result = false;
        DB::beginTransaction();
        try {

            $account = Accounts::where('accountNumber', $request->account_number)->first();

            if(!$account){
                $result = false;
                $message = "Account number not found";
            }
            else{

                $transaction = Transactions::create([
                    "accountId" => $account->id,
                    "type"      => "AMBIL",
                    "amount"    => $request->amount,
                    "date"      => Carbon::parse($request->date),
                ]);

                $result = true;
                $message = "Data saved successfully";
            }
        }
        catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
        DB::commit();

        $arr_data = [
            "status"        => $result,
            "message"       => $message
        ];

        return response()->json([$arr_data], 200);
    }

    public function cekSaldo(Request $request)
    {

        $account = Accounts::where('accountNumber', $request->account_number)->first();

        if(!$account){
            $result = false;
            $message = "Account number not found";
        }
        else{

            $transactions = Transactions::where('accountId', $account->id)->orderBy('id', 'asc')->get();

            $balance = 0;
            foreach($transactions AS $data){
                if($data->type == "SIMPAN"){
                    $balance += $data->amount;
                }
                else{
                    $balance -= $data->amount;
                }
            }

            $res_data = array();
            $arr = array();
            $arr['balance'] = $balance;
            array_push($res_data, $arr);

            $result = true;
            $message = "Account found";
        }

        $arr_data = [
            "status"        => $result,
            "message"       => $message,
            "data"          => $res_data
        ];

        return response()->json([$arr_data], 200);
    }
}

<?php namespace App\Http\Controllers;

use App\User;
use App\Accounts;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Hashing\BcryptHasher;
use App\Http\Controllers\RESTActions;

class UsersController extends Controller {

    const MODEL = "App\Users";

    use RESTActions;

    public function all(){
        $data = User::select('id', 'email')->get();
        $arr_data = [
            "status"        => true,
            "message"       => "Data found",
            "data"          => $data
        ];
        return response()->json($arr_data, 200);
    }

    public function add(Request $request){

        $result = false;
        DB::beginTransaction();
        try {

            $user = User::create([
                "email"     => $request->email,
                "password"  => (new BcryptHasher)->make($request->password),
            ]);

            $pool = '0123456789';

            Accounts::create([
                "userId"            => $user->id,
                "accountNumber"     => substr(str_shuffle(str_repeat($pool, 5)), 0, 5).'-'.time(),
            ]);

            $result = true;
        }
        catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
        DB::commit();

        if($result){
            $arr_data = [
                "status"        => true,
                "message"       => "Data saved successfully"
            ];
        }else{
            $arr_data = [
                "status"        => false,
                "message"       => "Data failed to save",
            ];
        }

        return response()->json([$arr_data], 200);
    }
}

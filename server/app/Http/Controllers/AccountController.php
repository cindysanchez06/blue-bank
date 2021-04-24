<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Users;
use App\Services\CreateAccountService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    public function register(Request $request, CreateAccountService $createAccountService)
    {
        $data = $request->only([
            'name',
            'amount'
        ]);
        $result = ['status' => 200];
        try {
            $result['data'] = $createAccountService->create($data);
        } catch (\Exception $exception) {
            $result = [
                'status' => 500,
                'error' => $exception->getMessage()
            ];
        }
        return response()->json($result, $result['status']);
    }

}

<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Services\AmountService;
use App\Services\TransactionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TransactionController extends Controller
{
    public function increase(Request $request, TransactionService $increaseServices)
    {
        $data = $request->only([
            'account',
            'amount'
        ]);
        $data['type'] = Transaction::TYPE_INCREASE;

        $result = ['status' => 200];
        try {
            $result['data'] = $increaseServices->register($data);
        } catch (\Exception $exception) {
            $result = [
                'status' => 500,
                'error' => $exception->getMessage()
            ];
        }
        return response()->json($result, $result['status']);
    }

    public function decrease(Request $request, TransactionService $transactionService)
    {
        $data = $request->only([
            'account',
            'amount'
        ]);
        $data['type'] = Transaction::TYPE_DECREASE;

        $result = ['status' => 200];
        try {
            $result['data'] = $transactionService->register($data);
        } catch (\Exception $exception) {
            $result = [
                'status' => 500,
                'error' => $exception->getMessage()
            ];
        }
        return response()->json($result, $result['status']);
    }

    public function getAmount(Request $request, TransactionService $transactionService, AmountService $amountService)
    {
        $data = $request->only([
            'account'
        ]);

        $validator = Validator::make($data, [
            'account' => 'required',
        ]);

        if ($validator->fails()) {
            throw new \InvalidArgumentException($validator->errors()->first());
        }

        $result = ['status' => 200];
        try {
            $transactionService->accountExists($data['account']);
            $result['data'] = $amountService->getAmount($data['account']);
        } catch (\Exception $exception) {
            $result = [
                'status' => 500,
                'error' => $exception->getMessage()
            ];
        }
        return response()->json($result, $result['status']);
    }
}

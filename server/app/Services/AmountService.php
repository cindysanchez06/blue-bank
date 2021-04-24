<?php


namespace App\Services;


use App\Models\Transaction;
use App\Repositories\TransactionRepository;
use App\Repositories\UserRepository;

class AmountService
{
    /**
     * @var UserRepository
     */
    private $userRepository;
    /**
     * @var TransactionRepository
     */
    private $transactionRepository;

    public function __construct(UserRepository $userRepository, TransactionRepository $transactionRepository)
    {
        $this->userRepository = $userRepository;
        $this->transactionRepository = $transactionRepository;
    }

    public function getAmount(string $account)
    {
        $user = $this->userRepository->byNumberAccount($account);
        $transactions = $this->transactionRepository->byUser($user->id);
        $amount = 0;
        foreach ($transactions as $transaction) {
            if ($transaction->type === Transaction::TYPE_DECREASE) {
                $amount = $amount - $transaction->amount;
            } else {
                $amount = $amount + $transaction->amount;
            }
        }
        return [
            'amount' => $amount,
            'name' => $user->name
        ];
    }
}

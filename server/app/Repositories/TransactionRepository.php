<?php


namespace App\Repositories;


use App\Models\Transaction;
use App\Models\Users;
use phpDocumentor\Reflection\Types\Integer;

class TransactionRepository
{
    /**
     * @var Transaction
     */
    private $transaction;

    public function __construct(Transaction $transaction)
    {
        $this->transaction = $transaction;
    }

    public function createTransaction(int $user, string $type, int $amount)
    {
        $transaction = new $this->transaction;
        $transaction->user_id = $user;
        $transaction->type = $type;
        $transaction->amount = $amount;

        $transaction->save();
        return $transaction;
    }

    public function byUser(int $idUser)
    {
        return $this->transaction::where('user_id', '=', $idUser)->get();
    }
}

<?php


namespace App\Services;

use App\Models\Transaction;
use App\Models\Users;
use App\Repositories\TransactionRepository;
use App\Repositories\UserRepository;
use GuzzleHttp\Exception\BadResponseException;
use http\Exception\InvalidArgumentException;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;


class TransactionService
{

    /**
     * @var TransactionRepository
     */
    private $transactionRepository;
    /**
     * @var UserRepository
     */
    private $userRepository;
    /**
     * @var AmountService
     */
    private $amountService;

    public function __construct(TransactionRepository $transactionRepository, UserRepository $userRepository, AmountService $amountService)
    {
        $this->transactionRepository = $transactionRepository;
        $this->userRepository = $userRepository;
        $this->amountService = $amountService;
    }

    public function accountExists(string $account)
    {
        $accountExist = $this->userRepository->byNumberAccount($account);
        if (!$accountExist) {
            throw new NotFoundHttpException('cuenta no encontrada');
        }
        return $accountExist;
    }

    public function register(array $data): array
    {
        $validator = Validator::make($data, [
            'account' => 'required',
            'amount' => 'required|integer',
            'type' => 'required'
        ]);

        if ($validator->fails()) {
            throw new \InvalidArgumentException($validator->errors()->first());
        }
        $user = $this->accountExists($data['account']);
        if ($data['type'] === Transaction::TYPE_DECREASE) {
            $this->validateAmount($data['account'], $data['amount']);
        }
        $this->transactionRepository->createTransaction($user->id, $data['type'], $data['amount']);
        return ['name' => $user->name];
    }

    public function validateAmount(string $account, int $amount)
    {
        $totalAmount = $this->amountService->getAmount($account);
        if(!($totalAmount['amount'] >= $amount)){
            throw new \InvalidArgumentException('El monto es invalido');
        }
    }
}

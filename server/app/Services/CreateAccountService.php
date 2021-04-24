<?php


namespace App\Services;


use App\Models\Transaction;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class CreateAccountService
{
    /**
     * @var UserRepository
     */
    protected $userRepository;
    /**
     * @var User
     */
    protected $user;
    /**
     * @var TransactionService
     */
    private $increaseServices;

    public function __construct(UserRepository $userRepository, User $user, TransactionService $increaseServices)
    {
        $this->userRepository = $userRepository;
        $this->user = $user;
        $this->increaseServices = $increaseServices;
    }

    /**
     * @throws \Exception
     */
    public function create(array $data)
    {
        $validator = Validator::make($data, [
            'name' => 'required',
            'amount' => 'required|integer'
        ]);

        if ($validator->fails()) {
            throw new \InvalidArgumentException($validator->errors()->first());
        }

        DB::beginTransaction();
        try {
            $user = $this->userRepository->createUser($data['name']);

            $data = [
                'account' => $user->account_number,
                'amount' => $data['amount'],
                'type' => Transaction::TYPE_INCREASE
            ];
            $this->increaseServices->register($data);
            DB::commit();
        } catch (\Exception $exception) {
            DB::rollback();
            throw $exception;
        }
        return $user;
    }
}

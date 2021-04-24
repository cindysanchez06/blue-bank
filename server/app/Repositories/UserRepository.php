<?php


namespace App\Repositories;


use App\Models\Users;

class UserRepository
{
    /**
     * @var Users
     */
    protected $user;

    public function __construct(Users $user)
    {

        $this->user = $user;
    }

    /**
     * @throws \Exception
     */
    public function createUser(string $name)
    {
        $user = new $this->user;
        $user->name = $name;
        $user->account_number =  random_int(1000000000, 9999999999);
        $user->save();
        return $user;
    }

    public function byNumberAccount(string $account)
    {
        return $this->user::where('account_number', '=', $account)->first();
    }
}

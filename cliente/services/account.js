import { fetchService } from "./constants";

const URI_REGISTER = "/account/create";
const URI_AMOUNT = "/transactions/amount";
const URI_INCREASE = "/transactions/increase";
const URI_WITHHOLDING = "/transactions/decrease";


class AccountService {
  async register(data) {
    return fetchService({
          method: "POST",
          uri: URI_REGISTER,
          data: { name: data.fullname, amount: data.amount },
        });
  }

  async getAmount(data) {
    return fetchService({
          method: "POST",
          uri: URI_AMOUNT,
          data: { account: data.account },
        });
  }

  async increase(data) {
    return fetchService({
          method: "POST",
          uri: URI_INCREASE,
          data: { account: data.account, amount: data.amount },
        });
  }

  async withholding(data) {
    return fetchService({
          method: "POST",
          uri: URI_WITHHOLDING,
          data: { account: data.account, amount: data.amount },
        });
  }
}

export default new AccountService();

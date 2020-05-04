import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();
    const balance = transactions.reduce(
      (sum: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income': {
            sum.income += Number(transaction.value);
            sum.total += Number(transaction.value);
            break;
          }
          case 'outcome': {
            sum.outcome += Number(transaction.value);
            sum.total -= Number(transaction.value);
            break;
          }
          default:
            break;
        }
        return sum;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    return balance;
  }
}

export default TransactionsRepository;

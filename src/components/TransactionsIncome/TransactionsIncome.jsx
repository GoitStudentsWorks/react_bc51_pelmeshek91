import { TransactionDate } from 'components/Date/Date';
import { TransactionForm } from 'components/Form/Form';
import { TransactionsSummary } from 'components/Summary/Summary';
import TotalBalance from 'components/TotalBalance/TotalBalance';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { loginUserThunk } from 'redux/auth/authOperations';
import {
  addTransactionExpensesThunk,
  getTransactionsExpensesThunk,
  getUserInfoThunk,
  updateUserBalanceThunk,
} from 'redux/transcactions/transcactionsOperations';

// import { getTransactionsExpenses } from 'services/walletApi';

// import { loginUser } from 'services/walletApi';

const TransactionsIncome = () => {
  const dispatch = useDispatch();
  // const sid = useSelector(state => state.auth.sid);
  // const refresh = useSelector(state => state.auth.refreshToken);
  // const expenses = useSelector(state => state.transactions.expenses);
  const balance = useSelector(state => state.transactions.balance);
  console.log(balance);
  return (
    <>
      <TransactionsSummary />
      <TransactionForm />
      <TransactionDate />
      <div>
        <button onClick={() => dispatch(loginUserThunk())}>LOGIN</button>
        <button
          onClick={
            () => dispatch(getUserInfoThunk())
            // dispatch(getTransactionsExpensesThunk())
            // getUserInfo()
          }
        >
          GET
        </button>
        <button
          onClick={
            () =>
              // dispatch(refreshUserThunk({ sid, refresh }))
              // dispatch(
              //   addTransactionExpensesThunk({
              //     description: 'Expense description',
              //     amount: 100,
              //     date: '2020-12-31',
              //     category: 'Продукты',
              //   })
              // )
              dispatch(
                updateUserBalanceThunk({
                  newBalance: 999,
                })
              )
            // updateUserBalance({
            //   newBalance: 333,
            // })
          }
        >
          PUSH
        </button>
        <TotalBalance />
        <div>
          <NavLink to="/">EXPENSES</NavLink>
          <NavLink to="/transactions-income">INCOME</NavLink>
        </div>
        <h1>transactions</h1>
      </div>
    </>
  );
};

export default TransactionsIncome;

import Select from 'react-select';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CiCalculator1 } from 'react-icons/ci';
import {
  BtnContainer,
  ClearBtn,
  Container,
  Form,
  IconContainer,
  Input,
  InputBtn,
  InputNum,
  MainContainer,
} from './Form.styled';
import './form.css';
import {
  addTransactionExpensesThunk,
  addTransactionIncomesThunk,
} from 'redux/transcactions/transcactionsOperations';
import { incomes, expenses } from '../../utilits/category';
import { useParams } from 'react-router';
// import { TransactionDate } from 'components/Date/Date';

export const TransactionForm = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [transactionType] = useState('expenses');
  const formRef = useRef(null);
  const [startDate] = useState(new Date());
  const { expenses: key } = useParams();
  const dispatch = useDispatch();
  const currentDate = startDate.toISOString().split('T')[0];

  const handleFormSubmit = e => {
    e.preventDefault();
    const amount = e.target.elements.amount.value;
    const description = e.target.elements.description.value;
    const category = e.target.elements.category.value;

    if (key === 'expenses') {
      
      const payload = {
        description,
        amount: Number(amount),
        category,
        date: currentDate,
      };
      dispatch(addTransactionExpensesThunk(payload));
    } else {
      const payload = {
        description,
        amount: Number(amount),
        category,
        date: currentDate,
      };
     
      dispatch(addTransactionIncomesThunk(payload));
    }
   
    // виконуєм запит в залежності від типу
    // if (transactionType === 'expenses') {
    //   dispatch(addTransactionExpensesThunk(payload));
    // } else {
    //   dispatch(addTransactionIncomesThunk(payload));
    // }

    //   очистка форми
    formRef.current.reset();
    setSelectedOption(null);
  };

  return (
    <MainContainer>
      {/* <TransactionDate /> */}
      <div>
        <Form ref={formRef} onSubmit={handleFormSubmit}>
          <Input
            type="text"
            placeholder="Product description"
            required
            name="description"
          />
          <Select
            className="select-container"
            value={selectedOption}
            name="category"
            required
            placeholder="Product category"
            menuShouldBlockScroll={true}
            menuShouldScrollIntoView={false}
            classNamePrefix="select"
            onChange={option => setSelectedOption(option)}
            options={key === 'expenses' ? expenses : incomes}
          />
          <Container>
            <InputNum
              type="number"
              name="amount"
              placeholder="0.00"
              required
            ></InputNum>
            <IconContainer>
              <CiCalculator1 style={{ width: '20px', height: '20px' }} />
            </IconContainer>
          </Container>

          <BtnContainer>
            <InputBtn type="submit">Input</InputBtn>
            <ClearBtn type="reset">Clear</ClearBtn>
          </BtnContainer>
        </Form>
      </div>
    </MainContainer>
  );
};

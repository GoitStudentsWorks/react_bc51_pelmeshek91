import Select from 'react-select';
import { useRef, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { CiCalculator1 } from 'react-icons/ci';

// import { Formik } from 'formik';
// import * as yup from 'yup';
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

import { toast } from 'react-toastify';

// const validationSchema = yup.object().shape({
//   description: yup
//     .string()
//     .min(2, 'Too Short!')
//     .max(50, 'Too Long!')
//     .required('Required'),
//   amount: yup
//     .number()
//     .min(2, 'Too Short!')
//     .max(10, 'Too Long!')
//     .required('Required'),
// });

const initialState = { description: '', amount: '' };

export const TransactionForm = ({ currrentDate }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [form, setForm] = useState(initialState);
  const formRef = useRef(null);
  const { expenses: key } = useParams();
  const dispatch = useDispatch();

  const { balance, expenses: trans } = useSelector(state => state.transactions);

  const handleChange = ({ target: { name, value } }) => {
    setForm(prevForm => {
      return { ...prevForm, [name]: value };
    });
  };
  const handleChange1 = ({ target: { name, value } }) => {
    const regex = /^\d*.?\d{0,2}$/;
    if (regex.test(value)) {
      setForm(prevForm => {
        return { ...prevForm, [name]: value };
      });
    }
  };
  // const inputValue = e.target.value;
  // const regex = /^\d*.?\d{0,2}$/; // Regex pattern to allow up to 2 decimal places

  // if (regex.test(inputValue)) {
  //   setValue(inputValue);
  // }
  const handleFormSubmit = e => {
    e.preventDefault();

    const amount = e.target.elements.amount.value;

    const description = e.target.elements.description.value;
    const category = e.target.elements.category.value;
    if (!description) {
      toast.error('Please enter the description');
      return;
    } else if (!category) {
      toast.error('Please choose the category');
      return;
    } else if (!amount) {
      toast.error('Please enter the sum');
      return;
    }
    if (key === 'expenses') {
      const payload = {
        description,
        amount: Number(amount),
        category,
        date: currrentDate,
      };
      dispatch(addTransactionExpensesThunk(payload))
        .unwrap()
        .then(() => {})
        .catch(error => toast.error(error.message));
    } else {
      const payload = {
        description,
        amount: Number(amount),
        category,
        date: currrentDate,
      };

      dispatch(addTransactionIncomesThunk(payload))
        .unwrap()
        .then(() => {})
        .catch(error => toast.error(error.message));
    }

    setForm(initialState);
    setSelectedOption(null);
  };

  return (
    <>
      <MainContainer>
        <div>
          {/* <Formik
            ref={formRef}
            initialValues={{ description: '', amount: '' }}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => ( */}
          <Form noValidate ref={formRef} onSubmit={handleFormSubmit}>
            <label htmlFor="description">
              <Input
                type="text"
                placeholder="Product description"
                required
                name="description"
                value={form.description}
                onChange={handleChange}
                autoComplete="off"
              />
              {/* {errors.description && touched.description && (
                    <div>{errors.description}</div>
                  )} */}
            </label>
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
                value={form.amount}
                onChange={handleChange1}
                decimalScale={3}
                autoComplete="off"
              />

              <IconContainer>
                <CiCalculator1
                  style={{ width: '22px', height: '22px', fill: '#C7CCDC' }}
                />
              </IconContainer>
            </Container>

            <BtnContainer>
              <InputBtn type="submit" disabled={!balance && !trans.length}>
                Input
              </InputBtn>
              <ClearBtn type="reset" onClick={() => setForm(initialState)}>
                Clear
              </ClearBtn>
            </BtnContainer>
          </Form>
          {/* //   )}
          // </Formik> */}
        </div>
      </MainContainer>
    </>
  );
};

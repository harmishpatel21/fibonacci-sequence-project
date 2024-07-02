
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import App from '../App';

const mock = new MockAdapter(axios);

test('renders the input and button', () => {
  const { getByPlaceholderText, getByText } = render(<App />);
  expect(getByPlaceholderText('Enter a number')).toBeInTheDocument();
  expect(getByText('Get Fibonacci Sequence')).toBeInTheDocument();
});

test('fetches and displays the Fibonacci sequence', async () => {
  const { getByPlaceholderText, getByText, findByText } = render(<App />);
  mock.onPost('http://localhost:5000/fibonacci').reply(200, { sequence: [0, 1, 1, 2, 3] });

  fireEvent.change(getByPlaceholderText('Enter a number'), { target: { value: '5' } });
  fireEvent.click(getByText('Get Fibonacci Sequence'));

  await waitFor(() => expect(findByText('3')).toBeInTheDocument());
});

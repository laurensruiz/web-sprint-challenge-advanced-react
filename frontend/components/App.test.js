// Write your tests here
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AppClass from './AppClass'


test("sanity", () => {
  expect(true).toBe(true);
});
//1
test("renders without errors", () => {
  render(<AppClass />);
});

//2
test("renders header", () => {
  render(<AppClass />);
  const header = screen.queryByText(/coordinates/i)

  expect(header).toBeInTheDocument();
  expect(header).toBeTruthy();
  expect(header).toHaveTextContent(/coordinates/i)
});

//3
test("renders B", () => {
  render(<AppClass />);

  expect(screen.queryByText('B')).toBeInTheDocument();
  
});

//4
test("make sure right number of buttons appears", () => {
  render(<AppClass />);
  const button = screen.getAllByRole("button")

  expect(button).toHaveLength(6);
  
});

//5
test("renders reset text", () => {
  render(<AppClass />);

  expect(screen.queryByText('reset')).toBeInTheDocument();
  
});




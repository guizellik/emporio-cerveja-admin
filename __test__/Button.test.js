import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Button from '../components/Button'

const mockFunc = jest.fn()

it('should render Button', () => {
  const { getByText } = render(<Button backgroundColor='#fff'>Teste Button</Button>)
  expect(getByText('Teste Button')).toBeInTheDocument();
});

it('should render provided children', () => {
  const { getByText } = render(<Button backgroundColor='#fff'><span>children span</span></Button>)
  expect(getByText('children span')).toBeInTheDocument();
});

it('should work with provided onClick', () => {
  const { getByText } = render(<Button backgroundColor='#fff' onClick={mockFunc}>Texto</Button>)
  const testButton = getByText('Texto')
  fireEvent.click(testButton)
  expect(mockFunc).toHaveBeenCalledTimes(1)
});

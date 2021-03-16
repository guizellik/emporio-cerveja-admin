import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Card from '../components/Card'

it('should render Card', () => {
  const { getByText } = render(<Card title='Card Title'>Teste Card</Card>)
  expect(getByText('Teste Card')).toBeInTheDocument();
});

it('should render title', () => {
  const { getByText } = render(<Card title='card title' />)
  expect(getByText('card title')).toBeInTheDocument();
});

it('should render children', () => {
  const { getByText } = render(<Card title='card title'><p>Eu sou o children</p></Card>)
  expect(getByText('Eu sou o children')).toBeInTheDocument();
});
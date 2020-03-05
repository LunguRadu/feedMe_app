import React from 'react';
import { render } from '@testing-library/react';
import NoPage from './NoPage';

test('renders learn react link', () => {
  const { getByText } = render(<NoPage />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

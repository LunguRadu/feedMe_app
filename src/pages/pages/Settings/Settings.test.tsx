import React from 'react';
import { render } from '@testing-library/react';
import Settings from './Settings';

test('renders learn react link', () => {
  const { getByText } = render(<Settings />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

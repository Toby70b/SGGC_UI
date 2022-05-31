import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SearchPanelModal from './SearchPanelModal';

describe('<SearchPanelModal />', () => {
  test('it should mount', () => {
    render(<SearchPanelModal />);
    
    const searchPanelModal = screen.getByTestId('SearchPanelModal');

    expect(searchPanelModal).toBeInTheDocument();
  });
});
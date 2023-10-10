import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SearchBarSkeleton from '../SearchBarSkeleton';

describe('SearchBarSkeleton', () => {
  it('Renderiza bien el skeleton', () => {
    render(<SearchBarSkeleton />);
  });

  it('muestra el input skeleton', () => {
    const { container } = render(<SearchBarSkeleton />);
    const skeletonInput = container.querySelector('.search-bar-skeleton');
    expect(skeletonInput).toBeInTheDocument();
  });
});

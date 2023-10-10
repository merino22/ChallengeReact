import React from 'react';
import { render } from '@testing-library/react';
import SearchBarSkeleton from '../SearchBarSkeleton';

describe('Componente SearchBarSkeleton', () => {
  it('se renderiza sin errores', () => {
    // Renderiza el componente
    const { container } = render(<SearchBarSkeleton />);
    
    // Comprueba que el componente se haya renderizado
    expect(container).toBeInTheDocument();
  });

  it('renderiza el componente Skeleton', () => {
    // Renderiza el componente
    const { container } = render(<SearchBarSkeleton />);
    
    // Encuentra el elemento Skeleton dentro del componente
    const skeletonElement = container.querySelector('.react-loading-skeleton');
    
    // Comprueba que el elemento Skeleton se haya renderizado
    expect(skeletonElement).toBeInTheDocument();
  });

  it('aplica estilos al componente Skeleton', () => {
    // Renderiza el componente
    const { container } = render(<SearchBarSkeleton />);
    
    // Encuentra el elemento Skeleton dentro del componente
    const skeletonElement = container.querySelector('.react-loading-skeleton');
    
    // Comprueba que el elemento Skeleton tenga los estilos esperados
    expect(skeletonElement).toHaveStyle({ width: '150px' });
    expect(skeletonElement).toHaveStyle({ height: '30px' });
  });

  it('renderiza el div con la clase "search-bar-skeleton"', () => {
    // Renderiza el componente
    const { container } = render(<SearchBarSkeleton />);
    
    // Encuentra el div con la clase "search-bar-skeleton"
    const searchBarSkeletonDiv = container.querySelector('.search-bar-skeleton');
    
    // Comprueba que el div se haya renderizado
    expect(searchBarSkeletonDiv).toBeInTheDocument();
  });
});

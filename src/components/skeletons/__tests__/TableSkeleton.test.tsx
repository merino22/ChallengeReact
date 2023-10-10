import React from 'react';
import { render } from '@testing-library/react';
import TableSkeleton from '../TableSkeleton';

describe('Componente TableSkeleton', () => {
  it('se renderiza sin errores', () => {
    // Renderiza el componente
    const { container } = render(<TableSkeleton />);
    
    // Comprueba que el componente se haya renderizado
    expect(container).toBeInTheDocument();
  });

  it('renderiza una fila de tabla con la clase "table-row-skeleton"', () => {
    // Renderiza el componente
    const { container } = render(<TableSkeleton />);
    
    // Encuentra la fila de tabla con la clase "table-row-skeleton"
    const tableRowSkeleton = container.querySelector('.table-row-skeleton');
    
    // Comprueba que la fila de tabla se haya renderizado
    expect(tableRowSkeleton).toBeInTheDocument();
  });

  it('renderiza celdas con elementos Skeleton', () => {
    // Renderiza el componente
    const { container } = render(<TableSkeleton />);
    
    // Encuentra todas las celdas con elementos Skeleton
    const skeletonCells = container.querySelectorAll('.react-loading-skeleton');
    
    // Comprueba que todas las celdas se hayan renderizado
    expect(skeletonCells.length).toBe(6); // Debería haber 6 celdas en total
  });

  it('aplica estilos a las celdas con elementos Skeleton', () => {
    // Renderiza el componente
    const { container } = render(<TableSkeleton />);
    
    // Encuentra una celda con un elemento Skeleton circular
    const circleSkeletonCell = container.querySelector('.react-loading-skeleton.circle');
    
    // Encuentra una celda con un elemento Skeleton rectangular
    const rectSkeletonCell = container.querySelector('.react-loading-skeleton.rect');
    
    // Comprueba que las celdas tengan los estilos esperados
    expect(rectSkeletonCell).toHaveStyle({ width: '100px' });
    expect(rectSkeletonCell).toHaveStyle({ height: '30px' });

    expect(circleSkeletonCell).toHaveStyle({ width: '30px' });
    expect(circleSkeletonCell).toHaveStyle({ height: '30px' });
  });
});
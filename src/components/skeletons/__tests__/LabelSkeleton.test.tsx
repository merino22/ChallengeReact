import React from 'react';
import { render } from '@testing-library/react';
import LabelSkeleton from '../LabelSkeleton';

describe('Componente LabelSkeleton', () => {
  it('se renderiza sin errores', () => {
    const { container } = render(<LabelSkeleton />);
    expect(container).toBeInTheDocument();
  });

  it('renderiza el componente Skeleton', () => {
    const { container } = render(<LabelSkeleton />);
    const skeletonElement = container.querySelector('.react-loading-skeleton');
    expect(skeletonElement).toBeInTheDocument();
  });

  it('aplica estilos personalizados al componente Skeleton', () => {
    const { container } = render(<LabelSkeleton />);
    const skeletonElement = container.querySelector('.react-loading-skeleton');
    expect(skeletonElement).toHaveStyle({ float: 'left' });
    expect(skeletonElement).toHaveStyle({ width: '100px' }); // Ajusta el ancho esperado según tus necesidades
    expect(skeletonElement).toHaveStyle({ height: '30px' }); // Ajusta la altura esperada según tus necesidades
  });

  it('aplica relleno al componente Skeleton', () => {
    const { container } = render(<LabelSkeleton />);
    const divElement = container.querySelector('div');
    expect(divElement).toHaveStyle({ paddingLeft: '0.3rem' });
  });
});
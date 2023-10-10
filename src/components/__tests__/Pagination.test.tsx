import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Pagination from '../Pagination';

describe('Pagination Component', () => {
  it('renders pagination correctly', () => {
    const onPageChangeMock = jest.fn();
    const onItemsPerPageChangeMock = jest.fn();
    const totalResults = 50;
    const totalPages = Math.ceil(totalResults / 10);

    const { getByText, getByTestId } = render(
      <Pagination
        currentPage={1}
        totalPages={totalPages}
        onPageChange={onPageChangeMock}
        itemsPerPage={10}
        onItemsPerPageChange={onItemsPerPageChangeMock}
        totalResults={totalResults}
      />
    );

    // Probar que label con resultados se muestre
    expect(getByText(`${totalResults} Resultados`)).toBeInTheDocument();

    // Probar que productos por pagina se este mostrando
    const itemsPerPageSelect = getByTestId('itemsPerPageSelect');
    expect(itemsPerPageSelect).toBeInTheDocument();

    // Probar que los botones para cambiar de paginas se muestren
    const prevPageButton = getByText('<');
    const nextPageButton = getByText('>');
    expect(prevPageButton).toBeInTheDocument();
    expect(nextPageButton).toBeInTheDocument();
  });

  it('Llama a onPageChange cuando se hacen clic en los botones anterior y siguiente', () => {
    const onPageChangeMock = jest.fn();
    const onItemsPerPageChangeMock = jest.fn();

    const { getByText } = render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={onPageChangeMock}
        itemsPerPage={10}
        onItemsPerPageChange={onItemsPerPageChangeMock}
        totalResults={50}
      />
    );

    const prevPageButton = getByText('<');
    const nextPageButton = getByText('>');
    
    fireEvent.click(prevPageButton);
    fireEvent.click(nextPageButton);

    expect(onPageChangeMock).toHaveBeenCalledWith(1);
    expect(onPageChangeMock).toHaveBeenCalledWith(3);
  });

  it('Llama a onItemsPerPageChange cuando se cambian los elementos por página', () => {
    const onPageChangeMock = jest.fn();
    const onItemsPerPageChangeMock = jest.fn();

    const { getByTestId } = render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={onPageChangeMock}
        itemsPerPage={10}
        onItemsPerPageChange={onItemsPerPageChangeMock}
        totalResults={50}
      />
    );

    const itemsPerPageSelect = getByTestId('itemsPerPageSelect');
    
    fireEvent.change(itemsPerPageSelect, { target: { value: '20' } });

    expect(onItemsPerPageChangeMock).toHaveBeenCalledWith(20);
  });

  it('Desactiva correctamente los botones anterior y siguiente', () => {
    const onPageChangeMock = jest.fn();
    const onItemsPerPageChangeMock = jest.fn();

    const { getByText } = render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={onPageChangeMock}
        itemsPerPage={10}
        onItemsPerPageChange={onItemsPerPageChangeMock}
        totalResults={50}
      />
    );

    const prevPageButton = getByText('<');
    const nextPageButton = getByText('>');
    
    expect(prevPageButton).toBeDisabled();
    expect(nextPageButton).not.toBeDisabled();
  });
});

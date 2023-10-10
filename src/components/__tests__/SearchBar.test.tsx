import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SearchBar from "../SearchBar";

// Mock de la función onSearch
const mockOnSearch = jest.fn();

describe('Componente SearchBar', () => {
    it('Llama a la función onSearch cuando se cambia el valor del input', () => {
        const { getByPlaceholderText } = render(<SearchBar onSearch={mockOnSearch} />);
        const input = getByPlaceholderText('Buscar...');

        // Simula un cambio en el valor del input
        fireEvent.change(input, { target: { value: 'nuevo-valor' } });

        // Verifica que la función onSearch fue llamada con el nuevo valor
        expect(mockOnSearch).toHaveBeenCalledWith('nuevo-valor');
    });
});

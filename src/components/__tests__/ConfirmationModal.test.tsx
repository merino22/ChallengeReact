import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { deleteProduct } from "../../services/pichinchaService";
import ConfirmationModal from "../ConfirmationModal";
import { wait } from "@testing-library/user-event/dist/utils";

// Mockeo de la funcion deleteProduct
jest.mock('../../services/pichinchaService', () => ({
    deleteProduct: jest.fn()
}));

describe('Componente ConfirmationModal', () => { 
    it('Muestra el modal cuando isOpen es true', () => {
        const onClose = jest.fn();
        const content = { id: 1, name: 'Producto de Prueba Eliminar'};
        
        const { getByText } = render(
            <ConfirmationModal isOpen={true} onClose={onClose} content={content}/>
        );

        // Verificar que el modal es visible en el DOm
        const modal = getByText(`Estas seguro de eliminar el producto ${content.name}?`);
        expect(modal).toBeInTheDocument();

    });

    it('Llama a la funcion deleteProduct al hacer click en confirmar', async () => {
        const onClose = jest.fn();
        const content = { id: 1, name: 'Producto de prueba eliminar'};

        const { getByText } = render(
            <ConfirmationModal isOpen={true} onClose={onClose} content={content}/>
        );

        // Simular un click en el boton de confirmar
        const confirmButton = getByText('Confirmar');
        fireEvent.click(confirmButton);

        // Esperar a que se llama la funcion deleteProduct
        await waitFor(() => {
            expect(deleteProduct).toHaveBeenCalledWith(content.id);
        });
    });

    it('Cierra el modal al hacer click en boton Cancelar', () => {
        const onClose = jest.fn();
        const content = { id: 1, name: 'Producto prueba eliminar'};
        
        const { getByText } = render(
            <ConfirmationModal isOpen={true} onClose={onClose} content={content}/>
        );

        // Simular hacer click en boton de Cancelar
        const cancelButton = getByText('Cancelar');
        fireEvent.click(cancelButton);

        // Probar y verificar que la funcion onClose fue llamada
        expect(onClose).toHaveBeenCalled();
    })
})
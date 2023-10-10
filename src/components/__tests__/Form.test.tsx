import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Form from "../Form";
import exp from "constants";

// Mock para la funcion onSubmit
const onSubmitMock = jest.fn();

const env = process.env.REACT_APP_NODE_ENV;

describe('Componente Form', () => {
    it('Renderiza el formulario correctamente', () => {
        const productData  = {
            id: '',
            name: '',
            description: '',
            logo: '',
            date_release: new Date().toISOString().split('T')[0],
            date_revision: new Date().toISOString().split('T')[0]
        };

        const { getByLabelText, getByText, getByPlaceholderText, getByTestId } = render(
            <Form onSubmit={onSubmitMock} productData={productData} checked={false}/>
        );

        // Verificar que los elementos del formulario estan presentes
        expect(getByLabelText('ID')).toBeInTheDocument();
        expect(getByLabelText('Nombre')).toBeInTheDocument();
        expect(getByLabelText('Descripcion')).toBeInTheDocument();
        expect(getByLabelText('Logo')).toBeInTheDocument();
        expect(getByLabelText('Fecha Liberacion')).toBeInTheDocument();
        expect(getByLabelText('Fecha Revision')).toBeInTheDocument();

        expect(getByText('Reiniciar')).toBeInTheDocument();
        expect(getByText('Enviar')).toBeInTheDocument();
    });

    it('Maneja cambios en los campos del formulario', () => {
        const productData  = {
            id: '',
            name: '',
            description: '',
            logo: '',
            date_release: new Date().toISOString().split('T')[0],
            date_revision: new Date().toISOString().split('T')[0]
        };

        const { getByLabelText } = render(
          <Form onSubmit={onSubmitMock} productData={productData} checked={false}/>  
        );

        // Cambiar el valor del campo ID
        const idInput = getByLabelText('ID') as HTMLInputElement;
        fireEvent.change(idInput, { target: { name: 'id', value: 'test-123'} });
        expect(idInput.value).toBe('test-123');

        // Cambiar el valor del campo Nombre
        const nameInput = getByLabelText('Nombre') as HTMLInputElement;
        fireEvent.change(nameInput, { target: { name: 'name', value: 'Test Nombre'} });
        expect(nameInput.value).toBe('Test Nombre');

        // Cambiar el valor del campo Descripcion
        const descInput = getByLabelText('Descripcion') as HTMLInputElement;
        fireEvent.change(descInput, { target: { name: 'description', value: 'Test Descripcion'} });
        expect(descInput.value).toBe('Test Descripcion');

        // Cambiar el valor del campo Logo
        const logoInput = getByLabelText('Logo') as HTMLInputElement;
        fireEvent.change(logoInput, { target: { name: 'logo', value: 'logo-de-prueba.jpg'} });
        expect(logoInput.value).toBe('logo-de-prueba.jpg');

        // Cambiar el valor del campo Fecha Liberacion
        const releaseDateInput = getByLabelText('Fecha Liberacion') as HTMLInputElement;
        const dateTest = new Date().toISOString().split('T')[0];
        fireEvent.change(releaseDateInput, { target: { name: 'release_date', value: dateTest} });
        expect(releaseDateInput.value).toBe(dateTest);

        // Cambiar el valor del campo Fecha Revision
        const revisionDateInput = getByLabelText('Fecha Revision') as HTMLInputElement;
        const dateTestRev = new Date().toISOString().split('T')[0];
        fireEvent.change(revisionDateInput, { target: { name: 'revision_date', value: dateTestRev} });
        expect(revisionDateInput.value).toBe(dateTestRev);
    });

    it('Maneja el envio del formulario', async () => {
        const productData  = {
            id: '',
            name: '',
            description: '',
            logo: '',
            date_release: new Date().toISOString().split('T')[0],
            date_revision: new Date().toISOString().split('T')[0]
        };

        const { getByText, getByLabelText } = render(
            <Form onSubmit={onSubmitMock} productData={productData} checked={false}/>
        );

        // Simular cambios en los campos del formulario
        const idInput = getByLabelText('ID') as HTMLInputElement;
        fireEvent.change(idInput, { target: { name: 'id', value: 'test-777' } });

        const nameInput = getByLabelText('Nombre') as HTMLInputElement;
        fireEvent.change(nameInput, { target: { name: 'name', value: 'Producto de prueba' } });

        const descInput = getByLabelText('Descripcion') as HTMLInputElement;
        fireEvent.change(descInput, { target: { name: 'description', value: 'Descripcion Prueba'} });

        const logoInput = getByLabelText('Logo') as HTMLInputElement;
        fireEvent.change(logoInput, { target: { name: 'logo', value: 'logo-de-prueba.jpg'} });

        const releaseDateInput = getByLabelText('Fecha Liberacion') as HTMLInputElement;
        const dateTest = new Date().toISOString().split('T')[0];
        fireEvent.change(releaseDateInput, { target: { name: 'release_date', value: dateTest} });

        const revisionDateInput = getByLabelText('Fecha Revision') as HTMLInputElement;
        const dateTestRev = new Date().toISOString().split('T')[0];
        fireEvent.change(revisionDateInput, { target: { name: 'revision_date', value: dateTestRev} });

        // Simular envío del formulario
        const submitButton = getByText('Enviar');
        fireEvent.click(submitButton);

        // Esperar a que se llame a la funcion onSubmit
        await waitFor(() => {
            expect(onSubmitMock).toHaveBeenCalledWith({
                id: 'test-777',
                name: 'Producto de prueba',
                description: 'Descripcion Prueba',
                logo: 'logo-de-prueba.jpg',
                date_release: new Date().toISOString().split('T')[0],
                date_revision: new Date().toISOString().split('T')[0],
            });
        });
    });
});
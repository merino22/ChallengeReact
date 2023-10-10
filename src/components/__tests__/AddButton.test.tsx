import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AddButton from '../AddButton';

describe('Componente AddButton', () => {
    it('Renderiza un element de tipo Link con el contenido provisionado', () => {
        const to = '/agregar';
        const content = 'Agregar Producto Test';

        // Render del component AddButton dentro del component Router
        const { getByText } = render(
            <Router>
                <AddButton to={to} content={content}/>
            </Router>
        );

        // Encuentra el elemento Link por su contenido
        const linkElement = getByText(content);

        // Prueba para asegurar que el elemento Link tenga el atributo "to" y el contenido "content"
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', to);
        expect(linkElement.textContent).toBe(content);
    });

    it('Aplica classNames adicionales en caso de ser brindados al component', () => {
        const to = '/agregar';
        const content = 'Agregar Product con className Test';
        const className = 'grey-bg';

        // Render del component AddButton dentro del Router con un className adicional
        const {container} = render(
            <Router>
                <AddButton to={to} content={content} className={className}/>
            </Router>
        );

        // Encuentra el elemento Link por su className
        const linkElement = container.querySelector('.grey-bg');

        // Prueba para asegurar que el elemento Link tenga un className
        expect(linkElement).toBeInTheDocument();
    })
})
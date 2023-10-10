import React, { useState } from 'react';
import Form from '../components/Form';
import Banner from '../components/Banner';

interface EditProductProps {
    onSubmit: (newProduct: any) => void;
}

const EditProduct: React.FC<EditProductProps> = ({ 
        onSubmit
    }) => {

    const deserializeProduct = () => {
        try {
            const serializedProduct = localStorage.getItem('itemToEdit');
            if (serializedProduct !== null) {
                return JSON.parse(serializedProduct);
            }
        } catch (error) {
            console.log('Error al editar producto: ', error);
        }
    }

    const retrievedProduct = deserializeProduct();

    function formatDate(inputDate: string): string {
        const date = new Date(inputDate);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate() + 1).padStart(2, '0');
        const year = String(date.getFullYear());

        return `${year}-${month}-${day}`;
    }

    const [productData] = useState<any>({
        id: retrievedProduct.id,
        name: retrievedProduct.name,
        description: retrievedProduct.description,
        logo: retrievedProduct.logo,
        date_release: formatDate(retrievedProduct.date_release),
        date_revision: formatDate(retrievedProduct.date_revision)
    });

    return (
        <div>
            <Banner/>
            <Form onSubmit={onSubmit} productData={productData} checked={true}/>
        </div>
    )
}

export default EditProduct;
import React, { useState } from 'react';
import Form from '../components/Form';
import Banner from '../components/Banner';

interface CreateProductProps {
    onSubmit: (newProduct: any) => void;
}

const CreateProduct: React.FC<CreateProductProps> = ({ 
        onSubmit
    }) => {

    const [productData] = useState<any>({
        id: '',
        name: '',
        description: '',
        logo: '',
        date_release: new Date(),
        date_revision: new Date()
    });

    return (
        <div>
            <Banner/>
            <Form onSubmit={onSubmit} productData={productData} checked={false}/>
        </div>
    )
}

export default CreateProduct;
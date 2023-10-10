import React, { useState, useEffect } from 'react';
import InputSkeleton from './skeletons/InputSkeleton';
import LabelSkeleton from './skeletons/LabelSkeleton';
import { useHistory } from 'react-router-dom';

interface FormProps {
    onSubmit: (newProduct: any) => void;
    productData: {
        id: string,
        name: string,
        description: string,
        logo: string,
        date_release: string,
        date_revision: string
    };
    checked: boolean,
}

const Form: React.FC<FormProps> = ({ onSubmit, productData, checked }) => {

    const env = process.env.REACT_APP_NODE_ENV;

    const [newProductData, setNewProductData] = useState<any>(productData);
    const [checkError, setCheckError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(env === 'test' ? false : true);
    const [validationErrors, setValidationErrors] = useState({
        id: '',
        name: '',
        description: '',
        logo: '',
        date_release: '',
        date_revision: ''
    });

    const currentDateRelease = new Date(productData.date_release);
    const currenDateRevision = new Date(productData.date_revision);
    currenDateRevision.setFullYear(currentDateRelease.getFullYear() + 1);
    const formattedReleaseDate = currentDateRelease.toISOString().split('T')[0];

    const [formattedRevisionDate, setFormattedRevisionDate] = useState<string>(currenDateRevision.toISOString().split('T')[0])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewProductData((prevData: any) => ({
            ...prevData,
            [name]: value
        }));

        let minChars = 0, maxChars = 0;

        if (name === 'id') {
            minChars = 3;
            maxChars = 10;
        }

        if (name === 'name') {
            minChars = 5;
            maxChars = 100;
        }

        if (name === 'description') {
            minChars = 10;
            maxChars = 200;
        }

        if (name === 'date_release') {
            const updatedDate = new Date(value);
            updatedDate.setFullYear(updatedDate.getFullYear() + 1);
            setFormattedRevisionDate(updatedDate.toISOString().split('T')[0])
        }

        if (name === 'id' || name === 'name' || name === 'description') {
            if (value.length < minChars) {
                setValidationErrors({...validationErrors, [name]:`Minimo de ${minChars} caracteres`});
                setCheckError(true);
            } else if (value.length > maxChars) {
                setValidationErrors({...validationErrors, [name]: `Maximo de ${maxChars} caracteres`});
                setCheckError(true);
            } else {
                setValidationErrors({...validationErrors, [name]: ''});
                setCheckError(false);
            }
        }
    };

    const handleOnInputFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        let displayName = '';
        
        if (name === 'id') {
            displayName = 'ID';
        }

        if (name === 'name') {
            displayName = 'Nombre';
        }

        if (name === 'description') {
            displayName = 'Descripcion';
        }

        if (name === 'date_release') {
            displayName = 'Fecha de Liberacion';
        }

        if (name === 'date_revision') {
            displayName = 'Fecha de Revision';
        }

        
        if (value.length === 0) {
            setValidationErrors({...validationErrors, [name]: `${displayName} es un campo requerido`});
            setCheckError(true);
        } else {
            setValidationErrors({...validationErrors, [name]: ''});
            setCheckError(false);
        }
    }

    const handleOnInputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        let displayName = '';

        if (name === 'logo') {
            displayName = 'Logo';
        }

        if (value.length === 0) {
            setValidationErrors({...validationErrors, [name]: `${displayName} es requerido`});
            setCheckError(true);
        } else {
            setValidationErrors({...validationErrors, [name]: ''});
            setCheckError(false);
        }
    }

    const history = useHistory();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(newProductData);
        
        if (env === 'development')
            history.push('/');

        setNewProductData({
            id: '',
            name: '',
            description: '',
            logo: '',
            date_release: '',
            date_revision: ''
        })
    };

    const handleReset = (e: React.FormEvent) => {
        e.preventDefault();

        if (checked) {
            setNewProductData({
                ...newProductData,
                name: '',
                description: '',
                logo: '',
                date_release: '',
                date_revision: ''
            })
        } else {
            setNewProductData({
                id: '',
                name: '',
                description: '',
                logo: '',
                date_release: '',
                date_revision: ''
            })
        }
    }

    const formStyle: React.CSSProperties = {
        display: 'grid',
        gridTemplateColumns: '1',
        maxWidth: '100vw',
        marginBlock: '0 auto',
        paddingBottom: '2rem'
    }

    const inputStyle: React.CSSProperties = {
        height: '2rem',
        marginInline: '0.3rem',
    }

    const inputLabelStyle: React.CSSProperties = {
        textAlign: 'left',
        fontWeight: 'bold',
        marginInline: '0.3rem',
        paddingBottom: '0.5rem',
    }

    const errorLabelStyle: React.CSSProperties = {
        textAlign: 'left',
        color: 'red',
        paddingLeft: '0.5rem'
    }

    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
            setLoading(false);
        }, 1500); // Simular carga
    
          return () => {
            clearTimeout(loadingTimeout);

          };
      }, []);

    return (
        <div className='form-wrapper'>
                <form onSubmit={handleSubmit} style={formStyle} className='form-container white-bg'>
                    <div>
                        <h1>Formulario de Registro</h1>
                        <hr />
                    </div>
                    <div className='flex form-row justify-evenly'>
                        <div className='flex flex-col input-container'>
                            {loading ? (
                                <>
                                    <LabelSkeleton/>
                                    <InputSkeleton/>
                                </>
                            ) : (
                                <>
                                    <label style={inputLabelStyle} htmlFor='id'>ID</label>
                                    <input 
                                    type="text" 
                                    name="id" 
                                    id="id" 
                                    value={newProductData.id}
                                    onChange={handleInputChange}
                                    onFocus={handleOnInputFocus}
                                    style={inputStyle}
                                    className={validationErrors.id ? 'error-outline' : ''}
                                    disabled={checked}
                                    required
                                    />
                                </>
                            )}
                            {validationErrors && <label style={errorLabelStyle}>{validationErrors.id}</label>}
                        </div>
                        <div className='flex flex-col input-container'>
                            {loading ? (
                                <>
                                    <LabelSkeleton/>
                                    <InputSkeleton/>
                                </>
                            ) : (
                                <>
                                    <label style={inputLabelStyle} htmlFor='name'>Nombre</label>
                                    <input 
                                    type="text" 
                                    name="name" 
                                    id="name" 
                                    value={newProductData.name}
                                    onChange={handleInputChange}
                                    onFocus={handleOnInputFocus}
                                    style={inputStyle}
                                    className={validationErrors.name ? 'error-outline' : ''}
                                    required
                                    />
                                </>
                            )}
                            {validationErrors && <label style={errorLabelStyle}>{validationErrors.name}</label>}
                        </div>
                    </div>
                    <div className='flex form-row justify-evenly'>
                        <div className='flex flex-col input-container'>
                            {loading ? (
                                <>
                                    <LabelSkeleton/>
                                    <InputSkeleton/>
                                </>
                            ) : (
                                <>
                                    <label style={inputLabelStyle} htmlFor='description'>Descripcion</label>
                                    <input 
                                    type="text" 
                                    name="description" 
                                    id="description" 
                                    value={newProductData.description}
                                    onChange={handleInputChange}
                                    onFocus={handleOnInputFocus}
                                    style={inputStyle}
                                    className={validationErrors.description ? 'error-outline' : ''}
                                    required
                                    />
                                </>
                            )}
                            {validationErrors && <label style={errorLabelStyle}>{validationErrors.description}</label>}
                        </div>
                        <div className='flex flex-col input-container'>
                            {loading ? (
                                <>
                                    <LabelSkeleton/>
                                    <InputSkeleton/>
                                </>
                            ) : (
                                <>
                                    <label style={inputLabelStyle} htmlFor='logo'>Logo</label>
                                    <input 
                                    type="text" 
                                    name="logo" 
                                    id="logo" 
                                    value={newProductData.logo}
                                    onChange={handleInputChange}
                                    onBlur={handleOnInputBlur}
                                    style={inputStyle}
                                    className={validationErrors.logo ? 'error-outline' : ''}
                                    required
                                    />
                                </>
                            )}
                            {validationErrors && <label style={errorLabelStyle}>{validationErrors.logo}</label>}
                        </div>
                    </div>
                    <div className="flex form-row justify-between">
                        <div className='flex flex-col input-container'>
                            {loading ? (
                                <>
                                    <LabelSkeleton/>
                                    <InputSkeleton/>
                                </>
                            ) : (
                                <>
                                    <label style={inputLabelStyle} htmlFor='date_release'>Fecha Liberacion</label>
                                    <input 
                                    type="date" 
                                    name="date_release" 
                                    id="date_release" 
                                    value={newProductData.date_release}
                                    onChange={handleInputChange}
                                    onFocus={handleOnInputFocus}
                                    style={inputStyle}
                                    min={formattedReleaseDate}
                                    className={validationErrors.date_release ? 'error-outline' : ''}
                                    required
                                    />
                                </>
                            )}
                            {validationErrors && <label style={errorLabelStyle}>{validationErrors.date_release}</label>}
                        </div>
                        <div className='flex flex-col input-container'>
                            {loading ? (
                                <>
                                    <LabelSkeleton/>
                                    <InputSkeleton/>
                                </>
                            ) : (
                                <>
                                    <label style={inputLabelStyle} htmlFor='date_revision'>Fecha Revision</label>
                                    <input 
                                    type="date" 
                                    name="date_revision" 
                                    id="date_revision" 
                                    value={newProductData.date_revision}
                                    onChange={handleInputChange}
                                    onFocus={handleOnInputFocus}
                                    style={inputStyle}
                                    min={formattedRevisionDate}
                                    className={validationErrors.date_revision ? 'error-outline' : ''}
                                    required
                                    />
                                </>
                            )}
                            {validationErrors && <label style={errorLabelStyle}>{validationErrors.date_revision}</label>}
                        </div>
                    </div>
                    <div className='flex form-row justify-evenly button-container'>
                        <div className='button-flex'>
                            <button className='button button-full btn-width-7 grey-bg' onClick={handleReset}>Reiniciar</button>
                        </div>
                        <div className='button-flex'>
                            <button 
                            className='button button-full btn-width-7 yellow-bg' 
                            type='submit'
                            disabled={checkError}>Enviar</button>
                        </div>
                    </div>
                </form>
            </div>
    )
}

export default Form;
import React from "react";
import { deleteProduct } from "../services/pichinchaService";

interface ConfirmationModalProps {
    isOpen: boolean;
    content: any;
    onClose: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, content }) => {

    const modalStyle: React.CSSProperties = {
        display: isOpen ? 'block' : 'none',
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
        minWidth: '30rem',
      };
    
      const modalContentStyle: React.CSSProperties = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        height: '10rem',
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
        zIndex: 1001,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      };

      const buttonsContainerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
      };

      const handleDelete = async () => {
        try {
          const response = await deleteProduct(content.id);
          console.log('Producto fue eliminado', response);
          window.location.reload();
          return response;
        } catch (error) {
          console.log('Error: ', error);
        }
      }

      return (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            Estas seguro de eliminar el producto {content.name}?

            <div style={buttonsContainerStyle}>
                <button onClick={onClose} className="button button-full grey-bg" style={{marginRight: '0.5rem'}}>Cancelar</button>
                <button onClick={handleDelete} className="button button-full yellow-bg" style={{marginLeft: '0.5rem'}}>Confirmar</button>
            </div>
          </div>
        </div>
      );
}

export default ConfirmationModal;
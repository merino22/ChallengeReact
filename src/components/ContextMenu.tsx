import React, { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

interface ContextMenuProps {
  product: {
    id: string,
    name: string,
    description: string,
    logo: string,
    date_release: string,
    date_revision: string
  }
}

const ContextMenu: React.FC<ContextMenuProps> = ({product}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
      }
    
      const closeModal = () => {
        setIsModalOpen(false);
      }

    const serializeProduct = () => {
      try {
        const serializedProduct = JSON.stringify(product);
        localStorage.setItem('itemToEdit', serializedProduct)
      } catch (error) {
        console.log('Error while trying to edit product: ', error);
      }
    }

    return (
        <div className="dropdown-container" tabIndex={-1}>
            <div className="three-dots"></div>
            <div className="dropdown">
            <a href="/editar" onClick={serializeProduct}><div>Editar</div></a>
            <a onClick={openModal}><div>Eliminar</div></a>
            <ConfirmationModal isOpen={isModalOpen} onClose={closeModal} content={product} data-testid="confirmation-modal"/>
            </div>
        </div>
    );
}

export default ContextMenu;
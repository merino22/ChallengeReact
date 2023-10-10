import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  totalResults: number;
}

const Pagination: React.FC<PaginationProps> = ({ 
    currentPage, totalPages, onPageChange, itemsPerPage, onItemsPerPageChange, totalResults
    }) => {
  return (
    <nav style={{paddingTop: '1.5rem'}} className='align-bottom w-full'>
      <div className='pagination-container'>
            <label style={{fontWeight: '500'}}>{totalResults} Resultados</label>
            <select 
             value={itemsPerPage}
             onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
             data-testid="itemsPerPageSelect"
            >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
            </select>
            <div>
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className='pag-btn'
                >
                  &lt;
              </button>
              <span style={{paddingInline: '0.5rem'}}>Pagina {currentPage} de {totalPages}</span>
              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className='pag-btn'
              >
                &gt;
              </button>
            </div>
      </div>
    </nav>
  );
};

export default Pagination;

import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import AddButton from '../components/AddButton';
import { fetchProducts } from '../services/pichinchaService';
import dateFormatter from '../utilities/DateFormatter';
import ContextMenu from '../components/ContextMenu';
import Banner from '../components/Banner';
import TableSkeleton from '../components/skeletons/TableSkeleton';
import SearchBarSkeleton from '../components/skeletons/SearchBarSkeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProductList: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState<any[]>(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [content, setContent] = useState('');

  const updateScreenSize = () => {
    const width = window.innerWidth;

    if (width <= 500) {
      setContent('+');
    } else {
      setContent('Agregar');
    }
  };

  useEffect(() => {

    const loadingTimeout = setTimeout(() => {
      fetchProducts()
      .then((response) => {
        const fetchedData = response.data;
        setData(fetchedData);
        setFilteredData(fetchedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
    }, 2000); // Simular carga

      updateScreenSize();

      window.addEventListener('resize', updateScreenSize);

      return () => {
        clearTimeout(loadingTimeout);
        window.removeEventListener('resize', updateScreenSize);
      };
  }, []);

  const handleSearch = (query:string) => {
    const filteredData = data.filter((item:any) => {
      return item.name.toLowerCase().includes(query.toLowerCase());
    });     

    setFilteredData(filteredData);
    setCurrentPage(1);
  };

  const totalPages = filteredData ? Math.ceil(filteredData.length / itemsPerPage): 0;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = filteredData ? filteredData.slice(startIndex, endIndex): [];
  const totalResults = itemsToDisplay.length;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  }

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  }

  return (
    <div className='container grey-bg'>
      <Banner className='white-bg neg-padding-inline'/>
      {loading ? (
        <>
        <div className='flex-container' style={{ paddingBottom: '1rem' }}>
          <SearchBarSkeleton />
          <AddButton to='/agregar' content={content} className='yellow-bg button font-size-lg' />
        </div>
        <div className='table-container white-bg'>
          <table>
            <thead>
              <tr>
                <th>Logo</th>
                <th>Nombre del Producto</th>
                <th>Descripcion</th>
                <th>Fecha de Liberacion</th>
                <th>Fecha de Revision</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableSkeleton key={index} />
              ))}
            </tbody>
          </table>
        </div>
      </>
      ) : (
        <div>
          <div className='flex-container' style={{paddingBottom: '1rem'}}>
            <SearchBar onSearch={handleSearch}/>
            <AddButton to='/agregar' content={content} className='yellow-bg button font-size-lg'/>
          </div>
          <div className='table-container white-bg'>
            <table>
              <thead>
                <tr>
                  <th>Logo</th>
                  <th>Nombre del Producto</th>
                  <th>Descripcion</th>
                  <th>Fecha de Liberacion</th>
                  <th>Fecha de Revision</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {itemsToDisplay.map((item: any) => (
                    <tr key={item.id}>
                      <td><img src={item.logo} alt="logo" style={{maxHeight: '3rem', maxWidth: '5rem'}}/></td>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>{dateFormatter(item.date_release)}</td>
                      <td>{dateFormatter(item.date_revision)}</td>
                      <td><ContextMenu product={item}/></td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
              totalResults={totalResults}
              onItemsPerPageChange={handleItemsPerPageChange}
            />         
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;

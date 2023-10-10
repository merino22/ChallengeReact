import React from 'react';
import './App.css';
import ProductList from './views/ProductList';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createProduct, updateProduct } from './services/pichinchaService';
import EditProduct from './views/EditProduct';
import CreateProduct from './views/CreateProduct';

function App() {

  const handleNewProductSubmit = (newProduct: any) => {

    createProduct(newProduct)
      .then((response) => {
        console.log('Producto creado: ', response);
      })
      .catch((error) => {
        console.error('Error al crear nuevo producto:', error);
      });
  };

  const handleProductEdit = (product: any) => {
    updateProduct(product)
    .then((response) => {
      console.log('Producto actaulizado: ', response);
    })
    .catch((error) => {
      console.error('Error al actualizar producto:', error);
    });
  }

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <ProductList />
          </Route>
          <Route path="/agregar">
            <CreateProduct onSubmit={handleNewProductSubmit}/>
          </Route>
          <Route path="/editar">
            <EditProduct onSubmit={handleProductEdit}/>
          </Route>
        </Switch>
        
      </div>
    </Router>
  );
}

export default App;

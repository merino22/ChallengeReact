import axios from "axios";

const authorId = process.env.REACT_APP_AUTHOR_ID;
const apiBaseURL = process.env.REACT_APP_API_BASE_URL;
const config = {
    headers: {
      'authorId': authorId,
    },
};

export const fetchProducts = () => {
    return axios.get(`${apiBaseURL}/products`, config);
};

export const checkID = (checkID: string) => {
  return axios.get(`${apiBaseURL}/products/verification?id=${checkID}`, config);
}

export const createProduct = (newProduct: any) => {

    // Chequear si ID ya existe
    return checkID(newProduct.id)
      .then((idExists) => {
        if(idExists.data) {
          console.error('Este ID ya existe: ', newProduct.id);
          return Promise.reject('ID ya existe');
        }

        // ID es valido
        return axios.post(`${apiBaseURL}/products`, newProduct, config)
          .then((response) => {
            console.log('Se creo un nuevo producto: ', newProduct);
            return response.data;
          })
          .catch((error) => {
            console.error('Error al intentar crear producto: ', error);
            return Promise.reject('Error al crear producto');
          })
      })
      .catch((error) => {
        console.error('Error al chequear ID: ', error);
        return Promise.reject('Error al chequear ID');
      })
};

export const updateProduct = (updatedProduct: any) => {
    return new Promise((resolve, reject) => {
      axios
        .put(`${apiBaseURL}/products`, updatedProduct, config)
        .then((response) => {
          console.log('Product actualizado: ', updatedProduct);
          resolve(response.data);
        })
        .catch((error) => {
          console.error('Error al actualizar producto:', error);
          reject(error);
        });
    });
  };

export const deleteProduct = (productId: string) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${apiBaseURL}/products?id=${productId}`, config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
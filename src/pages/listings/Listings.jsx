import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/config';
import { onValue, ref } from 'firebase/database';

function Listings() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);
  
  // fetch products from firebase
  const fetchProducts = () => {;
    const productsRef = ref(db, 'products');

    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      const products = [];
      for (let id in data) {
        products.push({ id, ...data[id] });
      }
      setProducts(products);
    });
  }

  return (
    <>
      <h1>Listings</h1>
      <div className="listings">
        {products.map(product => (
          <div key={product.id} className="product">
            <h2>{product.name}</h2>
            <p>{product.desc}</p>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default Listings;
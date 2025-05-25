import { useState, useEffect, useMemo } from 'react';
import { fetchProducts } from '../services/api';

const PRODUCTS_PER_LOAD = 10;

const useProductFetcher = (category, store) => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [productIndex, setProductIndex] = useState(0);

  const [isSortedByPriceAsc, setIsSortedByPriceAsc] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      if (!category) {
        setAllProducts([]);
        setProductIndex(0);
        setIsSortedByPriceAsc(false); 
        return;
      }

      setLoading(true);
      setError(null);
      setProductIndex(0); 

      try {
        const data = await fetchProducts(category, store);
        setAllProducts(data);
      } catch (err) {
        setError(err.message);
        console.error(`Error fetching ${store} products for ${category}:`, err);
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [category, store]);

  const sortedAndDisplayedProducts = useMemo(() => {
    let productsToDisplay = [...allProducts]; 

    if (isSortedByPriceAsc) {
      productsToDisplay.sort((a, b) => {

        const priceA = parseFloat(String(a.Precio).replace(/[^0-9.-]+/g,""));
        const priceB = parseFloat(String(b.Precio).replace(/[^0-9.-]+/g,""));


        if (isNaN(priceA) || isNaN(priceB)) {
            return 0;
        }
        return priceA - priceB; 
      });
    }

    return productsToDisplay.slice(0, productIndex || PRODUCTS_PER_LOAD);
  }, [allProducts, productIndex, isSortedByPriceAsc]); 

  const loadMore = () => {
    const nextIndex = productIndex + PRODUCTS_PER_LOAD;
    setProductIndex(nextIndex);
  };

  const hasMore = productIndex < allProducts.length;

  const toggleSortByPriceAsc = () => {
    setIsSortedByPriceAsc(prev => !prev); 
    setProductIndex(PRODUCTS_PER_LOAD); 
  };

  return {
    displayedProducts: sortedAndDisplayedProducts,
    loading,
    error,
    loadMore,
    hasMore,
    isSortedByPriceAsc,      
    toggleSortByPriceAsc     
  };
};

export default useProductFetcher;
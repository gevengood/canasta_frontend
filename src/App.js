import React, { useState } from 'react';
import CategorySelector from './components/CategorySelector/CategorySelector';
import ProductList from './components/ProductList/ProductList';
import useProductFetcher from './hooks/useProductFetcher';
import './App.css';

function App() {
  const [category, setCategory] = useState('');

  const {
    displayedProducts: displayedExitoProducts,
    loading: loadingExito,
    error: errorExito,
    loadMore: loadMoreExito,
    hasMore: hasMoreExito,
    isSortedByPriceAsc: isSortedByPriceAscExito,      
    toggleSortByPriceAsc: toggleSortByPriceAscExito   
  } = useProductFetcher(category, 'exito');

  const {
    displayedProducts: displayedCarullaProducts,
    loading: loadingCarulla,
    error: errorCarulla,
    loadMore: loadMoreCarulla,
    hasMore: hasMoreCarulla,
    isSortedByPriceAsc: isSortedByPriceAscCarulla,    
    toggleSortByPriceAsc: toggleSortByPriceAscCarulla 
  } = useProductFetcher(category, 'carulla');

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 font-sans">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 mt-4 rounded-lg p-3 bg-white shadow-md">
        Comparador de Productos
      </h1>

      <CategorySelector
        selectedCategory={category}
        onSelectCategory={setCategory}
      />

      {(errorExito || errorCarulla) && (
        <div className="w-full max-w-2xl bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-6 shadow-md" role="alert">
          <p className="font-bold">Error:</p>
          <p>{errorExito || errorCarulla}</p>
        </div>
      )}

      {(loadingExito || loadingCarulla) && (
        <div className="text-gray-600 text-lg mb-4">Cargando productos...</div>
      )}

      {!loadingExito && !loadingCarulla && category && (
        <div className="w-full max-w-6xl flex flex-col md:flex-row justify-center gap-8">
          <ProductList
            title="Éxito"
            products={displayedExitoProducts}
            headerGradientClasses="from-yellow-300 to-yellow-600"
            buttonBgClasses="bg-yellow-300 hover:bg-yellow-600"
            buttonRingColorClass="focus:ring-yellow-500"
            loadMore={loadMoreExito}
            hasMore={hasMoreExito}
            loading={loadingExito}
            error={errorExito}
            isSortedByPriceAsc={isSortedByPriceAscExito}      
            toggleSortByPriceAsc={toggleSortByPriceAscExito}  
          />
          <ProductList
            title="Carulla"
            products={displayedCarullaProducts}
            headerGradientClasses="from-green-600 to-green-800"
            buttonBgClasses="bg-green-500 hover:bg-green-600"
            buttonRingColorClass="focus:ring-green-500"
            loadMore={loadMoreCarulla}
            hasMore={hasMoreCarulla}
            loading={loadingCarulla}
            error={errorCarulla}
            isSortedByPriceAsc={isSortedByPriceAscCarulla}    
            toggleSortByPriceAsc={toggleSortByPriceAscCarulla} 
          />
        </div>
      )}
    </div>
  );
}

export default App;
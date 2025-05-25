import React from 'react';
import ProductCard from '../ProductCard/ProductCard';

function ProductList({
  title, 
  products,
  headerGradientClasses,
  buttonBgClasses,
  buttonRingColorClass,
  loadMore,
  hasMore,
  loading,
  error,
  isSortedByPriceAsc,
  toggleSortByPriceAsc
}) {


  const storeNameForUrl = title.toLowerCase();

  console.log(`[ProductList] Pasando storeNameForUrl: ${storeNameForUrl} (title: ${title})`);

  return (
    <div className="flex-1 bg-white rounded-xl shadow-lg p-6">
      <div className={`bg-gradient-to-r ${headerGradientClasses} p-4 text-white text-center font-bold text-2xl rounded-t-lg -mx-6 -mt-6 mb-4`}>
        {title}
      </div>

      <div className="mb-4 flex justify-end items-center">
        <input
          type="checkbox"
          id={`sort-checkbox-${title}`}
          className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          checked={isSortedByPriceAsc}
          onChange={toggleSortByPriceAsc}
        />
        <label htmlFor={`sort-checkbox-${title}`} className="text-gray-700 font-medium cursor-pointer">
          Ordenar por Precio (Menor a Mayor)
        </label>
      </div>

      {loading && <p className="text-gray-600 text-center col-span-full">Cargando productos...</p>}
      {error && <p className="text-red-600 text-center col-span-full">Error: {error}</p>}
      {!loading && !error && products.length === 0 && (
        <p className="text-gray-600 text-center col-span-full">No se encontraron productos en {title} para esta categoría.</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {!loading && !error && products.map((product, index) => (


          <ProductCard key={index} product={product} store={storeNameForUrl} />
        ))}
      </div>
      {hasMore && (
        <button
          onClick={loadMore}
          className={`mt-6 w-full ${buttonBgClasses} text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 ${buttonRingColorClass} focus:ring-opacity-50`}
        >
          Cargar más productos de {title}
        </button>
      )}
    </div>
  );
}

export default ProductList;
import React from 'react';

function ProductCard({ product, store }) {
  const generateSearchUrl = (productName, storeName) => {
    const formattedProductName = productName.replace(/\s+/g, '+').toLowerCase();
    let baseUrl = '';

    if (storeName && storeName.toLowerCase() === 'éxito') {
      baseUrl = 'https://www.exito.com/s?q=';
    } else if (storeName && storeName.toLowerCase() === 'carulla') {
      baseUrl = 'https://www.carulla.com/s?q=';
    } else {
      console.warn(`[ProductCard] Tienda no reconocida o vacía: ${storeName}`);
      return '#'; 
    }
    return `${baseUrl}${formattedProductName}&sort=score_desc&page=0`;
  };

  const productUrl = generateSearchUrl(product.Nombre, store);


  const displayStoreName = store ? (store.toLowerCase() === 'éxito' ? 'Éxito' : store.charAt(0).toUpperCase() + store.slice(1)) : 'Tienda';


  return (
    <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg shadow-sm
                    transition duration-300 ease-in-out transform hover:scale-105 flex-grow">
      <img
        src={product.Imagen || 'https://placehold.co/100x100/cccccc/333333?text=No+Image'}
        alt={product.Nombre || 'Producto'}
        className="w-24 h-24 object-contain rounded-md mb-2 shadow-sm"
        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/100x100/cccccc/333333?text=No+Image'; }}
      />
      <h3 className="text-md font-semibold text-gray-900 mb-1 text-center flex-grow overflow-hidden text-ellipsis">
        {product.Nombre}
      </h3>
      <p className="text-lg font-bold text-green-600 mb-3">
        {product.Precio ? `$${product.Precio.toLocaleString('es-CO')}` : 'Precio no disponible'}
      </p>
      <a
        href={productUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg
                   shadow-md transition duration-300 ease-in-out text-center"
      >
        Ir a {displayStoreName}
      </a>
    </div>
  );
}

export default ProductCard;
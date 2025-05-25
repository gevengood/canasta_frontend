
const API_BASE_URL = 'https://canasta-backend.onrender.com/productos';

export const fetchProducts = async (category, store) => {
  const response = await fetch(`${API_BASE_URL}/${category}/${store}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const rawData = await response.json();

  const key = `${category}${store.charAt(0).toUpperCase() + store.slice(1)}`; 
  const actualProducts = rawData[0]?.[key];

  if (!Array.isArray(actualProducts)) {
    throw new Error(`La respuesta para ${store} no contiene un array válido en la clave '${key}'.`);
  }
  return actualProducts;
};
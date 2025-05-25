import React from 'react';

function CategorySelector({ selectedCategory, onSelectCategory }) {
  return (
    <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg mb-8">
      <div className="mb-6">
        <label htmlFor="category-select" className="block text-gray-700 text-lg font-semibold mb-2">
          Selecciona una categoría:
        </label>
        <select
          id="category-select"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          value={selectedCategory}
          onChange={(e) => onSelectCategory(e.target.value)}
        >
          <option value="">-- Selecciona una categoría --</option>
          <option value="aceite">Aceite</option>
          <option value="arroz">Arroz</option>
          <option value="azucar">Azúcar</option>
          <option value="frijol">Frijol</option>
          <option value="pan">Pan</option>
          <option value="sal">Sal</option>
        </select>
      </div>
    </div>
  );
}

export default CategorySelector;
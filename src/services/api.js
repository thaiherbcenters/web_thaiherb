/**
 * API Service for communicating with backend
 */

const API_BASE_URL = '/api';

const api = {
    /**
     * Get all products
     * @returns {Promise<Array>} Array of products
     */
    getProducts: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/products`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    },

    /**
     * Get products by category
     * @param {string} category Category name
     * @returns {Promise<Array>} Array of products
     */
    getProductsByCategory: async (category) => {
        try {
            const response = await fetch(`${API_BASE_URL}/products/category/${encodeURIComponent(category)}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error(`Error fetching products for category ${category}:`, error);
            return [];
        }
    },

    /**
     * Get product by ID
     * @param {number|string} id Product ID
     * @returns {Promise<Object>} Product object
     */
    getProductById: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/products/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error(`Error fetching product ${id}:`, error);
            return null;
        }
    }
};

export default api;

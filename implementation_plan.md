# User Review Required
> [!IMPORTANT]
> This change switches the product data source from a static local file to the live database API. Ensure the backend server is running on port 3001.

## Proposed Changes
### Frontend API Layer
#### [NEW] [src/services/api.js](file:///c:/test_ai/thaiherb/src/services/api.js)
- Create Axios or Fetch wrapper for API calls.
- Base URL: `http://localhost:3001/api`
- Functions: `getProducts`, `getProductsByCategory`, `getProductById`

### Components Update
#### [MODIFY] [src/pages/Home.jsx](file:///c:/test_ai/thaiherb/src/pages/Home.jsx)
- Fetch featured/all products from API instead of importing `data/products.js`.

#### [MODIFY] [src/pages/Products.jsx](file:///c:/test_ai/thaiherb/src/pages/Products.jsx)
- Use `useEffect` to load products on mount.
- Add loading state.
- Handle categories dynamically from API.

#### [MODIFY] [src/pages/ProductDetail.jsx](file:///c:/test_ai/thaiherb/src/pages/ProductDetail.jsx)
- Fetch individual product details by ID using API.

## Verification Plan
### Automated Tests
- None currently available for frontend components.

### Manual Verification
1. **Home Page**: Verify product listing sections load without errors.
2. **Products Page**:
   - Check if all products from DB are displayed.
   - Test category filtering (e.g., "ยาแคปซูล", "ยาดม").
3. **Product Detail**:
   - Click on a product card and verify it navigates to the detail page.
   - Verify product name, price, and description match the DB data.

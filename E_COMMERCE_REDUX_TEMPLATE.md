# E-commerce Redux Structure Template
## Complete Code Examples for Teaching

---

## 📁 Project Structure

```
ecommerce-app/
├── src/
│   ├── store/
│   │   ├── store.js              # Main store configuration
│   │   ├── productsSlice.js      # Products state management
│   │   ├── cartSlice.js          # Shopping cart state
│   │   ├── userSlice.js          # User authentication
│   │   ├── filtersSlice.js       # Product filters
│   │   └── orderSlice.js         # Order management
│   ├── components/
│   │   ├── ProductCard.jsx
│   │   ├── CartItem.jsx
│   │   ├── Navbar.jsx
│   │   └── ...
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   └── Login.jsx
│   └── App.js
```

---

## 1. Store Configuration (`store/store.js`)

```javascript
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import cartReducer from './cartSlice';
import userReducer from './userSlice';
import filtersReducer from './filtersSlice';
import orderReducer from './orderSlice';

// Optional: Redux Persist setup
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'user'] // Only persist cart and user
};

const persistedCartReducer = persistReducer(
  { key: 'cart', storage },
  cartReducer
);

const persistedUserReducer = persistReducer(
  { key: 'user', storage },
  userReducer
);

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: persistedCartReducer,
    user: persistedUserReducer,
    filters: filtersReducer,
    orders: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

---

## 2. Products Slice (`store/productsSlice.js`)

```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching single product
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  selectedProduct: null,
  loading: false,
  error: null,
  categories: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        // Extract unique categories
        const categories = [...new Set(action.payload.map(p => p.category))];
        state.categories = categories;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch single product
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedProduct, clearSelectedProduct, setCategories } = productsSlice.actions;
export default productsSlice.reducer;
```

---

## 3. Cart Slice (`store/cartSlice.js`)

```javascript
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  total: 0,
  itemCount: 0,
};

// Helper function to calculate totals
const calculateTotals = (items) => {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { itemCount, total };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);

      if (existingItem) {
        // Item already in cart, increase quantity
        existingItem.quantity += 1;
      } else {
        // New item, add to cart
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 1,
        });
      }

      // Recalculate totals
      const { itemCount, total } = calculateTotals(state.items);
      state.itemCount = itemCount;
      state.total = total;
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.id !== productId);
      
      // Recalculate totals
      const { itemCount, total } = calculateTotals(state.items);
      state.itemCount = itemCount;
      state.total = total;
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (item) {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          state.items = state.items.filter(item => item.id !== id);
        } else {
          item.quantity = quantity;
        }
      }

      // Recalculate totals
      const { itemCount, total } = calculateTotals(state.items);
      state.itemCount = itemCount;
      state.total = total;
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
```

---

## 4. User Slice (`store/userSlice.js`)

```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock login function (replace with real API)
const mockLogin = async (credentials) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: credentials.email.split('@')[0],
        email: credentials.email,
        token: 'mock-jwt-token',
      });
    }, 1000);
  });
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const user = await mockLogin(credentials);
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, clearError } = userSlice.actions;
export default userSlice.reducer;
```

---

## 5. Filters Slice (`store/filtersSlice.js`)

```javascript
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: 'all',
  priceRange: [0, 1000],
  sortBy: 'default', // 'default', 'price-low', 'price-high', 'name'
  searchQuery: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    resetFilters: (state) => {
      state.category = 'all';
      state.priceRange = [0, 1000];
      state.sortBy = 'default';
      state.searchQuery = '';
    },
  },
});

export const { setCategory, setPriceRange, setSortBy, setSearchQuery, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
```

---

## 6. Order Slice (`store/orderSlice.js`)

```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock order creation
const createOrder = async (orderData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Date.now(),
        ...orderData,
        status: 'pending',
        createdAt: new Date().toISOString(),
      });
    }, 1000);
  });
};

export const submitOrder = createAsyncThunk(
  'orders/submitOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const order = await createOrder(orderData);
      return order;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  currentOrder: null,
  orderHistory: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
        state.orderHistory.push(action.payload);
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
```

---

## 7. Component Examples

### Product Card Component (`components/ProductCard.jsx`)

```javascript
import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <img 
        src={product.image} 
        alt={product.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
          {product.title}
        </h3>
        <p className="text-gray-600 mb-4">${product.price}</p>
        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
```

### Cart Component (`components/Cart.jsx`)

```javascript
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../store/cartSlice';

const Cart = () => {
  const { items, total, itemCount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Shopping Cart ({itemCount} items)</h1>
        <button
          onClick={() => dispatch(clearCart())}
          className="text-red-500 hover:text-red-700"
        >
          Clear Cart
        </button>
      </div>

      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow">
            <img src={item.image} alt={item.title} className="w-20 h-20 object-cover" />
            <div className="flex-1">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-gray-600">${item.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                -
              </button>
              <span className="w-12 text-center">{item.quantity}</span>
              <button
                onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                +
              </button>
            </div>
            <p className="font-semibold w-24 text-right">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="bg-gray-100 p-6 rounded-lg">
        <div className="flex justify-between text-xl font-bold mb-4">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
```

### Products Page (`pages/Products.jsx`)

```javascript
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../store/productsSlice';
import { setCategory, setSearchQuery, setSortBy } from '../store/filtersSlice';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const dispatch = useDispatch();
  const { items, loading, error, categories } = useSelector((state) => state.products);
  const { category, searchQuery, sortBy } = useSelector((state) => state.filters);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Filter and sort products
  const filteredProducts = items
    .filter((product) => {
      const matchesCategory = category === 'all' || product.category === category;
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  if (loading) {
    return <div className="text-center py-12">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6 flex gap-4 flex-wrap">
        {/* Category Filter */}
        <select
          value={category}
          onChange={(e) => dispatch(setCategory(e.target.value))}
          className="px-4 py-2 border rounded"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className="flex-1 px-4 py-2 border rounded"
        />

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value))}
          className="px-4 py-2 border rounded"
        >
          <option value="default">Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name A-Z</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
```

---

## 8. App Setup (`src/index.js`)

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { store, persistor } from './store/store';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
```

---

## 9. Selectors (Optional but Recommended)

Create `store/selectors.js` for memoized selectors:

```javascript
import { createSelector } from '@reduxjs/toolkit';

// Basic selectors
const selectProducts = (state) => state.products.items;
const selectFilters = (state) => state.filters;

// Memoized selector for filtered products
export const selectFilteredProducts = createSelector(
  [selectProducts, selectFilters],
  (products, filters) => {
    return products
      .filter((product) => {
        const matchesCategory = filters.category === 'all' || product.category === filters.category;
        const matchesSearch = product.title.toLowerCase().includes(filters.searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'name':
            return a.title.localeCompare(b.title);
          default:
            return 0;
        }
      });
  }
);

// Memoized selector for cart total
export const selectCartTotal = createSelector(
  [(state) => state.cart.items],
  (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }
);
```

---

## 📦 Installation Commands

```bash
# Core dependencies
npm install @reduxjs/toolkit react-redux

# Redux Persist
npm install redux-persist

# React Router
npm install react-router-dom

# API calls (if not using RTK Query)
npm install axios

# TypeScript types (optional)
npm install --save-dev @types/react-redux
```

---

## 🎯 Key Teaching Points

1. **Slice Structure**: Each slice manages one feature
2. **Async Operations**: Use `createAsyncThunk` for API calls
3. **State Updates**: Redux Toolkit uses Immer (can "mutate" state)
4. **Selectors**: Use for derived/computed state
5. **Persistence**: Use redux-persist for cart/user data
6. **Component Pattern**: useSelector (read) + useDispatch (write)

---

This template provides a complete, production-ready structure for teaching Redux Toolkit with an e-commerce application!


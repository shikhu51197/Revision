# Redux Toolkit Quick Reference Guide (2025)
## For Teaching React + Redux

---

## 🚨 **CRITICAL: Redux vs Redux Toolkit in 2025**

### **✅ TEACH: Redux Toolkit (RTK)**
- **Official recommendation** from Redux team
- **Industry standard** - 95% of new projects
- **Less boilerplate** - 70% less code
- **Built-in best practices** - Immer, DevTools, etc.

### **❌ DON'T TEACH: Plain Redux**
- Legacy approach
- Too much boilerplate
- Harder for beginners
- Not used in modern projects

**Tell Students:** "Redux Toolkit IS Redux, just easier to use!"

---

## 📋 **Quick Comparison**

| Feature | Plain Redux | Redux Toolkit |
|---------|-------------|---------------|
| Setup | Manual | `configureStore()` |
| Actions | Manual creation | Auto-generated |
| Reducers | Switch statements | `createSlice()` |
| Immutability | Manual spread | Immer (automatic) |
| Async | Redux Thunk | `createAsyncThunk` |
| Code Lines | ~100+ per feature | ~30 per feature |

---

## 🎯 **Core Concepts (What Students Must Know)**

### 1. **Store** - Single source of truth
```javascript
import { configureStore } from '@reduxjs/toolkit';
export const store = configureStore({ reducer: { ... } });
```

### 2. **Slice** - Feature state management
```javascript
import { createSlice } from '@reduxjs/toolkit';
const mySlice = createSlice({ name, initialState, reducers });
```

### 3. **Actions** - What happened
```javascript
dispatch(increment()); // Auto-generated from slice
```

### 4. **Reducers** - How state changes
```javascript
reducers: {
  increment: (state) => { state.value += 1; }
}
```

### 5. **Hooks** - Connect React to Redux
```javascript
const count = useSelector(state => state.counter.value);
const dispatch = useDispatch();
```

---

## 📝 **Common Patterns**

### **Pattern 1: Basic Slice**
```javascript
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; },
  },
});
export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
```

### **Pattern 2: Async Operations**
```javascript
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await fetch('/api/users');
    return response.json();
  }
);

// In slice:
extraReducers: (builder) => {
  builder
    .addCase(fetchUsers.pending, (state) => { state.loading = true; })
    .addCase(fetchUsers.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
    })
    .addCase(fetchUsers.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
}
```

### **Pattern 3: Multiple Slices**
```javascript
// store.js
export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    user: userReducer,
  },
});
```

### **Pattern 4: Component Usage**
```javascript
function MyComponent() {
  const data = useSelector(state => state.mySlice.data);
  const dispatch = useDispatch();
  
  const handleClick = () => {
    dispatch(myAction());
  };
  
  return <button onClick={handleClick}>Click</button>;
}
```

---

## 🎓 **Teaching Order (Progressive Learning)**

### **Week 1: Fundamentals**
1. ✅ Why Redux? (Problem: Prop drilling)
2. ✅ Redux Toolkit setup
3. ✅ Basic slice (Counter app)
4. ✅ useSelector & useDispatch

### **Week 2: Real Applications**
5. ✅ Multiple slices (Todo app)
6. ✅ Async operations (API calls)
7. ✅ Loading & error states

### **Week 3: E-commerce**
8. ✅ Products slice
9. ✅ Cart slice
10. ✅ User authentication
11. ✅ Filters & search

### **Week 4: Advanced**
12. ✅ Redux Persist
13. ✅ Selectors (memoization)
14. ✅ RTK Query (optional)
15. ✅ Best practices

---

## 🔑 **Key Rules for Students**

### **DO:**
✅ Use Redux Toolkit (not plain Redux)  
✅ One slice per feature  
✅ Use `createSlice` for all slices  
✅ Use `createAsyncThunk` for API calls  
✅ Keep state normalized  
✅ Use selectors for derived state  
✅ Use Redux DevTools  

### **DON'T:**
❌ Mutate state directly (outside Immer)  
❌ Put everything in Redux (use local state when appropriate)  
❌ Duplicate data in state  
❌ Make slices too large  
❌ Forget error handling  

---

## 📚 **Essential Libraries (2025)**

### **Must Have:**
1. `@reduxjs/toolkit` - Redux Toolkit
2. `react-redux` - React bindings
3. `react-router-dom` - Navigation

### **Highly Recommended:**
4. `redux-persist` - State persistence
5. `@reduxjs/toolkit/query/react` - RTK Query (for data fetching)

### **Nice to Have:**
6. `reselect` - Advanced selectors (built into RTK)
7. `redux-logger` - Debugging middleware

---

## 🎯 **Common Student Mistakes & Solutions**

### **Mistake 1: Forgetting Provider**
```javascript
// ❌ Wrong
<App />

// ✅ Correct
<Provider store={store}>
  <App />
</Provider>
```

### **Mistake 2: Mutating State (outside Immer)**
```javascript
// ❌ Wrong (in plain Redux)
state.items.push(newItem);

// ✅ Correct (Redux Toolkit with Immer)
state.items.push(newItem); // This works in RTK!
```

### **Mistake 3: Not Handling Async States**
```javascript
// ❌ Wrong
const { data } = useSelector(state => state.products);

// ✅ Correct
const { data, loading, error } = useSelector(state => state.products);
if (loading) return <Spinner />;
if (error) return <Error message={error} />;
```

### **Mistake 4: Prop Drilling Instead of Redux**
```javascript
// ❌ Wrong - Passing props through 5 components
<App>
  <Header>
    <Nav>
      <CartIcon count={count} />
    </Nav>
  </Header>
</App>

// ✅ Correct - Use Redux
const count = useSelector(state => state.cart.itemCount);
```

---

## 📊 **State Structure Best Practices**

### **✅ Good Structure:**
```javascript
{
  products: {
    items: [],
    loading: false,
    error: null
  },
  cart: {
    items: [],
    total: 0
  }
}
```

### **❌ Bad Structure:**
```javascript
{
  // Too nested
  app: {
    ecommerce: {
      products: { ... },
      cart: { ... }
    }
  },
  // Duplicated data
  products: [...],
  cart: [...],
  cartProducts: [...] // Same data!
}
```

---

## 🚀 **Quick Setup Template**

```bash
# 1. Create React app
npx create-react-app my-app

# 2. Install Redux Toolkit
npm install @reduxjs/toolkit react-redux

# 3. Install Redux Persist (optional)
npm install redux-persist

# 4. Install React Router
npm install react-router-dom
```

```javascript
// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import myReducer from './mySlice';

export const store = configureStore({
  reducer: {
    myFeature: myReducer,
  },
});
```

```javascript
// index.js
import { Provider } from 'react-redux';
import { store } from './store/store';

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

---

## 💡 **Teaching Tips**

1. **Start with problems** - Show prop drilling before Redux
2. **Visual learning** - Use Redux DevTools extensively
3. **Incremental complexity** - Counter → Todo → E-commerce
4. **Code along** - Students code with you
5. **Real examples** - Use familiar apps (e-commerce, social media)
6. **Common mistakes** - Show what NOT to do
7. **Practice projects** - Each concept needs hands-on work

---

## 📖 **Learning Path Summary**

```
Week 1: Redux Basics
  → Counter App
  → Understanding store, slice, actions, reducers

Week 2: Real Applications  
  → Todo App with Redux
  → Async operations
  → Multiple slices

Week 3: E-commerce Foundation
  → Products, Cart, User slices
  → API integration
  → Filters & search

Week 4: Advanced & Polish
  → Redux Persist
  → Selectors
  → RTK Query
  → Complete e-commerce app
```

---

## ✅ **Student Competency Checklist**

By the end, students should be able to:

- [ ] Set up Redux Toolkit store
- [ ] Create slices with actions and reducers
- [ ] Use useSelector and useDispatch
- [ ] Handle async operations
- [ ] Manage multiple slices
- [ ] Implement shopping cart
- [ ] Handle authentication
- [ ] Use Redux Persist
- [ ] Create selectors
- [ ] Build complete e-commerce app

---

## 🎯 **Final Answer to Your Questions**

### **Q: Redux or Redux Toolkit?**
**A: Redux Toolkit ONLY** - It's the modern standard for 2025.

### **Q: What to teach after CRUD?**
**A: This progression:**
1. Redux Toolkit basics (Counter)
2. Multiple slices (Todo with Redux)
3. Async operations (API calls)
4. E-commerce app (Products, Cart, User)

### **Q: Best approach for students?**
**A: Progressive learning:**
- Start simple (Counter)
- Add complexity gradually
- Use real-world examples (E-commerce)
- Practice with multiple projects

### **Q: Essential libraries?**
**A: Core stack:**
- React + Redux Toolkit
- React Router
- Tailwind CSS
- Redux Persist
- RTK Query (optional but recommended)

---

**This guide covers everything you need to teach React + Redux in 2025! 🎓**


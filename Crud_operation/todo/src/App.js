import { Route,Routes } from "react-router-dom";
import Home from "./Components/Home";
import Products from "./Components/Products";
import ProductDetails from "./Components/ProductDetails";


function App() {
  return (
    <>
    
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/products" element={<Products/>}/>
      <Route path="/product/:id" element={<ProductDetails/>}/>

    </Routes>
   

    </>
  );
}

export default App;
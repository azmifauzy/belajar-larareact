import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ProductList from "./components/Products/ProductList";
import AddProduct from "./components/Products/AddProduct";
import EditProduct from "./components/Products/EditProduct";

function App() {
  return (
    <div className="App container">
      <div className="row justify-content-center mt-5">
        <div className="col-8">
          <Router>
              <Routes>
                <Route path="/products" element={<ProductList/>} />
                <Route path="/products/add" element={<AddProduct/>} />
                <Route path="/products/:id" element={<EditProduct/>} />
              </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import { Store } from "./pages/Store";
import { Navbar } from "./components/Navbar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";

function App() {
  return (
    <>
      <ShoppingCartProvider>
        <header>
          <Navbar />
        </header>
        <main>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/store" element={<Store />} />
            </Routes>
          </div>
        </main>
      </ShoppingCartProvider>
    </>
  );
}

export default App;

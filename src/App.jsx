import Header from "./components/base/Header";
import Hero from "./components/homepage/Hero";
import About from "./components/homepage/About";
import Blog from "./components/homepage/Blog";
import Footer from "./components/base/Footer";
import Review from "./components/homepage/Review";
import Dealers from "./components/homepage/Dealers";
import Product from "./components/homepage/Product";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <Product />
      <About />
      <Dealers />
      <Blog />
      <Review />
      <Footer />
    </>
  );
}

export default App;

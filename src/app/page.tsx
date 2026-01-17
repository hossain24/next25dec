import Header from "./header/page";
import Home from "./home/page";
import Landing from "./landing/page";
import Footer from "./footer/page";
import Selective from "./selective/page";
import Articles from "./articles/page";
import ScrollToTopBtn from "./scroll/page";
import Books from "./books/page";

export default function page() {
  return (
    <>
      <ScrollToTopBtn />
      <Header />
      <Home />
      <Books />
      <Landing />
      <Selective />
      <Articles />
      <Footer />  
    </>
  )
}

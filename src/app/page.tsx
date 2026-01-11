import Header from "./header/page";
import Home from "./home/page";
import Landing from "./landing/page";
import Footer from "./footer/page";
import BookThree from "./book-three/page";
import Selective from "./selective/page";
import Articles from "./articles/page";
import ScrollToTopBtn from "./scroll/page";

export default function page() {
  return (
    <>
      <ScrollToTopBtn />
      <Header />
      <Home />
      <BookThree />
      <Landing />
      <Selective />
      <Articles />
      <Footer />  
    </>
  )
}

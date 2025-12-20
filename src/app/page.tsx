import Header from "./header/page";
import Home from "./home/page";
import Landing from "./landing/page";
import Footer from "./footer/page";
import BookThree from "./book-three/page";
import Selective from "./selective/page";

export default function page() {
  return (
    <>
      <Header />
      <Home />
      <BookThree />
      <Landing />
      <Selective />
      <Footer />  
    </>
  )
}

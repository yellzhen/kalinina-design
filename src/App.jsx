import Header from "./components/Header";
import Intro from "./components/Intro";
import About from "./components/About";
import SelectedWorks from "./components/SelectedWorks";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Intro />
        <About />
        <SelectedWorks />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

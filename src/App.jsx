import Header from "./components/Header";
import Intro from "./components/Intro";
import About from "./components/About";
import Presentation from "./components/Presentation";
import SelectedWorks from "./components/SelectedWorks";
import OfflineCreatives from "./components/OfflineCreatives";
import MotionSection from "./components/Motion";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Intro />
        <About />
        <Skills />
        <SelectedWorks />
        <OfflineCreatives />
        <MotionSection />
        <Presentation />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

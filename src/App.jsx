import './App.css'
import NavBar from "./components/NavBar.jsx";
import Experience from "./components/Experience.jsx";
import Projects from "./components/Projects.jsx";
import Footer from "./components/Footer.jsx";
import Typewriter from 'typewriter-effect';
import Aboutme from './components/Aboutme.jsx';
import Contact from './components/Contact.jsx';
import { useRef } from 'react';

function App() {
  const contact = useRef(null)
  
  return (
    <div className="body">
      <div className="stars"></div>
      <div className="shooting-star"></div>
      <div className="shooting-star"></div>
      <div className="shooting-star"></div>
      
      <NavBar contactRef={contact}/>
      <div className='intro'>
        <Typewriter
          options={{
            strings: [
              "Hi, I'm Jaran...",
              "An aspiring Electrical Engineer...",
              "Welcome to my website!"
            ],
            autoStart: true,
            loop: true,
          }}
        />
      </div>
    
      <Aboutme />
      <Experience />
      <Projects />
      <Contact contactRef={contact}/>
      <Footer />
    </div>
  )
}

export default App

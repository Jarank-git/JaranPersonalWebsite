import "./Projects.css"
import Pilogo from "../assets/Raspberrypi.png"
import Pylogo from "../assets/Python.png"
import Jlogo from "../assets/java.png"
import Collapsible from "./Collapsible"

function Projects() {
  return (
    <div className="Projects">
      <h2>Projects I've Worked On...</h2>

      <Collapsible label={
        <>
          <a
            href="https://github.com/Jarank-git/Raspberry-Pi-Offline-Security-System-ROSS-" 
            target="_blank"
            rel="noopener noreferrer"
            className="project-linkp"
          >
            <img
              src={Pilogo}
              alt="Logo"
              width="20"
              height="20"
              style={{ verticalAlign: 'middle', marginRight: '5px' }}
            />
            Raspberry Pi Security System    
          </a>
          &nbsp;-<span className="text"> with Facial Recognition and a 4x4 matrix keypad</span>
        </>
      }>
        <p>
          This project involved utilizing a Raspberry Pi to run an AI model trained to recognize the face of a specific, authorized individual. It uses this facial recognition combined with a 4x4 matrix keypad for dual-layer security.

          The code allows the servo motor to unlock only when both the password entered via the keypad and an authorized face are recognized. The purpose of this project was to create a fully offline security system that functions without cloud services or internet connectivity. This design requires only power, ensuring user privacy and allowing for more versatile use cases.
        </p>
      </Collapsible>

      <Collapsible label={
        <>
          <a
            href="https://github.com/Jarank-git/Sustainable-Saga" 
            target="_blank"
            rel="noopener noreferrer"
            className='project-linkp'
          >
            <img
              src={Pylogo}
              alt="Logo"
              width="20"
              height="20"
              style={{ verticalAlign: 'middle', marginRight: '5px' }}
            />
            Sustainable Saga   
          </a>
          &nbsp;- <span className="text"> a fun interactive game for students aged 3-5 about sustainability</span>
        </>
      }>
        <p>
          In this project, I collaborated with three others to create a top-down exploration game aimed at conveying themes of sustainability to a younger audience. To test information retention, players enter a final boss battle in a side-scrolling combat sequence. Once the boss is defeated, a quiz appears with random questions about the different sustainability topics discussed within the game. The game was coded within 12 hours and earned us 2nd place at MillHacks!
        </p>
      </Collapsible>
      
      <Collapsible label={
        <>
          <a
            href="https://github.com/Jarank-git/AllAboutAiChatbots" 
            target="_blank"
            rel="noopener noreferrer"
            className='project-linkp'
          >
            <img
              src={Jlogo}
              alt="Logo"
              width="20"
              height="20"
              style={{ verticalAlign: 'middle', marginRight: '5px' }}
            />
            All About AI Chatbots
          </a>
          &nbsp;-<span className="text"> a project focused on educating individuals about AI chatbots</span>
        </>
      }>
        <p>
          I developed an educational AI chatbot using Java Swing to introduce beginners to the fundamentals of artificial intelligence, covering the design, implementation, and use cases of this technology.
        </p>
      </Collapsible>
    </div>
  );
}

export default Projects
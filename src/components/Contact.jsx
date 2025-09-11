import "./Contact.css"
import gmail from "../assets/gmail.png"
import linkedin from "../assets/linkedin.png"
import github from "../assets/github.png"

function Contact({ contactRef }) {
  return (
    <div className="contact-section" ref={contactRef}>
      <h1>Let's Connect</h1>
      <p className="contact-intro">
        Always excited to collaborate on innovative projects or discuss the latest in electrical engineering and technology.
      </p>
      <ul className="contact-list">
        <li>
          <a href="mailto:Jarankhalid2@gmail.com" className="contact">
            <img src={gmail} alt="Email Icon" style={{ verticalAlign: '-0.3em', width: '20px', height: '20px', marginRight: '5px' }} />
            Email
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/jaran-khalid/" className="contact" target="_blank" rel="noopener noreferrer">
            <img src={linkedin} alt="LinkedIn Icon" style={{ verticalAlign: '-0.3em', width: '20px', height: '20px', marginRight: '5px' }} />
            LinkedIn
          </a>
        </li>
        <li>
          <a href="https://github.com/Jarank-git" className="contact" target="_blank" rel="noopener noreferrer">
            <img src={github} alt="GitHub Icon" style={{ verticalAlign: '-0.3em', width: '20px', height: '20px', marginRight: '5px' }} />
            GitHub
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Contact;
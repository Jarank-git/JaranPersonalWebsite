
import "./NavBar.css"

function NavBar({ contactRef }) {
  const scrollToContact = (contactRef) => {
    window.scrollTo({
      top: contactRef.current.offsetTop,
      behavior: "smooth"
    })
  }
  return (
    <nav className="navbar">
      <a href="https://www.linkedin.com/in/jaran-khalid" target="_blank">
        <h1 className="navBarText">Linkedin</h1>
      </a>
      <a href="https://github.com/Jarank-git" target="_blank">
        <h1 className="navBarText">GitHub</h1>
      </a>
      <a>
        <h1 className="navBarText" onClick={() => scrollToContact(contactRef)}>Contact</h1>
      </a>
    </nav>
  )
}

export default NavBar

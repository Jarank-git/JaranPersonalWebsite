import "./Aboutme.css"

function Aboutme() {
  return (
    <div className="aboutMe">
      <h1>About me...</h1>
      <p className="aboutMe-intro">
        I'm an aspiring <a href="https://uwaterloo.ca/future-students/programs/electrical-engineering" className="university-link" target="_blank" rel="noopener noreferrer">Electrical Engineer</a> at the <a href="https://uwaterloo.ca/" className="university-link" target="_blank" rel="noopener noreferrer">University of Waterloo</a>, and I'm currently exploring the intersection between hardware and software. Lately, I've been working on improving my skills in building web applications with Next.js and designing circuits with tools like KiCad and MATLAB.
      </p>
    </div>
  )
}

export default Aboutme;
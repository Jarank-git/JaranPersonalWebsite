
import CC from "../assets/CC.png"
import Codeninja from "../assets/CodeNinjas.png"
import Collapsible from "./Collapsible"
import "./Experience.css"

function Experience() {
  return (
    <div className="experience">
      <h2>I've worked...</h2>

      <Collapsible label={
        <>
          <a
            href="https://civilcraft.com/" 
            target="_blank"
            rel="noopener noreferrer"
            className='project-link'
          >
            <img
              src={CC}
              alt="Logo"
              width="20"
              height="20"
              style={{ verticalAlign: 'middle', marginRight: '5px' }}
            />At CivilCraft Engineering LLC,
          </a>
          &nbsp; <span className="text">I was a front-end and systems engineering intern</span>
        </>
      }>
        <p>I used Next.js to help design an upcoming significant overhaul for the company's website. My work involved contributing to the new design and its implementation, focusing on building a modern and responsive user experience. I also assisted in debugging and developing an innovative AI tool that leverages NYC open data APIs. The tool was designed to search for buildings overdue on inspections and then automate an outreach process to notify building management about catching up on late inspections.</p>
      </Collapsible>

      <Collapsible label={
        <>
          <a
            href="https://www.codeninjas.com/milton-on-ca" 
            target="_blank"
            rel="noopener noreferrer"
            className='project-link'
          >
            <img
              src={Codeninja}
              alt="Logo"
              width="20"
              height="20"
              style={{ verticalAlign: 'middle', marginRight: '5px' }}
            />At Code Ninja's,
          </a>
          &nbsp;<span className="text">I was a coding instructor</span>
        </>
      }>
        <p>At Code Ninjas, I taught students aged 5-14 a variety of programming languages like JavaScript and Python, as well as game engines like Roblox Studio and Unity. Beyond software, I educated students on electrical hardware, specifically Micro:bits. This provided a real-world outlet for their work and taught them fundamental hardware skills. I also introduced younger children to Snap Circuits, demonstrating the fundamentals of electricity and how it operates in their everyday electronics.</p>
      </Collapsible>
    </div>
  );
}

export default Experience;

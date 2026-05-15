'use client'

import { BackButton } from '@/components/layout/BackButton'

export default function AboutPage() {
  return (
    <main className="about-page" aria-label="About Jaran Khalid">
      <div className="about-nav">
        <BackButton />
      </div>

      <div className="about-unified-panel">
        <div className="about-photo-col">
          <div className="about-photo-frame">
            <img src="/assets/Picture.jpg" alt="Jaran Khalid" />
          </div>
        </div>

        <div className="about-panel-col">
          <hr className="summary-panel-rule" aria-hidden="true" />
          <h1 className="summary-panel-title">About</h1>
          <hr className="summary-panel-rule" aria-hidden="true" />

          <div className="summary-panel-body">
            <section className="summary-panel-section" aria-labelledby="about-who">
              <h2 id="about-who" className="summary-panel-section-heading">Who I Am</h2>
              <p className="about-bio-text">
                Hi, I&apos;m Jaran, an Electrical Engineering Student at the University of Waterloo,
                currently exploring fields like embedded systems and hardware design. I like building
                things that require me to use software + hardware skills!
              </p>
            </section>

            <section className="summary-panel-section" aria-labelledby="about-currently">
              <h2 id="about-currently" className="summary-panel-section-heading">Currently Working On</h2>
              <ul className="about-bullet-list">
                <li>Adding a blog section to this website</li>
                <li>Writing a technical blog documenting my learning journey through PCB design</li>
                <li>Exploring FPGA development with Quartus Prime and Verilog</li>
                <li>Designing an STM32 microcontroller board PCB from scratch</li>
              </ul>
            </section>

            <section className="summary-panel-section" aria-labelledby="about-interests">
              <h2 id="about-interests" className="summary-panel-section-heading">Interests</h2>
              <ul className="about-bullet-list">
                <li>Video games, specifically RPGs: Elden Ring, Dark Souls 3, Bloodborne, Path of Exile 2</li>
                <li>Building and flipping PC components, keeping up with the PC hardware world</li>
                <li>3D printing on a Bambu Lab A1 Mini, eyeing an upgrade to the A1, and getting better with Autodesk Fusion</li>
              </ul>
            </section>
          </div>

          <hr className="summary-panel-rule" aria-hidden="true" />
        </div>
      </div>
    </main>
  )
}

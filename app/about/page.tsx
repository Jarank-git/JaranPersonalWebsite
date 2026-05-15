'use client'

import { BackButton } from '@/components/layout/BackButton'

export default function AboutPage() {
  return (
    <main className="about-page" aria-label="About Jaran Khalid">
      <div className="about-nav">
        <BackButton />
      </div>

      <div className="about-layout">
        <div className="about-photo-col">
          <div className="about-photo-frame">
            <img src="/assets/Picture.jpg" alt="Jaran Khalid" />
          </div>
        </div>

        <div className="about-panel-col">
          <div className="summary-panel">
            <hr className="summary-panel-rule" aria-hidden="true" />
            <h1 className="summary-panel-title">About</h1>
            <hr className="summary-panel-rule" aria-hidden="true" />

            <div className="summary-panel-body">
              <section className="summary-panel-section" aria-labelledby="about-who">
                <h2 id="about-who" className="summary-panel-section-heading">Who I Am</h2>
                <p className="about-bio-text">
                  Electrical Engineering student at the University of Waterloo with a focus on
                  embedded systems and hardware design. I like building things at the intersection
                  of software and hardware — from circuit boards to full-stack tools.
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
                <p className="about-bio-text">
                  [Placeholder — add interests, hobbies, what you&apos;re into outside of work.]
                </p>
              </section>
            </div>

            <hr className="summary-panel-rule" aria-hidden="true" />
          </div>
        </div>
      </div>
    </main>
  )
}

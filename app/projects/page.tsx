'use client'

import { useState, useCallback, useEffect } from 'react'
import { BackButton } from '@/components/layout/BackButton'
import { ProjectOverlay } from '@/components/projects/ProjectOverlay'
import type { ProjectEntry } from '@/components/projects/ProjectOverlay'

const PROJECTS: ProjectEntry[] = [
  {
    id: 'robotic-arm',
    num: '01',
    title: 'Robotic Arm: Record/Playback & Hand Control',
    sub: 'Arduino Nano · OpenCV · Altium Designer',
    year: 'Mar–Apr 2026',
    category: 'Hardware · Embedded · Computer Vision',
    tagline:
      'Four-axis arm with potentiometer control, motion record/playback, and live MediaPipe hand-gesture tracking — all on a custom PCB shield.',
    overview:
      'A robotic arm with four axes programmed on an Arduino Nano and a custom shield. It offers four modes of control — direct potentiometer control, recording and playing back positions, and hand gesture control via computer vision — all switchable over serial communication in real time. The arm consists of four joints powered by MG90S and SG90 servo motors. The Nano scans each potentiometer, converts the value to a corresponding pulse width in microseconds, and sends commands to all four servos in a synchronized 25ms polling loop.',
    bullets: [
      'Firmware averages 30 potentiometer readings taken 100µs apart to eliminate capacitive noise; writeMicroseconds() drives servos across the full 600–2400µs range for smooth, jitter-free control',
      'Record mode captures the arm\'s position array at each step (up to 100); Playback replays via cosine ease-in-out interpolation across 50 steps per transition (~800ms) for natural acceleration and deceleration',
      'Gesture mode: MediaPipe Hands compares fingertip-to-knuckle y-coordinates to detect extension; finger count maps to servo axis; Python streams S s1 s2 s3 s4 commands over serial at 9600 baud each frame',
      'Custom PCB shield designed in Altium Designer replaces the breadboard prototype — routes power, servo headers, and potentiometer inputs on a single board that stacks directly on the Nano',
      '3D-printed PLA structure iterated in Autodesk Fusion — claw screw hole position and M3 nut channel both corrected after test assemblies before final print',
    ],
    stack: ['Arduino Nano', 'C++ / PlatformIO', 'Python', 'OpenCV', 'MediaPipe', 'Altium Designer', 'pyserial'],
    links: [
      { label: 'GitHub', href: 'https://github.com/Jarank-git/Robotic_arm' },
    ],
    images: [
      { src: '/images/projects/robotic-arm/final-product.jpg', alt: 'Completed robotic arm' },
      { src: '/assets/3D_Nano.png', alt: '3D model of the robotic arm' },
      { src: '/images/projects/robotic-arm/pcb-footprint.png', alt: 'PCB footprint layout' },
      { src: '/images/projects/robotic-arm/full-assembly.jpg', alt: 'First full assembly' },
      { src: '/images/projects/robotic-arm/wiring-clean.jpg', alt: 'Cleaned wiring harness' },
      { src: '/images/projects/robotic-arm/partial-assembly.jpg', alt: 'Partial assembly stage' },
      { src: '/images/projects/robotic-arm/schematic.png', alt: 'Power and servo schematic' },
    ],
    videos: [
      { label: 'Gesture Control (MediaPipe)', youtubeId: 'HV5-AcP3Ts8' },
      { label: 'Record / Playback Mode', youtubeId: 'INzKYXssj1g' },
      { label: 'Manual Potentiometer Control', youtubeId: 'm88PAH4PIvc' },
    ],
    icon: null,
  },
  {
    id: 'ldo',
    num: '02',
    title: '5–3.3V LDO Voltage Regulator',
    sub: 'Altium Designer · WARG',
    year: 'Sep–Oct 2025',
    category: 'Hardware · PCB Design',
    tagline:
      'Compact WARG avionics regulator — MIC5317 LDO IC, custom footprints from 5+ datasheets, validated on bench.',
    overview:
      'A small PCB that steps a DC supply down to a regulated 3.3V output. The circuit is built around the MIC5317-3.3YM5-TR — a fixed 3.3V, 150mA LDO regulator in SOT-23-5 packaging — and designed entirely in Altium Designer. The board accepts an unrated DC supply at J1 and delivers a stabilized 3.3V through J2. The enable pin is wired high for permanent enable; the NC pin is left open per the manufacturer\'s datasheet. Decoupling capacitors on both rails suppress switching noise and maintain stability under load.',
    bullets: [
      'MIC5317-3.3YM5-TR chosen for its fixed 3.3V output, low dropout voltage, SOT-23-5 package, and wide input range — no external feedback resistors required, simplifying layout and reducing component count',
      'C1 and C2 are 10µF, 25V X5R MLCC capacitors on the input and output rails; X5R dielectric chosen for stable low-ESR decoupling across operating temperatures',
      'Power indicator LED (D1) on VOUT with a 120Ω current-limiting resistor (R1) for direct power-on confirmation',
      'All schematic symbols and PCB footprints built from scratch in Altium Designer directly from 5+ manufacturer datasheets — no library defaults',
      'Validated output voltage, ripple, and stability on bench with oscilloscope and multimeter; iterated through 25+ layout corrections to meet WARG avionics power specs',
    ],
    stack: ['Altium Designer', 'Oscilloscope', 'Soldering', 'PCB Layout', 'Power Electronics'],
    links: [
      { label: 'GitHub', href: 'https://github.com/Jarank-git/LDO-Voltage-Regulator' },
    ],
    images: [
      { src: '/images/projects/ldo/schematic-2.png', alt: 'LDO schematic' },
      { src: '/images/projects/ldo/pcb-layout.png', alt: 'PCB layout in Altium Designer' },
      { src: '/assets/3D_LDO.png', alt: '3D render of the LDO PCB' },
    ],
    icon: null,
  },
  {
    id: 'pawprint',
    num: '03',
    title: 'PawPrint: AI-Powered Adoption Campaigns',
    sub: 'React 19 · Google Gemini 2.0 · Cloudinary',
    year: 'Mar 2026',
    category: 'Full-Stack · AI · Hackathon',
    tagline:
      'Shelter volunteers upload pet photos and walk away with AI-generated captions and platform-optimized download packs — built in 36 hours at HackCanada 2026.',
    overview:
      'PawPrint helps shelter volunteers turn raw shelter photos into polished adoption campaigns in minutes. Volunteers run through a 3-step wizard: enter pet details, upload photos and video via a Cloudinary widget (each asset gets AI quality analysis and photo tips), then review and submit. The resulting pet profile delivers platform-sized image packs (Instagram, Twitter, Facebook, YouTube), a printable QR-code kennel card, and a sharable link. There is no traditional database — all pet data lives as structured metadata on Cloudinary assets and is queried back through the Cloudinary Search API.',
    bullets: [
      'Cloudinary doubles as media host and database — pet data encoded as structured metadata on every uploaded asset, queried via the Search API; no separate DB needed',
      'Gemini 2.0 Flash generates a general adoption caption plus five platform-tailored variants per pet (tone, length, and hashtag count tuned per platform); all AI calls gated behind Vercel serverless functions',
      'Hero selection: Cloudinary quality_analysis.focus scores surface the best photo automatically; volunteers override via a tag-hero serverless endpoint that applies a hero tag to the chosen asset',
      'Client-side ZIP generation with JSZip builds platform-optimized packs (1080×1080 Instagram, 1200×675 Twitter, etc.) entirely in the browser — no server compute for file packaging',
      'On-the-fly Cloudinary URL transformations resize and optimize assets per context (hero 1200×800, gallery 900×600, social card 1200×630) without pre-processing stored files',
    ],
    stack: ['React 19', 'TypeScript', 'Vite', 'Google Gemini 2.0', 'Cloudinary', 'Vercel', 'JSZip'],
    links: [
      { label: 'GitHub', href: 'https://github.com/Jarank-git/HackCanada2026' },
    ],
    images: [
      { src: '/images/projects/pawprint/homepage.png', alt: 'PawPrint homepage — Every shelter pet deserves a great first impression' },
      { src: '/images/projects/pawprint/pet-profile.png', alt: 'Pet profile page for Buddy the Shiba Inu' },
      { src: '/images/projects/pawprint/platform-captions.png', alt: 'AI-generated platform captions' },
      { src: '/images/projects/pawprint/platform-packs.png', alt: 'Platform-optimized download packs' },
    ],
    cardVideoId: 'D3_WjKy2eTc',
    videos: [
      { label: 'Demo — HackCanada 2026', youtubeId: 'D3_WjKy2eTc' },
    ],
    icon: null,
  },
  {
    id: 'arctic',
    num: '04',
    title: 'Arctic Analytics: IoT Line-Follow Robot',
    sub: 'Arduino Uno R4 WiFi · React · Python · MongoDB',
    year: 'Oct–Nov 2025',
    category: 'Embedded · Full-Stack · Hackathon',
    tagline:
      'Top-5 finish at UTRAHacks out of 300+ — autonomous robot streams live telemetry to a React dashboard over WiFi.',
    overview:
      'Arctic Analytics is a real-time robotics telemetry and data analytics system built at UTRA Hacks 2026. It combines Arduino-based sensor logging, a live React web dashboard, and an ElevenLabs AI voice mascot to transform raw robot data into intuitive, actionable insights. The robot navigated a winter biathlon-style track while streaming motor RPM, distance, line-sensor, and color data over WiFi. Instead of scrolling through raw serial logs, the dashboard lets you see, hear, and understand what the robot is experiencing in real time.',
    bullets: [
      'Autonomous navigation via IR line sensors, ultrasonic obstacle detection, and color-based zone detection; firmware split across 6 modular .ino files — motor, ultrasonic, line-follow, color, arm, comms',
      'Real-time telemetry: motor RPM, distance, and line-follow data streamed over WiFi from Arduino to MongoDB; React + Vite dashboard displays the live feed for calibration and analysis',
      'ElevenLabs AI voice mascot narrates robot state and performance with arctic-themed commentary, giving intuitive feedback instead of raw numbers',
      'Python data bridge streams Arduino serial data to the web dashboard as middleware between hardware and frontend',
      'Top 5 overall at UTRA Hacks 2026 out of 300+ participants across all disciplines',
    ],
    stack: ['Arduino Uno R4 WiFi', 'C++', 'Python', 'React', 'Vite', 'MongoDB', 'ElevenLabs API'],
    links: [
      { label: 'GitHub', href: 'https://github.com/IshaanMittal07/ArcticAnalytics' },
    ],
    images: [
      { src: '/images/projects/arctic/dashboard.jpg', alt: 'Live telemetry dashboard' },
      { src: '/images/projects/arctic/robot.jpg', alt: 'Arctic Analytics robot' },
      { src: '/images/projects/arctic/robot-front.jpg', alt: 'Robot front view' },
      { src: '/images/projects/arctic/robot-back.jpg', alt: 'Robot back view' },
      { src: '/images/projects/arctic/robot-top.jpg', alt: 'Robot top view' },
    ],
    icon: null,
  },
]

export default function ProjectsPage() {
  const [openId, setOpenId] = useState<string | null>(null)
  const openProject = PROJECTS.find((p) => p.id === openId) ?? null

  const close = useCallback(() => setOpenId(null), [])
  const toggle = useCallback(
    (id: string) => setOpenId((prev) => (prev === id ? null : id)),
    [],
  )

  useEffect(() => {
    if (!openId) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); close() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openId, close])

  return (
    <main className="proj-page">
      <div className="proj-nav">
        <BackButton />
      </div>

      <div className="proj-list">
        {PROJECTS.map((p) => (
          <button
            key={p.id}
            className="proj-entry"
            data-open={openId === p.id ? 'true' : undefined}
            onClick={() => toggle(p.id)}
            aria-expanded={openId === p.id}
            aria-label={`Open ${p.title}`}
          >
            {/* Header: icon + title/description */}
            <div className="proj-entry-header">
              {p.icon && (
                <div className="proj-entry-icon">
                  <img src={p.icon} alt="" />
                </div>
              )}
              <div className="proj-entry-info">
                <span className="proj-entry-title">{p.title}</span>
                <span className="proj-entry-sub">{p.sub}</span>
                <span className="proj-entry-tagline">{p.tagline}</span>
              </div>
            </div>

            {/* Preview images */}
            {p.images.length > 0 && (
              <div className="proj-entry-gallery">
                <div className="proj-entry-gallery-img">
                  <img src={p.images[0].src} alt={p.images[0].alt} />
                </div>
                {p.cardVideoId ? (
                  <a
                    href={`https://www.youtube.com/watch?v=${p.cardVideoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="proj-entry-gallery-img proj-entry-gallery-video"
                    onClick={(e) => e.stopPropagation()}
                    aria-label="Watch demo video on YouTube"
                  >
                    <img
                      src={`https://img.youtube.com/vi/${p.cardVideoId}/hqdefault.jpg`}
                      alt="Demo video thumbnail"
                    />
                    <span className="proj-entry-gallery-play" aria-hidden="true">▶</span>
                  </a>
                ) : p.images[1] ? (
                  <div className="proj-entry-gallery-img">
                    <img src={p.images[1].src} alt={p.images[1].alt} />
                  </div>
                ) : null}
              </div>
            )}

            {/* Bottom links */}
            {p.links.length > 0 && (
              <div className="proj-entry-links">
                {p.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="proj-entry-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {l.label === 'GitHub' ? (
                      <>
                        <img src="/assets/Github%20Logo.png" alt="" aria-hidden="true" className="proj-entry-link-logo" />
                        {p.title}
                      </>
                    ) : (
                      <>▶ {l.label}</>
                    )}
                  </a>
                ))}
              </div>
            )}
          </button>
        ))}
      </div>

      {openProject && (
        <ProjectOverlay
          key={openProject.id}
          project={openProject}
          onClose={close}
        />
      )}
    </main>
  )
}

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
      'Built a four-axis robotic arm from scratch — 3D-printed PLA structure, four MG90S/SG90 servos, and a custom Arduino Nano shield designed in Altium Designer. Firmware written in C++ with PlatformIO supports four control modes: manual potentiometer, record (capture a motion sequence), playback (replay it smoothly), and gesture (a Python + OpenCV + MediaPipe pipeline maps your hand\'s extended fingers to servo axes in real time over serial).',
    bullets: [
      'Custom PCB shield in Altium Designer — routes power, servo headers, and potentiometer inputs on a single board',
      'Record mode captures servo positions at ~60 Hz; Playback replays with microsecond-level smooth interpolation',
      'Gesture mode uses MediaPipe Hands to map five finger states to four servo axes via Python → pyserial bridge',
      'Sensor averaging and microsecond servo control eliminate jitter during manual and playback modes',
      '3D-printed PLA parts designed in CAD; full assembly from raw filament to working arm',
    ],
    stack: ['Arduino Nano', 'C++ / PlatformIO', 'Python', 'OpenCV', 'MediaPipe', 'Altium Designer', 'pyserial'],
    links: [
      { label: 'GitHub', href: 'https://github.com/Jarank-git/Robotic_arm' },
    ],
    images: [
      { src: '/images/projects/robotic-arm/final-product.jpg', alt: 'Completed robotic arm' },
      { src: '/images/projects/robotic-arm/arm-3d.png', alt: '3D model of the robotic arm' },
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
      'Designed a 5V-to-3.3V Low-Dropout voltage regulator for the Waterloo Aerial Robotics Group competition drone avionics rail. Built around the MIC5317-3.3YM5-TR (SOT-23-5, 150 mA), with X5R MLCC decoupling on both rails, a current-limiting resistor, and a power indicator LED. Every component required custom schematic symbols and PCB footprints translated directly from manufacturer datasheets.',
    bullets: [
      'Schematic and PCB layout built from scratch in Altium Designer using the MIC5317-3.3YM5-TR LDO IC',
      'Translated 5+ datasheets for non-standard components into custom schematic symbols and PCB footprints',
      'X5R MLCC capacitors on input and output rails for stable low-ESR decoupling at drone operating temps',
      'Validated output voltage, ripple, and stability on bench with oscilloscope and multimeter',
      'Iterated through 25+ layout corrections via soldering to meet WARG avionics power specs',
    ],
    stack: ['Altium Designer', 'Oscilloscope', 'Soldering', 'PCB Layout', 'Power Electronics'],
    links: [
      { label: 'GitHub', href: 'https://github.com/Jarank-git/LDO-Voltage-Regulator' },
    ],
    images: [
      { src: '/images/projects/ldo/schematic-2.png', alt: 'LDO schematic' },
      { src: '/images/projects/ldo/pcb-layout.png', alt: 'PCB layout in Altium Designer' },
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
      'Built at HackCanada 2026, PawPrint is a full-stack web app that turns raw shelter photos into polished adoption campaigns in minutes. Volunteers run through a 3-step wizard: enter pet details, upload photos and video via a Cloudinary widget, then review AI-generated captions and select a hero image. The resulting profile page produces platform-sized image packs (Instagram, Twitter, Facebook, YouTube), a printable QR-code kennel card, and a sharable link — all without a traditional database. Every pet record lives as structured metadata on Cloudinary assets and is queried back through the Cloudinary Search API.',
    bullets: [
      'Cloudinary doubles as media host and database — pet data encoded as structured metadata on every asset, queried via the Search API; no separate DB needed',
      'Google Gemini 2.0 Flash generates warm adoption captions plus five platform-tailored variants (tone, length, hashtag count) from pet details alone',
      'Smart hero selection uses Cloudinary quality_analysis.focus scores to surface the best photo automatically; volunteers override via a tag-hero serverless endpoint',
      'Client-side ZIP generation with JSZip builds platform-optimized packs (1080×1080 Instagram, 1200×675 Twitter, etc.) entirely in the browser — no server compute',
      'Vercel serverless functions gate all secrets (Cloudinary admin SDK, Gemini API key) while the React + Vite frontend stays fully static and deployable to any CDN',
    ],
    stack: ['React 19', 'TypeScript', 'Vite', 'Google Gemini 2.0', 'Cloudinary', 'Vercel', 'JSZip'],
    links: [
      { label: 'GitHub', href: 'https://github.com/Jarank-git/HackCanada2026' },
    ],
    images: [
      { src: '/images/projects/pawprint/pet-profile.png', alt: 'Pet profile page for Buddy the Shiba Inu' },
      { src: '/images/projects/pawprint/platform-packs.png', alt: 'Platform-optimized download packs' },
      { src: '/images/projects/pawprint/upload-wizard.png', alt: '3-step upload wizard — pet details' },
      { src: '/images/projects/pawprint/platform-captions.png', alt: 'AI-generated platform captions' },
    ],
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
      'Built in 36 hours at UTRAHacks 2025, Arctic Analytics pairs a fully autonomous line-following robot with a real-time telemetry platform. An Arduino Uno R4 WiFi fuses data from IR, ultrasonic, and color sensors to navigate a track while simultaneously streaming motor RPM, distance, and line-sensor readings to a MongoDB backend. A React + Vite dashboard displays the live feed for calibration and analysis. An ElevenLabs AI voice mascot provides audio commentary. Achieved top 5 overall out of 300+ participants.',
    bullets: [
      'Autonomous navigation via IR line sensors + ultrasonic obstacle detection + color-based zone detection',
      'Real-time telemetry: motor RPM, distance, and line-follow data streamed over WiFi from Arduino to MongoDB',
      'React + Vite dashboard displays live sensor feeds for on-the-fly calibration and post-run analysis',
      'Arduino firmware split across 6 modular .ino files — motor, ultrasonic, line-follow, color, arm, comms',
      'ElevenLabs AI voice mascot provides audio commentary on robot state during runs',
      'Top 5 overall at UTRAHacks 2025 out of 300+ participants across all disciplines',
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
                {p.images.slice(0, 2).map((img) => (
                  <div key={img.src} className="proj-entry-gallery-img">
                    <img src={img.src} alt={img.alt} />
                  </div>
                ))}
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
                    <img src="/assets/Github%20Logo.png" alt="" aria-hidden="true" className="proj-entry-link-logo" />
                    {p.title}
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

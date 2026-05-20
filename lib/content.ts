import type {
  Project, Role, AboutSlab, ContactLink, MenuItem,
} from '@/types/content'

export const projects: Project[] = [
  {
    slug: 'robotic-arm',
    title: 'Robotic Arm: Record/Playback & Hand Control',
    tagline: 'Four-axis arm with potentiometer control, motion record/playback, and live MediaPipe hand-gesture tracking — all on a custom PCB shield.',
    year: 'Mar–Apr 2026',
    summary: 'Built a four-axis robotic arm from scratch — 3D-printed PLA structure, four MG90S/SG90 servos, and a custom Arduino Nano shield designed in Altium Designer. Firmware written in C++ with PlatformIO supports four control modes: manual potentiometer, record (capture a motion sequence), playback (replay it smoothly), and gesture (a Python + OpenCV + MediaPipe pipeline maps your hand\'s extended fingers to servo axes in real time over serial).',
    bullets: [
      'Custom PCB shield in Altium Designer — routes power, servo headers, and potentiometer inputs on a single board',
      'Record mode captures servo positions at ~60 Hz; Playback replays with microsecond-level smooth interpolation',
      'Gesture mode uses MediaPipe Hands to map five finger states to four servo axes via Python → pyserial bridge',
      'Sensor averaging and microsecond servo control eliminate jitter during manual and playback modes',
      '3D-printed PLA parts designed in CAD; full assembly from raw filament to working arm',
    ],
    stack: ['Arduino Nano', 'C++ / PlatformIO', 'Python', 'OpenCV', 'MediaPipe', 'Altium Designer', 'pyserial'],
    images: [
      { src: '/images/projects/robotic-arm/final-product.jpg', alt: 'Completed robotic arm' },
      { src: '/images/projects/robotic-arm/full-assembly.jpg', alt: 'First full assembly' },
      { src: '/images/projects/robotic-arm/wiring-clean.jpg', alt: 'Cleaned wiring harness' },
      { src: '/images/projects/robotic-arm/partial-assembly.jpg', alt: 'Partial assembly stage' },
      { src: '/images/projects/robotic-arm/pcb-3d.png', alt: '3D render of the custom PCB shield' },
      { src: '/images/projects/robotic-arm/schematic.png', alt: 'Power and servo schematic' },
    ],
    links: [
      { href: 'https://github.com/Jarank-git/Robotic_arm', label: 'GitHub', kind: 'github' },
    ],
  },
  {
    slug: 'arctic',
    title: 'Arctic Analytics: IoT Line-Follow Robot',
    tagline: 'Top-5 finish at UTRAHacks out of 300+ — autonomous robot streams live telemetry to a React dashboard over WiFi.',
    year: 'Oct–Nov 2025',
    summary: 'Built in 36 hours at UTRAHacks 2025, Arctic Analytics pairs a fully autonomous line-following robot with a real-time telemetry platform. An Arduino Uno R4 WiFi fuses data from IR, ultrasonic, and color sensors to navigate a track while simultaneously streaming motor RPM, distance, and line-sensor readings to a MongoDB backend. A React + Vite dashboard displays the live feed for calibration and analysis.',
    bullets: [
      'Autonomous navigation via IR line sensors + ultrasonic obstacle detection + color-based zone detection',
      'Real-time telemetry: motor RPM, distance, and line-follow data streamed over WiFi from Arduino to MongoDB',
      'React + Vite dashboard displays live sensor feeds for on-the-fly calibration and post-run analysis',
      'Arduino firmware split across 6 modular .ino files — motor, ultrasonic, line-follow, color, arm, comms',
      'ElevenLabs AI voice mascot provides audio commentary on robot state during runs',
      'Top 5 overall at UTRAHacks 2025 out of 300+ participants across all disciplines',
    ],
    stack: ['Arduino Uno R4 WiFi', 'C++', 'Python', 'React', 'Vite', 'MongoDB', 'ElevenLabs API'],
    images: [
      { src: '/images/projects/arctic/dashboard.jpg',   alt: 'Live telemetry dashboard' },
      { src: '/images/projects/arctic/robot.jpg',       alt: 'Arctic Analytics robot' },
      { src: '/images/projects/arctic/robot-front.jpg', alt: 'Robot front view' },
      { src: '/images/projects/arctic/robot-back.jpg',  alt: 'Robot back view' },
      { src: '/images/projects/arctic/robot-top.jpg',   alt: 'Robot top view' },
    ],
    links: [
      { href: 'https://github.com/IshaanMittal07/ArcticAnalytics', label: 'GitHub', kind: 'github' },
    ],
  },
  {
    slug: 'stm32-imu',
    title: 'STM32F4 + MPU-6050 IMU Development Board',
    tagline: '4-layer PCB with STM32F411 + MPU-6050 — designed as a stepping stone toward a custom flight controller.',
    year: 'Sep–Oct 2025',
    summary: 'Designed a 4-layer development board around the STM32F411CEU6 (Cortex-M4 with FPU, 512 KB flash) and MPU-6050 6-axis IMU as preliminary work toward a custom flight controller. Power is delivered through a Micro USB port via an AMS1117-3.3 LDO; a 24 MHz crystal oscillator drives the MCU. The layout includes differential 90 Ω USB traces, dual ground planes for signal integrity, pi filtering on VBUS, and a data-ready interrupt from the IMU to eliminate polling overhead.',
    bullets: [
      '4-layer PCB with controlled impedance from JLCPCB — dual ground planes for signal integrity',
      'STM32F411CEU6 Cortex-M4 with FPU, 512 KB flash, driven by 24 MHz crystal oscillator',
      'MPU-6050 6-axis accelerometer + gyroscope over I2C with data-ready interrupt and 2.2 kΩ pull-ups',
      'Differential 90 Ω USB traces (0.26 mm / 0.2 mm gap) and pi filtering on VBUS for clean power',
      'Full SWD debug interface with debounced reset; boot0 disabled to prevent spurious resets',
    ],
    stack: ['STM32F411CEU6', 'MPU-6050', 'Altium Designer', 'JLCPCB', 'Power Electronics'],
    images: [
      { src: '/images/projects/stm32-imu/3D_View.png',      alt: '3D render of the PCB' },
      { src: '/images/projects/stm32-imu/Top_Layer.png',    alt: 'PCB top copper layer' },
      { src: '/images/projects/stm32-imu/Bottom_Layer.png', alt: 'PCB bottom copper layer' },
      { src: '/images/projects/stm32-imu/Footprint.png',    alt: 'Component footprint layout' },
      { src: '/images/projects/stm32-imu/IMU.png',          alt: 'MPU-6050 IMU schematic block' },
      { src: '/images/projects/stm32-imu/STM32F4.png',      alt: 'STM32F4 schematic block' },
    ],
    links: [
      { href: 'https://github.com/Jarank-git/STM32F4-MPU-6050-Schematic-and-PCB', label: 'GitHub', kind: 'github' },
    ],
  },
]

export const experience: Role[] = [
  {
    slug: 'renellence',
    title: 'Business Automation & Systems Developer (Co-op)',
    company: 'Renellence Inc.',
    location: 'North York, Ontario',
    start: '2026-01',
    end: 'present',
    summary: 'Designed and built a B2B sales automation platform integrating five systems to handle $50k+ in gross sales across 100+ orders and four sales representatives.',
    bullets: [
      'Designed and implemented a B2B sales automation platform using 5 systems (Shopify, QuickBooks, Gmail, Google Sheets, Google Places) handling $50k+ gross sales from 100+ orders and 4 sales reps.',
      'Streamlined a 6-stage manual process across 3 platforms into a single order submission that creates invoices, generates payment links, reconciles QuickBooks, and triggers warehouse fulfillment.',
      'Automated order routing with FEFO lot allocation, real-time QuickBooks inventory checks, provincial-level tax calculation, CEO approval gates, and automatic rollback on failure.',
      'Built a front-end ordering platform restricted to authenticated sales reps, with 6 internal webhook endpoints secured via HMAC-SHA256 signed requests and client-side cached customer search.',
    ],
  },
  {
    slug: 'civilcraft',
    title: 'Systems Engineering Intern',
    company: 'Civilcraft Engineering LLC',
    location: 'New York City, New York',
    start: '2025-06',
    end: '2025-08',
    summary: "Secured $30k in contracts by building an automated lead-generation system targeting New York City's Facade Inspection Safety Program.",
    bullets: [
      'Secured $30k in contracts through an automated lead-generation system targeting the Facade Inspection Safety Program (FISP), which mandates exterior inspections for NYC buildings.',
      'Designed a data acquisition pipeline integrating NYC Open Data APIs with Python and pandas to structure 700,000+ records, applying 1 RCNY §103-04 FISP logic to isolate assets due for inspection.',
    ],
  },
  {
    slug: 'warg',
    title: 'Electrical Subsystem Member',
    company: 'Waterloo Aerial Robotics Group',
    location: 'Waterloo, Ontario',
    start: '2025-09',
    end: 'present',
    summary: 'Designing and validating custom PCBs for competition drone power systems at WARG.',
    bullets: [
      'Designed 10+ custom schematics and PCBs for competition drone power systems using Altium Designer.',
      'Validated PCBs with oscilloscope and multimeter, making 25+ necessary corrections through soldering.',
      'Collaborated on subsystem integration and hands-on implementation of PCBs onto the final competition drone.',
    ],
  },
  {
    slug: 'codeninjas',
    title: 'Coding Instructor',
    company: 'Code Ninjas',
    location: 'Milton, Ontario',
    start: '2025-07',
    end: '2025-08',
    summary: 'Taught programming fundamentals to students aged 7–14 at a Code Ninjas learning centre.',
    bullets: [
      'Instructed students aged 7–14 in programming fundamentals using block-based and JavaScript curricula.',
      'Mentored students through project-based challenges, tracking individual progress and adapting pacing.',
    ],
  },
]

export const aboutSlabs: AboutSlab[] = [
  { slug: 'bio',       title: 'Bio',       body: 'TBD' },
  { slug: 'education', title: 'Education', body: 'TBD' },
  {
    slug: 'resume',
    title: 'Resume',
    body: 'TBD',
    download: { href: '/resume.pdf', label: 'Download Resume' },
  },
]

export const contactLinks: ContactLink[] = [
  {
    slug: 'email',
    label: 'Email',
    handle: 'Jarankhalid2@gmail.com',
    href: 'mailto:Jarankhalid2@gmail.com',
    external: false,
  },
  {
    slug: 'linkedin',
    label: 'LinkedIn',
    handle: 'linkedin.com/in/jaran-khalid',
    href: 'https://linkedin.com/in/jaran-khalid/',
    external: true,
  },
  {
    slug: 'github',
    label: 'GitHub',
    handle: 'github.com/Jarank-git',
    href: 'https://github.com/Jarank-git',
    external: true,
  },
]

export const MAIN_ITEMS: MenuItem[] = [
  { label: 'About',      href: '/about' },
  { label: 'Projects',   href: '/projects' },
  { label: 'Experience', href: '/experience' },
  { label: 'Contact',    href: '/contact' },
]

export const toProjectMenuItem = (p: Project): MenuItem => ({
  label: p.title,
  href: `/projects/${p.slug}`,
  description: p.tagline,
})

export const toRoleMenuItem = (r: Role): MenuItem => ({
  label: r.title,
  href: `/experience/${r.slug}`,
  description: r.company,
})

export const toAboutMenuItem = (a: AboutSlab): MenuItem => ({
  label: a.title,
  href: `/about/${a.slug}`,
})

export const toContactMenuItem = (c: ContactLink): MenuItem => ({
  label: c.label,
  href: c.href,
  description: c.handle,
  external: c.external,
})

export const getProject     = (slug: string) => projects.find((p) => p.slug === slug)
export const getRole        = (slug: string) => experience.find((r) => r.slug === slug)
export const getAboutSlab   = (slug: string) => aboutSlabs.find((a) => a.slug === slug)
export const getContactLink = (slug: string) => contactLinks.find((c) => c.slug === slug)

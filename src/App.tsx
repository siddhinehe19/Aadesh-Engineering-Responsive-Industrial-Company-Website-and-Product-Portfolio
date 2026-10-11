import { useEffect, useMemo, useState, type FormEvent } from 'react'
import './App.css'

const company = {
  name: 'Aadesh Engineering',
  phone: '+91 98501 66387',
  phoneLink: '+919850166387',
  email: 'aadeshengineering@yahoo.com',
  address: 'Gat No. 78, Shivshankar Industrial Estate, Jyotibanagar, Talawade, Pune, Maharashtra',
  mapQuery: 'Aadesh Engineering, Gat No. 78, Shivshankar Industrial Estate, Jyotibanagar, Talawade, Pune',
}

const currentYear = new Date().getFullYear()

type Product = {
  name: string
  category: string
  image: string
  description: string
  detail: string
}

type Page = 'home' | 'export'

const products: Product[] = [
  {
    name: 'Chain Tensioner Nuts',
    category: 'Automotive',
    image: 'image34.jpeg',
    description: 'Precision-machined components for automotive chain tensioner assemblies.',
    detail: 'Manufactured to customer drawings or samples. Material, dimensions, tolerances and quantities are confirmed for each enquiry.',
  },
  {
    name: 'Oil Pump Shafts',
    category: 'Automotive',
    image: 'image31.jpeg',
    description: 'Turned components for oil pump and powertrain applications.',
    detail: 'Made to order against your part requirements. Share a drawing or sample to discuss material, finish and inspection needs.',
  },
  {
    name: 'Precision Gears',
    category: 'Automotive',
    image: 'image29.jpeg',
    description: 'Machined gears produced to customer-supplied specifications.',
    detail: 'Discuss tooth form, material and dimensions with the team. Final specifications are confirmed before order acceptance.',
  },
  {
    name: 'Decomp Rollers',
    category: 'Automotive',
    image: 'image35.jpeg',
    description: 'Compact turned parts for decompression and engine mechanisms.',
    detail: 'Send your component drawing or a reference sample so the team can review the application and production requirements.',
  },
  {
    name: 'Metallic Spacers',
    category: 'Precision parts',
    image: 'image24.jpeg',
    description: 'Accurately machined spacers for repeatable assembly fit.',
    detail: 'Available to customer specifications. Please provide the required dimensions, material and order quantity for a quotation.',
  },
  {
    name: 'Mounting Pins',
    category: 'Precision parts',
    image: 'image23.jpeg',
    description: 'Machined mounting pins for automotive component assemblies.',
    detail: 'Produced to order from a drawing or physical sample. Required tolerances and inspection criteria can be shared during enquiry.',
  },
  {
    name: 'Metallic Sleeves',
    category: 'Precision parts',
    image: 'image26.jpeg',
    description: 'Close-tolerance sleeves made for fit and function.',
    detail: 'Share your part drawing, material preference and quantity to discuss a made-to-order requirement.',
  },
  {
    name: 'Adapter Tubes',
    category: 'Precision parts',
    image: 'image25.jpeg',
    description: 'Custom-machined tube components for specific applications.',
    detail: 'Dimensions and specifications are indicative until reviewed and confirmed by Aadesh Engineering at the time of order.',
  },
]

const awards = [
  {
    title: 'Advik Best Kaizen Award',
    year: '2018-19',
    subtitle: 'Supplier recognition',
    image: '/images/company/award-advik-best-kaizen-2018-19.png',
  },
  {
    title: 'Advik Best Initiative in DISHA',
    year: '2016',
    subtitle: 'Aadesh Engineering',
    image: '/images/company/award-advik-disha-2016.png',
  },
  {
    title: 'Advik Best Kaizen 1st runner up Award',
    year: '2017-18',
    subtitle: 'Continuous improvement',
    image: '/images/company/award-advik-kaizen-runner-up-2017-18.png',
  },
]

const inspectionFacilities = [
  { name: 'Digital Height Gauge', image: 'image38.jpeg' },
  { name: 'Surface Roughness Tester', image: 'image39.jpeg' },
  { name: 'Profile Projector', image: 'image40.png' },
  { name: 'Hardness Tester', image: 'image41.jpeg' },
]

const machineTypes = [
  'CNC',
  'Milling',
  'Traub',
  'Centreless grinding',
  'Cylindrical grinding',
  'Bench grinding',
  'Drilling / tapping',
]

const machines = [
  { name: 'CNC machine — Jobber', image: 'machine-cnc-jobber.jpeg' },
  { name: 'CNC machine — LMV', image: 'machine-cnc-lmv.jpeg' },
  { name: 'Milling machine', image: 'machine-milling-samson.jpeg', maker: 'Samson', rotateImage: true },
  { name: 'Traub machine', image: 'machine-traub-pmt.jpeg', maker: 'PMT' },
]

const customerLogos = [
  { name: 'LUMAX', image: 'image15.jpeg' },
  { name: 'OKAY INDUSTRIES', image: 'image19.png' },
  { name: 'GKR', image: 'image17.png' },
  { name: 'ADVIK HI-TECH PVT. LTD.', image: 'image20.png' },
  { name: 'POONA FORGE PVT. LTD.', image: 'image21.png' },
  { name: 'LAMBIKA', image: 'image18.jpeg' },
  { name: 'HONEYWELL', image: 'image16.png' },
  { name: 'STEHENBERG TECHNOLOGIES PVT. LTD.', image: 'partner-stehenberg.png' },
  { name: 'MATCH-WELL DIECASTERS', image: 'image22.png' },
]

const plantStats = [
  { value: '9200', suffix: 'sq. ft.', label: 'Plant area' },
  { value: '103', label: 'Employees' },
]

const exportHighlights = [
  {
    title: 'Drawing-led manufacturing',
    text: 'We work from customer drawings, sample parts and technical specifications to manufacture precise components for defined performance requirements.',
  },
  {
    title: 'Quality and documentation',
    text: 'Our ISO 9001:2015-aligned system supports consistent process control, inspection routines and reliable supply chain communication.',
  },
  {
    title: 'TPM and continuous improvement',
    text: 'Aadesh Engineering is committed to TPM culture, zero breakdown thinking and steady improvements in process efficiency and quality.',
  },
]

const exportProcess = [
  'Technical requirement review',
  'Drawing, sample and material confirmation',
  'Feasibility and production planning',
  'Quality check and dispatch',
]

const orderSteps = [
  { title: 'Share your drawing', description: 'Send a technical drawing, sample part or clear reference to get started.' },
  { title: 'Tell us the details', description: 'Include material, quantity, tolerances and your required delivery timeframe.' },
  { title: 'Review the proposal', description: 'We’ll discuss feasibility, confirm specifications and share a quotation.' },
  { title: 'Move to production', description: 'Once the requirements are agreed, we plan the order and start production.' },
]

const imagePath = (image: string) => `/images/company/${image}`

function ArrowUpRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 15 15 5M6 5h9v9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3.5 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function OrderStepIcon({ step }: { step: number }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      {step === 1 && <><path d="M9 4.5h9l6 6v17H9z" /><path d="M18 4.5v6h6M13 16h7M13 20h7M13 24h4" /></>}
      {step === 2 && <><path d="M5 9h22M5 16h22M5 23h22" /><circle cx="12" cy="9" r="2.5" /><circle cx="21" cy="16" r="2.5" /><circle cx="14" cy="23" r="2.5" /></>}
      {step === 3 && <><path d="M9 4.5h9l6 6v17H9z" /><path d="M18 4.5v6h6M12.5 19l2.5 2.5 5-5" /></>}
      {step === 4 && <><path d="M4 27V14l8-4v5l7-4v5l8-4v15z" /><path d="M19 12V5h5v4M8 20h3v3H8zM17 20h3v3h-3z" /></>}
    </svg>
  )
}

function OrderComponentArtwork() {
  return (
    <svg className="order-artwork" viewBox="0 0 700 260" role="img" aria-labelledby="order-artwork-title">
      <title id="order-artwork-title">Illustration of precision-machined components over engineering drawing lines</title>
      <defs>
        <pattern id="drawing-dots" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#8d9879" opacity=".24" />
        </pattern>
        <linearGradient id="shaft-metal" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#f7f8f4" />
          <stop offset=".18" stopColor="#8d9490" />
          <stop offset=".38" stopColor="#f4f4ed" />
          <stop offset=".62" stopColor="#737b79" />
          <stop offset=".82" stopColor="#d9dcd5" />
          <stop offset="1" stopColor="#59615e" />
        </linearGradient>
        <linearGradient id="dark-metal" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#f0f2ed" />
          <stop offset=".35" stopColor="#747d79" />
          <stop offset=".55" stopColor="#d9dcd6" />
          <stop offset="1" stopColor="#515a57" />
        </linearGradient>
        <linearGradient id="face-metal" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#e6e9e3" />
          <stop offset=".5" stopColor="#8a918c" />
          <stop offset="1" stopColor="#f3f4ef" />
        </linearGradient>
        <filter id="component-shadow" x="-20%" y="-30%" width="150%" height="180%">
          <feDropShadow dx="2" dy="8" stdDeviation="6" floodColor="#303831" floodOpacity=".22" />
        </filter>
      </defs>
      <rect width="700" height="260" fill="url(#drawing-dots)" />
      <g fill="none" stroke="#929c80" strokeWidth="1" opacity=".28">
        <path d="M30 210 290 28h355M76 232 350 40M95 48h240M105 42v80M310 35v65M540 40v75" />
        <path d="m95 45 8 4-8 4m242-7-8 4 8 4M104 110l-4-8m4 8 4-8M310 66l-4 8m4-8 4 8" />
        <circle cx="260" cy="64" r="30" strokeDasharray="3 4" />
      </g>
      <g fill="#85946c" opacity=".55">
        <rect x="38" y="35" width="8" height="8" />
        <rect x="643" y="70" width="17" height="17" />
        <rect x="667" y="96" width="8" height="8" />
      </g>
      <g filter="url(#component-shadow)" stroke="#59615d" strokeLinejoin="round">
        <g transform="rotate(-16 280 136)">
          <path d="M82 112h295a13 13 0 0 1 13 13v20a13 13 0 0 1-13 13H82z" fill="url(#shaft-metal)" strokeWidth="1.5" />
          <ellipse cx="82" cy="136" rx="13" ry="24" fill="url(#dark-metal)" strokeWidth="1.5" />
          <ellipse cx="82" cy="136" rx="6" ry="15" fill="#303835" stroke="#e0e3dc" strokeWidth="2" />
          <path d="M48 124h34v24H48a9 9 0 0 1-9-9v-6a9 9 0 0 1 9-9Z" fill="url(#dark-metal)" strokeWidth="1.5" />
          <path d="M135 113v46m8-46v46m135-46v46m9-46v46m54-46v46" fill="none" stroke="#58605d" strokeWidth="2" opacity=".72" />
          <path d="M157 120h93v10h-93z" fill="#525b57" stroke="#d9dcd5" strokeWidth="1.5" />
          <path d="M157 122h90" stroke="#f0f1eb" strokeWidth="1" opacity=".8" />
          <ellipse cx="365" cy="136" rx="12" ry="24" fill="url(#face-metal)" strokeWidth="1.5" />
        </g>
        <g>
          <path d="m423 83 39-24 48 15-38 25z" fill="#eef0e9" />
          <path d="m423 83 49 16v60l-49-18z" fill="url(#dark-metal)" />
          <path d="m472 99 38-25v58l-38 27z" fill="url(#shaft-metal)" />
          <ellipse cx="472" cy="84" rx="18" ry="10" fill="#303835" stroke="#d9dcd6" strokeWidth="5" />
          <ellipse cx="472" cy="84" rx="8" ry="4" fill="#8b938d" stroke="none" />
          <circle cx="435" cy="110" r="5" fill="#39413d" stroke="#e8eae5" strokeWidth="2" />
          <circle cx="486" cy="110" r="5" fill="#39413d" stroke="#e8eae5" strokeWidth="2" />
        </g>
        <g>
          <path d="m398 190 27-16 40 13-28 18z" fill="#f0f2ec" />
          <path d="m398 190 39 15v30l-39-14z" fill="url(#dark-metal)" />
          <path d="m437 205 28-18v28l-28 20z" fill="url(#shaft-metal)" />
          <ellipse cx="418" cy="197" rx="19" ry="11" fill="url(#face-metal)" />
          <ellipse cx="418" cy="197" rx="9" ry="5" fill="#343b38" stroke="#f2f3ed" strokeWidth="2" />
        </g>
        <g>
          <path d="m578 144 11-7 10 4 5-11 12 1 4 11 11 3 1 12 10 7-4 11 6 10-8 9 1 12-12 3-5 10-12-3-9 8-10-7-11 4-7-10-12-1-2-12-10-6 4-12-6-10 8-9-1-12 11-4z" fill="url(#dark-metal)" />
          <ellipse cx="607" cy="181" rx="35" ry="27" fill="url(#face-metal)" />
          <ellipse cx="607" cy="181" rx="20" ry="15" fill="#4c5551" stroke="#e7eae3" strokeWidth="3" />
          <ellipse cx="607" cy="181" rx="10" ry="7" fill="#262e2a" stroke="#c4c9c0" strokeWidth="2" />
          <path d="M579 178c13-15 42-19 57-5" fill="none" stroke="#fff" strokeWidth="2" opacity=".65" />
        </g>
      </g>
    </svg>
  )
}

function WhatsAppMark() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 11.7a8 8 0 0 1-11.8 7l-4.2 1.1 1.1-4.1A8 8 0 1 1 20 11.7Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 8.3c.3-.6.6-.6.9-.6h.5c.2 0 .4.1.5.4l.7 1.7c.1.2.1.4-.1.6l-.5.6c-.2.2-.2.4-.1.6.5.9 1.3 1.7 2.2 2.2.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.6.8c.2.1.3.3.3.5 0 .4-.2 1-.6 1.3-.4.4-1.1.6-1.7.5-1-.2-2.1-.7-3.2-1.5-1.7-1.2-2.8-2.8-3.1-3.9-.3-.9 0-1.7.7-2.2Z" fill="currentColor" />
    </svg>
  )
}

function ProductImage({ product, className = '' }: { product: Product; className?: string }) {
  return (
    <img
      className={className}
      src={imagePath(product.image)}
      alt={`${product.name}, machined component by Aadesh Engineering`}
      loading="lazy"
    />
  )
}

function HomePage({
  menuOpen,
  setMenuOpen,
  activeCategory,
  setActiveCategory,
  selectedProduct,
  setSelectedProduct,
  formProduct,
  setFormProduct,
  submitted,
  setSubmitted,
  setShowEnquiry,
}: {
  menuOpen: boolean
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
  activeCategory: string
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>
  selectedProduct: Product | null
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>>
  formProduct: string
  setFormProduct: React.Dispatch<React.SetStateAction<string>>
  submitted: boolean
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>
  setShowEnquiry: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const visibleProducts = useMemo(
    () => activeCategory === 'All parts'
      ? products
      : products.filter((product) => product.category === activeCategory),
    [activeCategory],
  )

  useEffect(() => {
    if (!selectedProduct) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedProduct(null)
    }
    document.addEventListener('keydown', closeOnEscape)
    document.body.classList.add('modal-open')
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.body.classList.remove('modal-open')
    }
  }, [selectedProduct, setSelectedProduct])

  function startEnquiry(productName = '') {
    setFormProduct(productName)
    setSubmitted(false)
    setSelectedProduct(null)
    setShowEnquiry(true)
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  function sendEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') ?? '').trim()
    const quantity = String(formData.get('quantity') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()
    const part = formProduct.trim() || 'Custom part'
    const text = [
      'Hello, I would like to enquire about an order for auto machine child parts.',
      `Name: ${name}`,
      `Part / Product: ${part}`,
      `Quantity Required: ${quantity}`,
      `Message: ${message}`,
    ].join('\n')

    window.open(`https://wa.me/${company.phoneLink.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
    setSubmitted(true)
  }

  const quickEnquiry = (productName: string) => {
    const text = [
      'Hello, I would like to enquire about an order for auto machine child parts.',
      'Name: ',
      `Part / Product: ${productName}`,
      'Quantity Required: ',
      'Message: ',
    ].join('\n')
    return `https://wa.me/${company.phoneLink.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <div className="topline">
        <div className="container topline-inner">
          <span><span className="status-dot" /> ISO 9001:2015 certified · Established 2007</span>
          <a href={`mailto:${company.email}`}>{company.email}<ArrowUpRight size={13} /></a>
        </div>
      </div>

      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#/" aria-label="Aadesh Engineering home" onClick={closeMenu}>
            <span className="brand-mark"><img src={imagePath('image2.jpeg')} alt="Aadesh Engineering logo" /></span>
            <span className="brand-copy">
              <strong>AADESH</strong>
              <small>ENGINEERING</small>
            </span>
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span /><span />
          </button>
          <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
            <a href="#about" onClick={closeMenu}>About</a>
            <a href="#capabilities" onClick={closeMenu}>Capabilities</a>
            <a href="#machines" onClick={closeMenu}>Machines</a>
            <a href="#components" onClick={closeMenu}>Components</a>
            <a href="#/export" onClick={closeMenu}>Global Supply</a>
            <a href="#quality" onClick={closeMenu}>Quality</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
            <a className="nav-cta" href="#contact" onClick={closeMenu}>Talk to our team <ArrowUpRight size={14} /></a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-grain" aria-hidden="true" />
          <div className="hero-image-wrap" aria-hidden="true">
            <img src={imagePath('image7.jpeg')} alt="" fetchPriority="high" />
          </div>
          <div className="container hero-content">
            <div className="eyebrow light-eyebrow"><span className="eyebrow-line" /> ENGINEERED FOR PRECISION</div>
            <h1>Precision parts.<br /><em>Made to move.</em></h1>
            <p className="hero-intro">A dependable manufacturing partner for precision-machined automotive components — serving Indian and global supply chains with consistent quality, reliable delivery and customer-first execution.</p>
            <div className="hero-actions">
              <a className="button button-accent" href="#components">Explore components <ArrowRight /></a>
              <a className="text-link light-link" href="#about">Get to know us <ArrowUpRight /></a>
            </div>
            <div className="hero-badges" aria-label="Aadesh Engineering operating strengths">
              <span>Global ready</span>
              <span>ISO 9001:2015</span>
              <span>OEM focused</span>
            </div>
            <div className="hero-showcase" aria-label="Company performance indicators">
              <div className="showcase-card showcase-card-main">
                <span>Global supply</span>
                <strong>Precision machining for OEM and Tier-1 supply chains.</strong>
              </div>
              <div className="showcase-card showcase-card-small">
                <span>Quality</span>
                <strong>ISO 9001:2015</strong>
              </div>
            </div>
            <div className="hero-note"><span className="hero-note-mark">A.</span><span>Precision in every<br />part we make.</span></div>
          </div>
          <div className="hero-bottom container">
            <span>PRECISION MACHINING · TALAWADE, PUNE</span>
            <a href="#about" aria-label="Scroll to learn about Aadesh Engineering"><span>SCROLL TO EXPLORE</span><i /></a>
          </div>
        </section>

        <section className="trust-strip" aria-label="Company highlights">
          <div className="container trust-grid">
            <div className="trust-intro">Built on experience.<br /><strong>Focused on what’s next.</strong></div>
            <div className="trust-stat"><strong>2007</strong><span>Established</span></div>
            <div className="trust-stat"><strong>9200</strong><span>Sq. Ft. facility</span></div>
            <div className="trust-stat"><strong>103</strong><span>Employees</span></div>
            <div className="trust-cert"><span className="cert-seal">ISO<br /><b>9001</b></span><span>Quality management<br /><strong>ISO 9001:2015</strong></span></div>
          </div>
        </section>

        <section className="section about-section" id="about">
          <div className="container about-grid">
            <div className="about-media">
              <div className="about-photo-frame">
                <img src={imagePath('image1.jpeg')} alt="Aadesh Engineering's machining facility in Talawade, Pune" loading="lazy" />
                <span className="photo-index">01 / OUR FACILITY</span>
              </div>
              <div className="experience-stamp"><strong>2007</strong><span>ESTABLISHED<br />TALAWADE, PUNE</span></div>
              <span className="about-caption">MADE WITH INTENT. BUILT TO PERFORM.</span>
            </div>
            <div className="about-copy">
              <div className="eyebrow"><span className="eyebrow-line" /> ABOUT AADESH</div>
              <h2>Small components.<br /><em>Big responsibility.</em></h2>
              <p className="lead">Since 2007, we’ve been machining the precision components that help automotive systems work reliably.</p>
              <p>Based in Talawade, Pune, Aadesh Engineering makes automotive parts to customer drawings and samples. Our team brings together practical machining experience, a broad shop floor and a commitment to consistent quality.</p>
              <a className="text-link" href="#capabilities">Discover our capabilities <ArrowRight /></a>
              <div className="about-values">
                <div><span>01</span><strong>Customer-led</strong><small>Built around your part requirements</small></div>
                <div><span>02</span><strong>Made to order</strong><small>Produced to agreed specifications</small></div>
                <div><span>03</span><strong>Quality-minded</strong><small>Inspection through the process</small></div>
              </div>
            </div>
          </div>
        </section>

        <section className="capabilities-section" id="capabilities">
          <div className="container">
            <div className="section-heading capabilities-heading">
              <div>
                <div className="eyebrow light-eyebrow"><span className="eyebrow-line" /> BUILT TO MAKE</div>
                <h2>Capability with<br /><em>room to deliver.</em></h2>
              </div>
              <p>Versatile machining resources and hands-on experience come together to support automotive component requirements, from individual parts to production runs.</p>
            </div>
            <div className="capability-grid">
              <article className="capability-card feature-capability">
                <div className="cap-number">01</div>
                <div className="cap-icon cap-icon-cnc" aria-hidden="true"><span /><i /><b /></div>
                <div><h3>Turning &amp; machining</h3><p>CNC turning, Traub, milling, drilling and tapping for a broad range of machined components.</p></div>
                <span className="cap-detail">CNC · TRAUB</span>
              </article>
              <article className="capability-card">
                <div className="cap-number">02</div>
                <div className="cap-icon cap-icon-grind" aria-hidden="true"><span /><i /></div>
                <div><h3>Grinding operations</h3><p>Centreless, cylindrical and bench grinding capabilities support finishing requirements.</p></div>
                <span className="cap-detail">FINISHING OPERATIONS</span>
              </article>
              <article className="capability-card">
                <div className="cap-number">03</div>
                <div className="cap-icon cap-icon-inspect" aria-hidden="true"><span /><i /><b /></div>
                <div><h3>Inspection facilities</h3><p>Inspection tools include a profile projector, hardness tester, digital height gauge and surface roughness tester.</p></div>
                <span className="cap-detail">INSPECT · VERIFY · DELIVER</span>
              </article>
            </div>
            <p className="data-note">*Machine and team figures from the company profile. Equipment details are subject to confirmation.</p>
          </div>
        </section>

        <section className="customers-section">
          <div className="container">
            <div className="section-heading customers-heading">
              <div>
                <div className="eyebrow"><span className="eyebrow-line" /> OUR PARTNERS</div>
                <h2>Trusted by<br /><em>serious manufacturing partners.</em></h2>
              </div>
              <p>Our work is shaped by repeat customer requirements, long-term supplier relationships and a continuous focus on quality and delivery.</p>
            </div>
            <div className="customer-logo-header">OUR VALUED<br />CUSTOMERS</div>
            <div className="customer-logo-wall" aria-label="Customer trust and brand partners">
              {customerLogos.map((logo) => (
                <div key={logo.name} className="customer-logo">
                  <img
                    src={imagePath(logo.image)}
                    alt={`${logo.name} logo`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="quality-section" id="quality">
          <div className="container quality-grid">
            <div className="quality-copy">
              <div className="eyebrow light-eyebrow"><span className="eyebrow-line" /> QUALITY, BY DESIGN</div>
              <h2>Precision isn’t<br /><em>an afterthought.</em></h2>
              <p>Quality is part of how we work. Aadesh Engineering is ISO 9001:2015 certified and has inspection facilities to help verify machined components against agreed requirements.</p>
              <a className="button button-outline" href="#contact">Discuss your requirements <ArrowRight /></a>
              <a className="quality-certificate" href="/documents/iso-9001-certificate.pdf" target="_blank" rel="noreferrer">View ISO 9001:2015 certificate <ArrowUpRight size={14} /></a>
            </div>
            <div className="quality-visual">
              <div className="quality-facility-grid">
                {inspectionFacilities.map((facility, index) => (
                  <figure className="quality-facility" key={facility.name}>
                    <div className="quality-facility-photo">
                      <img src={imagePath(facility.image)} alt={facility.name} loading="lazy" />
                    </div>
                    <figcaption>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <strong>{facility.name}</strong>
                    </figcaption>
                  </figure>
                ))}
              </div>
              <div className="quality-badge"><span>QUALITY<br />MANAGEMENT</span><strong>ISO</strong><b>9001:2015</b><i>REGISTERED</i></div>
              <div className="quality-label"><span>4 IN-HOUSE TOOLS</span><strong>INSPECTION FACILITIES</strong></div>
              <div className="quality-line" aria-hidden="true" />
            </div>
          </div>
        </section>

        <section className="section products-section" id="components">
          <div className="container">
            <div className="section-heading products-heading">
              <div>
                <div className="eyebrow"><span className="eyebrow-line" /> OUR COMPONENT RANGE</div>
                <h2>Parts made for<br /><em>purpose.</em></h2>
              </div>
              <div className="products-intro">
                <p>From engine components to custom precision parts, each requirement starts with your drawing, sample and specification.</p>
                <span>Made to order · Quoted on enquiry</span>
              </div>
            </div>
            <div className="product-controls">
              <div className="filter-list" aria-label="Filter products">
                {['All parts', 'Automotive', 'Precision parts'].map((category) => (
                  <button
                    type="button"
                    key={category}
                    className={activeCategory === category ? 'filter-chip active' : 'filter-chip'}
                    aria-pressed={activeCategory === category}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <span className="result-count">0{visibleProducts.length} COMPONENTS</span>
            </div>
            <div className="product-grid">
              {visibleProducts.map((product, index) => (
                <article className="product-card" key={product.name} style={{ '--card-index': index } as React.CSSProperties}>
                  <button className="product-visual" type="button" onClick={() => setSelectedProduct(product)} aria-label={`View details for ${product.name}`}>
                    <span className="product-code">AE / {String(index + 1).padStart(2, '0')}</span>
                    <ProductImage product={product} />
                    <span className="product-view">VIEW PART <ArrowUpRight size={13} /></span>
                  </button>
                  <div className="product-info">
                    <div><span className="product-category">{product.category}</span><h3>{product.name}</h3></div>
                    <button type="button" className="product-arrow" onClick={() => setSelectedProduct(product)} aria-label={`View ${product.name}`}><ArrowUpRight /></button>
                  </div>
                  <p>{product.description}</p>
                  <a className="product-enquire" href={quickEnquiry(product.name)} target="_blank" rel="noreferrer">Enquire about this part <ArrowRight size={14} /></a>
                </article>
              ))}
            </div>
            <p className="disclaimer">Product photographs are representative of the company’s range. Dimensions, material, finish and other specifications are indicative and confirmed at the time of order.</p>
          </div>
        </section>

        <section className="machines-section" id="machines">
          <div className="container">
            <div className="section-heading machines-heading">
              <div>
                <div className="eyebrow"><span className="eyebrow-line" /> OUR MACHINE SHOP</div>
                <h2>Equipment behind<br /><em>every component.</em></h2>
              </div>
              <p>Machine types and featured equipment from the company profile. Specifications are shown where they are provided in the profile.</p>
            </div>
            <div className="machine-types" aria-label="Machine types listed in the company profile">
              {machineTypes.map((type) => <span key={type}>{type}</span>)}
            </div>
            <div className="machine-grid">
              {machines.map((machine, index) => (
                <article className="machine-card" key={machine.name}>
                  <div className="machine-photo">
                    <img
                      className={machine.rotateImage ? 'machine-photo-rotated' : undefined}
                      src={imagePath(machine.image)}
                      alt={`${machine.name} at Aadesh Engineering`}
                      loading="lazy"
                    />
                    <span className="machine-index">{String(index + 1).padStart(2, '0')} / MACHINE SHOP</span>
                  </div>
                  <div className="machine-copy">
                    <h3>{machine.name}</h3>
                    {machine.maker && <p className="machine-maker">Maker: {machine.maker}</p>}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="awards-section">
          <div className="container awards-wrap">
            <div className="awards-copy">
              <div className="eyebrow light-eyebrow"><span className="eyebrow-line" /> ACHIEVEMENTS</div>
              <h2>Recognition for<br /><em>continuous improvement.</em></h2>
            </div>
            <div className="awards-grid">
              {awards.map((award) => (
                <article
                  key={award.title}
                  className="award-card award-card-with-photo"
                >
                  {award.image ? (
                    <>
                      <img
                        className="award-photo"
                        src={award.image}
                        alt={`Aadesh Engineering's ${award.title}, award plaque and trophy`}
                        loading="lazy"
                      />
                      <div className="award-caption">
                        <h3>{award.title}</h3>
                        <span>Year: {award.year}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="award-year">{award.year}</span>
                      <h3>{award.title}</h3>
                      <small>{award.subtitle}</small>
                    </>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="global-section" id="global">
          <div className="container global-wrap">
            <div className="global-copy">
              <div className="eyebrow"><span className="eyebrow-line" /> PLANT OVERVIEW</div>
              <h2>Precision built for<br /><em>global supply chains.</em></h2>
              <p>Aadesh Engineering is a Pune-based manufacturer of precise machining components supporting the automotive sector and broader precision engineering markets. Our focus is on reliable quality, repeatability and on-time supply.</p>
            </div>
            <div className="global-stats">
              {plantStats.map((stat) => (
                <div key={stat.label} className="stat-block">
                  <strong>{stat.value}<span>{stat.suffix ?? ''}</span></strong>
                  <small>{stat.label}</small>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="export-section" id="export">
          <div className="container export-grid">
            <div className="export-panel export-panel-main">
              <div className="eyebrow"><span className="eyebrow-line" /> GLOBAL READY</div>
              <h2>Built to support<br /><em>international demand.</em></h2>
              <p>From the every-day precision of turned parts and machined assemblies to quality-driven production systems, Aadesh Engineering is structured to serve customers who value reliability, repeatability and responsiveness.</p>
              <div className="export-points">
                <span>Customer drawing based production</span>
                <span>Consistent inspection and quality checks</span>
                <span>Timely supply and responsive communication</span>
              </div>
            </div>
            <div className="export-panel export-panel-cards">
              {exportHighlights.map((item, index) => (
                <article key={item.title} className="export-card">
                  <span>0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="order-section" id="order">
          <div className="container">
            <div className="order-top">
              <div className="order-heading">
                <div className="eyebrow"><span className="eyebrow-line" /> HOW WE WORK</div>
                <h2>Your requirement.<br /><em>Our next job.</em></h2>
                <p>Share your drawing or requirement and let’s turn it into a precision component.</p>
              </div>
              <div className="order-visual" aria-label="Examples of precision-machined components">
                <OrderComponentArtwork />
              </div>
            </div>
            <div className="order-steps">
              {orderSteps.map((item, index) => (
                <article key={item.title}>
                  <div className="order-step-top"><span>{String(index + 1).padStart(2, '0')}</span><div className="order-step-icon"><OrderStepIcon step={index + 1} /></div></div>
                  <div><h3>{item.title}</h3><p>{item.description}</p></div>
                  <div className="order-step-bottom"><span>STEP {String(index + 1).padStart(2, '0')}</span><span className="order-step-arrow"><ArrowRight size={15} /></span></div>
                </article>
              ))}
            </div>
            <div className="order-footnote">
              <span className="order-footnote-label">GOOD TO KNOW</span>
              <p>Every part is made to order. Price, specification and delivery timeline are confirmed by our team after reviewing your enquiry.</p>
              <a className="button button-accent order-enquire" href={quickEnquiry('Custom part')} target="_blank" rel="noreferrer"><WhatsAppMark /> ENQUIRE NOW <ArrowRight /></a>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="container contact-grid">
            <div className="contact-copy">
              <div className="eyebrow light-eyebrow"><span className="eyebrow-line" /> LET’S TALK PARTS</div>
              <h2>Have a part<br /><em>to make?</em></h2>
              <p>Share what you’re working on. Our team is ready to discuss your machined component requirement.</p>
              <div className="contact-details">
                <a href={`tel:${company.phoneLink}`}><span>CALL OUR TEAM</span><strong>{company.phone}</strong><ArrowUpRight /></a>
                <a href={`mailto:${company.email}`}><span>EMAIL US</span><strong>{company.email}</strong><ArrowUpRight /></a>
                <div className="contact-address"><span>VISIT OUR FACILITY</span><strong>{company.address}</strong><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.mapQuery)}`} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={13} /></a></div>
              </div>
              <div className="contact-map">
                <div><span>FIND US</span><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.mapQuery)}`} target="_blank" rel="noreferrer">Open in Google Maps <ArrowUpRight size={13} /></a></div>
                <iframe
                  title="Map to Aadesh Engineering in Talawade, Pune"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(company.mapQuery)}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
            <div className="enquiry-panel">
              <div className="form-heading"><span>01 / YOUR ENQUIRY</span><h3>Tell us about your part.</h3><p>We’ll open WhatsApp with your details ready to send. Nothing is stored on this website.</p></div>
              <form onSubmit={sendEnquiry}>
                <label htmlFor="name">Your name</label>
                <input id="name" name="name" type="text" autoComplete="name" placeholder="e.g. Rahul Sharma" required />
                <div className="form-row">
                  <div><label htmlFor="part">Part / product</label><input id="part" name="part" type="text" value={formProduct} onChange={(event) => setFormProduct(event.target.value)} placeholder="Select or enter a part" /></div>
                  <div><label htmlFor="quantity">Quantity</label><input id="quantity" name="quantity" type="text" inputMode="numeric" placeholder="e.g. 500 pcs" required /></div>
                </div>
                <label htmlFor="message">A little more about your requirement</label>
                <textarea id="message" name="message" rows={3} placeholder="Material, drawing, tolerance or anything else we should know…" />
                <button className="button button-accent form-submit" type="submit">Continue on WhatsApp <WhatsAppMark /></button>
                {submitted && <p className="form-success" role="status">WhatsApp is opening with your enquiry. If it doesn’t open, call us at <a href={`tel:${company.phoneLink}`}>{company.phone}</a>.</p>}
                <p className="form-privacy">Prefer email? <a href={`mailto:${company.email}`}>{company.email}</a></p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-main">
          <div className="footer-brand">
            <a className="brand brand-light" href="#/">
              <span className="brand-mark"><img src={imagePath('image2.jpeg')} alt="Aadesh Engineering logo" /></span>
              <span className="brand-copy"><strong>AADESH</strong><small>ENGINEERING</small></span>
            </a>
            <p>Precision-machined automotive components, made to your requirements.</p>
          </div>
          <div className="footer-links"><span>EXPLORE</span><a href="#about">About us</a><a href="#capabilities">Capabilities</a><a href="#machines">Machines</a><a href="#components">Components</a><a href="#order">How to order</a></div>
          <div className="footer-links"><span>GET IN TOUCH</span><a href={`tel:${company.phoneLink}`}>{company.phone}</a><a href={`mailto:${company.email}`}>{company.email}</a><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.mapQuery)}`} target="_blank" rel="noreferrer">Talawade, Pune <ArrowUpRight size={13} /></a></div>
          <a href="#/" className="back-top">BACK TO TOP <span>↑</span></a>
        </div>
        <div className="container footer-bottom">
          <span>© {currentYear} Aadesh Engineering. All rights reserved.</span>
          <span>Product specifications are indicative and confirmed at the time of order.</span>
          <span>MADE WITH PRECISION <i>✳</i></span>
        </div>
        <div className="container privacy-row">
          <details className="privacy-notice" id="privacy">
            <summary>Privacy notice</summary>
            <p>This static website does not store enquiry details or use analytics. Submitting the enquiry form opens WhatsApp with the details you entered; information you choose to send is handled by WhatsApp under its own terms. The embedded map is provided by Google Maps and may load third-party content. You can also contact us directly by phone or email.</p>
          </details>
        </div>
      </footer>

      <a className="floating-whatsapp" href={quickEnquiry('Custom part')} target="_blank" rel="noreferrer" aria-label="Send an order enquiry on WhatsApp"><WhatsAppMark /><span>ENQUIRE</span></a>

      {selectedProduct && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setSelectedProduct(null)
        }}>
          <section className="product-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <button className="modal-close" type="button" onClick={() => setSelectedProduct(null)} aria-label="Close part details">×</button>
            <div className="modal-image"><ProductImage product={selectedProduct} /></div>
            <div className="modal-copy">
              <span className="product-category">{selectedProduct.category} · MADE TO ORDER</span>
              <h2 id="modal-title">{selectedProduct.name}</h2>
              <p>{selectedProduct.description}</p>
              <p>{selectedProduct.detail}</p>
              <div className="modal-spec-note">Specifications are indicative and confirmed at the time of order.</div>
              <div className="modal-actions">
                <a className="button button-dark" href={quickEnquiry(selectedProduct.name)} target="_blank" rel="noreferrer">Enquire on WhatsApp <ArrowUpRight /></a>
                <button className="text-link" type="button" onClick={() => startEnquiry(selectedProduct.name)}>Send an enquiry form <ArrowRight /></button>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  )
}

function ExportPage({ navigateHome }: { navigateHome: () => void }) {
  function navigateToHomeSection(sectionId: string) {
    navigateHome()
    window.setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  return (
    <div className="global-supply-page">
      <div className="topline">
        <div className="container topline-inner">
          <span><span className="status-dot" /> ISO 9001:2015 certified · Established 2007</span>
          <a href={`mailto:${company.email}`}>{company.email}<ArrowUpRight size={13} /></a>
        </div>
      </div>
      <header className="site-header global-supply-header">
        <div className="container header-inner">
          <a className="brand" href="#/" onClick={(event) => { event.preventDefault(); navigateHome() }} aria-label="Return to Aadesh Engineering home">
            <span className="brand-mark"><img src={imagePath('image2.jpeg')} alt="Aadesh Engineering logo" /></span>
            <span className="brand-copy"><strong>AADESH</strong><small>ENGINEERING</small></span>
          </a>
          <nav className="global-supply-nav" aria-label="Global supply navigation">
            <a href="#/">Home</a>
            <a href="#/export" aria-current="page">Global Supply</a>
            <a href="#machines" onClick={(event) => { event.preventDefault(); navigateToHomeSection('machines') }}>Capabilities</a>
            <a href="#contact" onClick={(event) => { event.preventDefault(); navigateToHomeSection('contact') }}>Contact</a>
          </nav>
          <a className="button button-accent global-supply-nav-cta" href="#contact" onClick={(event) => { event.preventDefault(); navigateToHomeSection('contact') }}>Discuss a requirement <ArrowRight /></a>
        </div>
      </header>

      <main className="global-supply-main">
        <section className="global-supply-hero">
          <div className="container global-supply-hero-grid">
            <div className="global-supply-hero-copy">
              <div className="eyebrow"><span className="eyebrow-line" /> GLOBAL SUPPLY · PUNE, INDIA</div>
              <h1>Precision components.<br /><em>Partnership built on trust.</em></h1>
              <p>A Pune-based manufacturing partner for precision-machined automotive components. Share your drawing or sample and we’ll review the details with you before confirming a quotation.</p>
              <div className="global-supply-actions">
                <a className="button button-accent" href="#contact" onClick={(event) => { event.preventDefault(); navigateToHomeSection('contact') }}>Discuss your requirement <ArrowRight /></a>
                <a className="global-supply-text-link" href="#/">Explore Aadesh Engineering <ArrowUpRight /></a>
              </div>
            </div>
            <div className="global-supply-art">
              <OrderComponentArtwork />
              <span className="global-supply-art-label"><i /> DRAWING-LED · MADE TO ORDER</span>
              <div className="global-supply-art-note"><span>MANUFACTURING BASE</span><strong>Talawade, Pune</strong></div>
            </div>
          </div>
        </section>

        <section className="global-supply-stats container" aria-label="Aadesh Engineering at a glance">
          <article><span>01 / FACILITY</span><strong>9,200 <small>sq. ft.</small></strong><p>Manufacturing area</p></article>
          <article><span>02 / OUR TEAM</span><strong>103</strong><p>Employees</p></article>
          <article><span>03 / QUALITY</span><strong>ISO <small>9001:2015</small></strong><p>Certified quality management system</p></article>
          <article><span>04 / EXPERIENCE</span><strong>Since 2007</strong><p>Established in Pune, India</p></article>
        </section>

        <section className="global-supply-capabilities">
          <div className="container global-supply-capabilities-grid">
            <div className="global-supply-capabilities-copy">
              <div className="eyebrow"><span className="eyebrow-line" /> A PRACTICAL MANUFACTURING PARTNER</div>
              <h2>Clear requirements.<br /><em>Consistent execution.</em></h2>
              <p>We make components to customer drawings and samples. Requirements are reviewed with attention to material, quantity, tolerances, inspection and delivery expectations.</p>
              <a className="global-supply-inline-link" href="#contact" onClick={(event) => { event.preventDefault(); navigateToHomeSection('contact') }}>Talk through a part <ArrowRight /></a>
            </div>
            <div className="global-supply-feature-list">
              {exportHighlights.map((item, index) => (
                <article key={item.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div><h3>{item.title}</h3><p>{item.text}</p></div>
                  <ArrowUpRight size={17} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="global-supply-process">
          <div className="container">
            <div className="global-supply-process-heading">
              <div>
                <div className="eyebrow"><span className="eyebrow-line" /> A STRAIGHTFORWARD PROCESS</div>
                <h2>From first drawing<br /><em>to finished order.</em></h2>
              </div>
              <p>We align on the part requirements and production details before moving into manufacturing.</p>
            </div>
            <div className="global-supply-process-grid">
              {exportProcess.map((step, index) => (
                <article key={step}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{step}</h3>
                  <i aria-hidden="true"><ArrowRight size={15} /></i>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="global-supply-contact">
          <div className="container global-supply-contact-panel">
            <div className="global-supply-contact-copy">
              <div className="eyebrow"><span className="eyebrow-line" /> START A CONVERSATION</div>
              <h2>Have a component<br /><em>requirement?</em></h2>
              <p>Send a drawing, sample details, material, quantity and target timing. Our team will review the information and get back to you.</p>
            </div>
            <div className="global-supply-contact-actions">
              <a className="button button-accent" href={`mailto:${company.email}?subject=${encodeURIComponent('Precision component enquiry')}`}>Email our team <ArrowUpRight /></a>
              <a className="global-supply-phone" href={`tel:${company.phoneLink}`}>{company.phone}</a>
              <a className="global-supply-home-link" href="#/" onClick={(event) => { event.preventDefault(); navigateHome() }}>View company profile <ArrowRight /></a>
            </div>
          </div>
        </section>
      </main>
      <footer className="global-supply-footer">
        <div className="container"><span>© {currentYear} Aadesh Engineering · Talawade, Pune, India</span><a href="#/">Aadesh Engineering <ArrowUpRight size={13} /></a></div>
      </footer>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All parts')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [formProduct, setFormProduct] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [showEnquiry, setShowEnquiry] = useState(false)
  const [page, setPage] = useState<Page>(() => {
    if (typeof window === 'undefined') return 'home'
    return window.location.hash === '#/export' ? 'export' : 'home'
  })

  useEffect(() => {
    const syncPageFromHash = () => {
      const nextPage = window.location.hash === '#/export' ? 'export' : 'home'
      setPage(nextPage)
    }

    syncPageFromHash()
    window.addEventListener('hashchange', syncPageFromHash)
    return () => window.removeEventListener('hashchange', syncPageFromHash)
  }, [])

  useEffect(() => {
    if (showEnquiry) {
      setTimeout(() => {
        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
      }, 20)
    }
  }, [showEnquiry])

  const navigateHome = () => {
    window.location.hash = '#/'
    setPage('home')
  }

  if (page === 'export') {
    return <ExportPage navigateHome={navigateHome} />
  }

  return (
    <HomePage
      menuOpen={menuOpen}
      setMenuOpen={setMenuOpen}
      activeCategory={activeCategory}
      setActiveCategory={setActiveCategory}
      selectedProduct={selectedProduct}
      setSelectedProduct={setSelectedProduct}
      formProduct={formProduct}
      setFormProduct={setFormProduct}
      submitted={submitted}
      setSubmitted={setSubmitted}
      setShowEnquiry={setShowEnquiry}
    />
  )
}

export default App

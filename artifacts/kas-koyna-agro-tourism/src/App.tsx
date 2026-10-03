import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import {
  ArrowRight, ArrowUpRight, Camera, Check, ChevronDown, ChevronLeft,
  ChevronRight, CircleCheck, Compass, ExternalLink, Leaf, Mail, MapPin, Menu,
  Mountain, Phone, Send, Tent, Users, Utensils, Waves, X,
} from 'lucide-react';
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { Link, Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const logo = '/kas-koyna-logo.png';
const images = {
  hero: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=2000&q=85',
  lake: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=85',
  forest: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=85',
  food: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85',
  cottage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85',
  boat: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=85',
  mountain: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=85',
  camping: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1400&q=85',
  trail: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1400&q=85',
  harvest: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1400&q=85',
};
const heroSlides = [
  { src: '/hero-cottages.jpg', alt: 'Red-roof cottage rooms at Kas Koyna', label: 'Stay close to the water' },
  { src: '/hero-lakeside-view.jpg', alt: 'Koyna backwaters and green hills seen from above', label: 'Take the long view' },
  { src: '/hero-garden-view.jpg', alt: 'Garden path and lake view beside the cottages', label: 'A slower morning' },
  { src: '/hero-stay.jpg', alt: 'Colourful beds inside a comfortable tent room', label: 'Rest your way' },
  { src: '/hero-cottages.jpg', alt: 'Tents set beside the Koyna backwaters', label: 'Sleep under a wider sky' },
  { src: '/hero-lakeside-view.jpg', alt: 'A lively outdoor activity at the property', label: 'Make a day of it' },
  { src: '/hero-backwaters.jpg', alt: 'Quiet Koyna backwaters beside the property', label: 'Meet the backwaters' },
  { src: '/hero-stay.jpg', alt: 'A welcoming outdoor stay area at Kas Koyna', label: 'Come as you are' },
];
const waLink = 'https://wa.me/919423260999?text=Hello%20Kas%20koyna%20agrotourism%20i%20am%20interested%20in%20your%20restaurant%20and%20give%20me%20more%20details%20regarding%20plan%20please%20connect%20to%20me.';
const phoneLink = 'tel:+919423260999';
const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/kaskoynaagrotourism/', icon: FaInstagram },
  { label: 'Facebook', href: 'https://www.facebook.com/KasKoyna-Agro-Toursim-1860376424249652/', icon: FaFacebookF },
  { label: 'WhatsApp', href: waLink, icon: FaWhatsapp },
  { label: 'YouTube', href: 'https://www.youtube.com/channel/UCBhk452xdpFhFaLrYHgL77g', icon: FaYoutube },
  { label: 'Twitter', href: 'https://twitter.com/', icon: FaTwitter },
];

const navItems = [
  ['Home', '/'], ['Our story', '/about'], ['Gallery', '/gallery'], ['Explore', '/attractions'],
  ['Activities', '/activities'], ['Packages', '/packages'], ['Contact Us', '/contact'],
];
const activityItems = [
  { title: 'Vasota Jungle Trek', text: 'A forest adventure through the Koyna Wildlife Sanctuary, with a boat ride across the backwaters.', image: 'https://kaskoynaagrotourism.com/assets/web/Vasota.jpg', icon: Mountain },
  { title: 'Boating & rafting', text: 'See the Koyna backwaters from the water and make time for the landscape around you.', image: 'https://kaskoynaagrotourism.com/assets/web/Boating.JPG', icon: Waves },
  { title: 'Try your hand at fishing', text: 'A calm, picture-perfect setting for a quiet afternoon by the water.', image: 'https://kaskoynaagrotourism.com/assets/web/Fishing.jpg', icon: Compass },
  { title: 'Swimming with life jackets', text: 'A water experience with life jackets, subject to local conditions and safe arrangements.', image: 'https://kaskoynaagrotourism.com/assets/web/Swmming.jpg', icon: Waves },
  { title: 'Mud bath', text: 'A playful, earthy experience for groups looking to do something different together.', image: 'https://kaskoynaagrotourism.com/assets/web/MudBath.jpg', icon: Leaf },
  { title: 'Cricket', text: 'Pick a team, find a patch of open ground, and let the afternoon take its own course.', image: 'https://kaskoynaagrotourism.com/assets/web/Cricket.jpg', icon: Users },
  { title: 'Chess', text: 'A slower game for long afternoons, quiet corners, and friendly rivalries.', image: 'https://kaskoynaagrotourism.com/assets/web/chess.jpg', icon: Compass },
  { title: 'Badminton', text: 'Easy outdoor fun for families, friends, and groups of every pace.', image: 'https://kaskoynaagrotourism.com/assets/web/badminton.jpg', icon: Users },
  { title: 'Carrom', text: 'Keep the table busy after lunch with a classic group favourite.', image: 'https://kaskoynaagrotourism.com/assets/web/carrom.jpg', icon: Compass },
  { title: 'Firecamp', text: 'Wind down together under the open sky. Ask us about current arrangements.', image: 'https://kaskoynaagrotourism.com/assets/web/campfire.jpg', icon: Tent },
];
const testimonials = [
  { quote: 'The boating experience was beautiful. Our tent house was right beside the Koyna backwaters and swimming with lifejackets made the day unforgettable.', by: 'Amit Sonawale' },
  { quote: 'The food was lovely and the management was very helpful. We came as a group of 50 and everyone had a comfortable time.', by: 'Ramesh K' },
  { quote: 'Great service, picturesque mountains and a lake nearby. A comfortable budget stay for a slow weekend.', by: 'Maharashtra Instagrammers' },
  { quote: 'The boating experience was beautiful. Our tent house was right beside the Koyna backwaters and swimming with lifejackets made the day unforgettable.', by: 'Amit Sonawale' },
  { quote: 'The food was lovely and the management was very helpful. We came as a group of 50 and everyone had a comfortable time.', by: 'Ramesh K' },
  { quote: 'Great service, picturesque mountains and a lake nearby. A comfortable budget stay for a slow weekend.', by: 'Maharashtra Instagrammers' },
];

function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  useEffect(() => {
    const listener = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', listener);
    return () => window.removeEventListener('scroll', listener);
  }, []);
  useEffect(() => setOpen(false), [location]);
  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container-wide nav-inner">
        <Link href="/" data-testid="link-brand-home"><img src={logo} alt="Kas Koyna Agro Tourism" className="brand-logo" /></Link>
        <nav className="nav-links" aria-label="Main navigation">
          {navItems.map(([label, href]) => <Link key={href} href={href} className={location === href ? 'active' : ''} data-testid={`link-nav-${label.toLowerCase().replace(/\s/g, '-')}`}>{label}</Link>)}
        </nav>
        <Link href="/contact" className="btn-primary" data-testid="link-plan-stay">Book Now <ArrowUpRight size={15} /></Link>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} data-testid="button-mobile-menu">{open ? <X /> : <Menu />}</button>
      </div>
     <nav
        className={`mobile-nav ${open ? "mobile-nav-open" : ""}`}
        aria-label="Mobile navigation"
      >
        {navItems.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            onClick={() => {
              setOpen(false);
            }}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const subscribe = (event: FormEvent) => {
    event.preventDefault();
    if (email.trim() && email.includes('@')) setSubscribed(true);
  };
  return <footer className="site-footer">
    <div className="container-wide footer-main-row">
      <div className="footer-brand"><img src={logo} alt="Kas Koyna Agro Tourism" className="brand-logo" /><p>A quieter way to meet Koyna — with local food, forest air, and the backwaters close by.</p><p>At-Shembadi, Post-Bamnoli,<br />Tal-Jawali, Dist-Satara,<br />Maharashtra 415002.</p></div>
      <div><h3>Explore</h3>{navItems.slice(1, 6).map(([label, href]) => <Link key={href} href={href} data-testid={`link-footer-${label.toLowerCase().replace(/\s/g, '-')}`}>{label}</Link>)}<Link href="/faq" data-testid="link-footer-faq">FAQs</Link></div>
      <div><h3>Say hello</h3><a href={phoneLink} data-testid="link-footer-phone">+91 9423260999</a><a href="tel:+917719905999" data-testid="link-footer-phone-2">+91 7719905999</a><a href="mailto:kaskoynaagrotourism@gmail.com" data-testid="link-footer-email">kaskoynaagrotourism@gmail.com</a><a href={waLink} target="_blank" rel="noreferrer" data-testid="link-footer-whatsapp">Write on WhatsApp <ArrowUpRight size={13} style={{ display: 'inline' }} /></a><div className="social-links" aria-label="Kas Koyna social media">{socialLinks.map(({ label, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noreferrer" className={`social-link social-${label.toLowerCase()}`} aria-label={label} title={label} data-testid={`link-footer-social-${label.toLowerCase()}`}><Icon size={19} /></a>)}</div></div>
      <div className="footer-newsletter"><p className="footer-note">Occasional notes from Bamnoli — seasonal views, thoughtful ideas for your next visit, and the good things happening around Kas Koyna.</p>{subscribed ? <div className="newsletter-success"><CircleCheck size={18} /> You’re on the list. We’ll keep it thoughtful.</div> : <form onSubmit={subscribe}><label htmlFor="footer-email">Get the next quiet note</label><div className="newsletter-form"><input id="footer-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your email address" aria-label="Your email address" /><button type="submit" aria-label="Subscribe to Kas Koyna updates"><ArrowRight size={16} /></button></div></form>}</div>
    </div>
    <div className="container-wide footer-bottom"><span>© {new Date().getFullYear()} Kas Koyna Agro Tourism. All Rights Reserved.</span><span className="footer-legal"><Link href="/privacy" data-testid="link-footer-privacy">Privacy Policy</Link><span aria-hidden="true">|</span><Link href="/terms" data-testid="link-footer-terms">Terms and Conditions</Link></span></div>
  </footer>;
}

function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  useEffect(() => {
    const revealNodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal], .page-content > section, .page-content > div.container-wide'));
    revealNodes.forEach((node) => node.classList.remove('is-visible'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { threshold: 0.13, rootMargin: '0px 0px -8% 0px' });
    revealNodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [location]);
  return <div className="site-shell noise"><SiteHeader />{children}<Footer /><a href={waLink} target="_blank" rel="noreferrer" className="whatsapp-fab" aria-label="Chat with us on WhatsApp" title="Chat with us on WhatsApp" data-testid="button-floating-whatsapp"><FaWhatsapp size={24} /></a></div>;
}

function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <section className="page-hero"><div className="container-wide reveal"><div className="eyebrow">{eyebrow}</div><h1 className="display-lg" style={{ margin: '18px 0 22px', maxWidth: 780 }}>{title}</h1><p>{text}</p></div></section>;
}

function Home() {
  const [heroSlide, setHeroSlide] = useState(0);
  const [testimonial, setTestimonial] = useState(0);
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;
    const timer = window.setInterval(() => setHeroSlide((current) => (current + 1) % heroSlides.length), 3000);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;
    const timer = window.setInterval(() => setTestimonial((current) => (current + 1) % testimonials.length), 5200);
    return () => window.clearInterval(timer);
  }, []);
  return <Layout>
    <main>
      <section className="hero">
        <div className="hero-slides" aria-label="Kas Koyna photo story">{heroSlides.map((slide, index) => <img key={slide.src} src={slide.src} alt={slide.alt} className={`hero-image ${index === heroSlide ? 'is-active' : ''}`} />)}</div>
        <div className="hero-tint" />
        <div className="container-wide hero-content">
          <div className="eyebrow reveal">Bamnoli · Satara · Maharashtra</div>
          <p className="hero-slide-label reveal">{heroSlides[heroSlide].label}</p>
          <h1 className="display-xl reveal reveal-delay-1" style={{ margin: '18px 0 24px' }}>Come back<br /><em style={{ color: '#f1ba76', fontWeight: 500 }}>to the quiet.</em></h1>
          <p className="hero-sub reveal reveal-delay-2">Rustic cottage stays, warm local food, and the Koyna backwaters at your doorstep. A nature-first escape for families, friends, and unhurried days.</p>
          <div className="hero-meta reveal reveal-delay-3"><span><MapPin size={15} /> At-Shembadi, Bamnoli</span><span><Waves size={15} /> Koyna backwaters</span></div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 30 }} className="reveal reveal-delay-3"><Link href="/contact" className="btn-primary" data-testid="link-hero-plan">Plan your visit <ArrowRight size={16} /></Link><Link href="/gallery" className="btn-outline" style={{ color: '#fbf8ee', borderColor: 'rgba(255,255,255,.45)' }} data-testid="link-hero-gallery">See the place <Camera size={15} /></Link></div>
        </div>
        <div className="hero-pager" aria-label="Photo story controls">{heroSlides.map((slide, index) => <button key={slide.src} className={index === heroSlide ? 'active' : ''} onClick={() => setHeroSlide(index)} aria-label={`Show photo ${index + 1}`} />)}</div>
        {/* <div className="scroll-cue">Scroll to wander</div> */}
      </section>

      <section className="section-pad" data-reveal><div className="container-wide split-feature">
        <div className="image-card feature-image"><img src={images.lake} alt="Koyna lake surrounded by green hills" loading="lazy" /></div>
        <div className="feature-copy"><div className="eyebrow section-label">The Kas Koyna way</div><h2 className="display-lg">A little closer to nature.</h2><div className="prose-copy"><p>There is a different kind of holiday waiting in Bamnoli. Mornings arrive with lake mist, meals carry the warmth of a home kitchen, and the best plans often begin with “let’s see where the path goes.”</p><p>Kas Koyna Agro Tourism is your welcoming base for the Koyna backwaters, village life, forest trails, and the easygoing Maharashtra experience around them.</p></div><Link href="/about" className="btn-quiet" data-testid="link-home-story">Read our story <ArrowRight size={15} /></Link><div className="stat-row"><div className="stat"><strong>01</strong><span>quiet lakeside setting</span></div><div className="stat"><strong>02</strong><span>ways to slow down</span></div><div className="stat"><strong>∞</strong><span>space for your people</span></div></div></div>
      </div></section>

      <section className="section-pad dark-panel" data-reveal><div className="container-wide"><div style={{ display: 'flex', justifyContent: 'space-between', gap: 25, alignItems: 'end', marginBottom: 35 }}><div><div className="eyebrow section-label">Make a day of it</div><h2 className="display-lg" style={{ margin: '15px 0 0' }}>There is more<br />outside the room.</h2></div><Link href="/activities" className="btn-outline" style={{ color: '#f4f0e3', borderColor: 'rgba(244,240,227,.4)' }} data-testid="link-home-activities">Explore activities <ArrowUpRight size={15} /></Link></div>
        <div className="experience-grid"><figure className="image-card experience-tile tall"><img src={images.boat} alt="Boating on a calm blue lake" loading="lazy" /><figcaption>Boat into the backwaters</figcaption></figure><figure className="image-card experience-tile"><img src={images.trail} alt="A trail through a green forest" loading="lazy" /><figcaption>Follow a forest trail</figcaption></figure><figure className="image-card experience-tile"><img src={images.food} alt="Traditional local meal" loading="lazy" /><figcaption>Eat as the locals do</figcaption></figure><figure className="image-card experience-tile"><img src={images.camping} alt="Tent camping among trees" loading="lazy" /><figcaption>Sleep under a wider sky</figcaption></figure><figure className="image-card experience-tile"><img src={images.mountain} alt="Mountain landscape" loading="lazy" /><figcaption>Take the long view</figcaption></figure></div>
      </div></section>

      <section className="section-pad quote-section" data-reveal><div className="container-wide testimonial-shell"><div className="eyebrow section-label">Words from the way back</div><h2 className="display-lg testimonial-heading">Good days, remembered.</h2><div className="testimonial-viewport"><div className="testimonial-track" style={{ transform: `translateX(-${testimonial * 100}%)` }}>{testimonials.map((item) => <article className="testimonial-card" key={item.by}><div className="quote-mark">“</div><p className="quote-text">{item.quote}</p><div className="quote-byline"><span className="quote-dot" /> {item.by}</div></article>)}</div></div><div className="testimonial-controls"><span>{String(testimonial + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}</span><div><button className="filter-pill" onClick={() => setTestimonial((testimonial + testimonials.length - 1) % testimonials.length)} aria-label="Previous testimonial" data-testid="button-testimonial-previous"><ChevronLeft size={16} /></button><button className="filter-pill" onClick={() => setTestimonial((testimonial + 1) % testimonials.length)} aria-label="Next testimonial" data-testid="button-testimonial-next"><ChevronRight size={16} /></button></div></div></div></section>
      <ActivitySection compact />
      <section className="cta-band" data-reveal><div className="container-wide"><div className="eyebrow" style={{ color: '#f1ba76' }}>Your next easy day</div><h2 className="display-lg" style={{ maxWidth: 630, margin: '16px 0 25px' }}>Bring your people.<br />We’ll keep it simple.</h2><Link href="/contact" className="btn-primary" data-testid="link-home-contact">Start a conversation <ArrowRight size={15} /></Link></div></section>
    </main>
  </Layout>;
}

function ActivitySection({ compact = false }: { compact?: boolean }) {
  const items = compact ? activityItems.slice(0, 6) : activityItems;
  return <section className={`activity-section section-pad ${compact ? 'activity-section-compact' : ''}`} data-reveal><div className="container-wide"><div className="activity-section-heading"><div><div className="eyebrow section-label">Kas Koyna activities</div><h2 className="display-lg">{compact ? <>A day can go<br />anywhere here.</> : <>Choose your own<br />kind of fun.</>}</h2></div>{compact && <Link href="/activities" className="btn-quiet" data-testid="link-home-all-activities">See all activities <ArrowRight size={15} /></Link>}</div><div className="activity-grid">{items.map((item) => { const ActivityIcon = item.icon; return <article className="activity-card" key={item.title}><div className="activity-card-image"><img src={item.image} alt={item.title} loading="lazy" /><span className="activity-icon"><ActivityIcon size={18} /></span></div><div className="activity-card-copy"><h3>{item.title}</h3><p>{item.text}</p><Link href="/contact" data-testid={`link-activity-enquiry-${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>Ask about this <ArrowRight size={13} /></Link></div></article>; })}</div></div></section>;
}

function About() {
  return <Layout><PageHero eyebrow="Our story" title="A stay shaped by the lake, the forest, and the people who call it home." text="Kas Koyna Agro Tourism is a warm, nature-forward base in Bamnoli near Satara — made for meals that take their time and days that do not need a schedule." /><main className="page-content">
    <section className="section-pad"><div className="container-wide split-feature"><div className="feature-copy"><div className="eyebrow section-label">The place</div><h2 className="display-lg">Not a resort bubble. A sense of place.</h2><div className="prose-copy"><p>Our home is in At-Shembadi, close to Bamnoli and the Koyna backwaters. The landscape does most of the talking here: quiet water, evergreen forest, winding roads, and the changing light over the hills.</p><p>We keep the experience comfortable and grounded — rustic cottage rooms, authentic local cuisine prepared in traditional style, and a helpful local team to point you towards the right trail, boat, or view.</p></div><Link href="/contact" className="btn-primary" data-testid="link-about-contact">Ask about a stay <ArrowRight size={15} /></Link></div><div className="image-card feature-image"><img src={images.cottage} alt="Rustic cottage surrounded by greenery" loading="lazy" /></div></div></section>
    <section className="section-pad" style={{ background: 'hsl(var(--secondary))' }}><div className="container-wide"><div className="eyebrow section-label">What we care about</div><h2 className="display-lg" style={{ margin: '15px 0 32px', maxWidth: 700 }}>Warm hospitality is in the details.</h2><div className="card-grid"><div className="info-card"><div className="icon-disc"><Leaf size={20} /></div><h3>Close to nature</h3><p className="body-copy">A slower setting with access to lake, forest, village paths, and the big open sky of the Western Ghats.</p></div><div className="info-card"><div className="icon-disc"><Utensils size={20} /></div><h3>Food with a story</h3><p className="body-copy">Authentic local flavours prepared in a traditional style, with the warmth of a home-cooked table.</p></div><div className="info-card"><div className="icon-disc"><Users size={20} /></div><h3>Room for your people</h3><p className="body-copy">Families, friends, and larger groups are welcome. Tell us what your day needs and we’ll help you shape it.</p></div></div></div></section>
  </main></Layout>;
}

const galleryItems = [
  ['Stay', 'https://kaskoynaagrotourism.com/assets/web/gallery/1.jpg', 'A comfortable stay in Bamnoli'],
  ['Stay', 'https://kaskoynaagrotourism.com/assets/web/gallery/2.jpg', 'Life around the agro-tourism stay'],
  ['Landscape', 'https://kaskoynaagrotourism.com/assets/web/gallery/3.jpg', 'The colours of the Satara landscape'],
  ['Boating', 'https://kaskoynaagrotourism.com/assets/web/gallery/4.jpg', 'A quiet edge of the Koyna backwaters'],
  ['Boating', 'https://kaskoynaagrotourism.com/assets/web/gallery/5.jpg', 'Out on the backwaters'],
  ['Stay', 'https://kaskoynaagrotourism.com/assets/web/gallery/6.jpg', 'A slower morning at Bamnoli'],
  ['Stay', 'https://kaskoynaagrotourism.com/assets/web/gallery/7.jpg', 'A warm welcome by the lake'],
  ['Camping', 'https://kaskoynaagrotourism.com/assets/web/gallery/8.jpg', 'Camping close to nature'],
  ['Trekking', 'https://kaskoynaagrotourism.com/assets/web/gallery/9.jpg', 'Vasota and the forest country'],
  ['Activities', 'https://kaskoynaagrotourism.com/assets/web/gallery/10.jpg', 'A day out around Kas Koyna'],
  ['Trekking', 'https://kaskoynaagrotourism.com/assets/web/gallery/11.png', 'A forest trail worth taking'],
  ['Attractions', 'https://kaskoynaagrotourism.com/assets/web/gallery/Datta_Mandir.jpg', 'Datta Mandir nearby'],
  ['Boating', 'https://kaskoynaagrotourism.com/assets/web/gallery/13.jpg', 'Koyna water and hills'],
  ['Boating', 'https://kaskoynaagrotourism.com/assets/web/gallery/14.jpg', 'Boating in the backwaters'],
  ['Trekking', 'https://kaskoynaagrotourism.com/assets/web/gallery/15.JPG', 'Vasota fort country'],
  ['Camping', 'https://kaskoynaagrotourism.com/assets/web/gallery/16.JPG', 'A night under a wider sky'],
  ['Landscape', 'https://kaskoynaagrotourism.com/assets/web/gallery/17.JPG', 'The Koyna landscape'],
];
function Gallery() {
  const [filter, setFilter] = useState('All');
  const [active, setActive] = useState<number | null>(null);
  const filters = ['All', 'Boating', 'Stay', 'Camping', 'Trekking', 'Activities', 'Landscape', 'Attractions'];
  const shown = filter === 'All' ? galleryItems : galleryItems.filter(([category]) => category === filter);
  return <Layout><PageHero eyebrow="A glimpse of Bamnoli" title="Come for the view. Stay for the feeling." text="A few frames from the landscape, the table, and the unhurried rhythm around Kas Koyna." /><main className="section-pad page-content"><div className="container-wide"><div className="filter-row" role="group" aria-label="Gallery filters">{filters.map(item => <button key={item} className={`filter-pill ${filter === item ? 'active' : ''}`} onClick={() => setFilter(item)} data-testid={`button-gallery-filter-${item.toLowerCase().replace(/\W/g, '-')}`}>{item}</button>)}</div><div className="gallery-grid">{shown.map(([category, src, caption], index) => <figure className="gallery-item" key={`${category}-${index}`} onClick={() => setActive(galleryItems.indexOf(shown[index]))} data-testid={`button-gallery-image-${index}`}><img src={src} alt={caption} loading="lazy" /><figcaption>{caption}</figcaption></figure>)}</div></div></main>{active !== null && <div className="lightbox" role="dialog" aria-label="Gallery image"><button onClick={() => setActive(null)} aria-label="Close image" data-testid="button-lightbox-close"><X /></button><img src={galleryItems[active][1]} alt={galleryItems[active][2]} /><p>{galleryItems[active][2]}</p></div>}</Layout>;
}

function Attractions() {
  const attractions = [
    [images.boat, 'Koyna backwaters', 'Spend an unhurried morning on the water, with the hills reflected around you. Boating details can be arranged locally — ask us when you plan.'],
    [images.forest, 'Vasota', 'Vasota stands in the dense evergreen forests of Koyna Wildlife Sanctuary. Check local access, permissions, and seasonal conditions before planning a visit.'],
    [images.lake, 'Bamnoli', 'The village is known for natural beauty, lake views, and a lovely sense of being away from the everyday.'],
    [images.mountain, 'Tapola & Shivsagar Lake', 'Explore the wider lake country around Tapola, associated with Shivsagar Lake and a landscape made for long drives.'],
    [images.harvest, 'Kaas Plateau', 'In the right season, Kaas Plateau is a memorable nearby day out. Flowering conditions vary, so check before you travel.'],
    [images.trail, 'Datta Mandir', 'A peaceful local stop to include when you are exploring the surrounding routes and viewpoints.'],
  ];
  return <Layout><PageHero eyebrow="Around Bamnoli" title="The landscape is your itinerary." text="Keep the day open. From the backwaters to forest country and nearby viewpoints, there is always a gentler way to explore." /><main className="section-pad page-content"><div className="container-wide"><div className="attraction-list">{attractions.map(([src, title, copy], i) => <article className="attraction-row" key={title}><img src={src} alt={title} loading="lazy" /><div><h3>{title}</h3><p className="body-copy" style={{ margin: 0 }}>{copy}</p></div></article>)}</div><div style={{ marginTop: 45, padding: 28, borderRadius: '1.2rem', background: 'hsl(var(--secondary))' }}><div className="eyebrow">A note before you go</div><p className="body-copy" style={{ marginBottom: 18 }}>Access, weather, water levels, and local permissions can change. We recommend confirming the day’s plan with our team before setting out.</p><Link href="/contact" className="btn-primary" data-testid="link-attractions-contact">Ask our local team <ArrowRight size={15} /></Link></div></div></main></Layout>;
}

function Activities() {
  return <Layout><PageHero eyebrow="Ways to spend a day" title="Choose your own pace." text="An early boat, a forest walk, a long lunch, or nothing at all. Your time here can be as full or as spacious as you like." /><main className="page-content"><ActivitySection /><section className="section-pad activity-note" data-reveal><div className="container-wide"><div className="activity-note-card"><div className="eyebrow">A note before you go</div><h2 className="display-lg">Ask about the day’s conditions.</h2><p className="body-copy">Water levels, weather, local permissions, and activity arrangements can change. Confirm the current details with our team before you travel.</p><Link href="/contact" className="btn-primary">Plan with us <ArrowRight size={15} /></Link></div></div></section></main></Layout>;
}

const packageItems = [
  { title: 'Vasota Trek Package', details: 'One night stay in a room or tent, dinner (Veg/Non-Veg), breakfast, two teas, Vasota pack lunch, boating, forest permission, and guide. Minimum 10 people.', price: 'Rs. 1199/-', unit: 'per person' },
  { title: 'One night stay with lunch', details: 'One night stay in a room or tent, one tea, one breakfast, one lunch (Veg), and one dinner (Veg/Non-Veg).', price: 'Rs. 1100/-', unit: 'per person' },
  { title: 'One night stay with dinner', details: 'One night stay in a room or tent, one tea, one breakfast, and one dinner (Veg/Non-Veg).', price: 'Rs. 900/-', unit: 'per person' },
  { title: 'One night stay with two lunches', details: 'One night stay in a room or tent, one tea, one breakfast, two lunches (Veg), and one dinner (Veg/Non-Veg).', price: 'Rs. 1400/-', unit: 'per person' },
  { title: 'Two night stay', details: 'Two nights in a room or tent, two teas, two breakfasts, two lunches (Veg), and two dinners (Veg/Non-Veg).', price: 'Rs. 2200/-', unit: 'per person' },
  { title: 'Stay for two adults', details: 'Room or tent stay for two adults with one tea, one breakfast, one lunch (Veg), and one dinner (Veg/Non-Veg).', price: 'Rs. 3000/-', unit: 'total' },
  { title: 'Stay for three adults', details: 'Room or tent stay for three adults with one tea, one breakfast, one lunch (Veg), and one dinner (Veg/Non-Veg).', price: 'Rs. 3600/-', unit: 'total' },
  { title: 'One day return', details: 'One breakfast and one lunch (Veg/Non-Veg).', price: 'Rs. 300/-', unit: 'per person' },
];

function Packages() {
  const packageWhatsAppLink = (item: typeof packageItems[number]) => `https://wa.me/919423260999?text=${encodeURIComponent(`Hello Kas Koyna Agro Tourism,\n\nI would like more information about this package:\n${item.title}\nPrice: ${item.price} ${item.unit}\nInclusions: ${item.details}\n\nPlease share current availability, booking details, and anything I should know before travelling.`)}`;
  return <Layout><PageHero eyebrow="Kas Koyna packages" title="Choose the plan that fits your day." text="The official Kas Koyna package options bring together stays, meals, boating, and Vasota trekking. Contact us to confirm current availability and arrangements." /><main className="section-pad page-content"><div className="container-wide package-grid package-grid-official">{packageItems.map((item, index) => <article className={`package-card ${index % 2 ? 'alt' : ''}`} key={item.title}><div className="eyebrow">{index === 0 ? 'Trek & stay' : index === packageItems.length - 1 ? 'Day visit' : 'Stay & meals'}</div><h3>{item.title}</h3><p className="package-details">{item.details}</p><div className="package-price-row"><strong className="package-price">{item.price}</strong><span>{item.unit}</span></div><a href={packageWhatsAppLink(item)} target="_blank" rel="noreferrer" className={index % 2 ? 'btn-primary' : 'btn-outline'} style={{ marginTop: 22 }} data-testid={`link-package-${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>Enquire about this <ArrowRight size={15} /></a></article>)}</div><div className="package-note"><p className="body-copy" style={{ margin: 0 }}><strong style={{ color: 'hsl(var(--primary))' }}>Please confirm before travelling.</strong> Prices, availability, food arrangements, forest permissions, and activity conditions can change. Share your dates and group size with our team for the latest details.</p></div></main></Layout>;
}

function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = 'Please share your name.';
    if (!form.phone.trim()) next.phone = 'Please share a phone number.';
    if (!form.message.trim()) next.message = 'Tell us a little about your plan.';
    if (Object.keys(next).length) { setErrors(next); return; }
    setErrors({}); setSent(true);
  };
  return <Layout><PageHero eyebrow="Come say hello" title="Let’s plan a softer kind of getaway." text="Share your dates, group size, and what you have in mind. We will reply with current stay, food, and activity details." /><main className="section-pad page-content"><div className="container-wide contact-grid"><div><div className="eyebrow section-label">Contact Kas Koyna</div><h2 className="display-lg" style={{ margin: '15px 0' }}>The first step is easy.</h2><p className="body-copy">Call, write, or send a WhatsApp message. We are happy to help you understand the place before you arrive.</p><div className="contact-list"><div className="contact-item"><div className="icon-disc"><Phone size={18} /></div><div><a href={phoneLink} data-testid="link-contact-phone">+91 9423260999</a><p><a href="tel:+917719905999" data-testid="link-contact-phone-second">+91 7719905999</a></p></div></div><div className="contact-item"><div className="icon-disc"><Mail size={18} /></div><div><a href="mailto:kaskoynaagrotourism@gmail.com" data-testid="link-contact-email">kaskoynaagrotourism@gmail.com</a><p>We look forward to hearing from you.</p></div></div><div className="contact-item"><div className="icon-disc"><MapPin size={18} /></div><div><a href="https://www.google.com/maps/search/?api=1&query=At-Shembadi%2C+Post-Bamnoli%2C+Tal-Jawali%2C+Dist-Satara%2C+Maharashtra+415002" target="_blank" rel="noreferrer" data-testid="link-contact-map">Open in Google Maps <ExternalLink size={13} style={{ display: 'inline' }} /></a><p>At-Shembadi, Post-Bamnoli, Tal-Jawali, Dist-Satara, Satara, Maharashtra 415002.</p></div></div></div><div className="contact-socials"><div className="eyebrow">Follow Kas Koyna</div><div className="social-links" aria-label="Kas Koyna social media">{socialLinks.map(({ label, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noreferrer" className={`social-link social-${label.toLowerCase()}`} aria-label={label} title={label} data-testid={`link-contact-social-${label.toLowerCase()}`}><Icon size={21} /></a>)}</div></div></div><div className="form-card">{sent ? <div className="success-panel" data-testid="status-contact-success"><CircleCheck size={44} style={{ color: 'hsl(var(--accent))' }} /><h3 style={{ font: '2rem var(--app-font-serif)', margin: '17px 0 9px' }}>Thank you, {form.name}.</h3><p className="body-copy">Your note is ready for our team. For a quicker reply, you can also message us on WhatsApp.</p><a href={waLink} target="_blank" rel="noreferrer" className="btn-primary" style={{ marginTop: 18 }} data-testid="link-success-whatsapp">Open WhatsApp <Send size={15} /></a></div> : <form onSubmit={submit} noValidate><div className="eyebrow">Tell us about your plan</div><div className="form-grid" style={{ marginTop: 23 }}><div className="form-field"><label htmlFor="name">Your name</label><input id="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} data-testid="input-contact-name" />{errors.name && <span className="error-text">{errors.name}</span>}</div><div className="form-field"><label htmlFor="phone">Phone number</label><input id="phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} data-testid="input-contact-phone" />{errors.phone && <span className="error-text">{errors.phone}</span>}</div><div className="form-field full"><label htmlFor="email">Email <span style={{ fontWeight: 400 }}>(optional)</span></label><input id="email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} data-testid="input-contact-email" /></div><div className="form-field full"><label htmlFor="message">What are you planning?</label><textarea id="message" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Dates, group size, stay, food, boating, or anything else..." data-testid="input-contact-message" />{errors.message && <span className="error-text">{errors.message}</span>}</div></div><button type="submit" className="btn-primary" style={{ marginTop: 20 }} data-testid="button-contact-submit">Send enquiry <ArrowRight size={15} /></button></form>}</div></div><div className="container-wide" style={{ marginTop: 70 }}><iframe className="map-frame" title="Map showing Kas Koyna Agro Tourism" src="https://www.google.com/maps?q=Bamnoli%2C%20Satara%2C%20Maharashtra&output=embed" loading="lazy" /></div></main></Layout>;
}

function FAQ() {
  const questions = [
    ['Where is Kas Koyna Agro Tourism?', 'We are at At-Shembadi, Post-Bamnoli, Tal-Jawali, Dist-Satara, Satara, Maharashtra 415002, near the Bamnoli and Koyna backwater landscape.'],
    ['What kind of stay do you offer?', 'The official site describes clean, rustic cottage rooms. Share your dates and group size with us for current availability and details.'],
    ['What food is available?', 'Authentic local cuisine prepared in a traditional style is part of the experience. Menus and meal arrangements can vary, so please ask when you enquire.'],
    ['Can you help arrange boating or activities?', 'We can help you understand the current options for boating, trekking, kayaking, sightseeing, camping, and water experiences. Availability can depend on season and local conditions.'],
    ['Is this suitable for families and groups?', 'Yes, the setting is intended for families and groups. Tell us your group size early so we can share the most useful current information.'],
    ['How do I check prices and availability?', 'We do not publish unverified prices or active offers here. Call +91 9423260999, email us, or send the prefilled WhatsApp message for current details.'],
    ['What should I know before visiting Vasota or Kaas Plateau?', 'Access, weather, seasonal conditions, and local permissions can change. Confirm current arrangements before you travel.'],
  ];
  const [open, setOpen] = useState(0);
  return <Layout><PageHero eyebrow="Good to know" title="A few answers before you set out." text="If your question is not here, our local team will be happy to help with current details." /><main className="section-pad page-content"><div className="container-wide"><div className="faq-list">{questions.map(([q, a], i) => <div className="faq-item" key={q}><button className="faq-question" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} data-testid={`button-faq-${i}`}><span>{q}</span><ChevronDown size={18} style={{ transform: open === i ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }} /></button>{open === i && <div className="faq-answer" data-testid={`text-faq-answer-${i}`}>{a}</div>}</div>)}</div><div style={{ textAlign: 'center', marginTop: 48 }}><p className="body-copy">Still deciding? We can talk it through.</p><Link href="/contact" className="btn-primary" data-testid="link-faq-contact">Contact the team <ArrowRight size={15} /></Link></div></div></main></Layout>;
}

function Privacy() {
  return <Layout><PageHero eyebrow="A small note" title="Privacy, plainly explained." text="We keep this site simple and use the information you choose to share only to respond to your enquiry." /><main className="section-pad page-content"><div className="container-wide" style={{ maxWidth: 820 }}><div className="prose-copy"><h2 style={{ font: '2rem var(--app-font-serif)', color: 'hsl(var(--primary))' }}>What we collect</h2><p>If you contact Kas Koyna Agro Tourism by phone, email, WhatsApp, or the contact form, you may share your name, phone number, email address, dates, group size, and message. We use that information to respond to your request and help with current details.</p><h2 style={{ font: '2rem var(--app-font-serif)', color: 'hsl(var(--primary))' }}>What we do not do</h2><p>We do not use this presentation site to publish a guest database, sell personal information, or make up availability, pricing, awards, or offers. Please avoid sharing sensitive personal information in a general enquiry.</p><h2 style={{ font: '2rem var(--app-font-serif)', color: 'hsl(var(--primary))' }}>Third-party links</h2><p>Phone, email, WhatsApp, Google Maps, and embedded map links open or load third-party services. Their own privacy policies apply when you use them.</p><h2 style={{ font: '2rem var(--app-font-serif)', color: 'hsl(var(--primary))' }}>Questions</h2><p>For a privacy question, write to <a href="mailto:kaskoynaagrotourism@gmail.com" style={{ color: 'hsl(var(--primary))', fontWeight: 700 }}>kaskoynaagrotourism@gmail.com</a>.</p></div></div></main></Layout>;
}

function Terms() {
  return <Layout><PageHero eyebrow="A small note" title="Terms and conditions." text="A few straightforward notes for planning and enjoying your visit to Kas Koyna Agro Tourism." /><main className="section-pad page-content"><div className="container-wide" style={{ maxWidth: 820 }}><div className="prose-copy"><h2 style={{ font: '2rem var(--app-font-serif)', color: 'hsl(var(--primary))' }}>Packages and availability</h2><p>Package details, prices, room or tent availability, meals, boating, trekking arrangements, and permissions are subject to confirmation by the Kas Koyna team. Please confirm the latest details before travelling.</p><h2 style={{ font: '2rem var(--app-font-serif)', color: 'hsl(var(--primary))' }}>Guest responsibility</h2><p>Guests are responsible for following local guidance, activity safety instructions, forest rules, and any instructions given by guides or activity providers. Weather and water conditions can affect plans.</p><h2 style={{ font: '2rem var(--app-font-serif)', color: 'hsl(var(--primary))' }}>Third-party services</h2><p>Links to WhatsApp, Google Maps, phone services, email, and other third-party services are provided for convenience. Their own terms and policies apply when you use them.</p><h2 style={{ font: '2rem var(--app-font-serif)', color: 'hsl(var(--primary))' }}>Questions</h2><p>For questions about a package or visit, contact <a href="mailto:kaskoynaagrotourism@gmail.com" style={{ color: 'hsl(var(--primary))', fontWeight: 700 }}>kaskoynaagrotourism@gmail.com</a>.</p></div></div></main></Layout>;
}

function Seo() {
  const [location] = useLocation();
  useEffect(() => {
    const pageTitles: Record<string, string> = {
      '/': 'Kas Koyna Agro Tourism | Bamnoli, Satara',
      '/about': 'About Kas Koyna | Agro Tourism in Bamnoli',
      '/gallery': 'Gallery | Kas Koyna Agro Tourism',
      '/attractions': 'Attractions around Bamnoli | Kas Koyna',
      '/activities': 'Things to do | Kas Koyna Agro Tourism',
      '/packages': 'Packages | Kas Koyna Agro Tourism',
      '/contact': 'Contact Kas Koyna Agro Tourism',
      '/faq': 'FAQ | Kas Koyna Agro Tourism',
      '/privacy': 'Privacy Policy | Kas Koyna Agro Tourism',
      '/terms': 'Terms and Conditions | Kas Koyna Agro Tourism',
    };
    const description = 'Experience nature, authentic local cuisine, trekking, boating, camping and agro-tourism at Kas Koyna Agro Tourism in Bamnoli, Satara, Maharashtra.';
    document.title = pageTitles[location] ?? pageTitles['/'];
    const ensureMeta = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let tag = document.head.querySelector<HTMLMetaElement>(selector);
      if (!tag) {
        tag = document.createElement('meta');
        if (property) tag.setAttribute('property', name);
        else tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };
    ensureMeta('description', description);
    ensureMeta('og:title', document.title, true);
    ensureMeta('og:description', description, true);
    ensureMeta('og:type', 'website', true);
    ensureMeta('og:image', `${window.location.origin}/kas-koyna-logo.png`, true);
  }, [location]);
  return null;
}

function NotFound() {
  return <Layout><main className="section-pad" style={{ minHeight: '70vh', display: 'grid', placeItems: 'center', textAlign: 'center' }}><div><div className="eyebrow">Off the trail</div><h1 className="display-lg" style={{ margin: '15px 0' }}>This page wandered away.</h1><p className="body-copy">Let’s take you back to the lake.</p><Link href="/" className="btn-primary" style={{ marginTop: 18 }} data-testid="link-not-found-home">Back home <ArrowRight size={15} /></Link></div></main></Layout>;
}

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location]);
  return null;
}

function App() {
  return <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Seo /><ScrollToTop /><Switch><Route path="/" component={Home} /><Route path="/about" component={About} /><Route path="/gallery" component={Gallery} /><Route path="/attractions" component={Attractions} /><Route path="/activities" component={Activities} /><Route path="/packages" component={Packages} /><Route path="/contact" component={Contact} /><Route path="/faq" component={FAQ} /><Route path="/privacy" component={Privacy} /><Route path="/terms" component={Terms} /><Route component={NotFound} /></Switch></WouterRouter>;
}

export default App;

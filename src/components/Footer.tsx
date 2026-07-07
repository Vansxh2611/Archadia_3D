import Link from 'next/link';
import '../styles/footer.css';

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="site-footer">
      {/* Blurred background text is rendered via CSS ::before */}

      {/* Main Footer Columns */}
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <Link href="/" className="site-footer__logo">
            <span className="site-footer__logo-light">ARCHADIA</span>
            <span className="site-footer__logo-gold"> 3D</span>
          </Link>
          <p className="site-footer__brand-desc">
            Crafting cinematic architectural experiences through advanced visualization and visionary design.
          </p>
          <div className="site-footer__socials">
            {[
              { icon: FacebookIcon, label: 'Facebook' },
              { icon: InstagramIcon, label: 'Instagram' },
              { icon: TwitterIcon, label: 'Twitter' },
              { icon: LinkedinIcon, label: 'LinkedIn' },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="site-footer__social-link"
              >
                <Icon width={16} height={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Company Column */}
        <div className="site-footer__col">
          <h3 className="site-footer__heading">Company</h3>
          <ul className="site-footer__list">
            <li><Link href="/studio">About Us</Link></li>
            <li><Link href="/case-studies">Case Studies</Link></li>
            <li><Link href="/clients">Our Clients</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Services Column */}
        <div className="site-footer__col">
          <h3 className="site-footer__heading">Services</h3>
          <ul className="site-footer__list">
            {['Arch. Visualization', 'Interior Rendering', '3D Animation', 'Virtual Experiences', 'Design Consulting'].map((s) => (
              <li key={s}>
                <Link href="/services">{s}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Column */}
        <div className="site-footer__col site-footer__col--contact">
          <h3 className="site-footer__heading">Contact</h3>
          <ul className="site-footer__list">
            <li>
              <a href="mailto:studio@archadia3d.com" className="site-footer__contact-link">
                studio@archadia3d.com
              </a>
            </li>
            <li>
              <a href="tel:+919876543210" className="site-footer__contact-link">
                +91 98765 43210
              </a>
            </li>
            <li><span className="site-footer__contact-text">Mumbai Studio</span></li>
            <li><span className="site-footer__contact-text">Delhi-NCR Studio</span></li>
            <li><span className="site-footer__contact-text">Bengaluru Studio</span></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="site-footer__bottom">
        <div className="site-footer__bottom-inner">
          <span className="site-footer__copyright">
            © 2026 Archadia 3D, India. Architectural precision.
          </span>
          <span className="site-footer__tagline">
            Crafted with precision and imagination.
          </span>
        </div>
      </div>
    </footer>
  );
}

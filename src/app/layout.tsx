import type { Metadata } from 'next';
import Script from 'next/script';
import ClientLayout from './client-layout';
import './globals.css';
import '../styles/home.css';
import '../styles/clients.css';
import '../styles/portfolio.css';
import '../styles/services.css';
import '../styles/studio.css';
import '../styles/contact.css';
import '../styles/footer.css';

export const metadata: Metadata = {
  title: 'Archadia 3D | Architectural Visualization Studio in Mumbai, India',
  description: 'Archadia 3D is a visual architecture studio based in India, crafting high-end 3D renders and digital experiences for developers and brands across the country.',
  keywords: 'architecture visualization, 3D rendering, architectural CGI, interior rendering, virtual reality architecture, luxury architecture studio',
  other: {
    'theme-color': '#050505',
  },
  openGraph: {
    title: 'Archadia 3D | Architectural Visualization Studio in Mumbai, India',
    description: 'Archadia 3D is a visual architecture studio based in India, crafting high-end 3D renders and digital experiences for developers and brands across the country.',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@200;300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
        {/* Load 3D Model Viewer support globally */}
        <Script
          src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
          type="module"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

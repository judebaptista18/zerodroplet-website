import type {Metadata} from 'next';
import '@/styles/globals.scss';
import {Providers} from '@/components/Providers';
import {Header} from '@/components/Header';
import {Footer} from '@/components/Footer';
import {ChatWidget} from '@/components/ChatWidget';
import {Analytics} from '@/components/Analytics';
import {publicEnv} from '@/lib/env';

export const metadata: Metadata = {
  metadataBase: new URL(publicEnv.siteUrl),
  title: {default: 'Zero Droplet | Water & Wastewater Treatment', template: '%s | Zero Droplet'},
  description: 'Water and wastewater treatment plants, products, engineering consultancy, operations and maintenance in Goa and across South India.',
  openGraph: {
    title: 'Zero Droplet Engineers & Consultants',
    description: 'Engineering clean water and responsible wastewater solutions.',
    type: 'website',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
          <ChatWidget />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}

import Script from 'next/script';
import './globals.css';

export const metadata = {
  metadataBase: new URL('https://siamang.dev'),
  title: 'Adam Henry | Software Engineer',
  description:
    'Adam Henry is a software engineer working across C++, image processing, real-time graphics, and full-stack web development.',
  openGraph: {
    title: 'Adam Henry | Software Engineer',
    description:
      'C++, image processing, real-time graphics, and full-stack web development.',
    url: 'https://siamang.dev',
    type: 'website',
    images: [
      {
        url: '/og-academic.png',
        width: 1731,
        height: 909,
        alt: 'Adam Henry - Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adam Henry | Software Engineer',
    description: 'C++, image processing, real-time graphics, and full-stack web development.',
    images: ['/og-academic.png'],
  },
  icons: {
    icon: '/icon.png'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const storedTheme = localStorage.getItem('theme');
                const theme = storedTheme === 'light' || storedTheme === 'dark'
                  ? storedTheme
                  : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.dataset.theme = theme;
                document.documentElement.style.colorScheme = theme;
              } catch {}
            `,
          }}
        />
      </head>
      <body>
        {children}
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          async
          defer
        />
      </body>
    </html>
  );
}

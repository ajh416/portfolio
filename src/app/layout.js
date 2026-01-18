import './globals.css';

export const metadata = {
  title: 'Adam Henry • Software Engineer',
  description:
    'Software engineer focused on imaging, graphics, and full-stack web. ships c++/imgui tools, ml imaging, and next.js apps.',
  openGraph: {
    title: 'Adam Henry • Software Engineer',
    description:
      'Software engineer focused on imaging, graphics, and full-stack web.',
    url: 'https://siamang.dev',
    type: 'website'
  },
  icons: {
    icon: '/icon.png'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import './globals.css';

export const metadata = {
  title: "Adam Henry",
  description: "Adam Henry's personal website",
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

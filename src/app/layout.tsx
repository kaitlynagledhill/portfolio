import type { Metadata } from "next";
import { Space_Grotesk, Instrument_Serif } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kaitlyn Gledhill — Software Engineer",
  description:
    "Full-stack software engineer. NC State CS, Magna Cum Laude. Goodnight Scholar. Based in Raleigh, NC.",
  openGraph: {
    title: "Kaitlyn Gledhill — Software Engineer",
    description:
      "Full-stack software engineer. NC State CS, Magna Cum Laude. Based in Raleigh, NC.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${instrumentSerif.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.44.0/tabler-icons.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
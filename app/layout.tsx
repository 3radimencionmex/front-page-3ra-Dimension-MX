import type { Metadata } from "next";
import { Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SlicerProvider from "@/components/SlicerProvider";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "optional",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "optional",
});

export const metadata: Metadata = {
  title: "3radimension Mexico | Impresión 3D Profesional",
  description:
    "Empresa profesional de impresión 3D en México. Fabricamos prototipos y piezas con tecnología FDM, SLA/MSLA y resina. Prototipado rápido en CDMX.",
  keywords: [
    "impresión 3D México",
    "prototipado rápido CDMX",
    "FDM resina México",
    "fabricación 3D profesional",
    "3radimension",
  ],
  authors: [{ name: "3radimension Mexico" }],
  creator: "3radimension Mexico",
  openGraph: {
    type: "website",
    locale: "es_MX",
    title: "3radimension Mexico | Impresión 3D Profesional",
    description:
      "Donde el diseño se vuelve tangible. Impresión 3D profesional FDM, SLA/MSLA en México.",
    siteName: "3radimension Mexico",
  },
  twitter: {
    card: "summary_large_image",
    title: "3radimension Mexico | Impresión 3D Profesional",
    description:
      "Donde el diseño se vuelve tangible. Impresión 3D profesional en México.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-MX"
      className={`${geistMono.variable} ${spaceGrotesk.variable}`}
    >
      <body>
        <SlicerProvider>
          {children}
        </SlicerProvider>
      </body>
    </html>
  );
}

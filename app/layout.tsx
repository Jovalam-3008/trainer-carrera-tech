import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const incomingHeaders = await headers();
  const host =
    incomingHeaders.get("x-forwarded-host") ??
    incomingHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    incomingHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    title: "Trainer de Carrera Tech",
    description:
      "Centro operativo de aprendizaje, proyectos, productividad y carrera.",
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      title: "Trainer de Carrera Tech",
      description:
        "Centro operativo de aprendizaje, proyectos, productividad y carrera.",
      images: [
        {
          url: `${origin}/og.png`,
          width: 1200,
          height: 630,
          alt: "Trainer de Carrera Tech",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Trainer de Carrera Tech",
      description:
        "Centro operativo de aprendizaje, proyectos, productividad y carrera.",
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

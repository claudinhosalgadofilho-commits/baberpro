import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";

import "./globals.css";

export const metadata: Metadata = {
  title: "BarberPro | Sistema para Barbearias",
  description: "Gestão premium para barbearias com agenda, clientes, financeiro e relatórios.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

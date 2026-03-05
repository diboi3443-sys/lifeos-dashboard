import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/AppContext";

const inter = Inter({
    subsets: ["latin", "cyrillic"],
    variable: "--font-inter",
});

const manrope = Manrope({
    subsets: ["latin", "cyrillic"],
    variable: "--font-manrope",
});

export const metadata: Metadata = {
    title: "LifeOS — Трансформация",
    description: "18 месяцев. 5 направлений. Полная перезагрузка жизни.",
    viewport: {
        width: "device-width",
        initialScale: 1,
        maximumScale: 1,
        userScalable: false,
    },
    themeColor: "#050505",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ru" className={`${inter.variable} ${manrope.variable}`}>
            <body className="antialiased">
                <AppProvider>{children}</AppProvider>
            </body>
        </html>
    );
}

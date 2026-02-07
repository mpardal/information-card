import './globals.css';
import { Great_Vibes, EB_Garamond } from 'next/font/google';

const greatVibes = Great_Vibes({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-love',
});

const ebGaramond = EB_Garamond({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-letter',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr" className={`${greatVibes.variable} ${ebGaramond.variable}`}>
        <body className="min-h-dvh bg-white">{children}</body>
        </html>
    );
}
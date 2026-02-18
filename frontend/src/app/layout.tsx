import { Navbar } from '@/components/layout/Navbar';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { CartProvider } from '@/context/CartContext';
import { Footer } from '@/components/layout/Footer';
import type { Metadata } from 'next';
import { Oswald, Roboto, Bebas_Neue } from 'next/font/google'; // Importamos fuentes de Google
import './globals.css';
import { Toaster } from 'sonner';
import { PageLoader } from '@/components/ui/PageLoader';
import { PromoModal } from '@/components/ui/PromoModal';
import { CravingPrompt } from '@/components/ui/CravingPrompt';
import { DailyPromoPopup } from '@/components/ui/DailyPromoPopup';

// Fuente para Títulos (Estilo Urbano)
const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  display: 'swap',
});

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400', // <-- Agrega esto para resolver el error
  variable: '--font-bebas',
  display: 'swap',
});

// Fuente para Cuerpo (Lectura)
const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Capital Burger | Las Mejores Hamburguesas en Chinchiná',
  description:
    'Hamburguesas artesanales a domicilio en Chinchina. Pide online tu burger favorita, papas y bebidas. ¡Envío rápido y seguro!',
  keywords: [
    'hamburguesas',
    'domicilios',
    'comida rápida',
    'burger',
    'Chinchina',
  ],
  openGraph: {
    title: 'Capital Burger - No seguimos tendencias las cocinamos',
    description: '¿Hambre? Pide las mejores hamburguesas de Chinchiná aquí.',
    images: ['/images/logo.png'], // Una imagen bonita para cuando compartan el link en WhatsApp
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es'>
      <body
        className={`${oswald.variable} ${bebasNeue.variable} ${roboto.variable} antialiased bg-black text-white`}
      >
        <CartProvider>
          <PageLoader />
          <PromoModal />
          <CravingPrompt />
          <Navbar />
          <DailyPromoPopup />
          <Toaster position='top-center' richColors expand={false} />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}

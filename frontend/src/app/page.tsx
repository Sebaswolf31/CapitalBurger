import { Hero } from '@/components/home/Hero';
import { ProductGrid } from '@/components/home/ProductGrid';
import { Navbar } from '@/components/layout/Navbar';

export default function Home() {
  return (
    <main id='inicio' className='bg-urban-dark min-h-screen'>
      <Navbar />
      <Hero />
      <div
        className='relative w-full py-10'
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(10,10,10,0.8), rgba(10,10,10,0.95)), url('/hero2.jpeg')",
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'repeat', // Permite que la imagen se repita
          backgroundSize: '100px 100px', // Define el tamaño de cada "cuadrito" (ajusta a tu gusto)
        }}
      >
        {/* SOLO UNA VEZ: El componente ahora maneja sus propios filtros */}
        <ProductGrid />
      </div>
    </main>
  );
}

import Image from 'next/image';
import { Instagram, Facebook } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer
      className='bg-[#050505] border-t border-white/5 pt-19 pb-6'
      id='contacto'
    >
      <div className='max-w-6xl mx-auto px-5'>
        <div className='flex flex-col md:flex-row justify-between items-center md:items-start gap-12'>
          {/* Bloque Logo */}
          <div className='flex flex-col items-center md:items-start max-w-xs'>
            <Image
              src='/logo2.jpeg'
              alt='Capital Burger'
              width={120}
              height={50}
              className='opacity-90'
            />
            <p className='mt-6 text-gray-500 text-[13px] leading-relaxed text-center md:text-left font-sans'>
              ¡Con sabor y perreo! Se disfruta mejor. <br />
              Sabor sin escalas full calle.
            </p>
          </div>

          {/* Bloque Horarios */}
          <div className='text-center md:text-left'>
            <h4 className='font-heading uppercase italic text-urban-green tracking-widest mb-4'>
              Horarios
            </h4>
            <div className='text-[13px] space-y-1 font-sans'>
              <p className='text-white'>
                Lun - Dom:{' '}
                <span className='text-gray-400'>5:00 PM - 11:45 PM</span>
              </p>
              <p className='text-gray-500 uppercase text-[11px] tracking-tighter'>
                Martes: Cerrado
              </p>
            </div>
          </div>

          {/* Bloque Social */}
          <div className='flex flex-col items-center md:items-end'>
            <h4 className='font-heading uppercase italic text-white tracking-widest mb-4'>
              Pide y Síguenos
            </h4>
            <div className='flex gap-4'>
              {/* WHATSAPP - Resaltado en verde */}
              <a
                href='https://wa.me/573225917373'
                target='_blank'
                rel='noopener noreferrer'
                className='w-11 h-11 rounded-full bg-urban-green/10 flex items-center justify-center text-urban-green border border-urban-green/20 hover:bg-urban-green hover:text-black transition-all shadow-[0_0_15px_rgba(0,255,102,0.1)]'
                title='Escríbenos por WhatsApp'
              >
                <FaWhatsapp size={24} />
              </a>

              {/* INSTAGRAM */}
              <a
                href='https://www.instagram.com/capitallburger?igsh=cDc4bTQyeGQwYmJj'
                target='_blank'
                rel='noopener noreferrer'
                className='w-11 h-11 rounded-full bg-[#E1306C]/10 flex items-center justify-center text-[#E1306C] border border-[#E1306C]/20 hover:bg-[#E1306C] hover:text-white transition-all shadow-[0_0_15px_rgba(225,48,108,0.2)]'
                title='Síguenos en Instagram'
              >
                <Instagram size={20} />
              </a>

              {/* FACEBOOK */}
              <a
                href='https://www.facebook.com/share/1D8QtTQ88s/'
                target='_blank'
                rel='noopener noreferrer'
                className='w-11 h-11 rounded-full bg-[#1877F2]/10 flex items-center justify-center text-[#1877F2] border border-[#1877F2]/20 hover:bg-[#1877F2] hover:text-white transition-all shadow-[0_0_15px_rgba(24,119,242,0.2)]'
                title='Síguenos en Facebook'
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className='mt-16 pt-8 border-t border-white/5'>
          <p className='text-center text-[9px] text-gray-600 uppercase tracking-[0.4em]'>
            © {new Date().getFullYear()} Capital Burger - Estilo Urbano
          </p>
        </div>
      </div>
    </footer>
  );
};

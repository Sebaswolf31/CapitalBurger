import { Product, ExtraOption } from '../components/types/index';

// 1. DEFINIMOS TUS ADICIONALES (Para no repetirlos 20 veces)
const commonExtras: ExtraOption[] = [
  { id: 'ext-papas-med', name: '1/2 Porción de Papas', price: 3000 },
  { id: 'ext-papas-full', name: 'Porción de Papa', price: 5000 },
  { id: 'ext-huevos', name: 'Huevo Codorniz (10und)', price: 5000 },
  { id: 'ext-tocineta', name: 'Tocineta', price: 3000 },
  { id: 'ext-carne', name: 'Carne', price: 5000 },
  { id: 'ext-pollo', name: 'Pollo', price: 5000 },
  { id: 'ext-salchicha', name: 'Salchicha', price: 3000 },
  { id: 'ext-queso', name: 'Queso', price: 5000 },
];

export const menu: Product[] = [
  // --- HAMBURGUESAS ---
  {
    id: '1',
    name: 'Callejera',
    description:
      'Deliciosa carne artesanal, lechuga, tomate, coleslaw, pepinillos, queso mozarella, tocineta, ripio de papa',
    price: 12000,
    image: '/burgers/callejera.jpeg',
    tag: 'LA MERCA',
    category: 'hamburguesas',
    extras: commonExtras, // <--- AQUÍ AGREGAMOS LOS ADICIONALES
  },
  {
    id: '2',
    name: 'La Bandida',
    description:
      'Filete de pollo, lechuga, tomate, coleslaw, pimientos dulces, queso mozarella, tocineta, chesse balls',
    price: 14000,
    image: '/burgers/bandida.jpeg',
    tag: 'ATREVIDA',
    category: 'hamburguesas',
    extras: commonExtras,
  },
  {
    id: '3',
    name: 'Del Barrio',
    description:
      'Deliciosa carne artesanal, bondiola en BBQ de tamarindo, lechuga, tomate, coleslaw',
    price: 16000,
    image: '/burgers/delBarrio.jpeg',
    tag: 'RAICES',
    category: 'hamburguesas',
    extras: commonExtras,
  },
  {
    id: '4',
    name: 'Trafikante',
    description:
      'Deliciosa carne artesanal, filete de pollo, lechuga, tomate, coleslaw, pepinillos, pimientos dulces, queso mozarella, tocineta, chesse balls',
    price: 20000,
    image: '/burgers/trafikante.jpeg',
    tag: 'POTENTE',
    category: 'hamburguesas',
    extras: commonExtras,
  },
  {
    id: '5',
    name: 'Extasis',
    description:
      'Mayo de la casa, lechuga, pulled pork en salsa de jaggermatter, queso philadelphia, mermelada de frutos rojos',
    price: 18000,
    image: '/burgers/extasis.jpeg',
    tag: 'PRODUCTO MES',
    category: 'hamburguesas',
    isPromo: true, // Esto es para destacarla visualmente
    extras: commonExtras,
  },

  // --- PERROS CALIENTES ---
  {
    id: '11',
    name: 'Todo Un Clasico',
    description:
      'Salchicha long, queso mozarella, coleslaw, tocineta, ripio de papa',
    price: 12000,
    image: '/hotdogs/clasico.jpeg',
    tag: 'EL FIJO',
    category: 'perros',
    extras: commonExtras,
  },
  {
    id: '13',
    name: 'El Perron',
    description:
      'Salchicha artesanal de res rellena de queso mozarella, coleslaw, pico de gallo, guacamole, chesse balls, tocineta, huevos de codorniz',
    price: 15000,
    image: '/hotdogs/perron.jpeg',
    tag: 'EL PATRÓN',
    category: 'perros',
    extras: commonExtras,
  },
  {
    id: '12',
    name: 'Terreneitor',
    description:
      'Mermelada de tocineta, salchicha long, coleslaw, chesse balls, queso mozarella, huevos de codorniz',
    price: 17000,
    image: '/hotdogs/terreneitor.jpeg',
    tag: 'EL TANQUE',
    category: 'perros',
    extras: commonExtras,
  },
  {
    id: '14',
    name: 'Capital',
    description:
      'Bondiola en BBQ de tamarindo, salchicha long, coleslaw, guacamole, queso mozarella, chesse balls',
    price: 20000,
    image: '/hotdogs/capital.jpeg',
    tag: 'LA ZONA',
    category: 'perros',
    extras: commonExtras,
  },

  // --- SALCHIPAPAS ---
  {
    id: '21',
    name: 'Criminal',
    description:
      'Papas a la francesa, salchicha long, tocineta, queso mozarella, huevos de codorniz',
    price: 12000,
    image: '/fries/criminal.jpeg',
    tag: 'EL VISAGE',
    category: 'salchipapas',
    extras: commonExtras,
  },
  {
    id: '22',
    name: 'Tremendo Flow',
    description:
      'Papas a la francesa, filete de pollo, tocineta, queso mozarella, huevos de codorniz',
    price: 16000,
    image: '/fries/tremendoflow.jpeg',
    tag: 'EL SWING',
    category: 'salchipapas',
    extras: commonExtras,
  },
  {
    id: '23',
    name: 'Underground',
    description:
      'Papas a la francesa, bondiola, costillas al barril con BBQ de tamarindo, queso mozarella, huevos de codorniz',
    price: 18000,
    image: '/fries/under.jpeg',
    tag: 'LA VUELTA',
    category: 'salchipapas',
    extras: commonExtras,
  },
  {
    id: '24',
    name: 'La Gordibuena',
    description:
      'Papas a la francesa, bondiola, costillas al barril, pico de gallo, guacamole, tocineta, queso mozarella, huevos de codorniz',
    price: 25000,
    tag: 'LA GRUESA',
    image: '/fries/gordibuena.jpeg',
    category: 'salchipapas',
    extras: commonExtras,
  },

  // --- NUEVA SECCIÓN: PROMOCIONES ---
  // Aquí colocas las promos para que aparezcan en su propia pestaña
  {
    id: 'promo1',
    name: 'Combi Completa ',
    description: '2 Hamburguesas Callejeras +  2 Porción de Papas + 2 gaseosas',
    price: 26000,
    image: '/promos/combiCompleta.jpeg', // Asegúrate de tener esta imagen o usa una existente
    tag: 'AHORRO',
    category: 'promociones', // <--- ESTO CREARÁ LA NUEVA PESTAÑA
  },
  {
    id: 'promo2',
    name: 'Combo Bellako',
    description:
      '1 Hamburguesa Callejera + 1 Perro Todo Un Clasico + 2 porciones de papas + 2 gaseosas',
    price: 24000,
    image: '/promos/comboBellako.jpeg',
    tag: 'AHORRO',
    category: 'promociones',
  },

  {
    id: 'picada1',
    name: 'Picada Personal',
    description:
      'Chicharoon, costilla, bondiola, chorizo, papa, arepa  y guacamole.',
    price: 16000,
    image: '/picadas/picada.jpeg', // Asegúrate de tener la foto
    category: 'picadas', // Categoría nueva
    extras: [],
  }, 
];

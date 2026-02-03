// src/data/menu.ts

import { Product } from '../components/types/index'; // Importa la interfaz que acabamos de ajustar
export const menu: Product[] = [
  // Hamburguesas
  {
    id: '1',
    name: ' Callejera',
    description:
      'Deliciosa carne artesanal, lechuga, tomate, coleslaw, pepinillos, queso mozarella, tocineta, ripio de papa',
    price: 12000,
    image: '/burgers/callejera.jpeg',
    tag: 'LA MERCA',
    category: 'hamburguesas',
  },
  {
    id: '2',
    name: ' La Bandida',
    description:
      'Filete de pollo, lechuga, tomate, coleslaw, pimientos dulces, queso mozarella, tocineta, chesse balls',
    price: 14000,
    image: '/burgers/bandida.jpeg',
    tag: 'ATREVIDA',
    category: 'hamburguesas',
  },
  {
    id: '3',
    name: ' Del Barrio',
    description:
      'Deliciosa carne artesanal, bondiola en BBQ de tamarindo, lechuga, tomate, coleslaw',
    price: 16000,
    image: '/burgers/delBarrio.jpeg',
    tag: 'RAICES',
    category: 'hamburguesas',
  },

  {
    id: '4',
    name: ' Trafikante',
    description:
      'Deliciosa carne artesanal, filete de pollo, lechuga, tomate, coleslaw, pepinillos, pimientos dulces, queso mozarella, tocineta, chesse balls',
    price: 20000,
    image: '/burgers/trafikante.jpeg',
    tag: 'POTENTE',
    category: 'hamburguesas',
  },

  {
    id: '5',
    name: 'Extasis',
    description:
      'Mayo de la casa, lechuga, pulled pork en salsa de jaggermatter, queso philadelphia, mermelada de frutos rojos ( mora, flor de jamaica, arandanos) ',
    price: 18000,
    image: '/burgers/extasis.jpeg',
    tag: 'PRODUCTO MES',
    category: 'hamburguesas',
    isPromo: true,
  },

  // Perros calientes
  {
    id: '11',
    name: ' Todo Un Clasico',
    description:
      'salchicha long, queso mozarella, coleslaw, tocineta, ripio de papa',
    price: 12000,
    image: '/hotdogs/clasico.jpeg',
    tag: 'EL FIJO',
    category: 'perros',
  },

  {
    id: '13',
    name: ' El Perron',
    description:
      'Salchicha artesanal de res rellena de queso mozarella, coleslaw, pico de gallo, guacamole, chesse balls, tocineta, huevos de codorniz ',
    price: 15000,
    image: '/hotdogs/perron.jpeg',
    tag: 'EL PATRÓN',
    category: 'perros',
  },

  {
    id: '12',
    name: ' Terreneitor',
    description:
      'Mermelada de tocineta, salchicha long, coleslaw, chesse balls, queso mozarella, huevos de codorniz ',
    price: 17000,
    image: '/hotdogs/terreneitor.jpeg',
    tag: 'EL TANQUE',
    category: 'perros',
  },
  {
    id: '14',
    name: ' Capital',
    description:
      'Bondiola en BBQ de tamarindo, salchicha long, coleslaw, guacamole, queso mozarella, chesse balls ',
    price: 20000,
    image: '/hotdogs/capital.jpeg',
    tag: 'LA ZONA',
    category: 'perros',
  },

  // Salchipapas
  {
    id: '21',
    name: ' Criminal',
    description:
      'Papas a la francesa, salchicha long, tocineta, queso mozarella, huevos de codorniz ',
    price: 12000,
    image: '/fries/criminal.jpeg',
    tag: 'EL VISAGE',
    category: 'salchipapas',
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
  },

  {
    id: '23',
    name: ' Underground',
    description:
      'Papas a la francesa, bondiola, costillas al barril con BBQ de tamarindo, queso mozarella, huevos de codorniz',
    price: 18000,
    image: '/fries/under.jpeg',
    tag: 'LA VUELTA',
    category: 'salchipapas',
  },

  {
    id: '24',
    name: ' La Gordibuena',
    description:
      'Papas a la francesa, bondiola, costillas al barril, pico de gallo, guacamole, tocineta, queso mozarella, huevos de codorniz',
    price: 25000,
    tag: 'LA GRUESA',
    image: '/fries/gordibuena.jpeg',
    category: 'salchipapas',
  },
];

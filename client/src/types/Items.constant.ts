export interface Item {
  name: string
  price: number
  sprite: string
}

const ITEMS: Array<Item> = [
  {
    name: 'fresh-water',
    price: 20,
    sprite:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/fresh-water.png',
  },
  {
    name: 'poke-ball',
    price: 50,
    sprite:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png',
  },
  {
    name: 'super-potion',
    price: 200,
    sprite:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/super-potion.png',
  },
  {
    name: 'rare-candy',
    price: 1000,
    sprite:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png',
  },
]

export default ITEMS

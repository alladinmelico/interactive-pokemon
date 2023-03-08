export interface Item {
  price: number
  sprite: string
}

export default new Map<string, Item>([
  [
    'fresh-water',
    {
      price: 20,
      sprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/fresh-water.png',
    },
  ],
  [
    'poke-ball',
    {
      price: 50,
      sprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png',
    },
  ],
  [
    'super-potion',
    {
      price: 200,
      sprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/super-potion.png',
    },
  ],
  [
    'rare-candy',
    {
      price: 1000,
      sprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png',
    },
  ],
])

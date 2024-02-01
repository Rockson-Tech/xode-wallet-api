class NFT {
  id?: string = '';
  name: string = '';
  category: string = '';
  collection: string = '';
  description: string = '';
  image_path: string = '';
  price: number = 0;
  is_for_sale: boolean = false;
  is_equipped: boolean = false;
  astro_type: string = '';
  stats: {
    rarity: number;
    attack: number;
    defense: number;
    hitpoints: number;
    passive1: {
      type: number;
      percentage: number;
    };
  } = {
    rarity: 0,
    attack: 0,
    defense: 0,
    hitpoints: 0,
    passive1: {
      type: 0,
      percentage: 0,
    },
  };
  network: string = '';
  blockchain_id: number = 0;
}

export default NFT;

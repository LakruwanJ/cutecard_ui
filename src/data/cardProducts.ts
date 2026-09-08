export interface GiftCard {
  id: string;
  name: string;
  details: { [key: string]: string };
  size: number;
  price: number;
  tags: string[];
  gifUrl?: string;
  category?: string;
}

export const allCardProducts: GiftCard[] = [
  {
    id: "1",
    name: "Golden Bloom Pop-up Card",
    category: "Birthday",
    details: {
      Material: "250gsm Linen Paper",
      Style: "Floral Pop-up",
      Dimensions: "5 x 7 inches",
      Origin: "Colombo, Sri Lanka",
    },
    size: 12,
    price: 15.99,
    tags: ["Best Seller", "Limited Edition"],
    gifUrl: "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif",
  },
  {
    id: "2",
    name: "Vintage Botanical Love",
    category: "Love & Anniversary",
    details: {
      Material: "Recycled Kraft",
      Style: "Vintage Botanical",
      Dimensions: "5 x 7 inches",
      Origin: "Kandy, Sri Lanka",
    },
    size: 8,
    price: 9.99,
    tags: ["New Arrival"],
    gifUrl: "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif",
  },
  {
    id: "3",
    name: "Minimalist Pastel Confetti",
    category: "Birthday",
    details: {
      Material: "Recycled Eco Paper",
      Style: "Minimalist",
      Dimensions: "4.5 x 6 inches",
      Origin: "Galle, Sri Lanka",
    },
    size: 10,
    price: 5.99,
    tags: ["Eco-Friendly"],
    gifUrl: "https://media.giphy.com/media/3o7TKMt1VVNkHV2PaE/giphy.gif",
  },
  {
    id: "4",
    name: "Whimsical Watercolor Heart",
    category: "Love & Anniversary",
    details: {
      Material: "Handmade Cotton Rag",
      Style: "Watercolour Wash",
      Dimensions: "5 x 7 inches",
      Origin: "Colombo, Sri Lanka",
    },
    size: 12,
    price: 14.5,
    tags: ["Best Seller"],
    gifUrl: "https://media.giphy.com/media/l41lT4at60KQIARVu/giphy.gif",
  },
  {
    id: "5",
    name: "Royal Peacock Keepsake",
    category: "Wedding",
    details: {
      Material: "Gold Foil Embossed",
      Style: "Traditional Heritage",
      Dimensions: "6 x 8 inches",
      Origin: "Matara, Sri Lanka",
    },
    size: 8,
    price: 18.99,
    tags: ["Limited Edition", "New Arrival"],
    gifUrl: "https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif",
  },
  {
    id: "6",
    name: "Tropical Monstera Thank You",
    category: "Thank You",
    details: {
      Material: "Seed Paper (Plantable)",
      Style: "Tropical Eco",
      Dimensions: "4.5 x 6 inches",
      Origin: "Negombo, Sri Lanka",
    },
    size: 10,
    price: 7.99,
    tags: ["Eco-Friendly"],
    gifUrl: "https://media.giphy.com/media/26FPJGjhefSJuaRhu/giphy.gif",
  },
  {
    id: "7",
    name: "Starry Night Pop-up Galaxy",
    category: "Pop-up 3D",
    details: {
      Material: "Metallic Cardstock",
      Style: "3D Light Layered",
      Dimensions: "5.5 x 7.5 inches",
      Origin: "Colombo, Sri Lanka",
    },
    size: 14,
    price: 19.5,
    tags: ["Best Seller"],
    gifUrl: "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif",
  },
  {
    id: "8",
    name: "Sweet Blossom Congratulation",
    category: "Wedding",
    details: {
      Material: "Pearl Shimmer Paper",
      Style: "Lace Cut Embossed",
      Dimensions: "5 x 7 inches",
      Origin: "Kandy, Sri Lanka",
    },
    size: 10,
    price: 12.99,
    tags: ["New Arrival"],
    gifUrl: "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif",
  },
];

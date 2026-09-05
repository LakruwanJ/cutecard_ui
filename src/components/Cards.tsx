import Card from "./Card";

const cardData = [
  {
    id: "1",
    name: "Premium Card",
    details: {
      Material: "Paper",
      Style: "Modern",
    },
    size: 12,
    price: 15.99,
    tags: ["Best Seller", "Limited Edition"],
    gifUrl:
      "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif",
  },
  {
    id: "2",
    name: "Classic Card",
    details: {
      Material: "Plastic",
      Style: "Vintage",
    },
    size: 8,
    price: 9.99,
    tags: ["New Arrival"],
    gifUrl:
      "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif",
  },
  {
    id: "3",
    name: "Simple Card",
    details: {
      Material: "Recycled Paper",
      Style: "Minimalist",
    },
    size: 10,
    price: 5.99,
    tags: ["Eco-Friendly"],
  },
  {
    id: "4",
    name: "Premium Card",
    details: {
      Material: "Paper",
      Style: "Modern",
    },
    size: 12,
    price: 15.99,
    tags: ["Best Seller", "Limited Edition"],
    gifUrl:
      "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif",
  },
  {
    id: "5",
    name: "Classic Card",
    details: {
      Material: "Plastic",
      Style: "Vintage",
    },
    size: 8,
    price: 9.99,
    tags: ["New Arrival"],
    gifUrl:
      "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif",
  },
  {
    id: "6",
    name: "Simple Card",
    details: {
      Material: "Recycled Paper",
      Style: "Minimalist",
    },
    size: 10,
    price: 5.99,
    tags: ["Eco-Friendly"],
  },
];

export default function Cards() {
  return (
    <div className="cards-page">
      <Card cards={cardData} />
    </div>
  );
}
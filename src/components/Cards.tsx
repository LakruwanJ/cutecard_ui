import Card from "./Card";
import { allCardProducts } from "../data/cardProducts";

export default function Cards() {
  return (
    <div className="cards-page">
      <Card cards={allCardProducts.slice(0, 4)} />
    </div>
  );
}
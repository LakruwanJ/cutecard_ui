import { cardData } from "../data/CarouselData";

export default function CardIcon() {
  return (
    <>
      {cardData.map((card, index) => (
        <li key={index} className="carousel-card-item">
          <div className="carousel-card">
            <div className="carousel-card-image">
              <img
                src={card.image}
                alt={`Icon for ${card.topic}`}
              />
            </div>

            <div className="carousel-card-content">
              <h3>{card.topic}</h3>
              <p>{card.details}</p>
            </div>
          </div>
        </li>
      ))}
    </>
  );
}
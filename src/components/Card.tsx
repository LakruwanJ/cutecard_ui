import { Button, Card as AntCard, Tag } from "antd";
import { useNavigate } from "react-router-dom";

interface CardProps {
  cards: {
    id: string;
    name: string;
    details: { [key: string]: string };
    size: number;
    price: number;
    tags: string[];
    gifUrl?: string;
  }[];
}

export default function Card({ cards }: CardProps) {
  const navigate = useNavigate();

  const cardId = "123";

  return (
    <div className="cards-grid">
      {cards.map((card) => (
        <AntCard
          key={card.id}
          className="gift-card"
          styles={{ body: { padding: 0 } }}
        >
          <div className="gift-card-image">
            {card.gifUrl ? (
              <img
                src={card.gifUrl}
                alt={card.name}
              />
            ) : (
              <p>No GIF available</p>
            )}
          </div>

          <div className="gift-card-content">
            <h3>{card.name}</h3>

            <p className="gift-card-price">
              Size: {card.size} | Price: ${card.price.toFixed(2)}
            </p>

            <ul>
              {Object.entries(card.details).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>

            <div className="gift-card-tags">
              {card.tags.map((tag, index) => (
                <Tag key={index} className="gift-tag">
                  {tag}
                </Tag>
              ))}
            </div>

            <Button
              type="primary"
              block
              className="gift-card-button"
              onClick={() => navigate(`/editCard/${cardId}`)}
            >
              View
            </Button>

            <div className="gift-card-actions">
              <Button
                type="primary"
                block
                className="gift-card-button"
              >
                Delete
              </Button>

              <Button
                type="primary"
                block
                className="gift-card-button"
                onClick={() =>
                  navigate(`/Admin/editCard/${cardId}`)
                }
              >
                Edit
              </Button>
            </div>
          </div>
        </AntCard>
      ))}
    </div>
  );
}
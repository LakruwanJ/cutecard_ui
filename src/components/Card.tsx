import { Button, Card as AntCard, Col, Row, Tag, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import "../styles/cards.css";

const { Text } = Typography;

interface GiftCard {
  id: string;
  name: string;
  details: { [key: string]: string };
  size: number;
  price: number;
  tags: string[];
  gifUrl?: string;
}

interface CardProps {
  cards: GiftCard[];
  showAdminActions?: boolean;
}

function tagClass(tag: string): string {
  if (tag === "Best Seller" || tag === "Limited Edition") return "card-badge card-badge-bestseller";
  if (tag === "New Arrival") return "card-badge card-badge-new";
  if (tag === "Eco-Friendly") return "card-badge card-badge-eco";
  return "card-badge card-badge-new";
}

export default function Card({ cards, showAdminActions = false }: CardProps) {
  const navigate = useNavigate();

  return (
    <div className="cards-page">
      <Row gutter={[24, 24]}>
        {cards.map((card) => (
          <Col key={card.id} xs={24} sm={12} lg={8}>
            <AntCard
              className="gift-card"
              styles={{ body: { padding: 0 } }}
            >
                {/* ── Image ── */}
                <div className="gift-card-image">
                  {card.gifUrl ? (
                    <img src={card.gifUrl} alt={card.name} loading="lazy" />
                  ) : (
                    <div className="gift-card-image-placeholder">
                      🎁 Preview coming soon
                    </div>
                  )}

                  {/* Tag badges overlay */}
                  {card.tags.length > 0 && (
                    <div className="card-badge-overlay">
                      {card.tags.map((tag, i) => (
                        <span key={i} className={tagClass(tag)}>{tag}</span>
                      ))}
                    </div>
                  )}

                  {/* Wishlist */}
                  <button className="card-wishlist-btn" aria-label="Add to wishlist">
                    🤍
                  </button>
                </div>

                {/* ── Content ── */}
                <div className="gift-card-content">
                  <Text strong className="gift-card-name ant-typography">
                    {card.name}
                  </Text>

                  {/* Price / size row */}
                  <div className="gift-card-meta">
                    <span className="gift-card-price">${card.price.toFixed(2)}</span>
                    <span className="gift-card-size">Size: {card.size}cm</span>
                  </div>

                  {/* Detail chips */}
                  <div className="gift-card-details">
                    {Object.entries(card.details).map(([key, value]) => (
                      <span key={key} className="gift-card-chip">
                        {key}: {value}
                      </span>
                    ))}
                  </div>

                  {/* Ant Design Tags */}
                  <div className="gift-card-tags">
                    {card.tags.map((tag, i) => (
                      <Tag key={i} className="gift-tag">{tag}</Tag>
                    ))}
                  </div>

                  {/* CTA */}
                  <Button
                    type="primary"
                    block
                    className="gift-card-view-btn"
                    onClick={() => navigate(`/cards/${card.id}`)}
                  >
                    View Details
                  </Button>

                  {/* Admin actions */}
                  {showAdminActions && (
                    <div className="gift-card-actions">
                      <Button
                        danger
                        block
                        onClick={() => navigate(`/admin/cards/${card.id}/delete`)}
                      >
                        Delete
                      </Button>
                      <Button
                        block
                        onClick={() => navigate(`/admin/cards/${card.id}/edit`)}
                      >
                        Edit
                      </Button>
                    </div>
                  )}
                </div>
            </AntCard>
          </Col>
        ))}
      </Row>
    </div>
  );
}
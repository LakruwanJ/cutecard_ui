import { Button, Card as AntCard, Col, Row, Tag, Tooltip, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useShop } from "../Function/ShopContext";
import "../styles/cards.css";

const { Text } = Typography;

export interface GiftCard {
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
  /** Set to true for admin view — shows Delete / Edit buttons */
  showAdminActions?: boolean;
  /** Columns per row: default is 4 (desktop), 2 (tablet), 1 (mobile) */
  colsDesktop?: number;
}

function tagBadgeClass(tag: string): string {
  if (tag === "Best Seller" || tag === "Limited Edition")
    return "card-badge card-badge-bestseller";
  if (tag === "New Arrival") return "card-badge card-badge-new";
  if (tag === "Eco-Friendly") return "card-badge card-badge-eco";
  return "card-badge card-badge-new";
}

/* Map desktop column count to Col span */
function desktopSpan(cols: number): number {
  // 4 cols → span 6, 3 cols → span 8, 2 cols → span 12
  return Math.floor(24 / cols);
}

export default function Card({
  cards,
  showAdminActions = false,
  colsDesktop = 4,
}: CardProps) {
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isWishlisted, isInCart } = useShop();

  const lgSpan = desktopSpan(colsDesktop); // 6 for 4-col

  return (
    <div className="cards-page">
      <Row gutter={[20, 20]}>
        {cards.map((card) => {
          const wishlisted = isWishlisted(card.id);
          const inCart = isInCart(card.id);

          return (
            <Col key={card.id} xs={24} sm={12} md={12} lg={lgSpan}>
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

                  {/* Tag badges overlaid on image */}
                  {card.tags.length > 0 && (
                    <div className="card-badge-overlay">
                      {card.tags.map((tag, i) => (
                        <span key={i} className={tagBadgeClass(tag)}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Wishlist icon — top right of image */}
                  <Tooltip title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}>
                    <button
                      className={`card-wishlist-btn${wishlisted ? " wishlisted" : ""}`}
                      aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                      aria-pressed={wishlisted}
                      onClick={() =>
                        toggleWishlist({
                          id: card.id,
                          name: card.name,
                          price: card.price,
                          gifUrl: card.gifUrl,
                        })
                      }
                    >
                      {wishlisted ? "❤️" : "🤍"}
                    </button>
                  </Tooltip>
                </div>

                {/* ── Content ── */}
                <div className="gift-card-content">
                  <Text strong className="gift-card-name">
                    {card.name}
                  </Text>

                  {/* Price / size */}
                  <div className="gift-card-meta">
                    <span className="gift-card-price">
                      ${card.price.toFixed(2)}
                    </span>
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
                      <Tag key={i} className="gift-tag">
                        {tag}
                      </Tag>
                    ))}
                  </div>

                  {/* ── Action buttons ── */}
                  <div className="gift-card-actions-row">
                    {/* Add to Cart */}
                    <Button
                      type="primary"
                      className={`gift-card-cart-btn${inCart ? " in-cart" : ""}`}
                      onClick={() =>
                        addToCart({
                          id: card.id,
                          name: card.name,
                          price: card.price,
                          gifUrl: card.gifUrl,
                        })
                      }
                      aria-label={inCart ? "Update cart" : "Add to cart"}
                    >
                      {inCart ? "🛒 In Cart" : "Add to Cart"}
                    </Button>

                    {/* View Details */}
                    <Button
                      className="gift-card-view-btn"
                      onClick={() => navigate(`/cards/${card.id}`)}
                      aria-label={`View details for ${card.name}`}
                    >
                      View
                    </Button>
                  </div>

                  {/* Admin actions */}
                  {showAdminActions && (
                    <div className="gift-card-admin-actions">
                      <Button
                        danger
                        block
                        size="small"
                        onClick={() =>
                          navigate(`/admin/cards/${card.id}/delete`)
                        }
                      >
                        Delete
                      </Button>
                      <Button
                        block
                        size="small"
                        onClick={() =>
                          navigate(`/admin/cards/${card.id}/edit`)
                        }
                      >
                        Edit
                      </Button>
                    </div>
                  )}
                </div>
              </AntCard>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
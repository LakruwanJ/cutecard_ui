import { useEffect, useState } from "react";
import {
  Button,
  Card as AntCard,
  Col,
  Descriptions,
  Modal,
  Row,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useShop } from "../Function/ShopContext";
import "../styles/cards.css";

const { Text, Title } = Typography;

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

interface CardProps {
  cards: GiftCard[];
  /** Set to true for admin view — shows Delete / Edit buttons */
  showAdminActions?: boolean;
  /** Columns per row: default is 4 (desktop), 2 (tablet), 1 (mobile) */
  colsDesktop?: number;
  /** Automatically open Quick View for a specific card ID */
  initialSelectedCardId?: string;
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
  initialSelectedCardId,
}: CardProps) {
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isWishlisted, isInCart } = useShop();
  const [selectedModalCard, setSelectedModalCard] = useState<GiftCard | null>(null);
  const [modalQty, setModalQty] = useState<number>(1);

  useEffect(() => {
    if (initialSelectedCardId) {
      const found = cards.find((c) => c.id === initialSelectedCardId);
      if (found) {
        setSelectedModalCard(found);
        setModalQty(1);
      }
    }
  }, [initialSelectedCardId, cards]);

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
                      onClick={() => {
                        setSelectedModalCard(card);
                        setModalQty(1);
                      }}
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

      {/* Card Quick View Modal */}
      <Modal
        open={!!selectedModalCard}
        onCancel={() => setSelectedModalCard(null)}
        footer={null}
        centered
        width={720}
      >
        {selectedModalCard && (
          <div style={{ padding: "8px 0" }}>
            <Row gutter={[24, 24]} align="middle">
              <Col xs={24} sm={10}>
                <div
                  style={{
                    borderRadius: "14px",
                    overflow: "hidden",
                    border: "1.5px solid #ebdfec",
                    background: "#fbf7fb",
                    boxShadow: "0 8px 24px rgba(59, 30, 84, 0.08)",
                  }}
                >
                  <img
                    src={
                      selectedModalCard.gifUrl ||
                      "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif"
                    }
                    alt={selectedModalCard.name}
                    style={{ width: "100%", height: "260px", objectFit: "cover" }}
                  />
                </div>

                <div
                  style={{
                    marginTop: "12px",
                    padding: "10px 12px",
                    background: "var(--cc-accent-warm)",
                    borderRadius: "10px",
                    fontSize: "0.82rem",
                    color: "var(--cc-primary)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span>🚚</span>
                  <span><strong>Islandwide Courier:</strong> Delivered in 2–3 days across Sri Lanka</span>
                </div>
              </Col>

              <Col xs={24} sm={14}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {selectedModalCard.tags.map((tag) => (
                      <Tag key={tag} color="purple">
                        {tag}
                      </Tag>
                    ))}
                    {selectedModalCard.category && (
                      <Tag color="magenta">{selectedModalCard.category}</Tag>
                    )}
                  </div>

                  <Tooltip title={isWishlisted(selectedModalCard.id) ? "Wishlisted" : "Save to wishlist"}>
                    <button
                      type="button"
                      style={{
                        background: "none",
                        border: "1px solid #ebdfee",
                        borderRadius: "50%",
                        width: "36px",
                        height: "36px",
                        cursor: "pointer",
                        fontSize: "1.1rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onClick={() =>
                        toggleWishlist({
                          id: selectedModalCard.id,
                          name: selectedModalCard.name,
                          price: selectedModalCard.price,
                          gifUrl: selectedModalCard.gifUrl,
                        })
                      }
                    >
                      {isWishlisted(selectedModalCard.id) ? "❤️" : "🤍"}
                    </button>
                  </Tooltip>
                </div>

                <Title level={3} style={{ color: "var(--cc-primary)", marginBottom: 4, fontFamily: "var(--cc-font-head)" }}>
                  {selectedModalCard.name}
                </Title>

                <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: 14 }}>
                  <span
                    style={{
                      fontSize: "1.6rem",
                      fontWeight: 800,
                      color: "var(--cc-primary)",
                      fontFamily: "var(--cc-font-ui)",
                    }}
                  >
                    ${selectedModalCard.price.toFixed(2)}
                  </span>
                  <span style={{ fontSize: "0.85rem", color: "var(--cc-text-light)" }}>
                    (~ Rs. {Math.round(selectedModalCard.price * 305).toLocaleString()} LKR)
                  </span>
                </div>

                <Descriptions size="small" column={1} bordered style={{ marginBottom: 16 }}>
                  {Object.entries(selectedModalCard.details).map(([key, val]) => (
                    <Descriptions.Item key={key} label={key}>
                      {val}
                    </Descriptions.Item>
                  ))}
                </Descriptions>

                {/* Quantity controller & actions */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <Text strong style={{ fontSize: "0.9rem", color: "var(--cc-primary)" }}>
                    Quantity:
                  </Text>
                  <div className="cart-qty-controller" style={{ background: "#ffffff" }}>
                    <button
                      type="button"
                      className="cart-qty-btn"
                      onClick={() => setModalQty((q) => Math.max(1, q - 1))}
                    >
                      −
                    </button>
                    <span className="cart-qty-val">{modalQty}</span>
                    <button
                      type="button"
                      className="cart-qty-btn"
                      onClick={() => setModalQty((q) => q + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 10 }}>
                  <Button
                    type="primary"
                    size="large"
                    style={{
                      background: "var(--cc-grad-primary)",
                      border: "none",
                      borderRadius: "var(--cc-radius-pill)",
                      flex: 1,
                      fontWeight: 700,
                    }}
                    onClick={() => {
                      addToCart(
                        {
                          id: selectedModalCard.id,
                          name: selectedModalCard.name,
                          price: selectedModalCard.price,
                          gifUrl: selectedModalCard.gifUrl,
                        },
                        modalQty
                      );
                      setSelectedModalCard(null);
                    }}
                  >
                    Add {modalQty > 1 ? `${modalQty} to Bag` : "to Bag"} 🛒
                  </Button>

                  <Button
                    size="large"
                    style={{
                      borderRadius: "var(--cc-radius-pill)",
                      borderColor: "var(--cc-primary)",
                      color: "var(--cc-primary)",
                      fontWeight: 600,
                    }}
                    onClick={() => {
                      const cardName = selectedModalCard.name;
                      const cat = selectedModalCard.category || "";
                      setSelectedModalCard(null);
                      navigate(
                        `/customorder?card=${encodeURIComponent(
                          cardName
                        )}&occasion=${encodeURIComponent(cat)}`
                      );
                    }}
                  >
                    Customise ✨
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        )}
      </Modal>
    </div>
  );
}
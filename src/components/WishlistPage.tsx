import {
  Button,
  Col,
  Empty,
  Popconfirm,
  Row,
  Space,
  Typography,
  message,
} from "antd";
import { Link } from "react-router-dom";
import { useShop } from "../Function/ShopContext";
import { useAuth } from "../Function/AuthContext";
import AnimationOne from "../Function/AnimationOne";
import "../styles/wishlist.css";

const { Title, Paragraph } = Typography;

export default function WishlistPage() {
  const {
    wishlist,
    toggleWishlist,
    clearWishlist,
    addToCart,
    isInCart,
    wishlistCount,
  } = useShop();
  const { requireAuth } = useAuth();

  const handleMoveAllToCart = () => {
    requireAuth(() => {
      wishlist.forEach((item) => {
        addToCart(item);
      });
      message.success(`Moved all ${wishlist.length} saved items to your cart! 🛒`);
    }, "Please sign in to add items to your shopping bag 🛍️");
  };

  return (
    <AnimationOne>
      <div className="wishlist-page">
        {/* Header */}
        <div className="wishlist-header">
          <div className="wishlist-badge">💜 Your Favourites</div>
          <Title level={1} className="wishlist-title">
            Saved Keepsakes & Wishlist
          </Title>
          <Paragraph className="wishlist-subtitle">
            Save the handmade cards that catch your eye. Ready to send love? Add
            them to your bag whenever you're ready.
          </Paragraph>
        </div>

        {wishlist.length === 0 ? (
          <div className="wishlist-empty-box">
            <Empty
              image={null}
              description={
                <div>
                  <div className="wishlist-empty-icon">💜</div>
                  <Title level={4} style={{ color: "var(--cc-primary)", fontFamily: "var(--cc-font-head)", fontSize: "1.5rem" }}>
                    Your wishlist is empty
                  </Title>
                  <Paragraph type="secondary" style={{ maxWidth: 420, margin: "0 auto 16px" }}>
                    Browse through our curated collection and tap the heart icon
                    to save handcrafted keepsakes for your loved ones.
                  </Paragraph>
                </div>
              }
            >
              <Link to="/cards">
                <Button type="primary" size="large" style={{ borderRadius: "var(--cc-radius-pill)", padding: "0 28px" }}>
                  Explore Handcrafted Cards →
                </Button>
              </Link>
            </Empty>
          </div>
        ) : (
          <>
            {/* Toolbar */}
            <div className="wishlist-toolbar">
              <div className="wishlist-count-badge">
                <span>💜</span>
                <span>Saved Items ({wishlistCount})</span>
              </div>

              <Space wrap>
                <Button
                  type="primary"
                  style={{
                    borderRadius: "var(--cc-radius-pill)",
                    background: "var(--cc-grad-primary)",
                    border: "none",
                    fontWeight: 600,
                  }}
                  onClick={handleMoveAllToCart}
                >
                  Move All to Bag 🛒
                </Button>
                <Popconfirm
                  title="Clear Wishlist?"
                  description="Remove all items from your wishlist?"
                  onConfirm={clearWishlist}
                  okText="Yes, clear"
                  cancelText="Cancel"
                >
                  <Button danger style={{ borderRadius: "var(--cc-radius-pill)" }}>
                    Clear Wishlist
                  </Button>
                </Popconfirm>
              </Space>
            </div>

            {/* Grid */}
            <Row gutter={[20, 24]}>
              {wishlist.map((item) => {
                const inCart = isInCart(item.id);

                return (
                  <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
                    <div className="wishlist-card">
                      <div className="wishlist-card-media">
                        <img
                          src={
                            item.gifUrl ||
                            "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif"
                          }
                          alt={item.name}
                          className="wishlist-card-img"
                        />
                        <button
                          type="button"
                          className="wishlist-remove-btn"
                          onClick={() => toggleWishlist(item)}
                          aria-label="Remove from wishlist"
                          title="Remove from wishlist"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="wishlist-card-body">
                        <div className="wishlist-card-title">{item.name}</div>
                        <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 16 }}>
                          <span className="wishlist-card-price" style={{ margin: 0 }}>
                            ${item.price.toFixed(2)}
                          </span>
                          <span style={{ fontSize: "0.8rem", color: "var(--cc-text-light)" }}>
                            (~ Rs. {Math.round(item.price * 305).toLocaleString()})
                          </span>
                        </div>

                        <div className="wishlist-card-actions" style={{ display: "flex", gap: 8 }}>
                          <Button
                            type="primary"
                            className="wishlist-add-btn"
                            onClick={() =>
                              requireAuth(
                                () => addToCart(item),
                                "Please sign in to add items to your shopping bag 🛍️"
                              )
                            }
                            disabled={inCart}
                            style={{
                              background: inCart
                                ? "#ccc"
                                : "var(--cc-grad-primary)",
                              border: "none",
                              flex: 1,
                            }}
                          >
                            {inCart ? "In Bag ✓" : "Add to Bag 🛒"}
                          </Button>
                          <Link to={`/cards/${item.id}`}>
                            <Button
                              style={{
                                borderRadius: "var(--cc-radius-pill)",
                                borderColor: "var(--cc-primary-soft)",
                                color: "var(--cc-primary)",
                              }}
                              title="Inspect Details"
                            >
                              View
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </>
        )}
      </div>
    </AnimationOne>
  );
}

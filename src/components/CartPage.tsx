import { useState, useEffect } from "react";
import {
  Button,
  Col,
  Empty,
  Form,
  Input,
  Modal,
  Popconfirm,
  Radio,
  Result,
  Row,
  Select,
  Space,
  Tag,
  Typography,
  message,
} from "antd";
import { Link } from "react-router-dom";
import { useShop } from "../Function/ShopContext";
import { useAuth } from "../Function/AuthContext";
import AnimationOne from "../Function/AnimationOne";
import "../styles/cartpage.css";

const { Title, Paragraph, Text } = Typography;

const slDistricts = [
  "Colombo",
  "Gampaha",
  "Kalutara",
  "Kandy",
  "Matale",
  "Nuwara Eliya",
  "Galle",
  "Matara",
  "Hambantota",
  "Badulla",
  "Monaragala",
  "Jaffna",
  "Kurunegala",
  "Anuradhapura",
  "Ratnapura",
];

export default function CartPage() {
  const { cart, updateQty, removeFromCart, clearCart, cartCount } = useShop();
  const { currentUser, requireAuth } = useAuth();
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedCode, setAppliedCode] = useState("");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutDoneOrder, setCheckoutDoneOrder] = useState<string | null>(null);
  const [checkoutForm] = Form.useForm();

  // Prefill checkout form with customer profile details if logged in
  useEffect(() => {
    if (isCheckoutOpen && currentUser) {
      checkoutForm.setFieldsValue({
        name: currentUser.name || "",
        phone: currentUser.phone || "",
        address: currentUser.address || "",
        district: currentUser.city || "Colombo",
      });
    }
  }, [isCheckoutOpen, currentUser, checkoutForm]);

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const isFreeDelivery = subtotal >= 30;
  const deliveryFee = cart.length === 0 ? 0 : isFreeDelivery ? 0 : 2.5;
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);
  const approxLkr = Math.round(grandTotal * 305);

  const applyPromo = (codeToApply: string) => {
    const code = codeToApply.trim().toUpperCase();
    if (code === "CUTELOVE10" || code === "CUTE10") {
      setDiscountPercent(10);
      setAppliedCode(code);
      message.success("Promo code applied: 10% OFF! 🎉");
    } else if (code === "FIRSTORDER") {
      setDiscountPercent(15);
      setAppliedCode(code);
      message.success("Welcome gift applied: 15% OFF! ✨");
    } else {
      message.error("Invalid promo code. Try 'CUTELOVE10' or 'FIRSTORDER'!");
    }
  };

  const removePromo = () => {
    setDiscountPercent(0);
    setAppliedCode("");
    setPromoCode("");
    message.info("Promo code removed");
  };

  const handleCompleteCheckout = () => {
    const orderRef = `CC-${Math.floor(1000 + Math.random() * 9000)}`;
    setCheckoutDoneOrder(orderRef);
    clearCart();
    setIsCheckoutOpen(false);
    message.success("Order placed successfully! 💌");
  };

  return (
    <AnimationOne>
      <div className="cart-page">
        {/* Header */}
        <div className="cart-header">
          <div className="cart-badge">🛒 Shopping Bag</div>
          <Title level={1} className="cart-title">
            Your Selected Cards
          </Title>
          <Paragraph className="cart-subtitle">
            Every card is handcrafted to order and lovingly packaged with dried
            botanicals, custom lettering, and antique wax seal.
          </Paragraph>
        </div>

        {cart.length === 0 && !checkoutDoneOrder ? (
          <div className="cart-empty-box">
            <Empty
              image={null}
              description={
                <div>
                  <div className="cart-empty-icon">🛍️</div>
                  <Title
                    level={4}
                    style={{
                      color: "var(--cc-primary)",
                      fontFamily: "var(--cc-font-head)",
                      fontSize: "1.5rem",
                    }}
                  >
                    Your shopping bag is empty
                  </Title>
                  <Paragraph
                    type="secondary"
                    style={{ maxWidth: 420, margin: "0 auto 16px" }}
                  >
                    You haven't added any cards yet. Explore our handcrafted
                    catalog to find the perfect keepsake for your loved ones.
                  </Paragraph>
                </div>
              }
            >
              <Link to="/cards">
                <Button
                  type="primary"
                  size="large"
                  style={{
                    borderRadius: "var(--cc-radius-pill)",
                    padding: "0 28px",
                  }}
                >
                  Explore Handcrafted Cards →
                </Button>
              </Link>
            </Empty>
          </div>
        ) : checkoutDoneOrder ? (
          <div className="cart-empty-box">
            <Result
              status="success"
              title="Thank You for Supporting Local Handcrafts!"
              subTitle={`Your order ${checkoutDoneOrder} has been confirmed. Our artisans have queued your paper creations.`}
              extra={[
                <Link to="/order" key="track">
                  <Button
                    type="primary"
                    size="large"
                    style={{
                      borderRadius: "var(--cc-radius-pill)",
                      background: "var(--cc-grad-primary)",
                      border: "none",
                    }}
                  >
                    Track Order #{checkoutDoneOrder} 🔍
                  </Button>
                </Link>,
                <Link to="/cards" key="shop">
                  <Button
                    size="large"
                    style={{ borderRadius: "var(--cc-radius-pill)" }}
                  >
                    Continue Shopping
                  </Button>
                </Link>,
              ]}
            />
          </div>
        ) : (
          <Row gutter={[32, 32]}>
            {/* Left: Cart Items */}
            <Col xs={24} lg={16}>
              <div className="cart-items-container">
                <div className="cart-items-header">
                  <Text
                    strong
                    style={{
                      fontSize: "1.2rem",
                      color: "var(--cc-primary)",
                      fontFamily: "var(--cc-font-head)",
                    }}
                  >
                    Bag Items ({cartCount})
                  </Text>
                  <Popconfirm
                    title="Clear shopping bag?"
                    description="Are you sure you want to remove all items from your bag?"
                    onConfirm={clearCart}
                    okText="Yes, clear"
                    cancelText="Cancel"
                  >
                    <Button type="link" danger size="small">
                      Clear Bag
                    </Button>
                  </Popconfirm>
                </div>

                {cart.map((item) => (
                  <div key={item.id} className="cart-item-row">
                    <div className="cart-item-info">
                      <img
                        src={
                          item.gifUrl ||
                          "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif"
                        }
                        alt={item.name}
                        className="cart-item-thumb"
                      />
                      <div>
                        <div className="cart-item-name">{item.name}</div>
                        <div className="cart-item-unit-price">
                          ${item.price.toFixed(2)} each · Handcrafted
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 20,
                      }}
                    >
                      {/* Qty controller */}
                      <div className="cart-qty-controller">
                        {item.qty === 1 ? (
                          <Popconfirm
                            title="Remove this item?"
                            description={`Remove "${item.name}" from your bag?`}
                            onConfirm={() => removeFromCart(item.id)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <button
                              type="button"
                              className="cart-qty-btn"
                              aria-label="Remove item"
                            >
                              −
                            </button>
                          </Popconfirm>
                        ) : (
                          <button
                            type="button"
                            className="cart-qty-btn"
                            onClick={() => updateQty(item.id, item.qty - 1)}
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                        )}
                        <span className="cart-qty-val">{item.qty}</span>
                        <button
                          type="button"
                          className="cart-qty-btn"
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Line total */}
                      <div className="cart-item-line-price">
                        ${(item.price * item.qty).toFixed(2)}
                      </div>

                      {/* Delete icon */}
                      <button
                        type="button"
                        className="cart-item-remove-btn"
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                        title="Remove from bag"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}

                <div className="cart-actions-bar">
                  <Link to="/cards">
                    <Button type="link">← Continue Shopping</Button>
                  </Link>
                  <Text type="secondary" style={{ fontSize: "12px" }}>
                    Prices in USD · Approx. Rs. {approxLkr.toLocaleString()} LKR
                  </Text>
                </div>
              </div>
            </Col>

            {/* Right: Summary */}
            <Col xs={24} lg={8}>
              <div className="cart-summary-card">
                <h3 className="cart-summary-title">Order Summary</h3>

                {/* Free Shipping Progress Meter */}
                <div className="cart-shipping-progress-box">
                  <div className="cart-shipping-progress-text">
                    {isFreeDelivery ? (
                      <span>
                        🎉 You've unlocked <strong>FREE Island-wide Delivery</strong>!
                      </span>
                    ) : (
                      <span>
                        🚚 Add <strong>${(30 - subtotal).toFixed(2)}</strong> more for <strong>FREE Delivery</strong>!
                      </span>
                    )}
                  </div>
                  <div className="cart-shipping-progress-bar">
                    <div
                      className="cart-shipping-progress-fill"
                      style={{
                        width: `${Math.min(100, (subtotal / 30) * 100)}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="cart-summary-line">
                  <span>Subtotal ({cartCount} items):</span>
                  <span style={{ fontWeight: 600 }}>${subtotal.toFixed(2)}</span>
                </div>

                <div className="cart-summary-line">
                  <span>Islandwide Courier:</span>
                  <span>
                    {isFreeDelivery ? (
                      <Tag
                        color="green"
                        style={{
                          borderRadius: "var(--cc-radius-pill)",
                          fontWeight: 700,
                        }}
                      >
                        FREE
                      </Tag>
                    ) : (
                      `$${deliveryFee.toFixed(2)}`
                    )}
                  </span>
                </div>

                {discountPercent > 0 && (
                  <div
                    className="cart-summary-line"
                    style={{ color: "#52c41a", fontWeight: 600 }}
                  >
                    <span>
                      Promo Discount ({appliedCode} - {discountPercent}%):
                    </span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                {/* Promo Code Input & Quick Pills */}
                <div className="cart-promo-section">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 6,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    >
                      Have a coupon code?
                    </Text>
                    {appliedCode && (
                      <Button
                        type="link"
                        size="small"
                        danger
                        style={{ padding: 0, height: "auto" }}
                        onClick={removePromo}
                      >
                        Remove
                      </Button>
                    )}
                  </div>

                  <Space.Compact style={{ width: "100%", marginBottom: 8 }}>
                    <Input
                      placeholder="e.g. CUTELOVE10"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      onPressEnter={() => applyPromo(promoCode)}
                    />
                    <Button
                      type="primary"
                      onClick={() => applyPromo(promoCode)}
                    >
                      Apply
                    </Button>
                  </Space.Compact>

                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <span style={{ fontSize: "11px", color: "var(--cc-text-light)" }}>
                      Try:
                    </span>
                    <Tag
                      style={{ cursor: "pointer" }}
                      color="purple"
                      onClick={() => {
                        setPromoCode("CUTELOVE10");
                        applyPromo("CUTELOVE10");
                      }}
                    >
                      CUTELOVE10 (10% off)
                    </Tag>
                    <Tag
                      style={{ cursor: "pointer" }}
                      color="magenta"
                      onClick={() => {
                        setPromoCode("FIRSTORDER");
                        applyPromo("FIRSTORDER");
                      }}
                    >
                      FIRSTORDER (15% off)
                    </Tag>
                  </div>
                </div>

                <div className="cart-summary-total-line">
                  <div>
                    <span style={{ fontSize: "1.1rem", fontWeight: 700 }}>
                      Total Amount:
                    </span>
                    <div style={{ fontSize: "0.82rem", color: "var(--cc-text-light)" }}>
                      Approx. Rs. {approxLkr.toLocaleString()} LKR
                    </div>
                  </div>
                  <span className="cart-summary-total-val">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>

                <Button
                  type="primary"
                  block
                  className="cart-checkout-btn"
                  onClick={() =>
                    requireAuth(
                      () => setIsCheckoutOpen(true),
                      "Please sign in to complete checkout and place your order 💌"
                    )
                  }
                >
                  Proceed to Checkout →
                </Button>

                <div className="cart-trust-badges">
                  <div className="cart-trust-badge-item">
                    <span>🔒</span>
                    <span>
                      <strong>100% Secure Checkout</strong> — COD & Bank Transfer
                    </span>
                  </div>
                  <div className="cart-trust-badge-item">
                    <span>🚚</span>
                    <span>
                      <strong>Fast Courier Delivery</strong> across all 9 provinces
                    </span>
                  </div>
                  <div className="cart-trust-badge-item">
                    <span>🎁</span>
                    <span>
                      <strong>Gift-ready Packaging</strong> with wax seal & ribbon
                    </span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        )}

        {/* Checkout Modal */}
        <Modal
          open={isCheckoutOpen}
          title="Islandwide Checkout & Delivery Details"
          onCancel={() => setIsCheckoutOpen(false)}
          footer={null}
          centered
          width={540}
        >
          <Form
            form={checkoutForm}
            layout="vertical"
            onFinish={handleCompleteCheckout}
            initialValues={{ paymentMethod: "cod", district: "Colombo" }}
          >
            <Form.Item
              name="name"
              label="Recipient / Your Full Name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input placeholder="Kasun Perera" size="large" />
            </Form.Item>

            <Row gutter={12}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="phone"
                  label="Contact / WhatsApp Number"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your phone number",
                    },
                  ]}
                >
                  <Input placeholder="+94 77 123 4567" size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="district"
                  label="Delivery District"
                  rules={[{ required: true, message: "Please select district" }]}
                >
                  <Select size="large">
                    {slDistricts.map((d) => (
                      <Select.Option key={d} value={d}>
                        {d} District
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="address"
              label="Delivery Street Address & Postal Code"
              rules={[{ required: true, message: "Please enter address" }]}
            >
              <Input placeholder="No. 45, Flower Road, Colombo 07" size="large" />
            </Form.Item>

            <Form.Item
              name="notes"
              label="Special Delivery Instructions (Optional)"
            >
              <Input.TextArea
                rows={2}
                placeholder="e.g. Leave package with security guard, call before delivery"
              />
            </Form.Item>

            <Form.Item name="paymentMethod" label="Preferred Payment Option">
              <Radio.Group style={{ width: "100%" }}>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Radio value="cod">
                    <strong>Cash on Delivery (COD)</strong> — Pay when package
                    arrives
                  </Radio>
                  <Radio value="bank">
                    <strong>Bank Transfer</strong> — Upload deposit slip via
                    WhatsApp
                  </Radio>
                  <Radio value="card">
                    <strong>Online Card Payment</strong> — Visa, Mastercard & Genie
                  </Radio>
                </Space>
              </Radio.Group>
            </Form.Item>

            <div
              style={{
                background: "var(--cc-accent-warm)",
                padding: "14px 18px",
                borderRadius: "12px",
                marginBottom: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <span style={{ fontSize: "0.85rem", color: "var(--cc-text-mid)" }}>
                  Payable Total:
                </span>
                <div style={{ fontWeight: 800, fontSize: "1.25rem", color: "var(--cc-primary)" }}>
                  ${grandTotal.toFixed(2)}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: "0.8rem", color: "var(--cc-text-light)" }}>
                  Approx. Sri Lankan Rupees:
                </span>
                <div style={{ fontWeight: 700, color: "var(--cc-primary)" }}>
                  Rs. {approxLkr.toLocaleString()}
                </div>
              </div>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              style={{
                background: "var(--cc-grad-primary)",
                border: "none",
                borderRadius: "var(--cc-radius-pill)",
                height: "48px",
                fontSize: "1rem",
                fontWeight: 700,
              }}
            >
              Confirm Order & Handcraft 💌
            </Button>
          </Form>
        </Modal>
      </div>
    </AnimationOne>
  );
}


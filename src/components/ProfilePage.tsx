import { useState, useEffect } from "react";
import { Button, Col, Form, Input, Modal, Row, Select, Typography, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Function/AuthContext";
import { useShop } from "../Function/ShopContext";
import AnimationOne from "../Function/AnimationOne";
import "../styles/profilepage.css";

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

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
  "Kilinochchi",
  "Mannar",
  "Vavuniya",
  "Mullaitivu",
  "Batticaloa",
  "Ampara",
  "Trincomalee",
  "Kurunegala",
  "Puttalam",
  "Anuradhapura",
  "Polonnaruwa",
  "Ratnapura",
  "Kegalle",
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const { currentUser, logout, updateProfile, openAuthModal } = useAuth();
  const { cartCount, wishlistCount } = useShop();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();

  // If user opened edit modal, set form values
  useEffect(() => {
    if (currentUser) {
      form.setFieldsValue({
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone,
        address: currentUser.address,
        city: currentUser.city || "Colombo",
      });
    }
  }, [currentUser, form]);

  if (!currentUser) {
    return (
      <AnimationOne>
        <div className="profile-page" style={{ textAlign: "center", padding: "140px 20px 80px" }}>
          <div className="profile-badge">🔒 Sign In Required</div>
          <Title level={2} className="profile-title">
            Sign In to View Your Profile
          </Title>
          <Paragraph className="profile-subtitle" style={{ marginBottom: 28 }}>
            Please sign in to access your saved details, track active courier shipments, and edit your profile.
          </Paragraph>
          <Button
            type="primary"
            size="large"
            style={{
              borderRadius: "var(--cc-radius-pill)",
              background: "var(--cc-grad-primary)",
              border: "none",
              padding: "0 32px",
              fontWeight: 700,
            }}
            onClick={() => openAuthModal("login", "Sign in to access your CuteCard profile")}
          >
            Sign In to CuteCard 💌
          </Button>
        </div>
      </AnimationOne>
    );
  }

  const handleEditSubmit = async (values: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
  }) => {
    setSubmitting(true);
    try {
      const res = await updateProfile(values);
      if (res.success) {
        message.success(res.message);
        setIsEditOpen(false);
      } else {
        message.error(res.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const initialLetter = currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "U";

  return (
    <AnimationOne>
      <div className="profile-page">
        {/* Header */}
        <div className="profile-header">
          <div className="profile-badge">👤 My Account</div>
          <Title level={1} className="profile-title">
            Customer Profile
          </Title>
          <Paragraph className="profile-subtitle">
            Manage your personal contact info, delivery address, and view your orders.
          </Paragraph>
        </div>

        {/* Content Grid */}
        <Row gutter={[24, 24]}>
          {/* Left Column: Avatar & Summary */}
          <Col xs={24} md={8}>
            <div className="profile-card">
              <div className="profile-avatar-box">
                <div className="profile-avatar-circle">{initialLetter}</div>
                <div className="profile-user-name">{currentUser.name}</div>
                <div className="profile-user-handle">@{currentUser.username}</div>
                <span
                  className={`profile-role-pill ${
                    currentUser.role === "admin"
                      ? "profile-role-admin"
                      : "profile-role-user"
                  }`}
                >
                  {currentUser.role === "admin" ? "🛡️ Administrator" : "💖 Customer"}
                </span>
              </div>

              {/* Stats row */}
              <div className="profile-stats-row">
                <div className="profile-stat-box">
                  <div className="profile-stat-number">{cartCount}</div>
                  <div className="profile-stat-label">In Bag</div>
                </div>
                <div className="profile-stat-box">
                  <div className="profile-stat-number">{wishlistCount}</div>
                  <div className="profile-stat-label">Saved</div>
                </div>
                <div className="profile-stat-box">
                  <div className="profile-stat-number">3</div>
                  <div className="profile-stat-label">Orders</div>
                </div>
              </div>

              {/* Actions */}
              <div className="profile-actions-stack">
                <Button
                  type="primary"
                  className="profile-edit-btn"
                  onClick={() => setIsEditOpen(true)}
                >
                  ✏️ Edit Profile
                </Button>
                <Button
                  className="profile-logout-btn"
                  onClick={handleLogout}
                >
                  🚪 Sign Out
                </Button>
              </div>
            </div>
          </Col>

          {/* Right Column: Contact & Address details */}
          <Col xs={24} md={16}>
            <div className="profile-card">
              <div className="profile-section-title">
                <span>Personal & Delivery Information</span>
                <Button
                  type="link"
                  size="small"
                  style={{ color: "var(--cc-primary)", fontWeight: 600 }}
                  onClick={() => setIsEditOpen(true)}
                >
                  Edit Details
                </Button>
              </div>

              <div className="profile-info-grid">
                <div className="profile-info-item">
                  <div className="profile-info-label">Full Name</div>
                  <div className="profile-info-value">{currentUser.name || "—"}</div>
                </div>

                <div className="profile-info-item">
                  <div className="profile-info-label">Username</div>
                  <div className="profile-info-value">@{currentUser.username}</div>
                </div>

                <div className="profile-info-item">
                  <div className="profile-info-label">Email Address</div>
                  <div className="profile-info-value">{currentUser.email || "—"}</div>
                </div>

                <div className="profile-info-item">
                  <div className="profile-info-label">Contact Phone</div>
                  <div className="profile-info-value">{currentUser.phone || "Not specified"}</div>
                </div>

                <div className="profile-info-item" style={{ gridColumn: "1 / -1" }}>
                  <div className="profile-info-label">Shipping / Delivery Address</div>
                  <div className="profile-info-value">
                    {currentUser.address ? (
                      `${currentUser.address}, ${currentUser.city || "Sri Lanka"}`
                    ) : (
                      <Text type="secondary">No delivery address saved yet</Text>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Navigation Cards */}
              <div className="profile-section-title" style={{ marginTop: 8 }}>
                <span>Quick Navigation</span>
              </div>

              <div className="profile-quick-nav">
                <Link to="/order" className="profile-nav-card">
                  <span className="profile-nav-icon">📦</span>
                  <div>
                    <div className="profile-nav-title">My Orders</div>
                    <div className="profile-nav-desc">Track shipments & courier updates</div>
                  </div>
                </Link>

                <Link to="/wishlist" className="profile-nav-card">
                  <span className="profile-nav-icon">💜</span>
                  <div>
                    <div className="profile-nav-title">My Wishlist</div>
                    <div className="profile-nav-desc">{wishlistCount} cards saved for later</div>
                  </div>
                </Link>

                <Link to="/cart" className="profile-nav-card">
                  <span className="profile-nav-icon">🛍️</span>
                  <div>
                    <div className="profile-nav-title">Shopping Bag</div>
                    <div className="profile-nav-desc">{cartCount} items ready to order</div>
                  </div>
                </Link>

                <Link to="/cards" className="profile-nav-card">
                  <span className="profile-nav-icon">💌</span>
                  <div>
                    <div className="profile-nav-title">Browse Cards</div>
                    <div className="profile-nav-desc">Explore handmade gift collection</div>
                  </div>
                </Link>
              </div>
            </div>
          </Col>
        </Row>

        {/* ── Edit Profile Modal ── */}
        <Modal
          open={isEditOpen}
          onCancel={() => setIsEditOpen(false)}
          title={
            <span style={{ fontFamily: "var(--cc-font-head)", color: "var(--cc-primary)", fontSize: "1.25rem" }}>
              Edit Profile Information
            </span>
          }
          footer={null}
          centered
          width={500}
          className="cc-auth-modal"
        >
          <div style={{ padding: "16px 8px 8px" }}>
            <Form
              form={form}
              layout="vertical"
              className="cc-auth-form"
              onFinish={handleEditSubmit}
            >
              <Form.Item
                label="Full Name"
                name="name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input placeholder="Your full name" />
              </Form.Item>

              <Form.Item
                label="Email Address"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input placeholder="Your email address" />
              </Form.Item>

              <Form.Item
                label="Mobile Contact (Sri Lanka)"
                name="phone"
                rules={[{ required: true, message: "Please enter your phone number" }]}
              >
                <Input placeholder="e.g. 077 123 4567" />
              </Form.Item>

              <Form.Item
                label="Delivery Address"
                name="address"
                rules={[{ required: true, message: "Please enter your delivery address" }]}
              >
                <Input placeholder="e.g. No. 12/4 Flower Road" />
              </Form.Item>

              <Form.Item
                label="District / City"
                name="city"
                rules={[{ required: true, message: "Please select your city/district" }]}
              >
                <Select
                  showSearch
                  placeholder="Select district"
                  optionFilterProp="children"
                >
                  {slDistricts.map((d) => (
                    <Option key={d} value={d}>
                      {d}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                <Button
                  style={{ borderRadius: "var(--cc-radius-pill)", flex: 1 }}
                  onClick={() => setIsEditOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={submitting}
                  style={{
                    borderRadius: "var(--cc-radius-pill)",
                    background: "var(--cc-grad-primary)",
                    border: "none",
                    flex: 1,
                    fontWeight: 700,
                  }}
                >
                  Save Changes ✨
                </Button>
              </div>
            </Form>
          </div>
        </Modal>
      </div>
    </AnimationOne>
  );
}

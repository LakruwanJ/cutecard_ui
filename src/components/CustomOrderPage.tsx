import { useState } from "react";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Result,
  Row,
  Select,
  Typography,
  Upload,
  message,
} from "antd";
import dayjs from "dayjs";
import { Link, useSearchParams } from "react-router-dom";
import AnimationOne from "../Function/AnimationOne";
import "../styles/customorder.css";

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

interface SizeOption {
  key: string;
  name: string;
  dimensions: string;
  price: number;
  description: string;
}

const sizeOptions: SizeOption[] = [
  {
    key: "standard",
    name: "Classic Greeting",
    dimensions: "5 x 7 inches",
    price: 14.0,
    description: "Our signature folded card with handcrafted floral accents.",
  },
  {
    key: "grand",
    name: "Grand Keepsake",
    dimensions: "8 x 10 inches",
    price: 22.0,
    description: "Substantial luxury card with layered 3D pop-up mechanics.",
  },
  {
    key: "mini",
    name: "Mini Keepsake Note",
    dimensions: "4 x 4 inches",
    price: 9.5,
    description: "Delicate square card with handwritten calligraphy.",
  },
];

const availableAddons = [
  {
    key: "wax-seal",
    label: "Hand-poured Botanical Wax Seal",
    price: 3.0,
    desc: "Sealed with antique gold or blush wax & floral stamp",
  },
  {
    key: "dried-flowers",
    label: "Pressed Ceylon Wildflowers",
    price: 4.0,
    desc: "Locally hand-harvested & pressed real baby's breath",
  },
  {
    key: "photo-print",
    label: "Custom Photo Mini-Print Included",
    price: 3.5,
    desc: "High-res matte polaroid print tucked into the inner flap",
  },
  {
    key: "ribbon",
    label: "Hand-dyed Silk Chiffon Ribbon",
    price: 2.5,
    desc: "Soft frayed-edge pastel silk ribbon tie",
  },
];

export default function CustomOrderPage() {
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const cardParam = searchParams.get("card");
  const occasionParam = searchParams.get("occasion");

  const [selectedSize, setSelectedSize] = useState<string>("standard");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    "wax-seal",
  ]);
  const [submittedOrderId, setSubmittedOrderId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculations
  const currentSizeObj =
    sizeOptions.find((s) => s.key === selectedSize) || sizeOptions[0];
  const addonsTotal = selectedAddons.reduce((sum, key) => {
    const addon = availableAddons.find((a) => a.key === key);
    return sum + (addon ? addon.price : 0);
  }, 0);
  const basePrice = currentSizeObj.price;
  const shippingFee = 2.5; // Island-wide standard
  const estimatedTotal = basePrice + addonsTotal + shippingFee;

  const onFinish = () => {
    const randomRef = `CC-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedOrderId(randomRef);
    setIsModalOpen(true);
    message.success("Custom order request received!");
  };

  return (
    <AnimationOne>
      <div className="custom-order-page">
        {/* Header */}
        <div className="custom-order-header">
          <div className="custom-order-badge">✨ Bespoke Studio</div>
          <Title level={1} className="custom-order-title">
            Design Your Custom Handmade Card
          </Title>
          <Paragraph className="custom-order-subtitle">
            Every love story, birthday milestone, and celebration is unique.
            Collaborate with our Sri Lankan artists to handcraft an
            unforgettable paper keepsake.
          </Paragraph>
          {cardParam && (
            <div className="custom-order-active-card-chip">
              <span>🎨</span>
              <span>
                Personalizing Card Design: <strong>"{cardParam}"</strong>
              </span>
            </div>
          )}
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            occasion: occasionParam || "Birthday",
            styleTheme: cardParam
              ? `Inspired by "${cardParam}"`
              : "Floral Pop-up & Botanical",
            size: "standard",
            addons: ["wax-seal"],
          }}
        >
          <Row gutter={[32, 32]}>
            {/* Left Column: Customization Steps */}
            <Col xs={24} lg={15}>
              {/* Step 1: Occasion & Style */}
              <div className="custom-section-card">
                <div className="custom-section-title">
                  <span className="custom-section-step">1</span>
                  Occasion & Aesthetic
                </div>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="occasion"
                      label="Occasion"
                      rules={[
                        { required: true, message: "Please select an occasion" },
                      ]}
                    >
                      <Select
                        size="large"
                        options={[
                          { value: "Birthday", label: "🎂 Birthday Celebration" },
                          {
                            value: "Anniversary",
                            label: "💍 Anniversary & Love",
                          },
                          { value: "Wedding", label: "🕊️ Wedding Keepsake" },
                          {
                            value: "Thank You",
                            label: "🌸 Heartfelt Thank You",
                          },
                          {
                            value: "Graduation",
                            label: "🎓 Graduation / Achievement",
                          },
                          {
                            value: "Sympathy",
                            label: "🕊️ Thinking of You / Sympathy",
                          },
                          { value: "Other", label: "✨ Other Custom Celebration" },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="styleTheme"
                      label="Artistic Theme"
                      rules={[
                        { required: true, message: "Please select a theme" },
                      ]}
                    >
                      <Select
                        size="large"
                        options={[
                          {
                            value: "Floral Pop-up & Botanical",
                            label: "🌿 Floral Pop-up & Botanical",
                          },
                          {
                            value: "Vintage Kraft & Wax Seal",
                            label: "📜 Vintage Kraft & Wax Seal",
                          },
                          {
                            value: "Modern Minimalist & Pastel",
                            label: "🎨 Modern Minimalist & Pastel",
                          },
                          {
                            value: "Gold Foil & Royal Calligraphy",
                            label: "✨ Gold Foil & Royal Calligraphy",
                          },
                          {
                            value: "Playful Watercolor Cute",
                            label: "🧸 Playful Watercolor Cute",
                          },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </div>

              {/* Step 2: Card Format & Dimensions */}
              <div className="custom-section-card">
                <div className="custom-section-title">
                  <span className="custom-section-step">2</span>
                  Card Format & Size
                </div>
                <Row gutter={[16, 16]}>
                  {sizeOptions.map((opt) => {
                    const isSelected = selectedSize === opt.key;
                    return (
                      <Col xs={24} sm={8} key={opt.key}>
                        <div
                          className={`size-option-card ${
                            isSelected ? "selected" : ""
                          }`}
                          onClick={() => {
                            setSelectedSize(opt.key);
                            form.setFieldsValue({ size: opt.key });
                          }}
                        >
                          {isSelected && (
                            <span className="size-option-selected-tag">✓ Selected</span>
                          )}
                          <div>
                            <div className="size-option-header">
                              <span className="size-option-name">{opt.name}</span>
                              <span className="size-option-price">
                                ${opt.price.toFixed(2)}
                              </span>
                            </div>
                            <span className="size-option-dim">{opt.dimensions}</span>
                          </div>
                          <div className="size-option-desc">{opt.description}</div>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </div>

              {/* Step 3: Personalization & Message */}
              <div className="custom-section-card">
                <div className="custom-section-title">
                  <span className="custom-section-step">3</span>
                  Personalization & Words
                </div>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="recipientName"
                      label="Recipient's Name"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the recipient's name",
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        placeholder="e.g. Kasun, Sarah, Mom & Dad"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="colorPalette"
                      label="Preferred Color Palette"
                    >
                      <Input
                        size="large"
                        placeholder="e.g. Lavender, Dusty Rose, Sage Green"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24}>
                    <Form.Item
                      name="customMessage"
                      label="Inside Message / Special Poem"
                      rules={[
                        {
                          required: true,
                          message: "Please provide your message or greeting",
                        },
                      ]}
                    >
                      <TextArea
                        rows={4}
                        showCount
                        maxLength={350}
                        placeholder="Write your heartfelt message here. We will hand-letter or type it onto high-quality textured cardstock..."
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </div>

              {/* Step 4: Add-ons */}
              <div className="custom-section-card">
                <div className="custom-section-title">
                  <span className="custom-section-step">4</span>
                  Artisan Add-ons
                </div>
                <Checkbox.Group
                  style={{ width: "100%" }}
                  value={selectedAddons}
                  onChange={(vals) => setSelectedAddons(vals as string[])}
                >
                  {availableAddons.map((addon) => (
                    <div
                      key={addon.key}
                      className="addon-item"
                      onClick={() => {
                        setSelectedAddons((prev) =>
                          prev.includes(addon.key)
                            ? prev.filter((k) => k !== addon.key)
                            : [...prev, addon.key]
                        );
                      }}
                    >
                      <Checkbox value={addon.key}>
                        <div className="addon-label-wrap">
                          <span className="addon-title">{addon.label}</span>
                          <span className="addon-desc">{addon.desc}</span>
                        </div>
                      </Checkbox>
                      <span className="addon-price-tag">
                        +${addon.price.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </Checkbox.Group>
              </div>

              {/* Step 5: Optional Photo Upload */}
              <div className="custom-section-card">
                <div className="custom-section-title">
                  <span className="custom-section-step">5</span>
                  Reference Photos or Inclusions (Optional)
                </div>
                <Upload.Dragger
                  name="files"
                  multiple={false}
                  action="https://httpbin.org/post"
                  listType="picture"
                  maxCount={1}
                >
                  <p className="ant-upload-drag-icon" style={{ fontSize: "36px" }}>
                    📷
                  </p>
                  <p className="ant-upload-text">
                    Click or drag photo here to upload
                  </p>
                  <p className="ant-upload-hint">
                    Upload a personal photo if you'd like us to print and tuck it
                    inside, or share a color/moodboard inspiration.
                  </p>
                </Upload.Dragger>
              </div>

              {/* Step 6: Contact & Delivery Info */}
              <div className="custom-section-card">
                <div className="custom-section-title">
                  <span className="custom-section-step">6</span>
                  Delivery Information (Sri Lanka)
                </div>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="senderName"
                      label="Your Full Name"
                      rules={[{ required: true, message: "Enter your name" }]}
                    >
                      <Input size="large" placeholder="Your name" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="phone"
                      label="WhatsApp / Phone Number"
                      rules={[
                        {
                          required: true,
                          message: "Enter your contact number",
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        placeholder="e.g. +94 77 123 4567"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={16}>
                    <Form.Item
                      name="deliveryAddress"
                      label="Delivery Address & City"
                      rules={[
                        { required: true, message: "Enter delivery address" },
                      ]}
                    >
                      <Input
                        size="large"
                        placeholder="House / Street, City (e.g., Colombo 03)"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={8}>
                    <Form.Item
                      name="neededBy"
                      label="Needed By Date"
                      rules={[
                        { required: true, message: "Select required date" },
                      ]}
                    >
                      <DatePicker
                        size="large"
                        style={{ width: "100%" }}
                        disabledDate={(current) =>
                          current && current.isBefore(dayjs().startOf("day"))
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            </Col>

            {/* Right Column: Live Summary Sidebar */}
            <Col xs={24} lg={9}>
              <div className="custom-summary-card">
                <div className="custom-summary-header-wrap">
                  <span className="custom-summary-header-icon">📜</span>
                  <h3 className="custom-summary-title">Order Estimation</h3>
                </div>

                <div className="custom-summary-row">
                  <span>Format:</span>
                  <strong>{currentSizeObj.name}</strong>
                </div>

                <div className="custom-summary-row">
                  <span>Dimensions:</span>
                  <span>{currentSizeObj.dimensions}</span>
                </div>

                <div className="custom-summary-row">
                  <span>Base Price:</span>
                  <span>${basePrice.toFixed(2)}</span>
                </div>

                <div className="custom-summary-row">
                  <span>Add-ons ({selectedAddons.length}):</span>
                  <span>+${addonsTotal.toFixed(2)}</span>
                </div>

                <div className="custom-summary-row">
                  <span>Sri Lanka Islandwide Delivery:</span>
                  <span>${shippingFee.toFixed(2)}</span>
                </div>

                <div className="custom-summary-total">
                  <span className="custom-summary-total-label">
                    Estimated Total:
                  </span>
                  <div>
                    <div className="custom-summary-total-price">
                      ${estimatedTotal.toFixed(2)}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "var(--cc-text-light)", textAlign: "right" }}>
                      ~ Rs. {Math.round(estimatedTotal * 305).toLocaleString()} LKR
                    </div>
                  </div>
                </div>

                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  className="custom-submit-btn"
                >
                  Confirm Custom Request ✨
                </Button>

                <div className="custom-guarantee-badge">
                  <span>🎨</span>
                  <div>
                    <strong>Handcrafted to Perfection:</strong> We preview the
                    design with you on WhatsApp before packaging & dispatching.
                  </div>
                </div>

                <div style={{ marginTop: "18px", textAlign: "center", padding: "12px 14px", background: "#fbf7fb", borderRadius: "10px", border: "1px solid #ebdfee" }}>
                  <Text type="secondary" style={{ fontSize: "12px", display: "block" }}>
                    Need a custom bulk quote or wedding consultation first?
                  </Text>
                  <Link to="/contact" style={{ fontWeight: 600, color: "var(--cc-primary)", fontSize: "13px" }}>
                    Contact Our Studio Team →
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Form>

        {/* Success Modal */}
        <Modal
          open={isModalOpen}
          footer={null}
          onCancel={() => setIsModalOpen(false)}
          centered
        >
          <Result
            status="success"
            title="Custom Order Placed Successfully!"
            subTitle="Your custom creation request has reached our craft studio. Our artisan team will contact you within 4 hours."
            extra={[
              <div key="ref">
                <Text type="secondary">Your Order Tracking Reference:</Text>
                <div className="custom-modal-ref">{submittedOrderId}</div>
              </div>,
              <div key="actions" style={{ marginTop: "16px" }}>
                <Link to="/order">
                  <Button type="primary" style={{ marginRight: 8 }}>
                    Track Order
                  </Button>
                </Link>
                <Link to="/cards">
                  <Button>Browse Collection</Button>
                </Link>
              </div>,
            ]}
          />
        </Modal>
      </div>
    </AnimationOne>
  );
}

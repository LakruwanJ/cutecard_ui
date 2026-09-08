import { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Collapse,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Typography,
  message,
} from "antd";
import { Link, useSearchParams } from "react-router-dom";
import AnimationOne from "../Function/AnimationOne";
import "../styles/contactpage.css";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const orderParam = searchParams.get("order") || "";
  const [form] = Form.useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketRef, setTicketRef] = useState<string | null>(null);

  const onFinish = () => {
    const ref = `REQ-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketRef(ref);
    setIsSubmitted(true);
    message.success("Inquiry sent successfully! Our studio will reply within 4 hours. 💌");
    form.resetFields();
  };

  const faqItems = [
    {
      key: "1",
      label: "🎨 How long does a custom handmade card take to craft & deliver?",
      children: (
        <p>
          Standard orders are handcrafted within <strong>24–48 hours</strong>. Once ready, our
          courier partners (Pronto, Domex, Prompt Xpress) deliver across Colombo and suburbs in
          1–2 days, and to all other Sri Lankan provinces within 2–3 business days. If you have an
          urgent requirement, reach out via WhatsApp for same-day express turnaround!
        </p>
      ),
    },
    {
      key: "2",
      label: "💍 Can you handle bulk orders for weddings and corporate milestones?",
      children: (
        <p>
          Yes! We craft bespoke wedding stationery suites, save-the-date cards, return-gift cards,
          and branded corporate greeting cards with custom foil embossing, wax seals, and pressed
          wildflowers. Contact us early with your guest count for tiered volume discounts.
        </p>
      ),
    },
    {
      key: "3",
      label: "💳 What payment methods are supported in Sri Lanka?",
      children: (
        <p>
          We accept <strong>Cash on Delivery (COD)</strong> across all 9 provinces, direct online{" "}
          <strong>Bank Transfers</strong> (Commercial Bank, Sampath Bank, HNB), and major credit/debit
          cards (Visa & Mastercard) through secure online checkout.
        </p>
      ),
    },
    {
      key: "4",
      label: "✍️ Can you write our message in Sinhala, Tamil, or handwritten calligraphy?",
      children: (
        <p>
          Absolutely. Our artisans include skilled calligraphers who can hand-letter your personalized
          poems, quotes, and wishes in English, Sinhala (සිංහල), or Tamil (தமிழ்) using antique dip pens
          and shimmering archival ink.
        </p>
      ),
    },
    {
      key: "5",
      label: "📦 How are delicate pop-up and 3D cards protected during shipping?",
      children: (
        <p>
          Every card is tucked inside an archival kraft sleeve, placed between rigid protective cardboard
          backers, wrapped in cushioning eco-friendly bubble padding, and sealed with our tamper-evident
          artisan wax seal to ensure it arrives in pristine, display-ready condition.
        </p>
      ),
    },
  ];

  return (
    <AnimationOne>
      <div className="contact-page">
        {/* ── Hero ── */}
        <div className="contact-header">
          <div className="contact-badge">💌 Get in Touch · Sri Lanka</div>
          <Title level={1} className="contact-title">
            Let's Talk About Your Special Keepsake
          </Title>
          <Paragraph className="contact-subtitle">
            Whether you have a question about custom card commissions, bulk wedding invitations,
            order tracking, or artisan workshops — our craft studio team is here to help.
          </Paragraph>
        </div>

        {/* ── Direct Contact Channels Grid ── */}
        <div className="contact-channels-grid">
          {/* WhatsApp */}
          <div className="contact-channel-card">
            <div>
              <div className="contact-channel-top">
                <div className="contact-channel-icon-wrap" style={{ background: "#e6f7ea", borderColor: "#a3e2b3" }}>
                  💬
                </div>
                <div>
                  <h3 className="contact-channel-title">WhatsApp Chat</h3>
                  <span className="contact-channel-tagline">Fastest Response</span>
                </div>
              </div>
              <p className="contact-channel-desc">
                Chat directly with our studio artists for instant design previews, photo sharing, and quick order help.
              </p>
            </div>
            <Button
              type="primary"
              className="contact-channel-link-btn"
              style={{ background: "#25D366", borderColor: "#25D366" }}
              onClick={() => window.open("https://wa.me/94712345678", "_blank")}
            >
              Chat on WhatsApp (+94 71 234 5678) ↗
            </Button>
          </div>

          {/* Phone Hotline */}
          <div className="contact-channel-card">
            <div>
              <div className="contact-channel-top">
                <div className="contact-channel-icon-wrap">📞</div>
                <div>
                  <h3 className="contact-channel-title">Studio Hotline</h3>
                  <span className="contact-channel-tagline">Mon–Sat: 9 AM – 6 PM</span>
                </div>
              </div>
              <p className="contact-channel-desc">
                Prefer speaking directly with a human? Call our friendly team for urgent gifting and corporate inquiries.
              </p>
            </div>
            <Button
              className="contact-channel-link-btn"
              style={{ borderColor: "var(--cc-primary)", color: "var(--cc-primary)" }}
              onClick={() => window.open("tel:+94712345678")}
            >
              Call +94 71 234 5678 📞
            </Button>
          </div>

          {/* Email Support */}
          <div className="contact-channel-card">
            <div>
              <div className="contact-channel-top">
                <div className="contact-channel-icon-wrap">✉️</div>
                <div>
                  <h3 className="contact-channel-title">Email Us</h3>
                  <span className="contact-channel-tagline">Response &lt; 4 Hours</span>
                </div>
              </div>
              <p className="contact-channel-desc">
                Send us your custom text, high-res photos, or wedding invitation specifications for detailed quotes.
              </p>
            </div>
            <Button
              className="contact-channel-link-btn"
              style={{ borderColor: "var(--cc-primary)", color: "var(--cc-primary)" }}
              onClick={() => window.open("mailto:support@cutecard.lk")}
            >
              support@cutecard.lk ✉️
            </Button>
          </div>

          {/* Studio Location */}
          <div className="contact-channel-card">
            <div>
              <div className="contact-channel-top">
                <div className="contact-channel-icon-wrap">📍</div>
                <div>
                  <h3 className="contact-channel-title">Craft Studio</h3>
                  <span className="contact-channel-tagline">Islandwide Dispatch</span>
                </div>
              </div>
              <p className="contact-channel-desc">
                Main artisan workshop located in Uva Wellassa with our express delivery hub in Colombo, Sri Lanka.
              </p>
            </div>
            <Link to="/cards">
              <Button
                block
                className="contact-channel-link-btn"
                style={{ borderColor: "var(--cc-primary-soft)", color: "var(--cc-primary)" }}
              >
                Browse Card Gallery 🎁
              </Button>
            </Link>
          </div>
        </div>

        {/* ── Main Form & Info Grid ── */}
        <div className="contact-main-grid">
          <Row gutter={[32, 32]}>
            {/* Left: Contact Form */}
            <Col xs={24} lg={15}>
              <div className="contact-form-card">
                <h2 className="contact-form-heading">Send Us a Message</h2>
                <p className="contact-form-sub">
                  Fill out the details below and our lead artisan will reach back to you shortly.
                </p>

                {isSubmitted && ticketRef && (
                  <Alert
                    type="success"
                    showIcon
                    style={{ marginBottom: 24, borderRadius: "var(--cc-radius-md)" }}
                    message="Message Dispatched to Craft Studio!"
                    description={
                      <div>
                        Your inquiry reference is <strong>{ticketRef}</strong>. Our team will get in touch with you via WhatsApp or Email within 4 hours.
                      </div>
                    }
                  />
                )}

                <Form
                  form={form}
                  layout="vertical"
                  onFinish={onFinish}
                  initialValues={{
                    inquiryType: orderParam ? "Order Tracking Assistance" : "Custom Card Commission",
                    orderRef: orderParam,
                  }}
                >
                  <Row gutter={16}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="inquiryType"
                        label="What can we help you with?"
                        rules={[{ required: true, message: "Please select topic" }]}
                      >
                        <Select size="large">
                          <Select.Option value="Custom Card Commission">
                            🎨 Custom Card Commission
                          </Select.Option>
                          <Select.Option value="Bulk Wedding Stationery">
                            💍 Bulk Wedding Stationery
                          </Select.Option>
                          <Select.Option value="Order Tracking Assistance">
                            📦 Order Tracking Assistance
                          </Select.Option>
                          <Select.Option value="Corporate & Retail Orders">
                            🏢 Corporate & Wholesale
                          </Select.Option>
                          <Select.Option value="General Inquiry">
                            ✨ General Question / Feedback
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="name"
                        label="Your Full Name"
                        rules={[{ required: true, message: "Please enter your name" }]}
                      >
                        <Input size="large" placeholder="Anuki Silva" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="phone"
                        label="WhatsApp / Phone Number"
                        rules={[{ required: true, message: "Please enter contact number" }]}
                      >
                        <Input size="large" placeholder="+94 77 123 4567" />
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="email"
                        label="Email Address"
                        rules={[
                          { required: true, message: "Please enter email" },
                          { type: "email", message: "Enter a valid email" },
                        ]}
                      >
                        <Input size="large" placeholder="anuki@example.com" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="orderRef"
                        label="Order Tracking Reference (If Applicable)"
                      >
                        <Input size="large" placeholder="e.g. CC-8924" />
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="neededBy"
                        label="Required Date (If Time-sensitive)"
                      >
                        <DatePicker size="large" style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    name="message"
                    label="Your Message or Project Details"
                    rules={[{ required: true, message: "Please write your message" }]}
                  >
                    <TextArea
                      rows={5}
                      showCount
                      maxLength={500}
                      placeholder="Tell us about the occasion, card concept, colors, wording, or any special requests..."
                    />
                  </Form.Item>

                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    className="contact-submit-btn"
                  >
                    Send Message to CuteCard Studio 💌
                  </Button>
                </Form>
              </div>
            </Col>

            {/* Right: Studio Highlights & Location */}
            <Col xs={24} lg={9}>
              <div className="contact-sidebar-card">
                <div className="contact-studio-box">
                  <div className="contact-studio-title">
                    <span>🏛️</span>
                    <span>Studio Details</span>
                  </div>
                  <div className="contact-studio-list">
                    <div className="contact-studio-row">
                      <span>📍</span>
                      <div>
                        <strong>Address:</strong>
                        <div>Badulla Road, Uva Wellassa & Express Courier Hub, Colombo 03, Sri Lanka</div>
                      </div>
                    </div>
                    <div className="contact-studio-row">
                      <span>🕐</span>
                      <div>
                        <strong>Operating Hours:</strong>
                        <div>Monday to Saturday: 9:00 AM – 6:00 PM (IST)</div>
                        <div style={{ fontSize: "0.82rem", color: "#8a7a96" }}>Sunday: Studio closed for design research</div>
                      </div>
                    </div>
                    <div className="contact-studio-row">
                      <span>🚚</span>
                      <div>
                        <strong>Islandwide Courier Partners:</strong>
                        <div>Pronto Express, Domex, and Prompt Xpress</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="contact-guarantee-pill">
                  <span className="contact-guarantee-icon">🌿</span>
                  <div className="contact-guarantee-text">
                    <strong>100% Eco-conscious Crafting:</strong> We prioritize recycled cotton rag, plantable seed paper, and natural botanical dyes.
                  </div>
                </div>

                <div className="contact-guarantee-pill">
                  <span className="contact-guarantee-icon">🛡️</span>
                  <div className="contact-guarantee-text">
                    <strong>Safe Transit Guarantee:</strong> If your card arrives damaged in transit, we will craft and express ship a replacement free of charge.
                  </div>
                </div>

                <div
                  style={{
                    background: "var(--cc-grad-primary)",
                    borderRadius: "var(--cc-radius-md)",
                    padding: "20px",
                    color: "#ffffff",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 8, fontFamily: "var(--cc-font-head)" }}>
                    Ready to build your bespoke card?
                  </div>
                  <p style={{ fontSize: "0.88rem", opacity: 0.9, marginBottom: 16 }}>
                    Use our interactive card builder studio to choose formats, wax seals, and pressed Ceylon wildflowers.
                  </p>
                  <Link to="/customorder">
                    <Button
                      size="large"
                      style={{
                        borderRadius: "var(--cc-radius-pill)",
                        fontWeight: 700,
                        color: "var(--cc-primary)",
                        background: "#ffffff",
                        border: "none",
                      }}
                    >
                      Open Card Builder Studio ✨
                    </Button>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {/* ── FAQ Section ── */}
        <div className="contact-faq-section">
          <h2 className="contact-faq-title">Frequently Asked Questions</h2>
          <p className="contact-faq-sub">
            Quick answers about our handcrafted greeting cards, order pipeline, and shipping across Sri Lanka.
          </p>
          <Collapse items={faqItems} defaultActiveKey={["1"]} />
        </div>
      </div>
    </AnimationOne>
  );
}

import { useState } from "react";
import {
  Button,
  Empty,
  Input,
  Modal,
  Space,
  Steps,
  Tabs,
  Tag,
  Typography,
} from "antd";
import { Link } from "react-router-dom";
import AnimationOne from "../Function/AnimationOne";
import "../styles/orderpage.css";

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;

interface OrderRecord {
  id: string;
  date: string;
  status: "crafting" | "dispatched" | "delivered";
  statusText: string;
  total: number;
  items: {
    id: string;
    name: string;
    qty: number;
    price: number;
    img: string;
  }[];
  courier: string;
  trackingNumber: string;
  deliveryCity: string;
  estimatedDelivery: string;
  currentStep: number;
}

const mockOrders: OrderRecord[] = [
  {
    id: "CC-8924",
    date: "Sep 05, 2026",
    status: "dispatched",
    statusText: "Out for Delivery",
    total: 32.48,
    courier: "Pronto Express (Sri Lanka)",
    trackingNumber: "PRN-8942-LK",
    deliveryCity: "Colombo 07, Western Province",
    estimatedDelivery: "Tomorrow, by 5:00 PM",
    currentStep: 3,
    items: [
      {
        id: "1",
        name: "Golden Bloom Pop-up Card",
        qty: 1,
        price: 15.99,
        img: "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif",
      },
      {
        id: "4",
        name: "Whimsical Watercolor Heart",
        qty: 1,
        price: 14.5,
        img: "https://media.giphy.com/media/l41lT4at60KQIARVu/giphy.gif",
      },
    ],
  },
  {
    id: "CC-7150",
    date: "Aug 28, 2026",
    status: "delivered",
    statusText: "Delivered with Love",
    total: 18.99,
    courier: "Domex Couriers",
    trackingNumber: "DMX-7150-LK",
    deliveryCity: "Kandy, Central Province",
    estimatedDelivery: "Delivered on Aug 31, 2026",
    currentStep: 4,
    items: [
      {
        id: "5",
        name: "Royal Peacock Keepsake",
        qty: 1,
        price: 18.99,
        img: "https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif",
      },
    ],
  },
  {
    id: "CC-5520",
    date: "Aug 12, 2026",
    status: "delivered",
    statusText: "Delivered with Love",
    total: 25.98,
    courier: "Prompt Xpress",
    trackingNumber: "PMP-5520-LK",
    deliveryCity: "Galle, Southern Province",
    estimatedDelivery: "Delivered on Aug 15, 2026",
    currentStep: 4,
    items: [
      {
        id: "2",
        name: "Vintage Botanical Love",
        qty: 2,
        price: 9.99,
        img: "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif",
      },
    ],
  },
];

const trackingSteps = [
  { title: "Order Placed", description: "Design queued" },
  { title: "Crafting with Love", description: "Handmade by artisan" },
  { title: "Quality Check", description: "Wax seal & packaged" },
  { title: "In Transit", description: "Islandwide courier" },
  { title: "Delivered", description: "Delivered to doorstep" },
];

export default function OrderPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchKey, setSearchKey] = useState<string>("CC-8924");
  const [activeTrackedOrder, setActiveTrackedOrder] = useState<OrderRecord | null>(
    mockOrders[0]
  );
  const [invoiceModalOrder, setInvoiceModalOrder] = useState<OrderRecord | null>(
    null
  );

  const handleSearch = (val: string) => {
    const trimmed = val.trim().toUpperCase();
    setSearchKey(val);
    const found = mockOrders.find(
      (o) =>
        o.id.toUpperCase() === trimmed ||
        o.trackingNumber.toUpperCase() === trimmed
    );
    setActiveTrackedOrder(found || null);
  };

  const filteredOrders = mockOrders.filter((order) => {
    if (activeTab === "in-progress")
      return order.status === "crafting" || order.status === "dispatched";
    if (activeTab === "delivered") return order.status === "delivered";
    return true;
  });

  return (
    <AnimationOne>
      <div className="order-page">
        {/* Header */}
        <div className="order-header">
          <div className="order-badge">📦 Order Tracking</div>
          <Title level={1} className="order-title">
            Track & Manage Your Orders
          </Title>
          <Paragraph className="order-subtitle">
            Follow your handcrafted creation from our artisan table to your
            doorstep anywhere in Sri Lanka.
          </Paragraph>
        </div>

        {/* Live Tracking Card */}
        <div className="order-tracker-card">
          <div className="order-tracker-top">
            <div>
              <Text type="secondary" style={{ fontSize: "13px" }}>
                Active Tracking:
              </Text>
              <div className="order-tracking-num">
                {activeTrackedOrder ? activeTrackedOrder.id : searchKey || "—"}
              </div>
            </div>

            <div className="order-search-bar">
              <Search
                placeholder="Enter Order # (e.g. CC-8924) or Courier ID"
                enterButton="Track Order"
                size="large"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                onSearch={handleSearch}
              />
              <div style={{ marginTop: 8, display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
                <Text type="secondary" style={{ fontSize: "12px" }}>Demo Orders:</Text>
                {mockOrders.map((o) => (
                  <Tag
                    key={o.id}
                    color={activeTrackedOrder?.id === o.id ? "purple" : "default"}
                    style={{ cursor: "pointer", borderRadius: "var(--cc-radius-pill)" }}
                    onClick={() => handleSearch(o.id)}
                  >
                    {o.id} ({o.statusText})
                  </Tag>
                ))}
              </div>
            </div>
          </div>

          {activeTrackedOrder ? (
            <>
              <div className="order-steps-container">
                <Steps
                  current={activeTrackedOrder.currentStep}
                  items={trackingSteps}
                  responsive
                />
              </div>

              <div className="order-info-grid">
                <div className="order-info-card">
                  <div className="order-info-card-header">
                    <span className="order-info-card-icon">📦</span>
                    <span className="order-info-item-label">Current Status</span>
                  </div>
                  <div className="order-info-item-value">
                    <Tag
                      color={
                        activeTrackedOrder.status === "delivered"
                          ? "success"
                          : "processing"
                      }
                      style={{ fontSize: "0.9rem", padding: "3px 10px", borderRadius: "12px" }}
                    >
                      {activeTrackedOrder.statusText}
                    </Tag>
                  </div>
                </div>

                <div className="order-info-card">
                  <div className="order-info-card-header">
                    <span className="order-info-card-icon">🚚</span>
                    <span className="order-info-item-label">Courier Partner</span>
                  </div>
                  <div className="order-info-item-value">
                    {activeTrackedOrder.courier}
                  </div>
                </div>

                <div className="order-info-card">
                  <div className="order-info-card-header">
                    <span className="order-info-card-icon">🏷️</span>
                    <span className="order-info-item-label">Tracking Code</span>
                  </div>
                  <div className="order-info-item-value" style={{ fontFamily: "var(--cc-font-mono)" }}>
                    {activeTrackedOrder.trackingNumber}
                  </div>
                </div>

                <div className="order-info-card">
                  <div className="order-info-card-header">
                    <span className="order-info-card-icon">📅</span>
                    <span className="order-info-item-label">Estimated Arrival</span>
                  </div>
                  <div className="order-info-item-value">
                    {activeTrackedOrder.estimatedDelivery}
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginTop: "20px",
                  padding: "14px 18px",
                  background: "var(--cc-accent-warm)",
                  borderRadius: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "1.2rem" }}>💬</span>
                  <div>
                    <strong>Need urgent assistance with order {activeTrackedOrder.id}?</strong>
                    <div style={{ fontSize: "0.85rem", color: "#665" }}>
                      Our artisan support team is available on WhatsApp and our Contact Desk.
                    </div>
                  </div>
                </div>
                <Link to={`/contact?order=${activeTrackedOrder.id}`}>
                  <Button
                    type="primary"
                    style={{
                      borderRadius: "var(--cc-radius-pill)",
                      background: "var(--cc-primary)",
                      border: "none",
                    }}
                  >
                    Contact Support 💌
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <Empty
              style={{ padding: "20px 0" }}
              description={
                <span>
                  No active shipment found with reference <strong>{searchKey}</strong>.
                  Check your confirmation email or SMS.
                </span>
              }
            >
              <Button type="primary" onClick={() => handleSearch("CC-8924")}>
                View Demo Order CC-8924
              </Button>
            </Empty>
          )}
        </div>

        {/* Order History */}
        <div className="order-history-section">
          <h2 className="order-history-title">Your Order History</h2>

          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={[
              { key: "all", label: `All Orders (${mockOrders.length})` },
              { key: "in-progress", label: "In Progress (1)" },
              { key: "delivered", label: "Delivered (2)" },
            ]}
          />

          {filteredOrders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-card-header">
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <span className="order-id-tag">{order.id}</span>
                  <Text type="secondary">
                    Placed on {order.date}
                  </Text>
                </div>
                <Tag
                  color={
                    order.status === "delivered" ? "#52c41a" : "var(--cc-primary)"
                  }
                  style={{ borderRadius: "var(--cc-radius-pill)", padding: "3px 12px", fontWeight: 600 }}
                >
                  {order.statusText}
                </Tag>
              </div>

              <div className="order-card-items-list">
                {order.items.map((item) => (
                  <div key={item.id} className="order-item-row">
                    <div className="order-item-left">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="order-item-thumb"
                      />
                      <div>
                        <div className="order-item-title">{item.name}</div>
                        <div className="order-item-meta">
                          Quantity: {item.qty} × ${item.price.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <div style={{ fontWeight: 700, color: "var(--cc-primary)" }}>
                      ${(item.qty * item.price).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-card-footer">
                <div className="order-total-price">
                  Total Paid: ${order.total.toFixed(2)}
                </div>

                <Space wrap>
                  <Button
                    type="primary"
                    style={{ borderRadius: "var(--cc-radius-pill)", background: "var(--cc-grad-primary)", border: "none" }}
                    onClick={() => {
                      setActiveTrackedOrder(order);
                      setSearchKey(order.id);
                      window.scrollTo({ top: 120, behavior: "smooth" });
                    }}
                  >
                    Track Status 🔍
                  </Button>
                  <Button
                    style={{ borderRadius: "var(--cc-radius-pill)" }}
                    onClick={() => setInvoiceModalOrder(order)}
                  >
                    View Receipt 🧾
                  </Button>
                  <Link to="/cards">
                    <Button style={{ borderRadius: "var(--cc-radius-pill)" }}>
                      Reorder
                    </Button>
                  </Link>
                </Space>
              </div>
            </div>
          ))}
        </div>

        {/* Invoice Modal */}
        <Modal
          open={!!invoiceModalOrder}
          title={null}
          onCancel={() => setInvoiceModalOrder(null)}
          footer={[
            <Button key="close" onClick={() => setInvoiceModalOrder(null)} style={{ borderRadius: "var(--cc-radius-pill)" }}>
              Close
            </Button>,
            <Button
              key="print"
              type="primary"
              style={{
                borderRadius: "var(--cc-radius-pill)",
                background: "var(--cc-grad-primary)",
                border: "none",
              }}
              onClick={() => window.print()}
            >
              Print Receipt 🖨️
            </Button>,
          ]}
          centered
          width={580}
        >
          {invoiceModalOrder && (
            <div style={{ padding: "16px 8px" }}>
              {/* Receipt Header */}
              <div
                style={{
                  textAlign: "center",
                  borderBottom: "2px dashed #e8dbe8",
                  paddingBottom: "16px",
                  marginBottom: "16px",
                }}
              >
                <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--cc-primary)", fontFamily: "var(--cc-font-head)" }}>
                  CuteCard Studio
                </div>
                <div style={{ fontSize: "0.82rem", color: "#7a6e87" }}>
                  Handmade Gift Cards & Bespoke Stationery · Sri Lanka
                </div>
                <div style={{ fontSize: "0.8rem", color: "#7a6e87" }}>
                  Hotline: +94 71 234 5678 · support@cutecard.lk
                </div>
                <div
                  style={{
                    display: "inline-block",
                    background: "var(--cc-accent-warm)",
                    color: "var(--cc-primary)",
                    padding: "4px 16px",
                    borderRadius: "var(--cc-radius-pill)",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    marginTop: "10px",
                  }}
                >
                  Digital Tax Receipt · {invoiceModalOrder.id}
                </div>
              </div>

              {/* Meta Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "0.88rem", marginBottom: "16px" }}>
                <div>
                  <span style={{ color: "#8a7d97" }}>Order Date:</span>
                  <div><strong>{invoiceModalOrder.date}</strong></div>
                </div>
                <div>
                  <span style={{ color: "#8a7d97" }}>Status:</span>
                  <div><strong style={{ color: "#389e0d" }}>{invoiceModalOrder.statusText}</strong></div>
                </div>
                <div>
                  <span style={{ color: "#8a7d97" }}>Delivery Destination:</span>
                  <div><strong>{invoiceModalOrder.deliveryCity}</strong></div>
                </div>
                <div>
                  <span style={{ color: "#8a7d97" }}>Courier Partner:</span>
                  <div><strong>{invoiceModalOrder.courier}</strong> ({invoiceModalOrder.trackingNumber})</div>
                </div>
              </div>

              {/* Items Table */}
              <div
                style={{
                  borderTop: "1px solid #f0e2f2",
                  borderBottom: "1px solid #f0e2f2",
                  padding: "12px 0",
                  marginBottom: "16px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "0.85rem", color: "var(--cc-primary)", marginBottom: "8px" }}>
                  <span>Item Description</span>
                  <span>Total</span>
                </div>
                {invoiceModalOrder.items.map((it) => (
                  <div
                    key={it.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "0.9rem",
                      marginBottom: 8,
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <span>{it.name}</span>
                      <div style={{ fontSize: "0.8rem", color: "#887b94" }}>
                        Qty: {it.qty} × ${it.price.toFixed(2)}
                      </div>
                    </div>
                    <strong>${(it.price * it.qty).toFixed(2)}</strong>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.92rem", marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#5d5069" }}>
                  <span>Islandwide Courier Packaging:</span>
                  <span>Included</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: 800,
                    fontSize: "1.25rem",
                    color: "var(--cc-primary)",
                    paddingTop: "8px",
                    borderTop: "2px dashed #e8dbe8",
                  }}
                >
                  <span>Total Amount Paid:</span>
                  <span>${invoiceModalOrder.total.toFixed(2)}</span>
                </div>
                <div style={{ textAlign: "right", fontSize: "0.82rem", color: "#8a7d97" }}>
                  Approx. Rs. {Math.round(invoiceModalOrder.total * 305).toLocaleString()} LKR
                </div>
              </div>

              <div style={{ textAlign: "center", fontSize: "0.78rem", color: "#9a8ea4", marginTop: "12px" }}>
                Thank you for choosing handmade! Each card keeps traditional Sri Lankan papercraft alive. 💜
              </div>
            </div>
          )}
        </Modal>
      </div>
    </AnimationOne>
  );
}

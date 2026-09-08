import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Col,
  Empty,
  Input,
  Row,
  Select,
  Space,
  Tag,
  Typography,
} from "antd";
import { useParams, useSearchParams } from "react-router-dom";
import Card from "./Card";
import { allCardProducts } from "../data/cardProducts";
import AnimationOne from "../Function/AnimationOne";
import "../styles/cardspage.css";

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;

const categories = [
  "All",
  "Birthday",
  "Love & Anniversary",
  "Wedding",
  "Pop-up 3D",
  "Thank You",
];

export default function CardsPage() {
  const { id: routeCardId } = useParams<{ id?: string }>();
  const [searchParams] = useSearchParams();
  const catParam = searchParams.get("category");
  const queryParam = searchParams.get("q") || "";

  const [selectedCategory, setSelectedCategory] = useState<string>(
    catParam && categories.includes(catParam) ? catParam : "All"
  );
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [sortBy, setSortBy] = useState("featured");

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: allCardProducts.length };
    categories.forEach((cat) => {
      if (cat !== "All") {
        counts[cat] = allCardProducts.filter((c) => c.category === cat).length;
      }
    });
    return counts;
  }, []);

  // Sync state if URL query changes
  useEffect(() => {
    if (catParam && categories.includes(catParam)) {
      setSelectedCategory(catParam);
    } else if (!catParam) {
      setSelectedCategory("All");
    }
    if (queryParam) {
      setSearchQuery(queryParam);
    }
  }, [catParam, queryParam]);

  const filteredCards = useMemo(() => {
    let list = [...allCardProducts];

    // Filter by category
    if (selectedCategory !== "All") {
      list = list.filter((c) => c.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q)) ||
          Object.values(c.details).some((d) => d.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name-asc") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [selectedCategory, searchQuery, sortBy]);

  const handleReset = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setSortBy("featured");
  };

  return (
    <AnimationOne>
      <div className="cards-catalog-page">
        {/* Header */}
        <div className="cards-header">
          <div className="cards-header-badge">
            <span className="cards-header-badge-dot" />
            ✨ Handmade Collection · Sri Lanka
          </div>
          <Title level={1} className="cards-header-title">
            Handcrafted Greeting Cards
          </Title>
          <Paragraph className="cards-header-subtitle">
            Every card is carefully crafted with eco-friendly textured paper, delicate
            botanical accents, and love right here in Sri Lanka.
          </Paragraph>

          <div className="cards-header-stats">
            <span className="cards-header-stat-item">🎨 Hand-lettered Details</span>
            <span style={{ color: "#d2bed8" }}>•</span>
            <span className="cards-header-stat-item">🌿 100% Recycled Kraft</span>
            <span style={{ color: "#d2bed8" }}>•</span>
            <span className="cards-header-stat-item">💌 Wax Seal Finishing</span>
          </div>
        </div>

        {/* Filter Panel */}
        <div className="cards-filter-panel">
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} md={14}>
              <Search
                placeholder="Search by card name, occasion, or style..."
                allowClear
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="cards-search-input"
              />
            </Col>
            <Col xs={24} md={10} style={{ textAlign: "right" }}>
              <Space wrap>
                <Text type="secondary" style={{ fontSize: "13px" }}>
                  Sort by:
                </Text>
                <Select
                  value={sortBy}
                  onChange={setSortBy}
                  className="cards-sort-select"
                  options={[
                    { value: "featured", label: "Featured" },
                    { value: "price-asc", label: "Price: Low to High" },
                    { value: "price-desc", label: "Price: High to Low" },
                    { value: "name-asc", label: "Name: A to Z" },
                  ]}
                />
              </Space>
            </Col>
          </Row>

          {/* Category Pills */}
          <div className="cards-category-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`cards-cat-pill ${
                  selectedCategory === cat ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat} ({categoryCounts[cat] || 0})
              </button>
            ))}
          </div>
        </div>

        {/* Meta Bar */}
        <div className="cards-meta-row">
          <Text className="cards-count-text">
            Showing <strong>{filteredCards.length}</strong> of{" "}
            {allCardProducts.length} handcrafted cards
          </Text>

          {(selectedCategory !== "All" || searchQuery) && (
            <Space size={6} wrap>
              {selectedCategory !== "All" && (
                <Tag
                  closable
                  color="purple"
                  onClose={() => setSelectedCategory("All")}
                >
                  Category: {selectedCategory}
                </Tag>
              )}
              {searchQuery && (
                <Tag closable color="magenta" onClose={() => setSearchQuery("")}>
                  Search: "{searchQuery}"
                </Tag>
              )}
              <Button type="link" size="small" onClick={handleReset}>
                Reset all
              </Button>
            </Space>
          )}
        </div>

        {/* Cards Grid or Empty */}
        {filteredCards.length > 0 ? (
          <Card
            cards={filteredCards}
            colsDesktop={4}
            initialSelectedCardId={routeCardId}
          />
        ) : (
          <div className="cards-empty-container">
            <Empty
              image={null}
              description={
                <div>
                  <div className="cards-empty-icon">💌</div>
                  <Title level={4} className="cards-empty-title">
                    No cards match your search
                  </Title>
                  <Paragraph type="secondary" style={{ maxWidth: 420, margin: "0 auto 16px" }}>
                    Try searching with different keywords or reset the category
                    filter to discover all handcrafted cards.
                  </Paragraph>
                </div>
              }
            >
              <Button type="primary" size="large" onClick={handleReset} style={{ borderRadius: "var(--cc-radius-pill)" }}>
                View All Handcrafted Cards
              </Button>
            </Empty>
          </div>
        )}
      </div>
    </AnimationOne>
  );
}

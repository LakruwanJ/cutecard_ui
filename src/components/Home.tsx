import { Col, Divider, Row, Typography } from "antd";

import AnimationOne from "../Function/AnimationOne";
import Cards from "./Cards";

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <AnimationOne>
          <section>
            <Typography.Title level={1} className="home-title">
              Welcome to CuteCard
            </Typography.Title>

            <Row gutter={[40, 24]} align="middle" className="home-intro">
              <Col xs={24} md={12} className="home-text">
                <Typography.Title level={2}>
                  Where Every Gift is a Treasure!
                </Typography.Title>

                <Typography.Paragraph>
                  At CuteCard, we make gifting simple and meaningful. Customize
                  your gift cards with personal messages and unique designs to
                  add a special touch. Need a last-minute gift? No problem — our
                  cards are delivered instantly! With options to fit any budget
                  and easy redemption for exclusive products on our platform,
                  CuteCard is the perfect choice for thoughtful, hassle-free
                  gifting.
                </Typography.Paragraph>
              </Col>

              <Col xs={24} md={12} className="home-animation">
              </Col>
            </Row>
          </section>
        </AnimationOne>

        <Divider className="home-divider">
          <Typography.Title level={2} className="home-cards-title">
            Cards
          </Typography.Title>
        </Divider>

        <Cards />
      </div>
    </div>
  );
}

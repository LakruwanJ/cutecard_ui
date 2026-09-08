import { useState } from "react";
import { Form, Input, Modal, Select, Tabs, Typography, message, Button } from "antd";
import { useAuth } from "../Function/AuthContext";
import "../styles/authmodal.css";

const { Title, Paragraph } = Typography;
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

export default function AuthModal() {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalTab,
    authPromptReason,
    login,
    register,
  } = useAuth();

  const [tabOverride, setTabOverride] = useState<string | null>(null);
  const activeTab = tabOverride ?? authModalTab;
  const [loading, setLoading] = useState(false);
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();

  const handleClose = () => {
    setTabOverride(null);
    closeAuthModal();
  };

  const handleLoginSubmit = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      const res = await login(values.username, values.password);
      if (res.success) {
        message.success(res.message);
        loginForm.resetFields();
      } else {
        message.error(res.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (username: string, password: string) => {
    loginForm.setFieldsValue({ username, password });
    setLoading(true);
    try {
      const res = await login(username, password);
      if (res.success) {
        message.success(res.message);
        loginForm.resetFields();
      } else {
        message.error(res.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (values: {
    name: string;
    username: string;
    email: string;
    phone?: string;
    address?: string;
    city?: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const res = await register({
        name: values.name,
        username: values.username,
        email: values.email,
        phone: values.phone,
        address: values.address,
        city: values.city,
        password: values.password,
      });

      if (res.success) {
        message.success(res.message);
        registerForm.resetFields();
      } else {
        message.error(res.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={isAuthModalOpen}
      onCancel={handleClose}
      footer={null}
      centered
      width={460}
      className="cc-auth-modal"
      destroyOnClose={false}
    >
      {/* ── Top Header ── */}
      <div className="cc-auth-header">
        <div className="cc-auth-icon-badge">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 21.593c-5.63-5.539-11-10.297-11-14.402C1 3.314 3.87 1
                 6.498 1 8.533 1 10.515 2.395 12 4c1.485-1.605 3.467-3
                 5.502-3C20.13 1 23 3.314 23 7.19c0 4.105-5.37 8.863-11 14.402z"
              fill="white"
            />
          </svg>
        </div>

        <Title level={3} className="cc-auth-title">
          {activeTab === "login" ? "Welcome Back" : "Join CuteCard"}
        </Title>
        <Paragraph className="cc-auth-subtitle">
          {activeTab === "login"
            ? "Sign in to manage orders, bag items & keepsakes"
            : "Create your account for fast delivery & order tracking"}
        </Paragraph>

        {/* Reason banner if triggered by restricted guest action */}
        {authPromptReason && (
          <div className="cc-auth-reason-alert">
            <span>✨</span>
            <span>{authPromptReason}</span>
          </div>
        )}
      </div>

      {/* ── Tabs & Forms ── */}
      <div className="cc-auth-body">
        <Tabs
          activeKey={activeTab}
          onChange={(key) => setTabOverride(key as "login" | "register")}
          centered
          className="cc-auth-tabs"
          items={[
            {
              key: "login",
              label: "Sign In",
              children: (
                <div>
                  {/* Demo 1-Click login banner */}
                  <div className="cc-auth-demo-box">
                    <div className="cc-auth-demo-title">
                      <span>⚡</span> Fast Demo Credentials:
                    </div>
                    <div className="cc-auth-demo-chips">
                      <button
                        type="button"
                        className="cc-auth-demo-btn"
                        onClick={() => handleDemoLogin("user", "123q")}
                      >
                        <span>👤</span> Demo User (user / 123q)
                      </button>
                      <button
                        type="button"
                        className="cc-auth-demo-btn"
                        onClick={() => handleDemoLogin("admin", "123q")}
                      >
                        <span>🛡️</span> Demo Admin (admin / 123q)
                      </button>
                    </div>
                  </div>

                  <Form
                    form={loginForm}
                    layout="vertical"
                    className="cc-auth-form"
                    onFinish={handleLoginSubmit}
                    initialValues={{ username: "", password: "" }}
                  >
                    <Form.Item
                      label="Username or Email"
                      name="username"
                      rules={[{ required: true, message: "Please enter your username" }]}
                    >
                      <Input placeholder="e.g. user or sanduni@example.com" />
                    </Form.Item>

                    <Form.Item
                      label="Password"
                      name="password"
                      rules={[{ required: true, message: "Please enter your password" }]}
                    >
                      <Input.Password placeholder="Enter password (e.g. 123q)" />
                    </Form.Item>

                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      loading={loading}
                      className="cc-auth-submit-btn"
                    >
                      Sign In 💌
                    </Button>

                    <div className="cc-auth-footer-prompt">
                      <span>Don't have an account?</span>
                      <span
                        className="cc-auth-footer-link"
                        onClick={() => setTabOverride("register")}
                      >
                        Sign Up Now
                      </span>
                    </div>
                  </Form>
                </div>
              ),
            },
            {
              key: "register",
              label: "Create Account",
              children: (
                <Form
                  form={registerForm}
                  layout="vertical"
                  className="cc-auth-form"
                  onFinish={handleRegisterSubmit}
                  initialValues={{ city: "Colombo" }}
                >
                  <Form.Item
                    label="Full Name"
                    name="name"
                    rules={[{ required: true, message: "Please enter your full name" }]}
                  >
                    <Input placeholder="e.g. Sanduni Perera" />
                  </Form.Item>

                  <Form.Item
                    label="Choose Username"
                    name="username"
                    rules={[
                      { required: true, message: "Please choose a username" },
                      { min: 3, message: "Username must be at least 3 characters" },
                    ]}
                  >
                    <Input placeholder="e.g. sanduni_p" />
                  </Form.Item>

                  <Form.Item
                    label="Email Address"
                    name="email"
                    rules={[
                      { required: true, message: "Please enter your email" },
                      { type: "email", message: "Please enter a valid email" },
                    ]}
                  >
                    <Input placeholder="e.g. sanduni@gmail.com" />
                  </Form.Item>

                  <Form.Item
                    label="Mobile Phone (Sri Lanka)"
                    name="phone"
                    rules={[{ required: true, message: "Please enter your contact phone" }]}
                  >
                    <Input placeholder="e.g. 077 123 4567" />
                  </Form.Item>

                  <Form.Item label="Delivery Address" name="address">
                    <Input placeholder="e.g. No. 12/4 Flower Road" />
                  </Form.Item>

                  <Form.Item label="District / City" name="city">
                    <Select
                      showSearch
                      placeholder="Select your district"
                      optionFilterProp="children"
                    >
                      {slDistricts.map((d) => (
                        <Option key={d} value={d}>
                          {d}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      { required: true, message: "Please create a password" },
                      { min: 4, message: "Password must be at least 4 characters" },
                    ]}
                  >
                    <Input.Password placeholder="At least 4 characters" />
                  </Form.Item>

                  <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    dependencies={["password"]}
                    rules={[
                      { required: true, message: "Please confirm your password" },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error("Passwords do not match!"));
                        },
                      }),
                    ]}
                  >
                    <Input.Password placeholder="Re-enter password" />
                  </Form.Item>

                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={loading}
                    className="cc-auth-submit-btn"
                  >
                    Create Account ✨
                  </Button>

                  <div className="cc-auth-footer-prompt">
                    <span>Already have an account?</span>
                    <span
                      className="cc-auth-footer-link"
                      onClick={() => setTabOverride("login")}
                    >
                      Sign In
                    </span>
                  </div>
                </Form>
              ),
            },
          ]}
        />
      </div>
    </Modal>
  );
}

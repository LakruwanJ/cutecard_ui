import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { message } from "antd";

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  role: "user" | "admin";
  createdAt: string;
}

export interface UserWithPassword extends User {
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
}

interface AuthContextValue {
  currentUser: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isAuthModalOpen: boolean;
  authModalTab: "login" | "register";
  authPromptReason: string;
  login: (username: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<{ success: boolean; message: string }>;
  openAuthModal: (tab?: "login" | "register", reason?: string) => void;
  closeAuthModal: () => void;
  requireAuth: (action: () => void, reason?: string) => boolean;
}

const STORAGE_USERS_KEY = "cutecard_registered_users";
const STORAGE_CURRENT_USER_KEY = "cutecard_current_user";

// Pre-seeded accounts (user/123q and admin/123q)
const INITIAL_USERS: UserWithPassword[] = [
  {
    id: "usr-admin",
    username: "admin",
    password: "123q",
    name: "Admin CuteCard",
    email: "admin@cutecard.lk",
    phone: "+94 71 987 6543",
    address: "CuteCard HQ, Galle Road",
    city: "Colombo",
    role: "admin",
    createdAt: "2026-01-01",
  },
  {
    id: "usr-user",
    username: "user",
    password: "123q",
    name: "Sanduni Perera",
    email: "user@cutecard.lk",
    phone: "+94 77 123 4567",
    address: "12/4 Flower Road",
    city: "Colombo",
    role: "user",
    createdAt: "2026-02-15",
  },
];

function toSafeUser(u: UserWithPassword): User {
  return {
    id: u.id,
    username: u.username,
    name: u.name,
    email: u.email,
    phone: u.phone,
    address: u.address,
    city: u.city,
    role: u.role,
    createdAt: u.createdAt,
  };
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<UserWithPassword[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_USERS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Ensure default accounts are present
          const hasAdmin = parsed.some((u: UserWithPassword) => u.username === "admin");
          const hasUser = parsed.some((u: UserWithPassword) => u.username === "user");
          const merged = [...parsed];
          if (!hasAdmin) merged.push(INITIAL_USERS[0]);
          if (!hasUser) merged.push(INITIAL_USERS[1]);
          return merged;
        }
      }
    } catch {
      // ignore JSON errors
    }
    return INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_CURRENT_USER_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "register">("login");
  const [authPromptReason, setAuthPromptReason] = useState<string>("");
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  // Sync users to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
    } catch {
      // ignore
    }
  }, [users]);

  // Sync currentUser to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
      }
    } catch {
      // ignore
    }
  }, [currentUser]);

  const openAuthModal = useCallback(
    (tab: "login" | "register" = "login", reason: string = "") => {
      setAuthModalTab(tab);
      setAuthPromptReason(reason);
      setIsAuthModalOpen(true);
    },
    []
  );

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
    setAuthPromptReason("");
    setPendingAction(null);
  }, []);

  const login = useCallback(
    async (username: string, password: string) => {
      const cleanUser = username.trim();
      const cleanPass = password.trim();

      const matched = users.find(
        (u) =>
          u.username.toLowerCase() === cleanUser.toLowerCase() &&
          u.password === cleanPass
      );

      if (!matched) {
        return {
          success: false,
          message: "Invalid username or password. Try demo accounts: user / 123q or admin / 123q",
        };
      }

      // Strip password for currentUser state
      const userSafe = toSafeUser(matched);
      setCurrentUser(userSafe);
      setIsAuthModalOpen(false);
      setAuthPromptReason("");

      // Execute queued action if one was pending (e.g. Add to Cart)
      if (pendingAction) {
        try {
          pendingAction();
        } catch {
          // ignore
        }
        setPendingAction(null);
      }

      return {
        success: true,
        message: `Welcome back, ${userSafe.name}! 💖`,
      };
    },
    [users, pendingAction]
  );

  const register = useCallback(
    async (data: RegisterData) => {
      const cleanUser = data.username.trim();
      if (cleanUser.length < 3) {
        return { success: false, message: "Username must be at least 3 characters" };
      }

      const exists = users.some(
        (u) => u.username.toLowerCase() === cleanUser.toLowerCase()
      );
      if (exists) {
        return { success: false, message: "Username is already taken. Please choose another." };
      }

      const newUser: UserWithPassword = {
        id: `usr-${Date.now()}`,
        username: cleanUser,
        password: data.password.trim(),
        name: data.name.trim() || cleanUser,
        email: data.email.trim() || `${cleanUser}@cutecard.lk`,
        phone: data.phone?.trim() || "",
        address: data.address?.trim() || "",
        city: data.city?.trim() || "Colombo",
        role: "user",
        createdAt: new Date().toISOString().split("T")[0],
      };

      setUsers((prev) => [...prev, newUser]);

      const userSafe = toSafeUser(newUser);
      setCurrentUser(userSafe);
      setIsAuthModalOpen(false);
      setAuthPromptReason("");

      if (pendingAction) {
        try {
          pendingAction();
        } catch {
          // ignore
        }
        setPendingAction(null);
      }

      return {
        success: true,
        message: `Account created successfully! Welcome to CuteCard, ${userSafe.name} ✨`,
      };
    },
    [users, pendingAction]
  );

  const logout = useCallback(() => {
    setCurrentUser(null);
    setPendingAction(null);
    message.success("You have been signed out. See you soon! 💌");
  }, []);

  const updateProfile = useCallback(
    async (updatedFields: Partial<User>) => {
      if (!currentUser) {
        return { success: false, message: "No active user session" };
      }

      const updatedUser: User = {
        ...currentUser,
        ...updatedFields,
        // username and role are immutable via basic profile edit
        username: currentUser.username,
        role: currentUser.role,
        id: currentUser.id,
      };

      setCurrentUser(updatedUser);

      // Also update in users list
      setUsers((prev) =>
        prev.map((u) =>
          u.id === currentUser.id
            ? { ...u, ...updatedFields, username: u.username, role: u.role, password: u.password }
            : u
        )
      );

      return { success: true, message: "Profile updated successfully! ✨" };
    },
    [currentUser]
  );

  /**
   * Action guard: if user is logged in, runs `action()`.
   * If guest, opens auth modal with prompt reason and stores action to execute post-login.
   */
  const requireAuth = useCallback(
    (action: () => void, reason: string = "Please log in to continue."): boolean => {
      if (currentUser) {
        action();
        return true;
      }

      // Guest user clicked action
      setPendingAction(() => action);
      setAuthPromptReason(reason);
      setAuthModalTab("login");
      setIsAuthModalOpen(true);
      return false;
    },
    [currentUser]
  );

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isAdmin: currentUser?.role === "admin",
        isAuthModalOpen,
        authModalTab,
        authPromptReason,
        login,
        register,
        logout,
        updateProfile,
        openAuthModal,
        closeAuthModal,
        requireAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an <AuthProvider>");
  }
  return ctx;
}

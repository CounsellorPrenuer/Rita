import { Request, Response, NextFunction } from "express";

declare module "express-session" {
  interface SessionData {
    isAdmin: boolean;
  }
}

export const ADMIN_CREDENTIALS = {
  email: "admin@fasttrack360.com",
  password: "admin123",
};

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.session.isAdmin) {
    return res.status(401).json({ message: "Unauthorized. Admin access required." });
  }
  next();
}

export function loginAdmin(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    req.session.regenerate((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to create session" });
      }
      req.session.isAdmin = true;
      return res.json({ success: true, message: "Login successful" });
    });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
}

export function logoutAdmin(req: Request, res: Response) {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to logout" });
    }
    res.clearCookie("ft360.sid", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    return res.json({ success: true, message: "Logout successful" });
  });
}

export function checkAuth(req: Request, res: Response) {
  return res.json({ isAuthenticated: !!req.session.isAdmin });
}

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user.repository.js";
import { AuthTokenPayload, UserProfile, UserRole } from "../types/index.js";

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_jwt_key_home_viewing_2026";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export class AuthService {
  constructor(private userRepo: UserRepository = new UserRepository()) {}

  async register(data: {
    email: string;
    password: string;
    fullName: string;
    phone: string;
    role?: UserRole;
  }): Promise<{ accessToken: string; user: UserProfile }> {
    const existing = await this.userRepo.findByEmail(data.email);
    if (existing) {
      throw new Error("EMAIL_EXISTS");
    }

    const targetRole = data.role || "CUSTOMER";
    const roleId = await this.userRepo.getRoleIdByName(targetRole);
    if (!roleId) {
      throw new Error("INVALID_ROLE");
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(data.password, salt);

    const userId = await this.userRepo.create({
      email: data.email,
      passwordHash,
      fullName: data.fullName,
      phone: data.phone,
      roleId
    });

    const userProfile = await this.userRepo.findById(userId);
    if (!userProfile) {
      throw new Error("USER_CREATION_FAILED");
    }

    const accessToken = this.generateToken({
      userId: userProfile.id,
      role: userProfile.role,
      email: userProfile.email
    });

    return {
      accessToken,
      user: userProfile
    };
  }

  async login(credentials: {
    email: string;
    password: string;
  }): Promise<{ accessToken: string; user: UserProfile }> {
    const user = await this.userRepo.findByEmail(credentials.email);
    if (!user) {
      throw new Error("INVALID_CREDENTIALS");
    }

    if (!user.is_active) {
      throw new Error("ACCOUNT_LOCKED");
    }

    const isMatch = await bcrypt.compare(credentials.password, user.password_hash);
    if (!isMatch) {
      throw new Error("INVALID_CREDENTIALS");
    }

    const userProfile = await this.userRepo.findById(user.id);
    if (!userProfile) {
      throw new Error("USER_NOT_FOUND");
    }

    const accessToken = this.generateToken({
      userId: userProfile.id,
      role: userProfile.role,
      email: userProfile.email
    });

    return {
      accessToken,
      user: userProfile
    };
  }

  async getUserProfile(userId: number): Promise<UserProfile> {
    const profile = await this.userRepo.findById(userId);
    if (!profile) {
      throw new Error("USER_NOT_FOUND");
    }
    return profile;
  }

  generateToken(payload: AuthTokenPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions);
  }

  verifyToken(token: string): AuthTokenPayload {
    return jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
  }
}

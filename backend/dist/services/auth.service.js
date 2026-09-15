"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_repository_js_1 = require("../repositories/user.repository.js");
const JWT_SECRET = process.env.JWT_SECRET || "super_secret_jwt_key_home_viewing_2026";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
class AuthService {
    userRepo;
    constructor(userRepo = new user_repository_js_1.UserRepository()) {
        this.userRepo = userRepo;
    }
    async register(data) {
        const existing = await this.userRepo.findByEmail(data.email);
        if (existing) {
            throw new Error("EMAIL_EXISTS");
        }
        const targetRole = data.role || "CUSTOMER";
        const roleId = await this.userRepo.getRoleIdByName(targetRole);
        if (!roleId) {
            throw new Error("INVALID_ROLE");
        }
        const salt = await bcryptjs_1.default.genSalt(10);
        const passwordHash = await bcryptjs_1.default.hash(data.password, salt);
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
    async login(credentials) {
        const user = await this.userRepo.findByEmail(credentials.email);
        if (!user) {
            throw new Error("INVALID_CREDENTIALS");
        }
        if (!user.is_active) {
            throw new Error("ACCOUNT_LOCKED");
        }
        const isMatch = await bcryptjs_1.default.compare(credentials.password, user.password_hash);
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
    async getUserProfile(userId) {
        const profile = await this.userRepo.findById(userId);
        if (!profile) {
            throw new Error("USER_NOT_FOUND");
        }
        return profile;
    }
    generateToken(payload) {
        return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    }
    verifyToken(token) {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
}
exports.AuthService = AuthService;

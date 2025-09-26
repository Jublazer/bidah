import jwt from 'jsonwebtoken';

// JWT configuration
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not defined');
}

export interface JWTPayload {
  userId: string;
  email: string;
  userType: 'farmer' | 'buyer' | 'admin';
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export interface TokenVerificationResult {
  valid: boolean;
  payload?: JWTPayload;
  error?: string;
}

/**
 * Generate a JWT token for a user
 */
export function generateToken(payload: JWTPayload): string {
  try {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
      issuer: 'kidah-app',
      audience: 'kidah-users',
    });
  } catch (error) {
    throw new Error(`Failed to generate token: ${error.message}`);
  }
}

/**
 * Verify and decode a JWT token
 */
export function verifyToken(token: string): JWTPayload {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: 'kidah-app',
      audience: 'kidah-users',
    }) as JWTPayload;
    
    return decoded;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token has expired');
    } else if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid token');
    } else {
      throw new Error('Token verification failed');
    }
  }
}

/**
 * Safely verify a token without throwing errors (for optional auth)
 */
export function safeVerifyToken(token: string): TokenVerificationResult {
  try {
    const payload = verifyToken(token);
    return { valid: true, payload };
  } catch (error) {
    return { 
      valid: false, 
      error: error.message 
    };
  }
}

/**
 * Decode a token without verification (for inspection only)
 */
export function decodeToken(token: string): JWTPayload | null {
  try {
    return jwt.decode(token) as JWTPayload;
  } catch (error) {
    return null;
  }
}

/**
 * Check if a token is expired without verification
 */
export function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwt.decode(token) as any;
    if (!decoded || !decoded.exp) return true;
    
    return Date.now() >= decoded.exp * 1000;
  } catch (error) {
    return true;
  }
}

/**
 * Get the remaining time until token expiration in milliseconds
 */
export function getTokenExpiryTime(token: string): number | null {
  try {
    const decoded = jwt.decode(token) as any;
    if (!decoded || !decoded.exp) return null;
    
    return decoded.exp * 1000 - Date.now();
  } catch (error) {
    return null;
  }
}

/**
 * Refresh a token (issue new token with same payload)
 */
export function refreshToken(oldToken: string): string {
  try {
    const payload = verifyToken(oldToken);
    return generateToken(payload);
  } catch (error) {
    throw new Error(`Cannot refresh token: ${error.message}`);
  }
}

/**
 * Generate token for specific user type with enhanced payload
 */
export function generateUserToken(
  userId: string, 
  email: string, 
  userType: 'farmer' | 'buyer' | 'admin',
  userProfile?: { firstName?: string; lastName?: string; phone?: string }
): string {
  const payload: JWTPayload = {
    userId,
    email,
    userType,
    ...userProfile
  };

  return generateToken(payload);
}

/**
 * Validate token structure (basic format check)
 */
export function isValidTokenFormat(token: string): boolean {
  if (typeof token !== 'string') return false;
  
  // Basic JWT format check (three parts separated by dots)
  const parts = token.split('.');
  return parts.length === 3;
}

/**
 * Extract token from various sources (header, cookie, etc.)
 */
export function extractTokenFromRequest(request: Request): string | null {
  // From Authorization header
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  // From cookies (for browser requests)
  const cookieHeader = request.headers.get('cookie');
  if (cookieHeader) {
    const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
      const [name, value] = cookie.trim().split('=');
      acc[name] = value;
      return acc;
    }, {} as Record<string, string>);

    return cookies['kidah_token'] || null;
  }

  // From query parameter (for specific use cases)
  const url = new URL(request.url);
  return url.searchParams.get('token');
}

/**
 * Middleware-friendly token verification for Next.js middleware
 */
export function verifyTokenForMiddleware(token: string): { isValid: boolean; payload?: JWTPayload } {
  try {
    const payload = verifyToken(token);
    return { isValid: true, payload };
  } catch (error) {
    return { isValid: false };
  }
}

// Token blacklist management (for logout functionality)
class TokenBlacklist {
  private blacklistedTokens = new Set<string>();

  addToken(token: string): void {
    // In a production app, you'd use Redis or database for this
    this.blacklistedTokens.add(token);
  }

  isBlacklisted(token: string): boolean {
    return this.blacklistedTokens.has(token);
  }

  removeExpiredTokens(): void {
    // Clean up expired tokens periodically
    this.blacklistedTokens.forEach(token => {
      if (isTokenExpired(token)) {
        this.blacklistedTokens.delete(token);
      }
    });
  }
}

export const tokenBlacklist = new TokenBlacklist();

/**
 * Verify token considering blacklist
 */
export function verifyTokenWithBlacklist(token: string): JWTPayload {
  if (tokenBlacklist.isBlacklisted(token)) {
    throw new Error('Token has been invalidated');
  }
  
  return verifyToken(token);
}

/**
 * Invalidate token (add to blacklist)
 */
export function invalidateToken(token: string): void {
  tokenBlacklist.addToken(token);
}

// Utility functions for token management
export const JWTUtils = {
  generateToken,
  verifyToken,
  safeVerifyToken,
  decodeToken,
  isTokenExpired,
  getTokenExpiryTime,
  refreshToken,
  generateUserToken,
  isValidTokenFormat,
  extractTokenFromRequest,
  verifyTokenForMiddleware,
  verifyTokenWithBlacklist,
  invalidateToken,
};

export default JWTUtils;
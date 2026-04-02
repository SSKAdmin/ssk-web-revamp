import { Redis } from "@upstash/redis";

type RecordType = { count: number; lastReset: number };
const rateLimits = new Map<string, RecordType>();

// Optional Cloud-Ready External Redis
const redis = (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

export interface RateLimitStatus {
  success: boolean;
  message?: string;
}

export async function rateLimit(
  identifier: string,
  limit: number = 5,
  windowMs: number = 60000 // default 1 minute
): Promise<RateLimitStatus> {
  const now = Date.now();

  // 1. CLOUD MODE (Distributed Redis)
  if (redis) {
    try {
      const currentCount = await redis.incr(identifier);
      if (currentCount === 1) {
        await redis.pexpire(identifier, windowMs);
      }
      if (currentCount > limit) {
        return { success: false, message: "Too many requests. Please try again later." };
      }
      return { success: true };
    } catch (e) {
      console.warn("Redis rate limit failed, falling back to memory:", e);
    }
  }

  // 2. FALLBACK MODE (Memory)
  const record = rateLimits.get(identifier) || { count: 0, lastReset: now };

  if (now - record.lastReset > windowMs) {
    record.count = 1;
    record.lastReset = now;
  } else {
    record.count += 1;
  }

  rateLimits.set(identifier, record);

  if (record.count > limit) {
    return {
      success: false,
      message: "Too many requests. Please try again later.",
    };
  }

  return { success: true };
}

// Cleanup function to prevent memory leaks over time
export function cleanupRateLimits(windowMs: number = 60000) {
  const now = Date.now();
  for (const [key, record] of rateLimits.entries()) {
    if (now - record.lastReset > windowMs) {
      rateLimits.delete(key);
    }
  }
}

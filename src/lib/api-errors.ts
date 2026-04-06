import { NextResponse } from "next/server";

export function isDbConnectionError(error: any): boolean {
  if (!error) return false;
  
  // Drizzle/pg connection refused or timeout
  if (error.code === 'ECONNREFUSED' || error.code === 'ECONNRESET') return true;
  
  // AggregateError from Drizzle when unable to connect
  if (error instanceof AggregateError || error.name === 'AggregateError') {
    return error.errors?.some((e: any) => e.code === 'ECONNREFUSED' || e.code === 'ECONNRESET');
  }
  
  // Check cause
  if (error.cause) {
    if (error.cause.code === 'ECONNREFUSED' || error.cause.code === 'ECONNRESET') return true;
    if (error.cause instanceof AggregateError || error.cause.name === 'AggregateError') {
       if ((error.cause as any).code === 'ECONNREFUSED') return true;
       return (error.cause as any).errors?.some((e: any) => e.code === 'ECONNREFUSED' || e.code === 'ECONNRESET');
    }
  }

  const msg = error.message?.toLowerCase() || '';
  return msg.includes('econnrefused') || msg.includes('connection refused');
}

export function logApiError(context: string, error: any) {
  // 1. Standardized Server Logging
  console.error(`[API_ERROR] [${context}]`, {
    message: error.message || error,
    stack: error.stack,
    timestamp: new Date().toISOString(),
  });

  // 2. Sentry Forwarding Pending (Awaiting 'npm install @sentry/nextjs')
  // Sentry SDK can be injected here once dependencies are successfully installed
}

export function safeApiErrorResponse(error: any) {
  if (isDbConnectionError(error)) {
    return NextResponse.json({ success: false, error: "Service temporarily unavailable: " + (error?.message || error) }, { status: 503 });
  }
  
  return NextResponse.json({ success: false, error: "Internal Server Error: " + (error?.message || error) }, { status: 500 });
}

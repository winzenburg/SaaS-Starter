#!/usr/bin/env tsx
/**
 * Test API Keys - Verify Manus, OpenAI, and Anthropic API keys are working
 * 
 * Usage: npx tsx scripts/test-api-keys.ts
 */

import { config } from "dotenv";
import { resolve } from "path";

// Load environment variables from .env.local
const envPath = resolve(process.cwd(), ".env.local");
config({ path: envPath });

interface TestResult {
  service: string;
  status: "✅ Working" | "❌ Failed" | "⚠️  Missing Key";
  message: string;
}

async function testManusAPI(): Promise<TestResult> {
  const apiKey = process.env.MANUS_API_KEY;
  if (!apiKey) {
    return {
      service: "Manus.im",
      status: "⚠️  Missing Key",
      message: "MANUS_API_KEY not found in .env.local",
    };
  }

  try {
    const apiUrl = process.env.MANUS_API_URL || "https://api.manus.ai/v1";
    
    // Test by making a simple request to list tasks (or check API status)
    // Using a lightweight endpoint that won't create a task
    const res = await fetch(`${apiUrl}/tasks?limit=1`, {
      method: "GET",
      headers: {
        accept: "application/json",
        API_KEY: apiKey,
      },
    });

    if (res.ok || res.status === 404) {
      // 404 is OK - it means the API is reachable and authenticated
      // (just no tasks exist, which is fine)
      return {
        service: "Manus.im",
        status: "✅ Working",
        message: `API key is valid (status: ${res.status})`,
      };
    }

    if (res.status === 401 || res.status === 403) {
      return {
        service: "Manus.im",
        status: "❌ Failed",
        message: `Authentication failed (status: ${res.status}) - Invalid API key`,
      };
    }

    // Try to get error message
    let errorMsg = `HTTP ${res.status}`;
    try {
      const errorBody = await res.json();
      errorMsg = errorBody.message || errorBody.error || errorMsg;
    } catch {
      // Ignore JSON parse errors
    }

    return {
      service: "Manus.im",
      status: "❌ Failed",
      message: errorMsg,
    };
  } catch (error) {
    return {
      service: "Manus.im",
      status: "❌ Failed",
      message: error instanceof Error ? error.message : String(error),
    };
  }
}

async function testOpenAIAPI(): Promise<TestResult> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return {
      service: "OpenAI (ChatGPT)",
      status: "⚠️  Missing Key",
      message: "OPENAI_API_KEY not found in .env.local",
    };
  }

  try {
    // Test with a minimal request to list models (very lightweight)
    const res = await fetch("https://api.openai.com/v1/models", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (res.ok) {
      return {
        service: "OpenAI (ChatGPT)",
        status: "✅ Working",
        message: "API key is valid and authenticated",
      };
    }

    if (res.status === 401) {
      return {
        service: "OpenAI (ChatGPT)",
        status: "❌ Failed",
        message: "Authentication failed - Invalid API key",
      };
    }

    if (res.status === 429) {
      return {
        service: "OpenAI (ChatGPT)",
        status: "❌ Failed",
        message: "Rate limit exceeded or quota exhausted - Check billing",
      };
    }

    let errorMsg = `HTTP ${res.status}`;
    try {
      const errorBody = await res.json();
      errorMsg = errorBody.error?.message || errorMsg;
    } catch {
      // Ignore JSON parse errors
    }

    return {
      service: "OpenAI (ChatGPT)",
      status: "❌ Failed",
      message: errorMsg,
    };
  } catch (error) {
    return {
      service: "OpenAI (ChatGPT)",
      status: "❌ Failed",
      message: error instanceof Error ? error.message : String(error),
    };
  }
}

async function testAnthropicAPI(): Promise<TestResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return {
      service: "Anthropic (Claude)",
      status: "⚠️  Missing Key",
      message: "ANTHROPIC_API_KEY not found in .env.local",
    };
  }

  try {
    // Test with a minimal message request
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-haiku-20240307", // Use cheapest model for testing
        max_tokens: 10, // Minimal tokens to keep cost near zero
        messages: [
          {
            role: "user",
            content: "Say 'test'",
          },
        ],
      }),
    });

    if (res.ok) {
      return {
        service: "Anthropic (Claude)",
        status: "✅ Working",
        message: "API key is valid and authenticated",
      };
    }

    if (res.status === 401) {
      return {
        service: "Anthropic (Claude)",
        status: "❌ Failed",
        message: "Authentication failed - Invalid API key",
      };
    }

    if (res.status === 429) {
      return {
        service: "Anthropic (Claude)",
        status: "❌ Failed",
        message: "Rate limit exceeded - Check usage limits",
      };
    }

    let errorMsg = `HTTP ${res.status}`;
    try {
      const errorBody = await res.json();
      errorMsg = errorBody.error?.message || errorMsg;
    } catch {
      // Ignore JSON parse errors
    }

    return {
      service: "Anthropic (Claude)",
      status: "❌ Failed",
      message: errorMsg,
    };
  } catch (error) {
    return {
      service: "Anthropic (Claude)",
      status: "❌ Failed",
      message: error instanceof Error ? error.message : String(error),
    };
  }
}

async function main() {
  console.log("🔑 Testing API Keys...\n");
  console.log(`📁 Loading from: ${envPath}\n`);

  const results: TestResult[] = [];

  // Test Manus
  console.log("Testing Manus.im API...");
  const manusResult = await testManusAPI();
  results.push(manusResult);
  console.log(`${manusResult.status} ${manusResult.service}: ${manusResult.message}\n`);

  // Test OpenAI
  console.log("Testing OpenAI (ChatGPT) API...");
  const openaiResult = await testOpenAIAPI();
  results.push(openaiResult);
  console.log(`${openaiResult.status} ${openaiResult.service}: ${openaiResult.message}\n`);

  // Test Anthropic
  console.log("Testing Anthropic (Claude) API...");
  const anthropicResult = await testAnthropicAPI();
  results.push(anthropicResult);
  console.log(`${anthropicResult.status} ${anthropicResult.service}: ${anthropicResult.message}\n`);

  // Summary
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("📊 Summary:\n");
  
  const working = results.filter((r) => r.status === "✅ Working");
  const failed = results.filter((r) => r.status === "❌ Failed");
  const missing = results.filter((r) => r.status === "⚠️  Missing Key");

  if (working.length > 0) {
    console.log(`✅ Working (${working.length}):`);
    working.forEach((r) => console.log(`   - ${r.service}`));
    console.log();
  }

  if (failed.length > 0) {
    console.log(`❌ Failed (${failed.length}):`);
    failed.forEach((r) => console.log(`   - ${r.service}: ${r.message}`));
    console.log();
  }

  if (missing.length > 0) {
    console.log(`⚠️  Missing Keys (${missing.length}):`);
    missing.forEach((r) => console.log(`   - ${r.service}`));
    console.log();
  }

  // Exit code
  if (failed.length > 0) {
    console.log("❌ Some API keys are not working. Please check your .env.local file.");
    process.exit(1);
  } else if (working.length === 0) {
    console.log("⚠️  No API keys found. Please add them to .env.local");
    process.exit(1);
  } else {
    console.log("✅ All configured API keys are working!");
    process.exit(0);
  }
}

main().catch((error) => {
  console.error("❌ Test script error:", error);
  process.exit(1);
});



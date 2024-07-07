import Anthropic from 'anthropic';

const apiKey = process.env.ANTHROPIC_API_KEY;

if (!apiKey) {
  throw new Error("Anthropic API Keyがありません");
}

// Anthropic クライアントの初期化
const anthropic = new Anthropic({
  apiKey: apiKey,
});

export default anthropic;

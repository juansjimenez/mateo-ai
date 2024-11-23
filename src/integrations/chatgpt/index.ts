import OpenAI from "openai";

async function listModels() {
  try {
    const apiKey = process.env.OPENAI_API_KEY || "";
    const openai = new OpenAI({ apiKey });
    const response = await openai.models.list();
    console.log(JSON.stringify(response, null, 2))
  } catch (error) {
    console.error("Error fetching models:", JSON.stringify(error, null, 2));
  }
}

/**
 * Extracts and parses the JSON object from a given string if it starts with " json".
 * @param {string} input - The input string potentially containing a JSON object.
 * @returns {object|string} - The parsed JSON object if found, or the original string if no JSON-like content is detected.
 */
function clean(input:string): string {
  const regex = /^\`\`\`json\s*\{.*\}/; // Matches strings starting with " json" and containing JSON-like content
  const jsonRegex = /\{.*\}/; // Extracts the content inside curly braces

  // Check if the string starts with " json"
  if (regex.test(input)) {
      const match = input.match(jsonRegex); // Find the JSON-like part
      if (match) {
          try {
              return match[0]; // Parse the JSON string into an object
          } catch (error) {
              console.error("Invalid JSON format:", error);
              return input; // Return the original string if parsing fails
          }
      }
  }

  console.log("Returning original input:", input);
  return input;
}

async function askChatGPT(prompt: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY || "";
  const openai = new OpenAI({ apiKey });

  console.log("Connected to ChatPGT");
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { "role": "user", "content": prompt }
    ]
  });

  console.log(`ChatGPT response: ${completion.choices[0].message.content}`);

  return clean(completion.choices[0].message.content ?? '');
}

export { askChatGPT };
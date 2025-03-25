import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function POST(request: Request) {
    try {
        
        const { subtitleItem } = await request.json()
        if (!subtitleItem) {
            return new Response(JSON.stringify({ error: "Subtitle text is required" }), { status: 400 });
        }

        const prompt = `Act as an expert English teacher specializing in teaching English through real-world conversations from subtitles.

### **Input:**
You will receive subtitle text extracted from an SRT file. Analyze the text and extract important language learning elements.

### **Subtitle Content:**
${subtitleItem.subtitle}

### **Output:**
Return a well-structured JSON object with categories like Vocabulary, Phrasal Verbs, Idioms, Slang, Grammar, and Quiz. Each category must have at least 15-20 items.

Ensure the JSON format follows this structure:

{
   "id":"random-uuid",
  "lessonTitle": "English from Movies - Learning with Subtitles",
  "level": "Intermediate",
  "description": "This lesson extracts vocabulary, phrasal verbs, idioms, and grammar from real conversations in movies or TV shows.",
  "subtitleContext": "Extracted from a movie or TV show.",
  "categories": {
    "Vocabulary": [  
      { "word": "Intriguing", "meaning": "Very interesting", "example": "The story was intriguing." }
    ],
    "Phrasal Verbs": [  
      { "phrase": "Figure out", "meaning": "Find the solution", "example": "I need to figure out this problem." }
    ],
    "Idioms": [  
      { "idiom": "Hit the sack", "meaning": "Go to sleep", "example": "I'm so tired, I'm going to hit the sack." }
    ],
    "Slang": [  
      { "slang": "Dope", "meaning": "Cool or awesome", "example": "That song is dope!" }
    ],
    "Grammar": {  
      "topic": "Past Continuous Tense",
      "explanation": "Used to describe actions that were happening at a specific time in the past.",
      "examples": [
        { "sentence": "I was watching TV when you called.", "ruleApplied": "Past Continuous" }
      ]
    },
    "Quiz": {  
      "questions": [  
        {  
          "question": "What does 'figure out' mean?",  
          "options": ["Break something", "Find the solution", "Run away", "Eat quickly"],  
          "answer": "Find the solution"
        }
      ]
    }
  }
}

Return only the JSON format, nothing else.`

        // Generate content using Gemini
        const result = await model.generateContent(prompt);
        const responseText = await result.response.text();
        const cleanedText = responseText.trim().replace(/^```(\w+)?\n|```$/g, "");



        console.log("Generated lesson:", responseText);

        return new Response(cleanedText, { status: 200, headers: { "Content-Type": "application/json" } });

    } catch (error) {
        console.error("Error generating lesson:", error);
        return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
    }
}

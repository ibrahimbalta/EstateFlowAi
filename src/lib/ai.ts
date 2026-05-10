import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini (User will need to provide VITE_GEMINI_API_KEY)
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");

export const generateListingContent = async (propertyData: any) => {
  const prompt = `
    Sen bir gayrimenkul pazarlama uzmanısın. Aşağıdaki bilgilere sahip bir mülk için profesyonel bir ilan paketi hazırla.
    Mülk Tipi: ${propertyData.type}
    Lokasyon: ${propertyData.location}
    Fiyat: ${propertyData.price}
    m²: ${propertyData.size}
    Özellikler: ${propertyData.features || "Belirtilmedi"}

    Lütfen şu formatta JSON çıktısı ver (Sadece JSON objesini döndür, başka açıklama yazma):
    {
      "seoTitle": "Sahibinden/Hepsiemlak için çarpıcı bir başlık",
      "seoDescription": "SEO uyumlu, anahtar kelime zengin, satış odaklı detaylı açıklama",
      "whatsappMessage": "WhatsApp grupları için kısa ve etkileyici mesaj",
      "hashtags": ["hashtag1", "hashtag2", "..."],
      "imagePrompt": "Detailed English prompt for high-end real estate architectural photography"
    }
  `;

  // Try multiple models in case one is restricted in the user's region
  const modelsToTry = ["gemini-1.5-flash", "gemini-pro"];
  let lastError = null;

  for (const modelName of modelsToTry) {
    try {
      console.log(`AI generation attempting with model: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Clean JSON formatting
      const jsonStr = text.replace(/```json|```/g, "").trim();
      return JSON.parse(jsonStr);
    } catch (error) {
      console.warn(`Model ${modelName} failed, trying next...`, error);
      lastError = error;
      continue; // Try next model
    }
  }

  // If all models fail
  console.error("All AI models failed:", lastError);
  throw lastError;
};

export const generateImageURL = (prompt: string, type: 'post' | 'story') => {
  const width = type === 'post' ? 1024 : 1080;
  const height = type === 'post' ? 1024 : 1920;
  const encodedPrompt = encodeURIComponent(prompt + ", architectural photography, high-end real estate, 8k, professional lighting");
  return `https://pollinations.ai/p/${encodedPrompt}?width=${width}&height=${height}&seed=${Math.floor(Math.random() * 1000)}&model=flux`;
};

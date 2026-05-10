import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini (User will need to provide VITE_GEMINI_API_KEY)
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateListingContent = async (propertyData: any) => {
  const prompt = `
    Sen bir gayrimenkul pazarlama uzmanısın. Aşağıdaki bilgilere sahip bir mülk için profesyonel bir ilan paketi hazırla.
    Mülk Tipi: ${propertyData.type}
    Lokasyon: ${propertyData.location}
    Fiyat: ${propertyData.price}
    m²: ${propertyData.size}
    Özellikler: ${propertyData.features || "Belirtilmedi"}

    Lütfen şu formatta JSON çıktısı ver:
    {
      "seoTitle": "Sahibinden/Hepsiemlak için çarpıcı bir başlık",
      "seoDescription": "SEO uyumlu, anahtar kelime zengin, satış odaklı detaylı açıklama",
      "whatsappMessage": "WhatsApp grupları için kısa ve etkileyici mesaj",
      "hashtags": ["hashtag1", "hashtag2", "..."],
      "imagePrompt": "Bu mülk için oluşturulacak premium reklam görseli için detaylı İngilizce AI promptu"
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // Clean JSON if needed (sometimes Gemini adds ```json ... ```)
    const jsonStr = text.replace(/```json|```/g, "").trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw error;
  }
};

export const generateImageURL = (prompt: string, type: 'post' | 'story') => {
  const width = type === 'post' ? 1024 : 1080;
  const height = type === 'post' ? 1024 : 1920;
  const encodedPrompt = encodeURIComponent(prompt + ", architectural photography, high-end real estate, 8k, professional lighting");
  return `https://pollinations.ai/p/${encodedPrompt}?width=${width}&height=${height}&seed=${Math.floor(Math.random() * 1000)}&model=flux`;
};

/**
 * EstateFlow AI - AI Service Module (Pollinations Powered)
 * This module handles both text and image generation using Pollinations AI.
 * No API keys required for better stability and global access.
 */

export const generateListingContent = async (propertyData: any) => {
  const systemPrompt = "Sen bir gayrimenkul pazarlama uzmanısın. Sadece JSON formatında cevap ver.";
  const userPrompt = `
    Aşağıdaki bilgilere sahip bir mülk için profesyonel bir ilan paketi hazırla.
    Mülk Tipi: ${propertyData.type}
    Lokasyon: ${propertyData.location}
    Fiyat: ${propertyData.price}
    m²: ${propertyData.size}
    Özellikler: ${propertyData.features || "Belirtilmedi"}

    Lütfen tam olarak şu JSON formatında cevap ver (Başka hiçbir açıklama yazma):
    {
      "seoTitle": "Çarpıcı ilan başlığı",
      "seoDescription": "SEO uyumlu detaylı açıklama",
      "whatsappMessage": "Kısa etkileyici mesaj",
      "hashtags": ["hashtag1", "hashtag2"],
      "imagePrompt": "Detailed English prompt for high-end real estate architectural photography"
    }
  `;

  try {
    const encodedPrompt = encodeURIComponent(userPrompt);
    const response = await fetch(`https://text.pollinations.ai/${encodedPrompt}?model=mistral&system=${encodeURIComponent(systemPrompt)}`);

    if (!response.ok) throw new Error('Yapay zeka servisi şu an yanıt vermiyor.');
    
    const text = await response.text();
    // Extract JSON (sometimes models add extra text)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Yapay zekadan geçersiz bir cevap geldi.');
    
    return JSON.parse(jsonMatch[0]);
  } catch (error: any) {
    console.error("AI Generation Error:", error);
    throw new Error(error.message || "İlan üretilirken bir hata oluştu.");
  }
};

export const generateImageURL = (prompt: string, type: 'post' | 'story') => {
  const width = type === 'post' ? 1024 : 1080;
  const height = type === 'post' ? 1024 : 1920;
  const encodedPrompt = encodeURIComponent(prompt + ", architectural photography, high-end real estate, ultra-realistic, 8k, professional lighting");
  return `https://pollinations.ai/p/${encodedPrompt}?width=${width}&height=${height}&seed=${Math.floor(Math.random() * 1000)}&model=flux`;
};

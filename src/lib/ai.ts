/**
 * EstateFlow AI - AI Service Module (Super Stable Edition)
 * Uses a more robust endpoint and includes a fallback mechanism 
 * to ensure the user ALWAYS gets a result.
 */

export const generateListingContent = async (propertyData: any) => {
  const prompt = `
    Sen bir gayrimenkul pazarlama uzmanısın. 
    Mülk: ${propertyData.type}, Lokasyon: ${propertyData.location}, Fiyat: ${propertyData.price}, m2: ${propertyData.size}.
    Özellikler: ${propertyData.features || "Belirtilmedi"}.

    Lütfen tam olarak şu JSON formatında cevap ver:
    {
      "seoTitle": "Çarpıcı ilan başlığı",
      "seoDescription": "SEO uyumlu detaylı açıklama",
      "whatsappMessage": "Kısa etkileyici mesaj",
      "hashtags": ["hashtag1", "hashtag2"],
      "imagePrompt": "Detailed English prompt for high-end real estate architectural photography"
    }
  `;

  try {
    // Using the most reliable keyless endpoint for Pollinations
    const response = await fetch('https://text.pollinations.ai/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [
          { role: 'user', content: prompt }
        ],
        model: 'mistral',
        code: 'true' // Some instances require this for better formatting
      })
    });

    if (!response.ok) throw new Error('Servis geçici olarak meşgul.');

    const text = await response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    } else {
      throw new Error('Format hatası.');
    }
  } catch (error) {
    console.warn("AI Generation failed, using smart fallback...", error);
    
    // SMART FALLBACK: Generate a decent response locally if AI fails
    // This ensures the user NEVER sees an error message and can continue their work.
    return {
      seoTitle: `${propertyData.location} Konumunda Fırsat ${propertyData.type}`,
      seoDescription: `${propertyData.location} bölgesinde yer alan, ${propertyData.size} m2 kullanım alanına sahip ${propertyData.type}. ${propertyData.price} fiyatıyla satışa sunulmuştur. ${propertyData.features || ""}`,
      whatsappMessage: `🏠 KAÇIRILMAYACAK FIRSAT! \n📍 ${propertyData.location} \n💰 ${propertyData.price} \n📞 Detaylar için iletişime geçin.`,
      hashtags: ["emlak", "satilik", propertyData.type, "firsat"],
      imagePrompt: `Luxurious ${propertyData.type} in ${propertyData.location}, professional real estate photography, 8k, sunset lighting`
    };
  }
};

export const generateImageURL = (prompt: string, type: 'post' | 'story') => {
  const width = type === 'post' ? 1024 : 1080;
  const height = type === 'post' ? 1024 : 1920;
  const encodedPrompt = encodeURIComponent(prompt + ", realistic, architectural photography, 8k");
  return `https://pollinations.ai/p/${encodedPrompt}?width=${width}&height=${height}&seed=${Math.floor(Math.random() * 1000)}&model=flux`;
};

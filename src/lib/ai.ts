/**
 * EstateFlow AI - AI Service Module (Super Stable Edition)
 * Handles large property descriptions and ensures stable JSON responses.
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
    const response = await fetch('https://text.pollinations.ai/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [
          { role: 'user', content: prompt }
        ],
        model: 'mistral',
        code: 'true'
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
  // Using a faster, simpler prompt and model for instant results
  const encodedPrompt = encodeURIComponent(prompt.slice(0, 200) + ", high resolution, architecture");
  return `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&seed=${Math.floor(Math.random() * 1000)}&nologo=true&enhance=false`;
};

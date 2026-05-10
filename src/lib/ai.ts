/**
 * EstateFlow AI - AI Service Module (Robust Pollinations Edition)
 * Handles large property descriptions and ensures stable JSON responses.
 */

export const generateListingContent = async (propertyData: any) => {
  const systemPrompt = "Sen bir gayrimenkul pazarlama uzmanısın. Sadece JSON formatında cevap ver. Başka hiçbir açıklama yazma.";
  const userPrompt = `
    Aşağıdaki bilgilere sahip bir mülk için profesyonel bir ilan paketi hazırla.
    Mülk Tipi: ${propertyData.type}
    Lokasyon: ${propertyData.location}
    Fiyat: ${propertyData.price}
    m²: ${propertyData.size}
    Özellikler: ${propertyData.features || "Belirtilmedi"}

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
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        model: 'mistral',
        jsonMode: true
      })
    });

    if (!response.ok) {
      throw new Error(`AI Servisi Yanıt Vermedi (Hata: ${response.status})`);
    }

    const text = await response.text();
    
    // Attempt to extract JSON from the text response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Yapay zekadan geçersiz bir format geldi. Lütfen tekrar deneyin.');
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error: any) {
    console.error("AI Generation Error:", error);
    throw new Error(error.message || "İlan üretilirken beklenmedik bir sorun oluştu.");
  }
};

export const generateImageURL = (prompt: string, type: 'post' | 'story') => {
  const width = type === 'post' ? 1024 : 1080;
  const height = type === 'post' ? 1024 : 1920;
  const encodedPrompt = encodeURIComponent(prompt + ", architectural photography, high-end real estate, ultra-realistic, 8k, professional lighting");
  return `https://pollinations.ai/p/${encodedPrompt}?width=${width}&height=${height}&seed=${Math.floor(Math.random() * 1000)}&model=flux`;
};

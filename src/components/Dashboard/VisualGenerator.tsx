import React, { useState } from 'react';
import { 
  Download, 
  Copy, 
  RefreshCw, 
  Check, 
  Camera, 
  MessageCircle, 
  Globe,
  Share2
} from 'lucide-react';


interface VisualGeneratorProps {
  data: any;
  onReset: () => void;
}

const DesignOverlay = ({ data }: { data: any }) => {
  const isLuxury = data.selectedTemplate === 'luxury';
  
  return (
    <div style={{ 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      pointerEvents: 'none',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      color: 'white',
      zIndex: 20
    }}>
      {/* Top Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ 
          background: isLuxury ? 'linear-gradient(90deg, #b8860b, #daa520)' : 'var(--primary)', 
          padding: '8px 16px', 
          borderRadius: '4px',
          fontWeight: '800',
          fontSize: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
          textTransform: 'uppercase'
        }}>
          {isLuxury ? '👑 LUXURY PORTFÖY' : '🔥 KAÇIRILMAYACAK FIRSAT'}
        </div>
        
        <div style={{ textAlign: 'right', background: 'rgba(0,0,0,0.6)', padding: '8px 12px', borderRadius: '8px', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: '10px', opacity: 0.8, fontWeight: '600' }}>LOKASYON</div>
          <div style={{ fontSize: '13px', fontWeight: '700' }}>{data.location?.split(',')[0]}</div>
        </div>
      </div>

      {/* Bottom Section */}
      <div style={{ 
        background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', 
        margin: '-20px', 
        padding: '40px 20px 20px' 
      }}>
        <div style={{ 
          background: 'rgba(255,255,255,0.05)', 
          padding: '16px', 
          borderRadius: '12px', 
          backdropFilter: 'blur(10px)',
          borderLeft: `4px solid ${isLuxury ? '#daa520' : 'var(--primary)'}`,
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}>
          <h4 style={{ fontSize: '18px', marginBottom: '10px', fontWeight: '800', lineHeight: '1.2' }}>{data.seoTitle}</h4>
          
          <div style={{ display: 'flex', gap: '15px', marginBottom: '15px', opacity: 0.9 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px' }}>
              <span>📐</span> {data.size} m²
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px' }}>
              <span>🏠</span> {data.type}
            </div>
          </div>

          <div style={{ 
            fontSize: '28px', 
            fontWeight: '900', 
            color: isLuxury ? '#daa520' : '#4ade80',
            display: 'flex',
            alignItems: 'baseline',
            gap: '5px'
          }}>
            {data.price} <span style={{ fontSize: '14px', fontWeight: '600', color: 'white' }}>TL</span>
          </div>
        </div>
        
        <div style={{ marginTop: '12px', fontSize: '10px', textAlign: 'center', opacity: 0.6, letterSpacing: '2px', fontWeight: 'bold' }}>
          ESTATEFLOW AI DESIGN STUDIO
        </div>
      </div>
    </div>
  );
};

const ImageCard = ({ title, url, type, data }: { title: string, url: string, type: 'post' | 'story', data: any }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="glass-card" style={{ padding: '16px', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span style={{ fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {type === 'post' ? <Camera size={16} /> : <Share2 size={16} />} {title}
        </span>
        <a href={url} download target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none' }}>
          <Download size={16} />
        </a>
      </div>
      
      <div style={{ 
        height: type === 'post' ? '400px' : '550px', 
        borderRadius: '12px', 
        border: '1px solid var(--border)', 
        background: '#0a0a0a',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {isLoading && (
          <div style={{ textAlign: 'center', zIndex: 5 }}>
            <div className="loader-spinner" style={{ 
              width: '40px', 
              height: '40px', 
              border: '3px solid rgba(255,255,255,0.1)', 
              borderTopColor: 'var(--primary)', 
              borderRadius: '50%', 
              margin: '0 auto 12px',
              animation: 'spin 1s linear infinite'
            }} />
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>İlan Tasarlanıyor...</p>
          </div>
        )}
        <img 
          src={url} 
          alt={title} 
          onLoad={() => setIsLoading(false)}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            opacity: isLoading ? 0 : 0.7,
            transition: 'opacity 0.3s ease'
          }} 
        />
        {!isLoading && <DesignOverlay data={data} />}
      </div>
    </div>
  );
};

const VisualGenerator: React.FC<VisualGeneratorProps> = ({ data, onReset }) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleCopy = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '32px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '24px', marginBottom: '4px' }}>İlan Paketiniz Hazır!</h2>
            <p style={{ color: 'var(--text-muted)' }}>Şablonunuza göre profesyonel olarak tasarlanmış ilan görselleri.</p>
          </div>
          <button onClick={onReset} className="glass-card" style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <RefreshCw size={18} /> Yeni Oluştur
          </button>
        </header>

        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <ImageCard title="Instagram / FB Post" url={data.postUrl} type="post" data={data} />
          <ImageCard title="WhatsApp Story" url={data.storyUrl} type="story" data={data} />
        </section>

        <section className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Globe size={18} className="gradient-text" /> SEO Listing İçeriği
          </h3>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>SEO Başlık</label>
            <div style={{ position: 'relative' }}>
              <input readOnly value={data.seoTitle} style={{ width: '100%', paddingRight: '40px' }} />
              <button onClick={() => handleCopy(data.seoTitle, 'title')} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: copiedSection === 'title' ? '#10b981' : 'var(--text-muted)', cursor: 'pointer' }}>
                {copiedSection === 'title' ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>İlan Açıklaması</label>
            <div style={{ position: 'relative' }}>
              <textarea readOnly value={data.seoDescription} style={{ width: '100%', minHeight: '150px', paddingRight: '40px', fontSize: '14px', lineHeight: '1.6' }} />
              <button onClick={() => handleCopy(data.seoDescription, 'desc')} style={{ position: 'absolute', right: '12px', top: '12px', background: 'none', border: 'none', color: copiedSection === 'desc' ? '#10b981' : 'var(--text-muted)', cursor: 'pointer' }}>
                {copiedSection === 'desc' ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>
          </div>
        </section>
      </div>

      <aside style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <MessageCircle size={18} color="#25D366" /> WhatsApp Mesajı
          </h3>
          <div style={{ background: 'rgba(37, 211, 102, 0.05)', border: '1px solid rgba(37, 211, 102, 0.2)', borderRadius: '12px', padding: '16px' }}>
            <p style={{ fontSize: '14px', whiteSpace: 'pre-wrap', color: 'var(--text)', marginBottom: '16px' }}>
              {data.whatsappMessage}
            </p>
            <button onClick={() => handleCopy(data.whatsappMessage, 'wa')} style={{ width: '100%', background: '#25D366', color: 'white', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>
              {copiedSection === 'wa' ? <Check size={18} /> : <Copy size={18} />} Kopyala
            </button>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '12px' }}>💡 Profesyonel İpucu</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
            Bu mülk için en iyi sonuçları {data.location?.split(' ')[0]} bölgesindeki yatırımcı gruplarında paylaşarak alabilirsiniz.
          </p>
        </div>
      </aside>
    </div>
  );
};

export default VisualGenerator;

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Layout, Palette, Image as ImageIcon } from 'lucide-react';

const templates = [
  {
    id: 'modern',
    name: 'Modern Minimalist',
    description: 'Sade çizgiler ve fotoğraf odaklı modern bir görünüm.',
    preview: 'https://images.unsplash.com/photo-1600585154340-be6191dae10c?auto=format&fit=crop&q=80&w=400',
    tag: 'Popüler'
  },
  {
    id: 'luxury',
    name: 'Luxury Gold',
    description: 'Üst segment mülkler için prestijli ve zarif detaylar.',
    preview: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=400',
    tag: 'Premium'
  },
  {
    id: 'urban',
    name: 'Urban Tech',
    description: 'Şehir projeleri için dinamik ve teknolojik stil.',
    preview: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=400',
    tag: 'Yeni'
  },
  {
    id: 'rustic',
    name: 'Rustic Nature',
    description: 'Arsa ve villalar için doğayla uyumlu sıcak tonlar.',
    preview: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=400',
    tag: 'Doğa'
  }
];

const Templates: React.FC = () => {
  const [selected, setSelected] = React.useState('modern');

  return (
    <div className="templates-container">
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>İlan Şablonları</h1>
        <p style={{ color: 'var(--text-muted)' }}>İlanlarınızın hangi görsel stilde üretileceğini belirleyin.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
        {templates.map((tpl) => (
          <motion.div
            key={tpl.id}
            whileHover={{ y: -5 }}
            onClick={() => setSelected(tpl.id)}
            className="glass-card"
            style={{ 
              padding: '16px', 
              cursor: 'pointer',
              border: selected === tpl.id ? '2px solid var(--primary)' : '1px solid var(--border)',
              position: 'relative'
            }}
          >
            {selected === tpl.id && (
              <div style={{ 
                position: 'absolute', 
                top: '12px', 
                right: '12px', 
                background: 'var(--primary)', 
                borderRadius: '50%', 
                padding: '4px',
                zIndex: 10
              }}>
                <Check size={16} color="white" />
              </div>
            )}
            
            <div style={{ 
              height: '200px', 
              borderRadius: '12px', 
              overflow: 'hidden', 
              marginBottom: '16px',
              position: 'relative'
            }}>
              <img 
                src={tpl.preview} 
                alt={tpl.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
              <div style={{ 
                position: 'absolute', 
                bottom: '12px', 
                left: '12px', 
                background: 'rgba(0,0,0,0.6)', 
                backdropFilter: 'blur(4px)',
                padding: '4px 10px',
                borderRadius: '100px',
                fontSize: '11px',
                fontWeight: '600',
                color: 'white'
              }}>
                {tpl.tag}
              </div>
            </div>

            <h3 style={{ fontSize: '18px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              {tpl.id === 'luxury' ? <Star size={18} color="#fbbf24" fill="#fbbf24" /> : <Layout size={18} />}
              {tpl.name}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.5' }}>
              {tpl.description}
            </p>

            <button style={{ 
              marginTop: '20px', 
              width: '100%', 
              padding: '10px', 
              borderRadius: '8px', 
              border: '1px solid var(--border)',
              background: selected === tpl.id ? 'var(--primary)' : 'transparent',
              color: selected === tpl.id ? 'white' : 'var(--text)',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              {selected === tpl.id ? 'Seçili Şablon' : 'Şablonu Seç'}
            </button>
          </motion.div>
        ))}
      </div>

      <div className="glass-card" style={{ marginTop: '40px', padding: '32px', display: 'flex', alignItems: 'center', gap: '24px', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05))' }}>
        <div style={{ width: '64px', height: '64px', background: 'var(--glass)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Palette className="gradient-text" size={32} />
        </div>
        <div>
          <h3 style={{ fontSize: '20px', marginBottom: '4px' }}>Özel Şablon Tasarlatmak İster Misiniz?</h3>
          <p style={{ color: 'var(--text-muted)' }}>Kurumsal markanıza özel renk ve fontlarla şablon hazırlamak için bizimle iletişime geçin.</p>
        </div>
        <button style={{ marginLeft: 'auto', padding: '12px 24px', borderRadius: '100px', border: '1px solid var(--primary)', color: 'var(--primary)', fontWeight: '600', background: 'transparent' }}>
          Destek Talebi Aç
        </button>
      </div>
    </div>
  );
};

export default Templates;

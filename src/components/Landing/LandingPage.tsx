import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Camera, MessageCircle, BarChart3, ChevronRight, PlayCircle, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Landing.css';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-container">
      <nav className="navbar">
        <div className="nav-brand">
          <Sparkles className="gradient-text" />
          <span className="gradient-text">EstateFlow AI</span>
        </div>
        <div className="nav-links">
          <a href="#features" className="nav-link">Özellikler</a>
          <a href="#pricing" className="nav-link">Fiyatlandırma</a>
          <Link to="/login" className="nav-link">Giriş Yap</Link>
          <Link to="/signup" style={{ 
            background: 'white', 
            color: 'black', 
            padding: '8px 20px', 
            borderRadius: '100px', 
            textDecoration: 'none',
            fontWeight: '600'
          }}>
            Hemen Başla
          </Link>
        </div>
      </nav>

      <main>
        <section className="hero-section">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span style={{ 
              background: 'rgba(59, 130, 246, 0.1)', 
              color: 'var(--primary)', 
              padding: '8px 16px', 
              borderRadius: '100px', 
              fontSize: '14px', 
              fontWeight: '600',
              marginBottom: '24px',
              display: 'inline-block'
            }}>
              Emlakçılar İçin AI Devrimi
            </span>
            <h1 className="hero-title">
              İlanlarınızı <br />
              <span className="gradient-text">Saniyeler İçinde</span> Dönüştürün
            </h1>
            <p className="hero-subtitle">
              Fotoğraflarınızı analiz eder, premium sosyal medya paketleri oluşturur ve SEO uyumlu ilan metinlerinizi saniyeler içinde hazırlar.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <Link to="/signup" className="cta-button" style={{ textDecoration: 'none' }}>
                Ücretsiz Dene <ChevronRight style={{ verticalAlign: 'middle', marginLeft: '8px' }} />
              </Link>
              <button style={{ 
                background: 'transparent', 
                border: '1px solid var(--border)', 
                color: 'white', 
                padding: '18px 36px', 
                borderRadius: '100px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <PlayCircle /> Videoyu İzle
              </button>
            </div>
          </motion.div>
        </section>

        <section id="features" className="features-grid">
          <FeatureCard 
            icon={<Camera color="white" />}
            title="Premium Görseller"
            description="Mülk fotoğraflarınızı analiz edip Instagram, Facebook ve WhatsApp için en uygun formatta tasarlar."
          />
          <FeatureCard 
            icon={<MessageCircle color="white" />}
            title="SEO Metin Üretimi"
            description="Sahibinden, Hepsiemlak gibi platformlar için Google'da üst sıralara çıkaran açıklamalar yazar."
          />
          <FeatureCard 
            icon={<BarChart3 color="white" />}
            title="Sosyal Medya Paketi"
            description="Tek veri girişiyle Story, Post, Reels scripti ve WhatsApp broadcast mesajlarınızı hazırlar."
          />
        </section>

        <section style={{ padding: '80px 24px', textAlign: 'center', background: 'rgba(0,0,0,0.3)' }}>
          <h2 style={{ fontSize: '40px', marginBottom: '40px' }}>Güven ve Hız Bir Arada</h2>
          <div style={{ display: 'flex', gap: '48px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <ShieldCheck color="#10b981" />
              <span>Güvenli Veri Saklama</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Sparkles color="#8b5cf6" />
              <span>Gelişmiş AI Modelleri</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <PlayCircle color="#3b82f6" />
              <span>30 Saniyede Teslim</span>
            </div>
          </div>
        </section>
      </main>

      <footer style={{ padding: '60px 40px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
        <div>© 2026 EstateFlow AI. Tüm hakları saklıdır.</div>
        <div style={{ display: 'flex', gap: '24px' }}>
          <a href="#" className="nav-link">Kullanım Koşulları</a>
          <a href="#" className="nav-link">Gizlilik Politikası</a>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="feature-card">
    <div className="feature-icon">{icon}</div>
    <h3 style={{ fontSize: '20px', marginBottom: '16px' }}>{title}</h3>
    <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{description}</p>
  </div>
);

export default LandingPage;

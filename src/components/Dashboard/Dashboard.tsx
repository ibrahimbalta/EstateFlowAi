import { useState } from 'react';
import { 
  PlusCircle, 
  LayoutDashboard, 
  Settings, 
  LogOut, 
  Sparkles,
  Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { supabase } from '../../lib/supabase';
import { generateListingContent, generateImageURL } from '../../lib/ai';
import '../../App.css';

// Components
import ListingForm from './ListingForm';
import VisualGenerator from './VisualGenerator';
import Templates from './Templates';

type AppState = 'dashboard' | 'create' | 'result' | 'templates';

function Dashboard() {
  const [activeTab, setActiveTab] = useState<AppState>('create');
  const [listingData, setListingData] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleStartGeneration = async (formData: any) => {
    setIsGenerating(true);
    setError(null);
    
    try {
      // 1. Generate Text Content via Gemini
      const aiContent = await generateListingContent(formData);
      
      // 2. Generate Image URLs via Pollinations
      const postUrl = generateImageURL(aiContent.imagePrompt, 'post');
      const storyUrl = generateImageURL(aiContent.imagePrompt, 'story');

      const fullData = {
        ...formData,
        ...aiContent,
        postUrl,
        storyUrl
      };

      setListingData(fullData);
      
      // Artificial delay for premium feel
      setTimeout(() => {
        setIsGenerating(false);
        setActiveTab('result');
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#3b82f6', '#8b5cf6', '#ffffff']
        });
      }, 2000);

    } catch (err: any) {
      console.error(err);
      setError("Üretim sırasında bir hata oluştu. Lütfen API anahtarlarınızı kontrol edin.");
      setIsGenerating(false);
    }
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="logo">
          <Sparkles className="gradient-text" />
          <span className="gradient-text">EstateFlow AI</span>
        </div>

        <nav className="nav-links">
          <button 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard />
            Panel
          </button>
          <button 
            className={`nav-item ${activeTab === 'create' || activeTab === 'result' ? 'active' : ''}`}
            onClick={() => setActiveTab('create')}
          >
            <PlusCircle />
            Yeni İlan
          </button>
          <button 
            className={`nav-item ${activeTab === 'templates' ? 'active' : ''}`}
            onClick={() => setActiveTab('templates')}
          >
            <ImageIcon />
            Şablonlar
          </button>
          <button className="nav-item">
            <Settings />
            Ayarlar
          </button>
        </nav>

        <div style={{ marginTop: 'auto' }}>
          <button 
            onClick={handleLogout}
            className="nav-item" 
            style={{ width: '100%', border: 'none', background: 'none' }}
          >
            <LogOut />
            Çıkış Yap
          </button>
        </div>
      </aside>

      <main className="main-content">
        <AnimatePresence mode="wait">
          {isGenerating ? (
            <motion.div 
              key="generating"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="glass-card"
              style={{ padding: '60px', textAlign: 'center', maxWidth: '600px', margin: '100px auto' }}
            >
              <div className="loader-container">
                <motion.div 
                  animate={{ 
                    rotate: 360,
                    borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2,
                    ease: "linear"
                  }}
                  style={{ 
                    width: '80px', 
                    height: '80px', 
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                    margin: '0 auto 32px'
                  }}
                />
              </div>
              <h2 style={{ fontSize: '24px', marginBottom: '12px' }}>AI İlanınız Hazırlanıyor...</h2>
              <p style={{ color: 'var(--text-muted)' }}>
                Gemini AI metinleri yazıyor ve Pollinations görselleri işliyor.
              </p>
            </motion.div>
          ) : activeTab === 'create' ? (
            <motion.div
              key="create"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <header style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Yeni İlan Oluştur</h1>
                <p style={{ color: 'var(--text-muted)' }}>Mülk bilgilerini girin ve AI'ın sihrini yapmasına izin verin.</p>
              </header>
              {error && (
                <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '16px', borderRadius: '12px', marginBottom: '24px' }}>
                  {error}
                </div>
              )}
              <ListingForm onSubmit={handleStartGeneration} />
            </motion.div>
          ) : activeTab === 'result' ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <VisualGenerator data={listingData} onReset={() => setActiveTab('create')} />
            </motion.div>
          ) : activeTab === 'templates' ? (
            <motion.div
              key="templates"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Templates />
            </motion.div>
          ) : (
            <div key="dashboard">
              <h1 style={{ marginBottom: '24px' }}>Panel</h1>
              <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-muted)' }}>Henüz kaydedilmiş bir ilanınız yok.</p>
                <button 
                  onClick={() => setActiveTab('create')}
                  style={{ marginTop: '20px', padding: '12px 24px', borderRadius: '12px' }}
                  className="gradient-bg"
                >
                  İlk İlanını Oluştur
                </button>
              </div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default Dashboard;

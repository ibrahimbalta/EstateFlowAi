import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Lock, Globe, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const AuthPage: React.FC<{ mode: 'login' | 'signup' }> = ({ mode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert('Kayıt başarılı! Lütfen e-postanızı onaylayın.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/dashboard'
        }
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--background)', padding: '24px' }}>
      <div style={{ position: 'absolute', top: '40px', left: '40px' }}>
        <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeft size={18} /> Geri Dön
        </Link>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card" 
        style={{ width: '100%', maxWidth: '440px', padding: '48px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <div style={{ width: '48px', height: '48px', background: 'var(--primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles color="white" />
            </div>
          </div>
          <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>
            {mode === 'login' ? 'Tekrar Hoş Geldiniz' : 'Hesabınızı Oluşturun'}
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            {mode === 'login' ? 'Emlak ilanlarınızı yönetmeye başlayın.' : '30 saniyede profesyonel ilanlar üretin.'}
          </p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '12px', borderRadius: '8px', fontSize: '14px', marginBottom: '24px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>E-posta</label>
            <div style={{ position: 'relative' }}>
              <Mail style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
              <input 
                type="email" 
                required 
                placeholder="ornek@emlak.com"
                style={{ width: '100%', paddingLeft: '48px' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>Şifre</label>
            <div style={{ position: 'relative' }}>
              <Lock style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
              <input 
                type="password" 
                required 
                placeholder="••••••••"
                style={{ width: '100%', paddingLeft: '48px' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="gradient-bg" 
            style={{ padding: '14px', borderRadius: '12px', border: 'none', color: 'white', fontWeight: '600', fontSize: '16px', marginTop: '8px' }}
          >
            {loading ? 'Yükleniyor...' : (mode === 'login' ? 'Giriş Yap' : 'Kayıt Ol')}
          </button>
        </form>

        <div style={{ margin: '32px 0', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
          <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>veya</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
        </div>

        <button 
          onClick={handleGoogleLogin}
          style={{ width: '100%', background: 'white', color: 'black', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
        >
          <Globe size={20} /> Google ile Devam Et
        </button>

        <div style={{ textAlign: 'center', marginTop: '32px', fontSize: '14px', color: 'var(--text-muted)' }}>
          {mode === 'login' ? (
            <>Hesabınız yok mu? <Link to="/signup" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>Kayıt Ol</Link></>
          ) : (
            <>Zaten üye misiniz? <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>Giriş Yap</Link></>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;

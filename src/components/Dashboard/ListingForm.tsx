import React, { useState } from 'react';
import { Upload, MapPin, Tag, Maximize, FileText, ChevronRight } from 'lucide-react';

interface ListingFormProps {
  onSubmit: (data: any) => void;
}

const ListingForm: React.FC<ListingFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    type: 'apartment',
    location: '',
    price: '',
    size: '',
    status: 'sale',
    description: '',
    features: ''
  });
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({...formData, image: preview});
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="input-group">
          <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '14px' }}>Mülk Tipi</label>
          <select 
            value={formData.type} 
            onChange={(e) => setFormData({...formData, type: e.target.value})}
            style={{ width: '100%' }}
          >
            <option value="apartment">Daire</option>
            <option value="land">Arsa / Arazi</option>
            <option value="villa">Villa</option>
            <option value="commercial">İş Yeri</option>
          </select>
        </div>

        <div className="input-group">
          <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '14px' }}>Durum</label>
          <select 
            value={formData.status} 
            onChange={(e) => setFormData({...formData, status: e.target.value})}
            style={{ width: '100%' }}
          >
            <option value="sale">Satılık</option>
            <option value="rent">Kiralık</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '14px' }}>
          <MapPin size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Lokasyon
        </label>
        <input 
          type="text" 
          placeholder="Örn: Aydın / Çine / Hacıpaşalar" 
          style={{ width: '100%' }}
          value={formData.location}
          onChange={(e) => setFormData({...formData, location: e.target.value})}
          required
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="input-group">
          <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '14px' }}>
            <Tag size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Fiyat
          </label>
          <input 
            type="text" 
            placeholder="Örn: 2.500.000 TL" 
            style={{ width: '100%' }}
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            required
          />
        </div>

        <div className="input-group">
          <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '14px' }}>
            <Maximize size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> m²
          </label>
          <input 
            type="text" 
            placeholder="Örn: 30.656" 
            style={{ width: '100%' }}
            value={formData.size}
            onChange={(e) => setFormData({...formData, size: e.target.value})}
            required
          />
        </div>
      </div>

      <div className="input-group">
        <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '14px' }}>
          <FileText size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Ek Özellikler
        </label>
        <textarea 
          placeholder="Manzaralı, krediye uygun, ada/parsel bilgisi vb." 
          style={{ width: '100%', minHeight: '100px', resize: 'vertical' }}
          value={formData.features}
          onChange={(e) => setFormData({...formData, features: e.target.value})}
        />
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        style={{ display: 'none' }} 
      />

      <div 
        className="upload-section" 
        onClick={() => fileInputRef.current?.click()}
        style={{ 
          border: '2px dashed var(--border)', 
          borderRadius: '16px', 
          padding: preview ? '10px' : '40px', 
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.01)',
          cursor: 'pointer',
          overflow: 'hidden',
          position: 'relative',
          minHeight: '160px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {preview ? (
          <img src={preview} alt="Preview" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '12px' }} />
        ) : (
          <>
            <Upload style={{ marginBottom: '12px', color: 'var(--primary)' }} />
            <h4 style={{ marginBottom: '4px' }}>Fotoğraf Yükle</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Sürükleyip bırakın veya seçmek için tıklayın</p>
          </>
        )}
      </div>

      <button 
        type="submit" 
        className="gradient-bg" 
        style={{ 
          padding: '16px', 
          borderRadius: '12px', 
          color: 'white', 
          border: 'none', 
          fontWeight: '600',
          fontSize: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          marginTop: '8px'
        }}
      >
        İlan Paketini Üret <ChevronRight size={20} />
      </button>
    </form>
  );
};

export default ListingForm;

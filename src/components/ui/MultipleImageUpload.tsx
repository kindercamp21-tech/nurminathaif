'use client';

import { useState } from 'react';

interface MultipleImageUploadProps {
  onUpload: (urls: string[]) => void;
  currentImages?: string[];
  folder?: string;
  label?: string;
  maxImages?: number;
}

export default function MultipleImageUpload({ 
  onUpload, 
  currentImages = [], 
  folder = 'general', 
  label = 'Upload Images',
  maxImages = 5 
}: MultipleImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState<string[]>(currentImages);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const formData = new FormData();
      files.forEach(file => formData.append('files', file));
      formData.append('folder', folder);

      const response = await fetch('/api/upload', {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      const newUrls = data.map((item: any) => item.url);
      const updatedPreviews = [...previews, ...newUrls].slice(0, maxImages);
      setPreviews(updatedPreviews);
      onUpload(updatedPreviews);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Gagal mengupload gambar');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const updated = previews.filter((_, i) => i !== index);
    setPreviews(updated);
    onUpload(updated);
  };

  return (
    <div>
      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
        {label}
      </label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          disabled={uploading || previews.length >= maxImages}
          style={{
            padding: '10px',
            borderRadius: '10px',
            border: '1.5px dashed #cbd5e1',
            background: '#f8fafc',
            cursor: uploading || previews.length >= maxImages ? 'not-allowed' : 'pointer',
            fontSize: '0.85rem',
          }}
        />
        {uploading && <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Uploading...</span>}
        {previews.length > 0 && (
          <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
            {previews.map((url, i) => (
              <div key={i} style={{ position: 'relative', width: '80px', height: '60px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                <img src={url} alt={`Gallery ${i+1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  style={{
                    position: 'absolute',
                    top: '2px',
                    right: '2px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'rgba(0,0,0,0.6)',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.7rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
          Max {maxImages} images
        </div>
      </div>
    </div>
  );
}

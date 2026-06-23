'use client';

import { useState } from 'react';

interface ImageUploadProps {
  onUpload: (url: string) => void;
  currentImage?: string;
  folder?: string;
  label?: string;
}

export default function ImageUpload({ onUpload, currentImage, folder = 'general', label = 'Upload Image' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || 'Upload failed');
      }

      const data = await response.json();
      setPreview(data.url);
      onUpload(data.url);
    } catch (error) {
      console.error('Upload error:', error);
      alert(`Gagal mengupload gambar: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setUploading(false);
    }
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
          onChange={handleFileChange}
          disabled={uploading}
          style={{
            padding: '10px',
            borderRadius: '10px',
            border: '1.5px dashed #cbd5e1',
            background: '#f8fafc',
            cursor: uploading ? 'not-allowed' : 'pointer',
            fontSize: '0.85rem',
          }}
        />
        {uploading && <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Uploading...</span>}
        {preview && (
          <div style={{ marginTop: '10px', borderRadius: '12px', overflow: 'hidden', maxHeight: '200px' }}>
            <img src={preview} alt="Preview" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
          </div>
        )}
      </div>
    </div>
  );
}

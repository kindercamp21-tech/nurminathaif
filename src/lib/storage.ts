import { supabase } from './supabase';

export async function uploadImage(file: File, folder: string = 'general') {
  console.log('Starting upload:', { fileName: file.name, fileSize: file.size, folder });
  
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  console.log('Uploading to path:', filePath);

  const { data, error } = await supabase.storage
    .from('images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error('Supabase upload error:', error);
    throw new Error(`Supabase error: ${error.message}`);
  }

  console.log('Upload successful:', data);

  const { data: { publicUrl } } = supabase.storage
    .from('images')
    .getPublicUrl(filePath);

  console.log('Public URL:', publicUrl);

  return { path: filePath, url: publicUrl };
}

export async function uploadMultipleImages(files: File[], folder: string = 'general') {
  const uploads = await Promise.all(
    files.map(file => uploadImage(file, folder))
  );
  return uploads;
}

export async function getImageUrl(path: string) {
  const { data } = supabase.storage
    .from('images')
    .getPublicUrl(path);

  return data.publicUrl;
}

export async function deleteImage(path: string) {
  const { error } = await supabase.storage
    .from('images')
    .remove([path]);

  if (error) throw error;
}

export async function deleteMultipleImages(paths: string[]) {
  const { error } = await supabase.storage
    .from('images')
    .remove(paths);

  if (error) throw error;
}

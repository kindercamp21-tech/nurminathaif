import { NextRequest, NextResponse } from 'next/server';
import { uploadImage, uploadMultipleImages } from '@/lib/storage';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'general';

    console.log('Upload request:', { fileName: file?.name, fileSize: file?.size, folder });

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const result = await uploadImage(file, folder);
    console.log('Upload result:', result);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed', details: String(error) }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();
    const folder = formData.get('folder') as string || 'general';

    const files: File[] = [];
    formData.forEach((value, key) => {
      if (key === 'files' && value instanceof File) {
        files.push(value);
      }
    });

    if (files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }

    const results = await uploadMultipleImages(files, folder);
    return NextResponse.json(results);
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed', details: String(error) }, { status: 500 });
  }
}

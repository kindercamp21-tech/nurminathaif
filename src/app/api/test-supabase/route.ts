import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Test Supabase connection
    const { data, error } = await supabase.storage.listBuckets();
    
    if (error) {
      return NextResponse.json({ 
        error: 'Supabase connection failed', 
        details: error.message 
      }, { status: 500 });
    }

    // Check if images bucket exists
    const imagesBucket = data?.find(b => b.name === 'images');
    
    return NextResponse.json({
      success: true,
      buckets: data,
      imagesBucketExists: !!imagesBucket,
      imagesBucketPublic: imagesBucket?.public
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Connection test failed', 
      details: String(error) 
    }, { status: 500 });
  }
}

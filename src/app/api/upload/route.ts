import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
    // Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hhjwixsqbaqpjhfmmyvu.supabase.co';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseKey) {
        return NextResponse.json({ success: false, message: 'Supabase Service Role Key missing in .env' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
        return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
    }

    if (file.size > 2 * 1024 * 1024) {
        return NextResponse.json({ success: false, message: 'File too large! Max allowed is 2MB.' }, { status: 400 });
    }

    if (!['image/jpeg', 'image/webp', 'image/jpg', 'image/png'].includes(file.type)) {
        return NextResponse.json({ success: false, message: 'Only .webp or .jpg formats allowed for SEO' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Format filename for SEO (lowercase, hyphenated)
    const sanitizedName = file.name.toLowerCase().replace(/[^a-z0-9.]/g, '-').replace(/-+/g, '-');
    const filename = `${Date.now()}-${sanitizedName}`;

    try {
        const { data: uploadData, error } = await supabase.storage
            .from('blog-images')
            .upload(filename, buffer, {
                contentType: file.type,
                cacheControl: '31536000',
                upsert: false
            });

        if (error) {
            console.error('Supabase upload error:', error);
            throw error;
        }

        const { data: { publicUrl } } = supabase.storage
            .from('blog-images')
            .getPublicUrl(filename);

        return NextResponse.json({ success: true, url: publicUrl });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ success: false, message: 'Upload failed: ' + (error as Error).message }, { status: 500 });
    }
}

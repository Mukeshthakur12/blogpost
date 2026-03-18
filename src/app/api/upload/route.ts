import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file = data.get('file') as unknown as File;
  if (!file) return NextResponse.json({ success: false, message: 'No file' }, { status: 400 });

  const bytes = Buffer.from(await file.arrayBuffer());
  const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
  const key = `uploads/${filename}`;

  const useS3 = !!(
    process.env.S3_BUCKET &&
    process.env.AWS_ACCESS_KEY_ID &&
    process.env.AWS_SECRET_ACCESS_KEY &&
    process.env.AWS_REGION
  );

  if (useS3) {
    try {
      const { S3Client, PutObjectCommand } = await import('@aws-sdk/client-s3');
      const s3 = new S3Client({ region: process.env.AWS_REGION });

      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.S3_BUCKET as string,
          Key: key,
          Body: bytes,
          ContentType: file.type || 'application/octet-stream',
          ACL: 'public-read',
        })
      );

      const publicUrl = process.env.S3_ENDPOINT
        ? `${process.env.S3_ENDPOINT.replace(/\/$/, '')}/${key}`
        : `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

      return NextResponse.json({ success: true, url: publicUrl });
    } catch (err) {
      console.error('S3 upload error, falling back to local write:', err);
      // fallthrough to local write
    }
  }

  // Fallback to local filesystem (safe for dev/local)
  const path = join(process.cwd(), 'public/uploads', filename);
  try {
    await writeFile(path, bytes);
    return NextResponse.json({ success: true, url: `/uploads/${filename}` });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ success: false, message: 'Upload failed' }, { status: 500 });
  }
}
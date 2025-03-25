
import { NextRequest } from 'next/server';
import { Readable } from 'stream';
import { createWriteStream, readFileSync } from 'fs';
import { mkdir, unlink } from 'fs/promises';


import path from 'path';
import Busboy from 'busboy';
import { cleanSubtitle } from '@/lib/utils';

export const config = {
  api: {
    bodyParser: false, 
  },
};

export async function POST(req: NextRequest) {
  try {
    const tempDir = path.join(process.cwd(), 'uploads');
    await mkdir(tempDir, { recursive: true });

    return new Promise<Response>((resolve, reject) => {
      if (!req.headers.get('content-type')?.startsWith('multipart/form-data')) {
        return reject(new Response(JSON.stringify({ error: 'Invalid Content-Type header' }), { status: 400 }));
      }

      const busboy = Busboy({ headers: Object.fromEntries(req.headers) });
      let filePath = '';

      busboy.on('file', (_fieldname, file, fileInfo) => {
        filePath = path.join(tempDir, fileInfo.filename);
        const writeStream = createWriteStream(filePath);
        file.pipe(writeStream);
      });

      busboy.on('finish', async () => {
        if (!filePath) {
          return resolve(new Response(JSON.stringify({ error: 'No file uploaded' }), { status: 400 }));
        }

        try {
          const subtitleContent = readFileSync(filePath, 'utf-8');
          console.log('Raw subtitle content:', subtitleContent);
        
          const cleanedSubtitle = cleanSubtitle(subtitleContent);

          await unlink(filePath); 

          return resolve(new Response(JSON.stringify({ cleanedSubtitle }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          }));
        } catch (error) {
          console.error('File processing error:', error);
          return reject(new Response(JSON.stringify({ error: 'File processing failed' }), { status: 500 }));
        }
      });

      const readable = Readable.fromWeb(req.body as any);
      readable.pipe(busboy);
    });
  } catch (error) {
    console.error('Error processing file:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}


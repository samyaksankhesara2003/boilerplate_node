import path from 'path';
import fs from 'fs/promises';
import os from 'os';
import { execFile } from 'child_process';
import { promisify } from 'util';
import { log } from '@repo/logger';

const execFileAsync = promisify(execFile);

/**
 * Converts each page of a PDF buffer into a PNG image buffer using pdftoppm.
 * Requires poppler-utils to be installed on the system (`pdftoppm` binary).
 * @param pdfBuffer - The raw PDF file buffer.
 * @param dpi - Render resolution in dots per inch (default: 150).
 * @returns Array of PNG image buffers, one per PDF page, in page order.
 */
export async function convertPdfToImages(pdfBuffer: Buffer, dpi: number = 150): Promise<Buffer[]> {
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'pdf-convert-'));
    const inputPath = path.join(tmpDir, 'input.pdf');
    const outputPrefix = path.join(tmpDir, 'page');

    try {
        await fs.writeFile(inputPath, pdfBuffer);

        await execFileAsync('pdftoppm', ['-png', '-r', String(dpi), inputPath, outputPrefix]);

        const allFiles = await fs.readdir(tmpDir);
        const pageFiles = allFiles
            .filter(f => f.startsWith('page') && f.endsWith('.png'))
            .sort((a, b) => {
                const numA = parseInt(a.replace('page-', '').replace('.png', ''), 10);
                const numB = parseInt(b.replace('page-', '').replace('.png', ''), 10);
                return numA - numB;
            });

        return await Promise.all(pageFiles.map(f => fs.readFile(path.join(tmpDir, f))));
    } catch (error) {
        log.error('convertPdfToImages Catch: ', error);
        throw error;
    } finally {
        await fs.rm(tmpDir, { recursive: true, force: true });
    }
}

// PDF Buffer
//     │
//     ▼
// Create Temp Folder
//     │
//     ▼
// Write input.pdf
//     │
//     ▼
// Run pdftoppm
//     │
//     ▼
// Generate
// page-1.png
// page-2.png
// page-3.png
//     │
//     ▼
// Read PNG files
//     │
//     ▼
// Return Array<Buffer>
//     │
//     ▼
// Delete Temp Folder

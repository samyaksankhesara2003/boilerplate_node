import fs from 'fs';
import path from 'path';

const templatesDir = path.join(__dirname, 'templates');

export function listAvailableTemplates(): string[] {
    return fs
        .readdirSync(templatesDir)
        .filter(file => file.endsWith('.ejs') && !file.startsWith('layouts/'))
        .map(file => file.replace('.ejs', ''));
};

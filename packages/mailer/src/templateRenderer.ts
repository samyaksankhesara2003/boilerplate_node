import ejs from 'ejs';
import path from 'path';
import fs from 'fs/promises';

export async function renderTemplate(templateName: string, context: any): Promise<string> {
  const templatesDir = path.join(__dirname, 'templates');
  const templatePath = path.join(templatesDir, `${templateName}.ejs`);
  const layoutPath = path.join(templatesDir, 'layouts', 'base.ejs');

  const [templateContent, layoutContent] = await Promise.all([
    fs.readFile(templatePath, 'utf-8'),
    fs.readFile(layoutPath, 'utf-8'),
  ]);

  const bodyHtml = ejs.render(templateContent, context, { async: false });

  return ejs.render(layoutContent, { ...context, body: bodyHtml }, { async: false });
};

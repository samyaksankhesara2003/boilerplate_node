import ejs from 'ejs';
import path from 'path';
import fs from 'fs/promises';
import { appConfig } from '@repo/config';

export async function renderTemplate(templateName: string, context: any): Promise<string> {
  const templatesDir = path.join(__dirname, 'templates');
  const templatePath = path.join(templatesDir, `${templateName}.ejs`);
  const layoutPath = path.join(templatesDir, 'layouts', 'base.ejs');

  const [templateContent, layoutContent] = await Promise.all([
    fs.readFile(templatePath, 'utf-8'),
    fs.readFile(layoutPath, 'utf-8'),
  ]);

  const fullContext = {
    ...context,
    appName: appConfig.appName,
  };

  const ejsOptions = {
    async: false,
    filename: templatePath,
    views: [templatesDir],
  };

  const bodyHtml = ejs.render(templateContent, fullContext, ejsOptions);
  return ejs.render(layoutContent, { ...fullContext, body: bodyHtml }, {
    ...ejsOptions,
    filename: layoutPath,
  });
};

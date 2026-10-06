import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

app.post('/api/upload-photo2', express.raw({ type: '*/*', limit: '15mb' }), (req, res) => {
  try {
    fs.writeFileSync(join(__dirname, 'assets/img/photo2.jpg'), req.body);
    fs.writeFileSync(join(__dirname, 'assets/img/paulo2.jpg'), req.body);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/assets/img/paulo2.jpg', (req, res, next) => {
  const photo2Src = join(__dirname, 'src/assets/images/photo2.jpg');
  const target = join(__dirname, 'assets/img/paulo2.jpg');
  if (fs.existsSync(photo2Src)) {
    try {
      const srcStats = fs.statSync(photo2Src);
      const targetStats = fs.existsSync(target) ? fs.statSync(target) : null;
      if (!targetStats || srcStats.mtimeMs > targetStats.mtimeMs) {
        fs.copyFileSync(photo2Src, target);
      }
    } catch (_) {}
  }
  next();
});

app.use(express.static(__dirname));

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});

import fs from 'fs';
import path from 'path';

const dir = 'src/pages/DataInsights';
const files = fs.readdirSync(dir).map(file => path.join(dir, file));

files.forEach(file => {
  if (fs.existsSync(file) && file.endsWith('.tsx')) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    content = content.replace(/#111111/g, '#242424');
    if (content !== original) {
      fs.writeFileSync(file, content);
      console.log(`Updated ${file}`);
    }
  }
});

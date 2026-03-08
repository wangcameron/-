import fs from 'fs';
import path from 'path';

const dirs = ['src/pages/SmartCreation', 'src/pages/AssetCenter', 'src/pages/Creative/components'];

const replacements = [
  { from: /rounded-md/g, to: 'rounded-[8px]' },
  { from: /rounded-sm/g, to: 'rounded-[4px]' },
  { from: /text-gray-800/g, to: 'text-[#242424]' },
  { from: /text-gray-700/g, to: 'text-[#444444]' },
  { from: /bg-gray-200/g, to: 'bg-[#E5E5E5]' },
  { from: /bg-gray-800/g, to: 'bg-[#242424]' },
  { from: /bg-gray-900/g, to: 'bg-[#111111]' },
];

dirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir).map(file => path.join(dir, file));
    files.forEach(file => {
      if (fs.existsSync(file) && file.endsWith('.tsx')) {
        let content = fs.readFileSync(file, 'utf8');
        let original = content;
        replacements.forEach(({ from, to }) => {
          content = content.replace(from, to);
        });
        if (content !== original) {
          fs.writeFileSync(file, content);
          console.log(`Updated ${file}`);
        }
      }
    });
  }
});

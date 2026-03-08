import fs from 'fs';
import path from 'path';

const dir = 'src/pages/SmartCreation';
const files = fs.readdirSync(dir).map(file => path.join(dir, file));

const replacements = [
  { from: /rounded-xl/g, to: 'rounded-[16px]' },
  { from: /rounded-2xl/g, to: 'rounded-[24px]' },
  { from: /rounded-lg/g, to: 'rounded-[12px]' },
  { from: /text-sm/g, to: 'text-[14px]' },
  { from: /text-xs/g, to: 'text-[12px]' },
  { from: /text-base/g, to: 'text-[16px]' },
  { from: /text-lg/g, to: 'text-[18px]' },
  { from: /text-xl/g, to: 'text-[20px]' },
  { from: /text-2xl/g, to: 'text-[24px]' },
  { from: /text-3xl/g, to: 'text-[28px]' },
  { from: /font-bold/g, to: 'font-medium' },
  { from: /bg-\[#111111\]/g, to: 'bg-[#242424]' },
  { from: /text-\[#111111\]/g, to: 'text-[#242424]' },
  { from: /border-\[#111111\]/g, to: 'border-[#242424]' },
  { from: /ring-\[#111111\]/g, to: 'ring-[#242424]' },
];

files.forEach(file => {
  if (fs.existsSync(file) && file.endsWith('.tsx')) {
    let content = fs.readFileSync(file, 'utf8');
    replacements.forEach(({ from, to }) => {
      content = content.replace(from, to);
    });
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});

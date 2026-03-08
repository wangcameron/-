import fs from 'fs';
import path from 'path';

const dir = 'src/pages/DataInsights';
const files = fs.readdirSync(dir).map(file => path.join(dir, file));

const replacements = [
  { from: /rounded-xl/g, to: 'rounded-[16px]' },
  { from: /rounded-2xl/g, to: 'rounded-[24px]' },
  { from: /rounded-lg/g, to: 'rounded-[12px]' },
  { from: /rounded-md/g, to: 'rounded-[8px]' },
  { from: /rounded-sm/g, to: 'rounded-[4px]' },
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
  { from: /text-gray-900/g, to: 'text-[#242424]' },
  { from: /text-gray-800/g, to: 'text-[#242424]' },
  { from: /text-gray-700/g, to: 'text-[#444444]' },
  { from: /text-gray-600/g, to: 'text-[#6B6B6B]' },
  { from: /text-gray-500/g, to: 'text-[#6B6B6B]' },
  { from: /text-gray-400/g, to: 'text-[#6B6B6B]' },
  { from: /bg-gray-50/g, to: 'bg-[#FBFBFA]' },
  { from: /bg-gray-100/g, to: 'bg-[#F5F5F4]' },
  { from: /bg-gray-200/g, to: 'bg-[#E5E5E5]' },
  { from: /bg-gray-800/g, to: 'bg-[#242424]' },
  { from: /bg-gray-900/g, to: 'bg-[#111111]' },
  { from: /border-gray-200/g, to: 'border-[#E5E5E5]' },
  { from: /border-gray-100/g, to: 'border-[#E5E5E5]' },
  { from: /border-gray-300/g, to: 'border-[#E5E5E5]' },
];

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

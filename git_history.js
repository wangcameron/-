const { execSync } = require('child_process');
const output = execSync('git show HEAD~1:src/pages/DataInsights/SmartDailyReport.tsx').toString();
console.log(output);

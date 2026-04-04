const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// The domain we want to replace
const OLD_DOMAIN = 'ssk.com.sa';
const TARGET_DOMAIN = process.argv[2] || 'ssk.com.sa';

console.log("[SSK Admin Tools] Commencing Domain Sweep: " + OLD_DOMAIN + " -> " + TARGET_DOMAIN);

const searchDirs = [
  path.join(__dirname, 'src'),
  path.join(__dirname, 'public'),
];

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(filePath));
    } else {
      // Only process text-like files
      if (['.ts', '.tsx', '.js', '.jsx', '.json', '.md', '.css'].find(ext => file.endsWith(ext))) {
         results.push(filePath);
      }
    }
  });
  return results;
}

let modifiedCount = 0;

searchDirs.forEach(dir => {
  const files = walkDir(dir);
  files.forEach(file => {
    const originalContent = fs.readFileSync(file, 'utf-8');
    
    // Replace domain explicitly including email suffixes and exact text
    const regex = new RegExp(OLD_DOMAIN, 'g');
    if (regex.test(originalContent)) {
      const newContent = originalContent.replace(regex, TARGET_DOMAIN);
      fs.writeFileSync(file, newContent, 'utf-8');
      console.log("  - Updated: " + file.replace(__dirname, ''));
      modifiedCount++;
    }
  });
});

console.log("\\n[SSK Admin Tools] Sweep Complete. Modified " + modifiedCount + " files.");
console.log("All emails (e.g. admin@" + TARGET_DOMAIN + ") and absolute links have been correctly aligned.");

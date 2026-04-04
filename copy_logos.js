const fs = require('fs');

try {
  const sahlPath = '/Users/fahadalotaibi/.gemini/antigravity/brain/0ed1056d-6ac3-41d7-92e6-e76a326e971d/media__1775229322444.png';
  const infraonPath = '/Users/fahadalotaibi/.gemini/antigravity/brain/0ed1056d-6ac3-41d7-92e6-e76a326e971d/media__1775229668606.png';
  
  fs.copyFileSync(sahlPath, './public/images/logos/sahl-logo.png');
  console.log("Copied Sahl successfully");
  
  fs.copyFileSync(infraonPath, './public/images/logos/infraon-logo.png');
  console.log("Copied Infraon successfully");
} catch(e) {
  console.log("Node copy failed:", e.message);
}

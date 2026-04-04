const fs = require('fs');
const sharp = require('sharp');

async function createBanner() {
  const width = 1584;
  const height = 396;

  let logoPaths = "<defs>";
  logoPaths += "<mask id='cutMask'>";
  logoPaths += "<rect width='400' height='200' fill='white' />";
  logoPaths += "<path d='M -50 150 Q 150 160 400 80 L 400 95 Q 150 180 -50 170 Z' fill='black' />";
  logoPaths += "</mask>";
  logoPaths += "<pattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'>";
  logoPaths += "<path d='M 40 0 L 0 0 0 40' fill='none' stroke='#162133' stroke-width='1'/>";
  logoPaths += "</pattern>";
  logoPaths += "</defs>";
  logoPaths += "<rect width='1584' height='396' fill='#0E1522' />";
  logoPaths += "<rect width='1584' height='396' fill='url(#grid)' />";
  logoPaths += "<path d='M0 396 L 600 0 L 610 0 L 20 396 Z' fill='#1d9cf0' opacity='0.05' />";
  logoPaths += "<path d='M800 396 L 1584 100 L 1584 120 L 850 396 Z' fill='#1d9cf0' opacity='0.05' />";
  logoPaths += "<g transform='translate(100, 100) scale(1.1)'>";
  logoPaths += "<g fill='#FFFFFF' mask='url(#cutMask)'><g transform='scale(1.2, 1.0)'>";
  logoPaths += "<path d='M50.40 177.12L50.40 177.12Q33.48 177.12 19.17 173.52Q4.86 169.92-4.14 164.34L-4.14 164.34L12.24 133.02Q22.86 139.14 33.57 141.93Q44.28 144.72 54.72 144.72L54.72 144.72Q63 144.72 67.23 142.74Q71.46 140.76 71.46 137.34L71.46 137.34Q71.46 133.92 67.14 132.03Q62.82 130.14 55.98 128.52Q49.14 126.90 41.49 124.65Q33.84 122.40 27 118.71Q20.16 115.02 15.84 108.72Q11.52 102.42 11.52 92.70L11.52 92.70Q11.52 78.30 19.17 67.68Q26.82 57.06 41.13 51.21Q55.44 45.36 75.24 45.36L75.24 45.36Q89.28 45.36 101.43 48.15Q113.58 50.94 122.40 56.16L122.40 56.16L107.10 87.12Q99.54 82.44 90.63 80.10Q81.72 77.76 72.54 77.76L72.54 77.76Q63.18 77.76 58.59 80.37Q54 82.98 54 86.22L54 86.22Q54 89.64 58.32 91.62Q62.64 93.60 69.48 95.13Q76.32 96.66 84.06 98.82Q91.80 100.98 98.64 104.58Q105.48 108.18 109.80 114.30Q114.12 120.42 114.12 130.14L114.12 130.14Q114.12 144.18 106.38 154.71Q98.64 165.24 84.33 171.18Q70.02 177.12 50.40 177.12Z' />";
  logoPaths += "<path d='M145.40 177.12L145.40 177.12Q128.48 177.12 114.17 173.52Q99.86 169.92 90.86 164.34L90.86 164.34L107.24 133.02Q117.86 139.14 128.57 141.93Q139.28 144.72 149.72 144.72L149.72 144.72Q158 144.72 162.23 142.74Q166.46 140.76 166.46 137.34L166.46 137.34Q166.46 133.92 162.14 132.03Q157.82 130.14 150.98 128.52Q144.14 126.90 136.49 124.65Q128.84 122.40 122 118.71Q115.16 115.02 110.84 108.72Q106.52 102.42 106.52 92.70L106.52 92.70Q106.52 78.30 114.17 67.68Q121.82 57.06 136.13 51.21Q150.44 45.36 170.24 45.36L170.24 45.36Q184.28 45.36 196.43 48.15Q208.58 50.94 217.40 56.16L217.40 56.16L202.10 87.12Q194.54 82.44 185.63 80.10Q176.72 77.76 167.54 77.76L167.54 77.76Q158.18 77.76 153.59 80.37Q149 82.98 149 86.22L149 86.22Q149 89.64 153.32 91.62Q157.64 93.60 164.48 95.13Q171.32 96.66 179.06 98.82Q186.80 100.98 193.64 104.58Q200.48 108.18 204.80 114.30Q209.12 120.42 209.12 130.14L209.12 130.14Q209.12 144.18 201.38 154.71Q193.64 165.24 179.33 171.18Q165.02 177.12 145.40 177.12Z' />";
  logoPaths += "<path d='M237.12 174.24L195.36 174.24L220.56 48.24L262.32 48.24L253.32 92.88L301.20 48.24L349.98 48.24L286.80 105.66L327.84 174.24L280.50 174.24L254.94 133.20L243.06 144.18L237.12 174.24Z' />";
  logoPaths += "</g></g>";
  logoPaths += "<path d='M -20 150 Q 200 160 500 80 L 500 90 Q 200 175 -20 165 Z' fill='#1d9cf0' opacity='0.8' />";
  logoPaths += "</g>";
  logoPaths += "<g transform='translate(680, 180)'>";
  logoPaths += "<text x='0' y='0' font-family='Arial, sans-serif' font-weight='900' font-size='72' fill='#FFFFFF' letter-spacing='4'>CONSULTING</text>";
  logoPaths += "<text x='5' y='45' font-family='Arial, sans-serif' font-weight='300' font-size='24' fill='#1d9cf0' letter-spacing='2'>EMPOWERING SOVEREIGN INTELLIGENCE</text>";
  logoPaths += "<text x='5' y='80' font-family='Arial, sans-serif' font-weight='300' font-size='18' fill='#8892b0' letter-spacing='1'>EXECUTING DIGITAL MATURITY | ENTERPRISE STRATEGY</text>";
  logoPaths += "<line x1='5' y1='-75' x2='105' y2='-75' stroke='#1d9cf0' stroke-width='4' />";
  logoPaths += "</g>";

  const svgStr = "<svg width='1584' height='396' xmlns='http://www.w3.org/2000/svg'>" + logoPaths + "</svg>";

  const outPath = './public/SSK_Ultimate_Banner.png';
  
  await sharp(Buffer.from(svgStr))
    .png()
    .toFile(outPath);
  
  console.log("Vector Graphic rendered accurately to: ", outPath);
}

createBanner();

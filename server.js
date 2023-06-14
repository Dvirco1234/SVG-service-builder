const fs = require('fs');
const path = require('path')

const svgFolderPath = './src/assets/svg/';
const outputFile = './src/services/svgData.js';

const svgFiles = fs.readdirSync(svgFolderPath);
console.log('svgFiles: ', svgFiles);


function generateSvgData() {
    const svgData = {};
  
    // Object.keys(svgs).forEach((iconName) => {
    //   svgData[iconName] = svgs[iconName];
    // });

    svgFiles.forEach((fileName) => {
        if (path.extname(fileName).toLowerCase() === '.svg') {
          const svgContent = fs.readFileSync(path.join(svgFolderPath, fileName), 'utf8');
          const svgName = path.basename(fileName, '.svg');
          svgData[svgName] = svgContent;
        }
      });
  
    // const outputFile = path.join(__dirname, 'src', 'services', 'svgData.js');
    const fileContent = `const svgData = ${JSON.stringify(svgData, null, 2)};\n\nexport default svgData;\n`;
  
    fs.writeFileSync(outputFile, fileContent);
  
    console.log('SVG data generated successfully.');
  }
  
//   generateSvgData();
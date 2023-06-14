const fs = require('fs');
const path = require('path')

const svgFolderPath = './svgs';
const outputFile = './output/svg-service.js';

const svgFiles = fs.readdirSync(svgFolderPath);
console.log('svgFiles: ', svgFiles);

const svgData = {};
svgFiles.forEach((fileName) => {
    if (path.extname(fileName).toLowerCase() === '.svg') {
        const svgContent = fs.readFileSync(path.join(svgFolderPath, fileName), 'utf8');
        const svgName = path.basename(fileName, '.svg');
        console.log('svgName: ', svgName);
        svgData[svgName] = svgContent;
    }
  });
//   console.log('svgData: ', svgData);

// Only the SVGs object
// const fileContent = `const svgs = ${JSON.stringify(svgData, null, 2)}\n\nexport default svgs\n`

// With get SVG function
const fileContent = `const svgs = ${JSON.stringify(svgData, null, 2)}\n\nfunction getSvg(iconName) {\n  return svgs[iconName]\n}\n\nexport const svgService = {\n  getSvg\n}\n`
  
fs.writeFileSync(outputFile, fileContent);


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
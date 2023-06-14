const fs = require('fs')
const path = require('path')

generateSvgData()

function generateSvgData() {
    const svgFolderPath = './svgs'
    const outputFile = './output/svg-service.js'

    const svgFiles = fs.readdirSync(svgFolderPath)

    const svgData = {}
    svgFiles.forEach(fileName => {
        if (path.extname(fileName).toLowerCase() === '.svg') {
            const svgContent = fs.readFileSync(path.join(svgFolderPath, fileName), 'utf8')
            const svgName = path.basename(fileName, '.svg')
            console.log('svgName: ', svgName)
            svgData[svgName] = svgContent
        }
    })

    // Only the SVGs object
    // const fileContent = `const svgs = ${JSON.stringify(svgData, null, 2)}\n\nexport default svgs\n`

    // With get SVG function
    const fileContent = `const svgs = ${JSON.stringify(
        svgData,
        null,
        2
    )}\n\nfunction getSvg(iconName) {\n  return svgs[iconName]\n}\n\nexport const svgService = {\n  getSvg\n}\n`

    fs.writeFileSync(outputFile, fileContent)
}

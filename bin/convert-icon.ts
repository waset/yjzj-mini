import { promises as fs } from 'node:fs'
import { importDirectory } from '@iconify/tools/lib/import/directory'
import { cleanupSVG } from '@iconify/tools/lib/svg/cleanup'
import { runSVGO } from '@iconify/tools/lib/optimise/svgo'
import { isEmptyColor, parseColors } from '@iconify/tools/lib/colors/parse'

// 图片目录
export const iconPath = 'src/static'
// 图片文件夹
export const iconDir = 'icon'
// 输出目录
export const outDir = 'runtime'

export async function Convert(path: string = iconPath, dir: string = iconDir, out: string = outDir) {
  // Import icons
  const iconSet = await importDirectory(path, {
    prefix: dir,
  })

  // Validate, clean up, fix palette and optimise
  await iconSet.forEach(async (name, type) => {
    if (type !== 'icon')
      return

    const svg = iconSet.toSVG(name)
    if (!svg) {
      // Invalid icon
      iconSet.remove(name)
      return
    }

    // Clean up and optimise icons
    try {
      await cleanupSVG(svg)
      await parseColors(svg, {
        defaultColor: 'currentColor',
        callback: (attr, colorStr, color) => {
          return !color || isEmptyColor(color)
            ? colorStr
            : 'currentColor'
        },
      })
      await runSVGO(svg)
    }
    catch (err) {
      // Invalid icon
      console.error(`Error parsing ${name}:`, err)
      iconSet.remove(name)
      return
    }

    // Update icon
    iconSet.fromSVG(name, svg)
  })

  // Export as IconifyJSON
  const exported = `${JSON.stringify(iconSet.export(), null, '\t')}\n`

  // Save to file
  await fs.writeFile(`${out}/${iconSet.prefix}.json`, exported, 'utf8')

  // eslint-disable-next-line no-console
  console.log(`\x1B[32m Imported \x1B[0m\x1B[3m\x1B[31m${Object.keys(iconSet.entries).length}\x1B[0m\x1B[0m\x1B[32m icons \x1B[0m`)
}

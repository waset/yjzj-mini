import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { cwd } from 'node:process'
import { join } from 'node:path'
import { importDirectory } from '@iconify/tools/lib/import/directory'
import { cleanupSVG } from '@iconify/tools/lib/svg/cleanup'
import { runSVGO } from '@iconify/tools/lib/optimise/svgo'
import { isEmptyColor, parseColors } from '@iconify/tools/lib/colors/parse'
import type { Plugin } from 'vite'

//  @see https://github.com/iconify/tools

// 图片目录
export const iconPath = 'src/static'
// 图片文件夹
export const iconDir = 'icon'
// 输出目录
export const outDir = 'temp/icons/'

export async function Generated(path = iconPath, prefix = iconDir, out = outDir, noColor = true) {
  // Import icons
  const iconSet = await importDirectory(path, {
    prefix,
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
      cleanupSVG(svg)
      noColor && parseColors(svg, {
        defaultColor: 'currentColor',
        callback: (attr, colorStr, color) => {
          return !color || isEmptyColor(color)
            ? colorStr
            : 'currentColor'
        },
      })
      runSVGO(svg)
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

  // Check output directory

  // 构建 manifest 文件路径
  const srcDir = join(cwd(), out)

  if (!existsSync(srcDir))
    mkdirSync(srcDir)
    // Save to file
  writeFileSync(`${out}/${iconSet.prefix}.json`, exported, 'utf8')

  // eslint-disable-next-line no-console
  console.log(`\x1B[32m Imported icons: \x1B[0m \x1B[31m ${Object.keys(iconSet.entries).length} \x1B[0m`)
}

// vite 转换插件
export function Convert(path = iconPath, prefix = iconDir, out = outDir, noColor = true): Plugin {
  return {
    name: 'convert-icon',
    buildStart: async () => {
      await Generated(path, prefix, out, noColor)
    },
  }
}

type Awaitable<T> = T | PromiseLike<T>
type CustomIconLoader = (name: string) => Awaitable<string | undefined>

/**
 * 图标加载器
 * @param dir 加载目录
 */
export function IconDirLoader(dir = outDir): Record<string, CustomIconLoader> {
  const icons: Record<string, CustomIconLoader> = {}
  // 构建 manifest 文件路径
  const srcDir = join(cwd(), dir)

  if (!existsSync(srcDir)) {
    console.error(`\x1B[31m IconDirLoader: ${srcDir} not exists! \x1B[0m`)
    return icons
  }

  const files = readdirSync(srcDir).filter(file => file.endsWith('.json'))

  files.forEach((file) => {
    const name = file.replace('.json', '')
    icons[name] = () => JSON.parse(readFileSync(`${dir}/${file}`, 'utf-8'))
  })

  return icons
}

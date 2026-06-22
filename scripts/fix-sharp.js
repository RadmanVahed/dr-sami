import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'

function removeLegacyIpxSharp(baseDir) {
  const nestedSharp = join(baseDir, 'ipx', 'node_modules', 'sharp')
  const pkgPath = join(nestedSharp, 'package.json')

  if (!existsSync(pkgPath)) {
    return
  }

  const { version } = JSON.parse(readFileSync(pkgPath, 'utf8'))

  if (version.startsWith('0.32')) {
    rmSync(nestedSharp, { recursive: true, force: true })
    console.log(`Removed incompatible ipx/sharp@${version} from ${baseDir}`)
  }
}

function syncSharpPlatformPackages(targetDir, sourceDir) {
  const sourceImg = join(sourceDir, '@img')
  const targetImg = join(targetDir, '@img')

  if (!existsSync(sourceImg)) {
    return
  }

  mkdirSync(targetImg, { recursive: true })

  for (const pkg of readdirSync(sourceImg)) {
    if (!pkg.startsWith('sharp')) {
      continue
    }

    const targetPkg = join(targetImg, pkg)
    rmSync(targetPkg, { recursive: true, force: true })
    cpSync(join(sourceImg, pkg), targetPkg, { recursive: true })
  }
}

function replaceLegacySharp(targetDir, sourceDir) {
  const sharpDir = join(targetDir, 'sharp')
  const pkgPath = join(sharpDir, 'package.json')

  if (!existsSync(pkgPath)) {
    return
  }

  const { version } = JSON.parse(readFileSync(pkgPath, 'utf8'))

  if (!version.startsWith('0.32')) {
    return
  }

  rmSync(sharpDir, { recursive: true, force: true })
  cpSync(join(sourceDir, 'sharp'), sharpDir, { recursive: true })
  syncSharpPlatformPackages(targetDir, sourceDir)
  console.log(`Replaced sharp@${version} with root sharp in ${targetDir}`)
}

const rootModules = join('node_modules')

removeLegacyIpxSharp(rootModules)

if (process.argv.includes('--output')) {
  const outputModules = join('.output', 'server', 'node_modules')

  if (existsSync(outputModules)) {
    removeLegacyIpxSharp(outputModules)
    replaceLegacySharp(outputModules, rootModules)
  }
}

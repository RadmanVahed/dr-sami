import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const PREBUILT_LINUX_PACKAGES = [
  'sharp-linux-x64',
  'sharp-linuxmusl-x64',
  'sharp-libvips-linux-x64',
  'sharp-libvips-linuxmusl-x64'
]

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

function getRuntimePlatform() {
  const os = process.platform === 'darwin'
    ? 'darwin'
    : process.platform === 'win32'
      ? 'win32'
      : 'linux'

  return `${os}-${process.arch}`
}

function removeIncompatiblePrebuiltSharp(imgDir) {
  if (!existsSync(imgDir)) {
    return
  }

  for (const pkg of PREBUILT_LINUX_PACKAGES) {
    const pkgPath = join(imgDir, pkg)

    if (existsSync(pkgPath)) {
      rmSync(pkgPath, { recursive: true, force: true })
      console.log(`Removed prebuilt @img/${pkg} (requires x86-64-v2)`)
    }
  }
}

function syncSourceBuiltSharp(outputModules, rootModules) {
  const runtimePlatform = getRuntimePlatform()
  const sourceBuilt = join(rootModules, 'sharp', 'src', 'build', 'Release', `sharp-${runtimePlatform}.node`)

  if (!existsSync(sourceBuilt)) {
    console.log(`No source-built sharp binary at ${sourceBuilt}`)
    return false
  }

  const targetDir = join(outputModules, 'sharp', 'src', 'build', 'Release')
  mkdirSync(targetDir, { recursive: true })
  cpSync(sourceBuilt, join(targetDir, `sharp-${runtimePlatform}.node`))
  console.log(`Synced source-built sharp-${runtimePlatform}.node to output`)
  return true
}

function copyIfMissing(outputModules, rootModules, relativePath) {
  const source = join(rootModules, ...relativePath.split('/'))
  const target = join(outputModules, ...relativePath.split('/'))

  if (!existsSync(source) || existsSync(target)) {
    return false
  }

  mkdirSync(join(target, '..'), { recursive: true })
  cpSync(source, target, { recursive: true })
  return true
}

function ensureWasm32Fallback(outputModules, rootModules) {
  const copiedWasm = copyIfMissing(outputModules, rootModules, '@img/sharp-wasm32')
  const copiedEmnapi = copyIfMissing(outputModules, rootModules, '@emnapi/runtime')

  if (copiedWasm) {
    console.log('Added @img/sharp-wasm32 fallback to output')
  }

  if (copiedEmnapi) {
    console.log('Added @emnapi/runtime for sharp-wasm32 fallback')
  }
}

function fixOutputSharp(outputModules, rootModules) {
  removeLegacyIpxSharp(outputModules)
  replaceLegacySharp(outputModules, rootModules)
  removeIncompatiblePrebuiltSharp(join(outputModules, '@img'))

  const hasSourceBuild = syncSourceBuiltSharp(outputModules, rootModules)
  ensureWasm32Fallback(outputModules, rootModules)

  if (!hasSourceBuild) {
    console.log('Using @img/sharp-wasm32 fallback for CPUs without x86-64-v2 support')
  }
}

const rootModules = join('node_modules')

removeLegacyIpxSharp(rootModules)

if (process.argv.includes('--output')) {
  const outputModules = join('.output', 'server', 'node_modules')

  if (existsSync(outputModules)) {
    fixOutputSharp(outputModules, rootModules)
  }
}

import { existsSync, readFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const nestedSharp = join('node_modules', 'ipx', 'node_modules', 'sharp')
const pkgPath = join(nestedSharp, 'package.json')

if (!existsSync(pkgPath)) {
  process.exit(0)
}

const { version } = JSON.parse(readFileSync(pkgPath, 'utf8'))

if (version.startsWith('0.32')) {
  rmSync(nestedSharp, { recursive: true, force: true })
  console.log(`Removed incompatible ipx/sharp@${version}; using root sharp instead`)
}

import { addAlias } from 'module-alias'
import { resolve } from 'path'

addAlias('@', resolve(process.env.TZ_NODE_DEV === undefined ? 'dist' : 'src'))

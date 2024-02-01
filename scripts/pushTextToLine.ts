import { pushTextToLine } from '../util/pusgToLine'
import { question } from 'zx'

const text = await question('text? ')
await pushTextToLine(text)

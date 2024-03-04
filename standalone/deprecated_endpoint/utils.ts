import crypto from 'crypto'

export function hashString(str: string) {
  let hash = crypto.createHash('sha256')
  hash.update(str)
  return hash.digest('hex')
}

export const deprecatedEndpointBasePath = `/Users/re4388/project/personal/lang/bun/bun_cli_0/standalone/deprecated_endpoint`

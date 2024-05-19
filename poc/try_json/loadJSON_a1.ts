import fs from 'fs'

let cache: { [path: string]: unknown } = {}

export async function loadJson<T>(path: string, enableCache = true): Promise<T> {
  if (enableCache && cache[path]) {
    return cache[path] as T
  }

  try {
    const data = await fs.promises.readFile(path, 'utf8')
    const jsonData = JSON.parse(data) as T

    if (enableCache) {
      cache[path] = jsonData
    }

    return jsonData
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(`Failed to parse JSON data: ${path}, err: ${error}`)
    } else {
      throw new Error(`Failed to read JSON file: ${path}, err: ${error}`)
    }
  }
}

// 這個方法，你可以清楚的知道是 readFile error or parse error,
export async function loadJsonV2<T>(path: string, enableCache = true): Promise<T> {
  const data = await fs.promises.readFile(path, 'utf8')
  const jsonData = JSON.parse(data) as T
  return jsonData
}

// 這個方法是透過 JS 的 module 機制，你預設 module 是一個 JSON 檔案，
// 這樣的設計會讓你的程式碼更加的簡潔，但是你會失去對於錯誤的控制
export async function loadJsonV3<T>(path: string, enableCache = true): Promise<T> {
  const module = await import(path)
  return module.default
}

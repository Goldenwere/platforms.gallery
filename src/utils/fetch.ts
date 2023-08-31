// TODO: create utils package and migrate this from platforms/templates to package

import yaml from 'js-yaml'
import DOMPurify from 'dompurify'
import { readTextFile } from '@tauri-apps/api/fs';

/**
 * Config used for DOMPurify.
 * This config allows for most HTML elements and a handful of attributes
 * necessary for the site to load intended markdown/etc
 */
const domPurifyConfig = {
  ALLOW_ARIA_ATTR: true,
  ALLOWED_ATTR: [
    'alt',
    'href',
    'style',
    'title',
  ],
  ALLOWED_TAGS: [
    'a',
    'p',
    'span',

    'b',
    'em',
    'i',
    'mark',
    's',
    'sub',
    'sup',
    'small',
    'strike',
    'strong',
    'u',

    'abbr',
    'audio',
    'blockquote',
    'cite',
    'code',
    'data',
    'dfn',
    'div',
    'img',
    'pre',
    'samp',
    'time',
    'track',
    'var',
    'video',

    'figcaption',
    'figure',

    'br',
    'hr',
    'wbr',

    'ol',
    'ul',
    'li',

    'dd',
    'dl',
    'dt',
  ],
}

/**
 * Fetches and sanitizes text files
 * @param path the path of the text file to load
 * @returns the content of the text file after sanitizing
 */
export const fetchAndReturnText = async (path: string) => {
  const blob = await readTextFile(path)
  const sanitized = DOMPurify.sanitize(blob, domPurifyConfig)
  return sanitized
}

/**
 * Fetches, sanitizes, and parses YAML files
 * @param path the path of the YAML file to load
 * @returns the content of the YAML file after sanitizing then parsing
 */
export const fetchAndParseYaml = async<T> (path: string) => {
  const text = await fetchAndReturnText(path)
  return yaml.load(text) as T
}

/**
 * Fetches content type from an image
 * @param path the path of the file to check
 * @returns the Content-Type header of the file
 */
export const getContentType = async (path: string) => {
  const response = await fetch(path, {method: 'HEAD'})
  return response.headers.get('Content-Type')
}

/**
 * Determines if a url is a valid image
 * @param url the url of the image
 * @returns true if valid image, false otherwise
 */
export const isValidImage = async (url?: string): Promise<boolean> => {
  if (!url) {
    return false
  }
  const contentType = await getContentType(url)
  return contentType?.startsWith('image') || false
}

/**
 * Creates a Promise which waits for a condition to be true
 * @param condition the condition which should be met
 * @param interval the period of time (ms) to wait between attempts
 * @param tries the number of attempts (up to and including this number) to try before determining the condition couldn't be met
 * @returns A Promise which will resolve when the condition is met or reject if timed out after a period of `(interval * tries)`
 */
export const awaitCondition = (condition: () => boolean, interval: number = 100, tries: number = 100) => {
  return new Promise<void>((resolve, reject) => {
    let _attempts = 1
    const wait: any = () => {
      _attempts += 1
      console.log(condition())
      if (condition()) {
        return resolve()
      } else if (_attempts > tries) {
        reject()
      } else {
        setTimeout(wait, interval)
      }
    }
    wait()
  })
}

/**
 * Methods related to local storage
 */
export const storage = {
  /**
   * Retrieves a value from local storage
   * @param key the key of the local storage item
   * @returns the parsed object or null
   */
  read: <T>(key: string) => {
    const value = window.localStorage.getItem(key)
    return !!value
      ? JSON.parse(value) as T
      : null
  },

  /**
   * Stores a value to local storage
   * @param key the key of the local storage item
   * @param value the object to store
   */
  write: <T>(key: string, value: T) => {
    window.localStorage.setItem(key, JSON.stringify(value))
  },
}

import { exists, createDir, writeTextFile, copyFile } from '@tauri-apps/api/fs';
import yaml from 'js-yaml'
import type { AppViewModel, HomeViewModel } from '@goldenwere/types.gallery'
import { fetchAndParseYaml } from 'src/utils/fetch'
import { APP_CONFIG, BASE_THEME, CONTENT_DIRECTORY, HOME_CONFIG } from './constants'

export const newApp: AppViewModel = {
  directories: [],
  title: 'new gallery app',
}

export const newHome: HomeViewModel = {
  copyrightNotice: `Copyright {YOU} (C) ${new Date().getFullYear()}`
}

export interface ContentDirectoryInfo {
  validContentDirectory: ContentDirectoryResponse,
  validThemeConfig?: boolean,
  validHomeConfig?: boolean,

  appResponse?: AppViewModel,
  homeResponse?: HomeViewModel,
}

export type ContentDirectoryResponse =
| 'Directory Error'
| 'No app.yml'
| 'Invalid app.yml'
| 'Valid'

export const validateAppConfig = async (config: AppViewModel) => {
  return (!!config && !!config.title && !!config.directories)
}

export const validateHomeConfig = async (config: HomeViewModel) => {
  return (!!config && !!config.copyrightNotice)
}

export const validateContentDirectory = async (path: string | string[] | null): Promise<ContentDirectoryInfo> => {
  if (path as string !== null) {
    const appPath = `${path as string}/${APP_CONFIG}`
    const appExists = await exists(appPath)

    if (appExists) {
      const appConfig = await fetchAndParseYaml<AppViewModel>(appPath)
      const appConfigIsValid = await validateAppConfig(appConfig)

      if (appConfigIsValid) {
        const homePath = `${path as string}/${HOME_CONFIG}`
        const themePath = `${path as string}/${BASE_THEME}`
        const homeExists = await exists(homePath)
        const themeExists = await exists(themePath)

        let homeConfig: HomeViewModel = null as any
        let homeConfigIsValid = false
        if (homeExists) {
          homeConfig = await fetchAndParseYaml<HomeViewModel>(homePath)
          homeConfigIsValid = await validateHomeConfig(homeConfig)
        }

        return {
          validContentDirectory: 'Valid',
          validThemeConfig: themeExists,
          validHomeConfig: homeConfigIsValid,

          appResponse: appConfig,
          homeResponse: homeConfig,
        }
      } else {
        return { validContentDirectory: 'Invalid app.yml' }
      }
    } else {
      return { validContentDirectory: 'No app.yml' }
    }
  }

  return { validContentDirectory: 'Directory Error' }
}

export const createNewDirectory = async (path: string) => {
  return new Promise<ContentDirectoryInfo>((resolve, reject) => {
    createDir(`${path}/${CONTENT_DIRECTORY}`)
    .catch(err => reject(err))
    .then(_ => {
      let newAppContent = yaml.dump(newApp)

      return writeTextFile(`${path}/${CONTENT_DIRECTORY}/${APP_CONFIG}`, newAppContent)
    })
    .catch(err => reject(err))
    .then(_ => {
      let newHomeContent = yaml.dump(newHome)

      return writeTextFile(`${path}/${CONTENT_DIRECTORY}/${HOME_CONFIG}`, newHomeContent)
    })
    .catch(err => reject(err))
    .then(_ => {
      return writeTextFile(`${path}/${CONTENT_DIRECTORY}/${BASE_THEME}`, '')
    })
    .catch(err => reject(err))
    .then(_ => {
      resolve({
        validContentDirectory: 'Valid',
        validHomeConfig: true,
        validThemeConfig: true,
        appResponse: { ...newApp },
        homeResponse: { ...newHome },
      })
    })
    .catch(err => reject(err))
  })
}

export const copyFilesToContent = async (toCopy: { from: string, to: string }[]) => {
  return Promise.all(toCopy.map((other) => copyFile(other.from, other.to) ))
}

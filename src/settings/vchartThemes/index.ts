import themeJson from './global.theme.json'

type ThemeJsonType = typeof themeJson
export interface vChartGlobalThemeJsonType extends Partial<ThemeJsonType> {
  dataset?: any
  [T: string]: any
}

export const vChartGlobalThemeJson = { ...themeJson, dataset: null }

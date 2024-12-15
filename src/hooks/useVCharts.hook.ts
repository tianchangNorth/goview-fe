import { watch } from 'vue'
import vScreenVolcanoBlue from '@visactor/vchart-theme/public/vScreenVolcanoBlue.json'
import { VChart, type ITheme } from '@visactor/vchart'

const themeMap = {
  vScreenVolcanoBlue: vScreenVolcanoBlue
}

export const useVCharts = () => {
  // 注册主题（支持自定义主题）
  const registerTheme = (themeName: keyof typeof themeMap, theme: any) => {
    VChart.ThemeManager.registerTheme(themeName, (themeMap[themeName] as any) || theme)
  }

  // 设置当前主题
  const setCurrentTheme = (themeName = 'vScreenVolcanoBlue') => {
    VChart.ThemeManager.setCurrentTheme(themeName)
  }

  // 判断主题是否存在
  const themeExist = (name: string): boolean => {
    return VChart.ThemeManager.themeExist(name)
  }

  // 获取主题
  const getTheme = (name: string): ITheme => {
    return VChart.ThemeManager.getTheme(name)
  }

  // 获取当前主题
  const getCurrentTheme = (): ITheme => {
    return VChart.ThemeManager.getCurrentTheme()
  }

  // 设置主题
  const setTheme = (name: keyof typeof themeMap): boolean => {
    if (themeExist(name)) {
      setCurrentTheme(name)
      return true
    } else {
      // 先注册
      const theme = themeMap[name]
      if (theme) {
        registerTheme(name, theme)
        setCurrentTheme(name)
        return true
      } else {
        // 注册默认主题
        registerTheme('vScreenVolcanoBlue', vScreenVolcanoBlue)
      }
    }
    return false
  }

  return {
    registerTheme,
    setCurrentTheme,
    themeExist,
    getTheme,
    setTheme,
    getCurrentTheme
  }
}

// 设置全局的 vCharts 主题
export const useInitVChartsTheme = (chartEditStore: any) => {
  const vCharts = useVCharts()

  const initVChartsThemeIns = watch(
    () => chartEditStore.getEditCanvasConfig.vChartThemeName,
    (newTheme: string) => {
      vCharts.setTheme(newTheme as any)
    },
    {
      immediate: true
    }
  )

  return {
    initVChartsThemeIns
  }
}

<template>
  <n-flex vertical>
    <n-card class="theme-item" v-for="item in list" :key="item.value" size="small" @click="selectThemeHandle(item)">
      {{ item.name }}
    </n-card>
  </n-flex>
  行业模板
  <n-grid :x-gap="8" :y-gap="8" :cols="2">
    <n-gi v-for="item in industryList" :key="item.value">
      <n-card class="theme-item-industry" size="small" @click="selectThemeHandle(item)">
        {{ item.name }}
      </n-card>
    </n-gi>
  </n-grid>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useVCharts } from '@/hooks'

const vCharts = useVCharts()
const themeMap = vCharts.getThemeMap()
const list = ref<
  Array<{
    name: string
    value: keyof typeof themeMap
    colors: string[]
  }>
>([
  {
    name: '明亮',
    value: 'light',
    colors: []
  },
  {
    name: '暗黑',
    value: 'dark',
    colors: []
  },
  {
    name: '火山蓝',
    value: 'vScreenVolcanoBlue',
    colors: []
  },
  {
    name: '党建红',
    value: 'vScreenPartyRed',
    colors: []
  },
  {
    name: '清新蜡笔',
    value: 'vScreenClean',
    colors: []
  },
  {
    name: '郊外',
    value: 'vScreenOutskirts',
    colors: []
  },
  {
    name: '汽车蓝橙',
    value: 'vScreenBlueOrange',
    colors: []
  },
  {
    name: '金融黄',
    value: 'vScreenFinanceYellow',
    colors: []
  },
  {
    name: '文旅青',
    value: 'vScreenWenLvCyan',
    colors: []
  },
  {
    name: '电力绿',
    value: 'vScreenElectricGreen',
    colors: []
  },
  {
    name: '电商紫',
    value: 'vScreenECommercePurple',
    colors: []
  },
  {
    name: '红蓝',
    value: 'vScreenRedBlue',
    colors: []
  }
])

// 行业色版列表
const industryList = ref<
  Array<{
    name: string
    value: keyof typeof themeMap
    colors: string[]
  }>
>([
  {
    name: '亮-金融行业',
    value: 'veODesignLightFinance',
    colors: []
  },
  {
    name: '暗-金融行业',
    value: 'veODesignDarkFinance',
    colors: []
  },
  {
    name: '亮-政府行业',
    value: 'veODesignLightGovernment',
    colors: []
  },
  {
    name: '暗-政府行业',
    value: 'veODesignDarkGovernment',
    colors: []
  },
  {
    name: '亮-消费行业',
    value: 'veODesignLightConsumer',
    colors: []
  },
  {
    name: '暗-消费行业',
    value: 'veODesignDarkConsumer',
    colors: []
  },
  {
    name: '亮-汽车行业',
    value: 'veODesignLightAutomobile',
    colors: []
  },
  {
    name: '暗-汽车行业',
    value: 'veODesignDarkAutomobile',
    colors: []
  },
  {
    name: '亮-文旅行业',
    value: 'veODesignLightCulturalTourism',
    colors: []
  },
  {
    name: '暗-文旅行业',
    value: 'veODesignDarkCulturalTourism',
    colors: []
  },
  {
    name: '亮-医疗行业',
    value: 'veODesignLightMedical',
    colors: []
  },
  {
    name: '暗-医疗行业',
    value: 'veODesignDarkMedical',
    colors: []
  },
  {
    name: '亮-新能源行业',
    value: 'veODesignLightNewEnergy',
    colors: []
  },
  {
    name: '暗-新能源行业',
    value: 'veODesignDarkNewEnergy',
    colors: []
  }
])

const selectThemeHandle = (item: { name: string; value: keyof typeof themeMap; colors: string[] }) => {
  vCharts.setTheme(item.value)
}
</script>

<style lang="scss" scoped>
.theme-item {
  cursor: pointer;
}
.theme-item-industry {
}
</style>

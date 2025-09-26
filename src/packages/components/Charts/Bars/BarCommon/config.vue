<template>
  <!-- Echarts 全局设置 -->
  <global-setting :optionData="optionData"></global-setting>
  <CollapseItem v-for="(item, index) in seriesList" :key="index" :name="`柱状图-${index + 1}`" :expanded="true">
    <SettingItemBox name="图形">
      <SettingItem name="宽度">
        <n-input-number
          v-model:value="item.barWidth"
          :min="1"
          :max="100"
          size="small"
          placeholder="自动计算"
        ></n-input-number>
      </SettingItem>
      <SettingItem name="间隔">
        <n-input-group>
          <n-input-number
            v-model:value="barGapNumber"
            :min="-100"
            :max="200"
            size="small"
            placeholder="20"
            @update:value="updateBarGap"
          ></n-input-number>
          <n-select
            v-model:value="barGapUnit"
            size="small"
            :options="[
              { label: '%', value: '%' },
              { label: 'px', value: 'px' }
            ]"
            @update:value="updateBarGap"
          ></n-select>
        </n-input-group>
        <div style="font-size: 12px; color: #666; margin-top: 4px;">
          提示：负值表示重叠，正值表示间隔，推荐使用百分比
        </div>
      </SettingItem>
      <SettingItem name="圆角">
        <n-input-number v-model:value="item.itemStyle.borderRadius" :min="0" size="small"></n-input-number>
      </SettingItem>
      <SettingItem name="默认颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="item.itemStyle.color"></n-color-picker>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="渐变设置">
      <SettingItem>
        <n-space>
          <n-switch v-model:value="item.gradient.enabled" size="small" />
          <n-text>启用渐变</n-text>
        </n-space>
      </SettingItem>
      <SettingItem v-if="item.gradient.enabled" name="渐变类型">
        <n-select
          v-model:value="item.gradient.type"
          :options="[
            { label: '线性渐变', value: 'linear' },
            { label: '径向渐变', value: 'radial' }
          ]"
          size="small"
        />
      </SettingItem>
      <SettingItem v-if="item.gradient.enabled && item.gradient.type === 'linear'" name="渐变方向">
        <n-select
          v-model:value="item.gradient.direction"
          :options="[
            { label: '垂直', value: 'vertical' },
            { label: '水平', value: 'horizontal' }
          ]"
          size="small"
        />
      </SettingItem>
      <SettingItem v-if="item.gradient.enabled" name="起始颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="item.gradient.startColor"></n-color-picker>
      </SettingItem>
      <SettingItem v-if="item.gradient.enabled" name="结束颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="item.gradient.endColor"></n-color-picker>
      </SettingItem>
    </SettingItemBox>
    <setting-item-box name="标签">
      <setting-item>
        <n-space>
          <n-switch v-model:value="item.label.show" size="small" />
          <n-text>展示标签</n-text>
        </n-space>
      </setting-item>
      <setting-item name="大小">
        <n-input-number v-model:value="item.label.fontSize" size="small" :min="1"></n-input-number>
      </setting-item>
      <setting-item name="颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="item.label.color"></n-color-picker>
      </setting-item>
      <setting-item name="位置">
        <n-select
          v-model:value="item.label.position"
          :options="[
            { label: 'top', value: 'top' },
            { label: 'left', value: 'left' },
            { label: 'right', value: 'right' },
            { label: 'bottom', value: 'bottom' }
          ]"
        />
      </setting-item>
    </setting-item-box>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType, computed, ref, watch } from 'vue'
import { GlobalSetting, CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { GlobalThemeJsonType } from '@/settings/chartThemes/index'

const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true
  }
})

const seriesList = computed(() => {
  return props.optionData.series
})

// 柱子间隔配置
const barGapNumber = ref(20)
const barGapUnit = ref('%')

// 解析当前柱子间隔值
const parseBarGap = (barGap: string | number | undefined) => {
  if (!barGap) {
    barGapNumber.value = 20
    barGapUnit.value = '%'
    return
  }

  const barGapStr = String(barGap)
  if (barGapStr.endsWith('%')) {
    barGapNumber.value = parseInt(barGapStr.replace('%', ''))
    barGapUnit.value = '%'
  } else {
    barGapNumber.value = parseInt(barGapStr)
    barGapUnit.value = 'px'
  }
}

// 更新柱子间隔
const updateBarGap = () => {
  const newValue = barGapNumber.value || 0
  const newUnit = barGapUnit.value
  seriesList.value.forEach((item: any) => {
    item.barGap = `${newValue}${newUnit}`
  })
}

// 监听系列变化，初始化柱子间隔值
watch(() => seriesList.value, (newSeries) => {
  if (newSeries && newSeries.length > 0) {
    parseBarGap(newSeries[0].barGap)
  }
}, { immediate: true, deep: true })

</script>

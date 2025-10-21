<template>
  <!-- Echarts 全局设置 -->
  <global-setting :optionData="optionData"></global-setting>

  <!-- X轴设置 -->
  <CollapseItem name="X轴设置" :expanded="true">
    <SettingItemBox name="稀疏X轴">
      <SettingItem name="启用">
        <n-space>
          <n-switch v-model:value="optionData.xAxis.sparseAxis.enabled" size="small" />
          <n-text>启用稀疏X轴</n-text>
        </n-space>
      </SettingItem>
      <template v-if="optionData.xAxis.sparseAxis.enabled">
        <SettingItem name="间隔策略">
          <n-select
            v-model:value="optionData.xAxis.sparseAxis.interval"
            size="small"
            :options="[
              { label: '自动计算', value: 'auto' },
              { label: '显示所有', value: '0' },
              { label: '每隔1个显示', value: '1' },
              { label: '每隔2个显示', value: '2' },
              { label: '每隔3个显示', value: '3' },
              { label: '每隔4个显示', value: '4' },
              { label: '每隔5个显示', value: '5' }
            ]"
          />
        </SettingItem>
        <SettingItem v-if="optionData.xAxis.sparseAxis.interval === 'auto'" name="最大标签数">
          <n-input-number
            v-model:value="optionData.xAxis.sparseAxis.maxLabels"
            :min="1"
            :max="20"
            size="small"
            placeholder="最大显示标签数"
          ></n-input-number>
        </SettingItem>
      </template>
    </SettingItemBox>
  </CollapseItem>

  <CollapseItem v-for="(item, index) in seriesList" :key="index" :name="`折线图-${index + 1}`" :expanded="true">
    <SettingItemBox name="线条">
      <SettingItem name="平滑">
        <n-space>
          <n-switch v-model:value="item.smooth" size="small" />
          <n-text>平滑效果</n-text>
        </n-space>
      </SettingItem>
      <SettingItem name="宽度">
        <n-input-number
          v-model:value="item.lineStyle.width"
          :min="1"
          :max="100"
          size="small"
          placeholder="自动计算"
        ></n-input-number>
      </SettingItem>
      <SettingItem name="类型">
        <n-select v-model:value="item.lineStyle.type" size="small" :options="lineConf.lineStyle.type"></n-select>
      </SettingItem>
      <SettingItem name="自定义颜色">
        <n-space>
          <n-switch v-model:value="item.customColor.enabled" size="small" />
          <n-text>启用自定义颜色</n-text>
        </n-space>
      </SettingItem>
      <SettingItem v-if="item.customColor.enabled" name="线条颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="item.customColor.lineColor" placeholder="线条颜色"></n-color-picker>
      </SettingItem>
      <SettingItem v-if="item.customColor.enabled" name="实心点颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="item.customColor.itemColor" placeholder="实心点颜色"></n-color-picker>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="实心点">
      <SettingItem name="显示">
        <n-space>
          <n-switch v-model:value="item.showSymbol" size="small" />
          <n-text>显示实心点</n-text>
        </n-space>
      </SettingItem>
      <SettingItem name="大小">
        <n-input-number
          v-model:value="item.symbolSize"
          :min="1"
          :max="100"
          size="small"
          placeholder="自动计算"
        ></n-input-number>
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
import { PropType, computed } from 'vue'
import { lineConf } from '@/packages/chartConfiguration/echarts/index'
import { GlobalThemeJsonType } from '@/settings/chartThemes/index'
import { GlobalSetting, CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'

const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true
  }
})

const seriesList = computed(() => {
  return props.optionData.series
})
</script>

<template>
  <CollapseItem name="内容" :expanded="true">
    <SettingItemBox name="字体">
      <SettingItem name="大小">
        <n-input-number
          v-model:value="optionData.timeSize"
          size="small"
          :min="1"
        ></n-input-number>
      </SettingItem>
      <SettingItem name="粗细">
        <n-select
          v-model:value="optionData.fontWeight"
          size="small"
          :options="fontWeightOptions"
        />
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="间距">
      <SettingItem name="字距">
        <n-input-number
          v-model:value="optionData.timeTextIndent"
          size="small"
          :min="1"
        ></n-input-number>
      </SettingItem>
      <SettingItem name="行距">
        <n-input-number
          v-model:value="optionData.timeLineHeight"
          size="small"
          :min="1"
        ></n-input-number>
      </SettingItem>
    </SettingItemBox>

    <SettingItemBox name="颜色">
      <SettingItem name="时间">
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="optionData.timeColor"
        ></n-color-picker>
      </SettingItem>
    </SettingItemBox>

    <SettingItemBox name="渐变设置">
      <SettingItem>
        <n-space>
          <n-switch v-model:value="optionData.gradient.enabled" size="small" />
          <n-text>启用渐变</n-text>
        </n-space>
      </SettingItem>
      <SettingItem v-if="optionData.gradient.enabled" name="渐变类型">
        <n-select
          v-model:value="optionData.gradient.type"
          :options="[
            { label: '线性渐变', value: 'linear' },
            { label: '径向渐变', value: 'radial' }
          ]"
          size="small"
        />
      </SettingItem>
      <SettingItem v-if="optionData.gradient.enabled && optionData.gradient.type === 'linear'" name="渐变方向">
        <n-select
          v-model:value="optionData.gradient.direction"
          :options="[
            { label: '水平', value: 'horizontal' },
            { label: '垂直', value: 'vertical' },
            { label: '自定义角度', value: 'custom' }
          ]"
          size="small"
        />
      </SettingItem>
      <SettingItem v-if="optionData.gradient.enabled && optionData.gradient.type === 'linear' && optionData.gradient.direction === 'custom'" name="渐变角度">
        <n-input-number
          v-model:value="optionData.gradient.angle"
          :min="0"
          :max="360"
          size="small"
          placeholder="360"
        />
        <div style="font-size: 12px; color: #666; margin-top: 4px;">
          角度说明：0°向右，90°向上，180°向左，270°向下，360°向右
        </div>
      </SettingItem>
      <SettingItem v-if="optionData.gradient.enabled" name="起始颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.gradient.startColor"></n-color-picker>
      </SettingItem>
      <SettingItem v-if="optionData.gradient.enabled" name="结束颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.gradient.endColor"></n-color-picker>
      </SettingItem>

      <SettingItem v-if="optionData.gradient.enabled">
        <n-space>
          <n-switch v-model:value="optionData.gradient.useCustomStops" size="small" />
          <n-text>自定义颜色位置</n-text>
        </n-space>
      </SettingItem>

      <SettingItem v-if="optionData.gradient.enabled && optionData.gradient.useCustomStops" name="起始颜色位置">
        <n-input-number
          v-model:value="optionData.gradient.startColorStop"
          :min="0"
          :max="100"
          :precision="2"
          size="small"
          placeholder="0"
        ></n-input-number>
        <div style="font-size: 12px; color: #666; margin-top: 4px;">
          起始颜色的位置百分比（0-100），支持小数
        </div>
      </SettingItem>

      <SettingItem v-if="optionData.gradient.enabled && optionData.gradient.useCustomStops" name="结束颜色位置">
        <n-input-number
          v-model:value="optionData.gradient.endColorStop"
          :min="0"
          :max="100"
          :precision="2"
          size="small"
          placeholder="100"
        ></n-input-number>
        <div style="font-size: 12px; color: #666; margin-top: 4px;">
          结束颜色的位置百分比（0-100），支持小数
        </div>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="阴影">
      <SettingItem>
        <n-space>
          <n-switch v-model:value="optionData.showShadow" size="small" />
          <n-text>展示阴影</n-text>
        </n-space>
      </SettingItem>
      <SettingItem name="x">
        <n-input-number v-model:value="optionData.hShadow" size="small"></n-input-number
      ></SettingItem>
      <SettingItem name="y">
        <n-input-number v-model:value="optionData.vShadow" size="small"></n-input-number
      ></SettingItem>
      <SettingItem name="模糊">
        <n-input-number
          v-model:value="optionData.blurShadow"
          size="small"
        ></n-input-number
      ></SettingItem>
      <SettingItem name="颜色">
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="optionData.colorShadow"
        ></n-color-picker
      ></SettingItem>
    </SettingItemBox>
  </CollapseItem>
</template>
<script setup lang="ts">
import { PropType } from "vue";
import {
  CollapseItem,
  SettingItemBox,
  SettingItem,
} from "@/components/Pages/ChartItemSetting";
import { option, FontWeightEnum, FontWeightObject } from "./config";

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true,
  },
});
const fontWeightOptions = [
  {
    label: FontWeightEnum.NORMAL,
    value: FontWeightObject[FontWeightEnum.NORMAL],
  },
  {
    label: FontWeightEnum.BOLD,
    value: FontWeightObject[FontWeightEnum.BOLD],
  },
];
</script>

<template>
  <svg :width="w" :height="h">
    <!-- 外部圆角正方形 -->
    <rect x="10" y="10" :width="outRect" :height="outRect" rx="20" fill="none"  :stroke="outRectColor" stroke-width="3"/>

    <!-- 斜线背景 -->
    <pattern :id="id" patternUnits="userSpaceOnUse" width="8" height="8" >
      <path d="M-1,1 l2,2 M0,0 l8,8 M7,9 l2,2" :stroke="backColor" stroke-width="1" />
    </pattern>
    <rect x="12" y="12" :width="outRect - 5" :height="outRect - 5" rx="20" :fill="`url(#${id})`" />

    <!-- 图标 -->
    <foreignObject :x="10 + outRect / 4" :y="10 + outRect / 4" :width="outRect / 2" :height="outRect / 2">
      <img src="./icon05.png" alt="图标" style="width: 100%; height: 100%;" />
    </foreignObject>
  </svg>
</template>

<script setup lang="ts">
import { PropType, toRefs } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { getUUID } from '@/utils'

const id = getUUID();
const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true,
  },
})
const { w, h } = toRefs(props.chartConfig.attr)
const { outRect,outRectColor,backColor} = toRefs(props.chartConfig.option)

</script>


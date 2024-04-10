<template>
  <svg :width="w" :height="h">
    <defs>
      <linearGradient :id="id" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%"  :stop-color="startColor" stop-opacity="1"/>
        <stop offset="100%" :stop-color="endColor"  stop-opacity="1"/>
      </linearGradient>
    </defs>
    <polyline :points="getBox()" fill="none" :stroke="`url(#${id})`" :stroke-width="strokeWidth"/>
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
const { boxWidth, boxHeight,cornerTip,startColor,endColor,strokeWidth } = toRefs(props.chartConfig.option)

const getBox = ():string =>{
  return `${ w.value / 3 },0 ${ w.value / 3 + boxWidth.value},0 ${ w.value / 3 + boxWidth.value},${boxHeight.value} ${ w.value / 3 + boxWidth.value/2 },${boxHeight.value + cornerTip.value} ${ w.value / 3 },${boxHeight.value} ${ w.value / 3 },0`
}

</script>


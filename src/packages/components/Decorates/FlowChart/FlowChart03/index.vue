<template>
  <svg :width="w" :height="h">
    <defs>
      <linearGradient :id="id"  x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"  :stop-color="startColor" stop-opacity="1"/>
        <stop offset="100%" :stop-color="endColor"  stop-opacity="1"/>
      </linearGradient>
    </defs>
<!--    <polyline :points="getBorder()" fill="none" :stroke="outBorderColor" :stroke-width="borderWidth"/>-->
    <polyline :points="getBox()" :fill="`url(#${id})`" :stroke="inBorderColor" :stroke-width="borderWidth"/>
  </svg>
</template>

<script setup lang="ts">
import { PropType, toRefs } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { getUUID } from '@/utils'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true,
  },
})
const id = getUUID();
console.log(id)
const { w, h } = toRefs(props.chartConfig.attr)
const { boxWidth, boxHeight,outBorderColor,inBorderColor,startColor,endColor ,borderWidth} = toRefs(props.chartConfig.option)

const getBox = ():string =>{
  return `${ w.value / 10 +50},30 ${ w.value / 10 + boxWidth.value},30 ${boxWidth.value},${boxHeight.value} 50,${boxHeight.value} ${ w.value / 10 +50},30`
}

const getBorder = ():string =>{
  return `${ w.value / 10 + 45},20 ${ w.value / 10 + boxWidth.value + 20},20 ${boxWidth.value + 10},${boxHeight.value+10} 30,${boxHeight.value+10} ${ w.value / 10 + 45},20`
}

</script>


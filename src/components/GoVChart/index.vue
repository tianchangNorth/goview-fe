<template>
  <div
    ref="vChartRef"
    v-on="{
      ...Object.fromEntries(event.map(eventName => [eventName, (eventData: MouseEvent) => eventHandlers(eventData, eventName)]))
    }"
  ></div>
</template>

<script setup lang="ts">
import { ref, PropType, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { VChart, type IVChart, type IInitOption, type ISpec } from '@visactor/vchart'

// 事件说明 v1.13.0 https://www.visactor.io/vchart/api/API/event
const event = [
  'mousedown',
  'mouseup',
  'mouseupoutside',
  'rightdown',
  'rightup',
  'rightupoutside',
  'click',
  'dblclick',
  'mousemove',
  'mouseover',
  'mouseout',
  'mouseenter',
  'mouseleave',
  'wheel',
  'touchstart',
  'touchend',
  'touchendoutside',
  'touchmove',
  'touchcancel',
  'tap',
  'dragstart',
  'dragend',
  'drag',
  'dragenter',
  'dragleave',
  'dragover',
  'drop',
  'pan',
  'panstart',
  'panend',
  'press',
  'pressup',
  'pressend',
  'pinch',
  'pinchstart',
  'pinchend',
  'swipe',
  'dimensionHover',
  'dimensionClick',
  'dataZoomChange',
  'scrollBarChange',
  'brushStart',
  'brushChange',
  'brushEnd',
  'brushClear',
  'drill',
  'legendItemClick',
  'legendItemHover',
  'legendItemUnHover',
  'legendFilter',
  'initialized',
  'rendered',
  'renderFinished',
  'animationFinished',
  'layoutStart',
  'layoutEnd',
  'afterResizef'
]
const emit = defineEmits([
  'mousedown',
  'mouseup',
  'mouseupoutside',
  'rightdown',
  'rightup',
  'rightupoutside',
  'click',
  'dblclick',
  'mousemove',
  'mouseover',
  'mouseout',
  'mouseenter',
  'mouseleave',
  'wheel',
  'touchstart',
  'touchend',
  'touchendoutside',
  'touchmove',
  'touchcancel',
  'tap',
  'dragstart',
  'dragend',
  'drag',
  'dragenter',
  'dragleave',
  'dragover',
  'drop',
  'pan',
  'panstart',
  'panend',
  'press',
  'pressup',
  'pressend',
  'pinch',
  'pinchstart',
  'pinchend',
  'swipe',
  'dimensionHover',
  'dimensionClick',
  'dataZoomChange',
  'scrollBarChange',
  'brushStart',
  'brushChange',
  'brushEnd',
  'brushClear',
  'drill',
  'legendItemClick',
  'legendItemHover',
  'legendItemUnHover',
  'legendFilter',
  'initialized',
  'rendered',
  'renderFinished',
  'animationFinished',
  'layoutStart',
  'layoutEnd',
  'afterResizef'
])

const props = defineProps({
  option: {
    type: Object as PropType<ISpec>,
    required: true
  },
  initOptions: {
    type: Object as PropType<
      IInitOption & {
        deepWatch?: boolean
      }
    >,
    required: false,
    default: () => ({})
  }
})

const vChartRef = ref()
let chart: IVChart

watch(
  () => props.option,
  (chartProps: ISpec) => {
    if (vChartRef.value) {
      nextTick(() => {
        createOrUpdateChart(chartProps)
      })
    }
  },
  {
    deep: props.initOptions.deepWatch || false
  }
)

// 更新
const createOrUpdateChart = (chartProps: ISpec) => {
  if (vChartRef.value && !chart) {
    chart = new VChart(chartProps, {
      dom: vChartRef.value,
      ...props.initOptions
    })
    chart.renderSync()
    return true
  } else if (chart) {
    chart.updateSpec(chartProps)
    chart.renderSync()
    return true
  }
  return false
}

// 刷新
const refresh = () => {
  if (chart) {
    chart.release()
    chart.renderSync()
  }
}

// 抛出事件
const eventHandlers = (eventData: MouseEvent, eventName: string) => {
  if (event.includes(eventName)) emit(eventName as any, eventData)
}

// 挂载
onMounted(() => {
  createOrUpdateChart(props.option)
})

// 卸载
onBeforeUnmount(() => {
  if (chart) {
    chart.release()
  }
})

defineExpose({
  // 重刷新
  refresh,
  release: () => {
    if (chart) {
      chart.release()
    }
  }
})
</script>

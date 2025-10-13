<template>
  <div class="go-decorates-number" :style="`width:${w}px;height:${h}px;`">
    <div
      :style="{
        fontSize: `${timeSize}px`,
        lineHeight: `${timeLineHeight}px`,
        letterSpacing: `${timeTextIndent}px`,
        fontWeight: fontWeight,
        textShadow: boxShadow,
        ...gradientStyle,
        ...(gradient?.enabled ? {} : { color: timeColor })
      }"
    >
      {{ newData }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, toRefs, ref, watch, onMounted, onUnmounted, computed } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { useChartDataFetch } from '@/hooks'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})
let yearMonthDay = ref('2021-2-3')
let nowData = ref('08:00:00')
let newData = ref('2021-2-3 08:00:00')
let boxShadow = ref('none')
let timer: any = null
const { w, h } = toRefs(props.chartConfig.attr)

// 计算渐变色样式
const gradientStyle = computed(() => {
  if (!gradient.value?.enabled) {
    return {}
  }

  const { type, direction, angle, startColor, startColorStop, endColor, endColorStop, useCustomStops } = gradient.value

  if (type === 'linear') {
    const gradientAngle = angle || (direction === 'horizontal' ? 90 : direction === 'vertical' ? 180 : 360)

    let gradientColors = ''
    if (useCustomStops) {
      // 使用自定义位置
      gradientColors = `${startColor} ${startColorStop}%, ${endColor} ${endColorStop}%`
    } else {
      // 使用默认位置
      gradientColors = `${startColor}, ${endColor}`
    }

    return {
      background: `linear-gradient(${gradientAngle}deg, ${gradientColors})`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    }
  } else {
    let gradientColors = ''
    if (useCustomStops) {
      gradientColors = `${startColor} ${startColorStop}%, ${endColor} ${endColorStop}%`
    } else {
      gradientColors = `${startColor}, ${endColor}`
    }

    return {
      background: `radial-gradient(circle, ${gradientColors})`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    }
  }
})

let {
  timeColor,
  timeSize,
  timeLineHeight,
  timeTextIndent,
  fontWeight,
  gradient,
  showShadow,
  hShadow,
  vShadow,
  blurShadow,
  colorShadow
} = toRefs(props.chartConfig.option)

watch(
  props.chartConfig.option,
  () => {
    try {
      if (props.chartConfig.option.showShadow) {
        boxShadow.value = `${props.chartConfig.option.hShadow}px ${props.chartConfig.option.vShadow}px ${props.chartConfig.option.blurShadow}px ${props.chartConfig.option.colorShadow}`
      } else {
        boxShadow.value = 'none'
      }
    } catch (error) {
      console.log(error)
    }
  },
  {
    immediate: true
  }
)
onMounted(() => {
  timer = setInterval(() => {
    var datetime = new Date()
    var year = datetime.getFullYear()
    var month = datetime.getMonth() + 1 < 10 ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1
    var date = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate()
    var hh = datetime.getHours() // 时
    var mm = datetime.getMinutes() // 分
    var ss = datetime.getSeconds() // 分
    let time = ''
    if (hh < 10) time += '0'
    time += hh + ':'
    if (mm < 10) time += '0'
    time += mm + ':'
    if (ss < 10) time += '0'
    time += ss
    yearMonthDay.value = `${year}-${month}-${date}`
    nowData.value = time
    newData.value = yearMonthDay.value + ' ' + nowData.value
  }, 500)
})
onUnmounted(() => {
  clearInterval(timer)
})
useChartDataFetch(props.chartConfig, useChartEditStore)
</script>

<style lang="scss" scoped>
@include go('decorates-number') {
  text-align: center;
}
</style>

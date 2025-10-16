// 数据驱动的属性修改示例

// 1. 根据数据值动态修改颜色
export const dataColorChangeExample = `
// 根据数据值动态修改图表颜色
const chart = this.refs.vChartRef.chart
const option = this.props.chartConfig.option

// 获取数据
const data = option.series[0].data
const maxValue = Math.max(...data.map(item => item.value))

// 根据数值设置颜色
const colors = data.map(item => {
  const ratio = item.value / maxValue
  if (ratio > 0.8) return '#ff4757' // 红色 - 高值
  if (ratio > 0.5) return '#ffa502' // 橙色 - 中值
  return '#2ed573' // 绿色 - 低值
})

// 更新颜色配置
option.series[0].itemStyle = {
  color: params => colors[params.dataIndex]
}

chart.setOption(option)
`

// 2. 根据数据范围动态修改图表类型
export const chartTypeChangeExample = `
// 根据数据值范围动态切换图表类型
const chart = this.refs.vChartRef.chart
const option = this.props.chartConfig.option

// 获取数据
const data = option.series[0].data
const dataRange = Math.max(...data.map(item => item.value)) - Math.min(...data.map(item => item.value))

// 根据数据范围决定图表类型
let newSeriesType = 'bar' // 默认柱状图
let newSeries = []

if (dataRange > 1000) {
  // 数据范围大，使用折线图
  newSeriesType = 'line'
  newSeries = data.map(item => ({
    ...item,
    symbol: 'circle',
    symbolSize: 8,
    lineStyle: {
      width: 3
    }
  }))
} else if (dataRange < 100) {
  // 数据范围小，使用散点图
  newSeriesType = 'scatter'
  newSeries = data.map(item => ({
    ...item,
    symbolSize: item.value * 0.5 // 根据值设置点大小
  }))
} else {
  // 中等范围，使用柱状图
  newSeries = data
}

// 更新系列类型
option.series = [{
  type: newSeriesType,
  data: newSeries,
  ...option.series[0] // 保留其他配置
}]

chart.setOption(option)
`

// 3. 根据数据趋势动态修改样式
export const trendBasedStyleExample = `
// 根据数据趋势动态修改样式
const chart = this.refs.vChartRef.chart
const option = this.props.chartConfig.option

// 获取数据
const data = option.series[0].data

// 计算趋势（上升或下降）
let trendCount = 0
for (let i = 1; i < data.length; i++) {
  if (data[i].value > data[i-1].value) trendCount++
}

// 根据趋势设置样式
const isUpward = trendCount > data.length / 2

if (isUpward) {
  // 上升趋势 - 绿色主题
  option.series[0].itemStyle = {
    color: '#2ed573',
    borderColor: '#27ae60'
  }
  option.series[0].label = {
    color: '#27ae60'
  }
} else {
  // 下降趋势 - 红色主题
  option.series[0].itemStyle = {
    color: '#e74c3c',
    borderColor: '#c0392b'
  }
  option.series[0].label = {
    color: '#c0392b'
  }
}

chart.setOption(option)
`

// 4. 根据数据分布动态修改标签
export const dataLabelExample = `
// 根据数据分布智能显示标签
const chart = this.refs.vChartRef.chart
const option = this.props.chartConfig.option

// 获取数据
const data = option.series[0].data

// 计算数据分布统计
const values = data.map(item => item.value)
const mean = values.reduce((a, b) => a + b) / values.length
const stdDev = Math.sqrt(values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length)

// 设置标签显示规则
option.series[0].label = {
  show: params => {
    // 只显示异常值（偏离平均值超过标准差）
    const value = params.value
    return Math.abs(value - mean) > stdDev
  },
  formatter: params => {
    const value = params.value
    const deviation = ((value - mean) / mean * 100).toFixed(1)
    return deviation > 0 ? '+' + deviation + '%' : deviation + '%'
  },
  color: params => {
    const value = params.value
    return value > mean ? '#e74c3c' : '#27ae60'
  }
}

chart.setOption(option)
`

// 5. 根据数据变化动态添加动画效果
export const animationExample = `
// 根据数据变化添加动画效果
const chart = this.refs.vChartRef.chart
const option = this.props.chartConfig.option

// 获取最新数据（假设从API获取）
// 这里模拟数据更新
const newData = option.series[0].data.map(item => ({
  ...item,
  value: item.value + (Math.random() - 0.5) * 10 // 模拟数据变化
}))

// 设置动画配置
option.animation = true
option.animationDuration = 1000
option.animationEasing = 'elasticOut'

// 添加加载动画
option.series[0].data = newData.map((item, index) => ({
  ...item,
  value: 0,
  itemStyle: {
    opacity: 0
  }
}))

// 逐步显示数据
newData.forEach((item, index) => {
  setTimeout(() => {
    option.series[0].data[index] = {
      ...item,
      itemStyle: {
        opacity: 1
      }
    }
    chart.setOption(option, true)
  }, index * 200)
})
`

// 6. 根据数据分布动态调整图表布局
export const layoutOptimizationExample = `
// 根据数据量动态调整图表布局
const chart = this.refs.vChartRef.chart
const option = this.props.chartConfig.option

// 获取数据
const data = option.series[0].data
const dataCount = data.length

// 根据数据量调整配置
if (dataCount > 20) {
  // 数据量大时优化显示
  option.grid = {
    left: '3%',
    right: '7%',
    bottom: '3%',
    top: '5%',
    containLabel: true
  }
  option.series[0].label = {
    show: false // 数据量大时隐藏标签
  }
} else if (dataCount < 5) {
  // 数据量少时突出显示
  option.grid = {
    left: '10%',
    right: '10%',
    bottom: '10%',
    top: '10%'
  }
  option.series[0].label = {
    show: true,
    fontSize: 14,
    fontWeight: 'bold'
  }
}

// 根据数值范围调整Y轴
const values = data.map(item => item.value)
const range = Math.max(...values) - Math.min(...values)

if (range > 10000) {
  // 大数值范围使用科学计数法
  option.yAxis = {
    ...option.yAxis,
    axisLabel: {
      formatter: value => (value / 1000).toFixed(1) + 'k'
    }
  }
}

chart.setOption(option)
`

// 7. 根据数据关系动态连接相关组件
export const componentInteractionExample = `
// 根据数据变化联动其他组件
const thisComponent = this
const chart = this.refs.vChartRef.chart

// 获取其他组件
const pieChart = components['pie-chart-id']
const tableComponent = components['table-id']

// 监听数据变化
const originalOption = JSON.parse(JSON.stringify(this.props.chartConfig.option))

// 修改图表配置以支持交互
chart.on('click', params => {
  // 点击柱状图时
  const clickedData = params.data
  console.log('点击了数据:', clickedData)

  // 更新饼图显示点击项的详细信息
  if (pieChart && pieChart.refs.vChartRef) {
    const pieOption = pieChart.refs.vChartRef.chart.getOption()

    // 突出点击的项
    pieOption.series[0].data = originalOption.series[0].data.map(item => ({
      ...item,
      itemStyle: {
        color: item.name === clickedData.name ? '#ff6b6b' : item.color || '#888',
        borderWidth: item.name === clickedData.name ? 3 : 1,
        borderColor: '#fff'
      }
    }))

    pieChart.refs.vChartRef.chart.setOption(pieOption)
  }

  // 更新表格显示详细信息
  if (tableComponent) {
    // 更新表格数据（假设表格有更新数据的方法）
    tableComponent.updateTableData([clickedData])
  }
})

// 设置悬停效果
chart.on('mouseover', params => {
  const hoverData = params.data

  // 更新标题显示悬停项信息
  if (thisComponent.refs.titleRef) {
    thisComponent.refs.titleRef.textContent =
      hoverData.name + ': ' + hoverData.value.toLocaleString()
  }
})

chart.on('mouseout', () => {
  // 恢复原标题
  if (thisComponent.refs.titleRef) {
    thisComponent.refs.titleRef.textContent = originalOption.title.text
  }
})
`

export const dataDrivenExamples = [
  {
    name: '根据数据值动态修改颜色',
    description: '根据数值大小自动设置不同颜色，实现数据可视化',
    code: dataColorChangeExample
  },
  {
    name: '根据数据范围动态修改图表类型',
    description: '根据数据分布范围自动选择最适合的图表类型',
    code: chartTypeChangeExample
  },
  {
    name: '根据数据趋势动态修改样式',
    description: '分析数据趋势，自动应用相应的颜色主题',
    code: trendBasedStyleExample
  },
  {
    name: '根据数据分布智能显示标签',
    description: '只显示异常值标签，避免界面过于拥挤',
    code: dataLabelExample
  },
  {
    name: '根据数据变化动态添加动画效果',
    description: '数据更新时添加渐进式动画效果',
    code: animationExample
  },
  {
    name: '根据数据分布动态调整图表布局',
    description: '根据数据量和数值范围优化图表显示',
    code: layoutOptimizationExample
  },
  {
    name: '根据数据关系动态连接相关组件',
    description: '实现组件间的数据联动和交互效果',
    code: componentInteractionExample
  }
]
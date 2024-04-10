import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const FlowChart12Config: ConfigType = {
    key: 'FlowChart12',
    chartKey: 'VFlowChart12',
    conKey: 'VCFlowChart12',
    title: '流程-icon08',
    category: ChatCategoryEnum.FlowChart,
    categoryName: ChatCategoryEnumName.FlowChart,
    package: PackagesCategoryEnum.DECORATES,
    chartFrame: ChartFrameEnum.STATIC,
    image: 'icon8.png'
}

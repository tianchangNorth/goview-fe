import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const FlowChart10Config: ConfigType = {
    key: 'FlowChart10',
    chartKey: 'VFlowChart10',
    conKey: 'VCFlowChart10',
    title: '流程-icon06',
    category: ChatCategoryEnum.FlowChart,
    categoryName: ChatCategoryEnumName.FlowChart,
    package: PackagesCategoryEnum.DECORATES,
    chartFrame: ChartFrameEnum.STATIC,
    image: 'icon6.png'
}

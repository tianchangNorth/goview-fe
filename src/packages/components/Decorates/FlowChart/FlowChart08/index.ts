import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const FlowChart08Config: ConfigType = {
    key: 'FlowChart08',
    chartKey: 'VFlowChart08',
    conKey: 'VCFlowChart08',
    title: '流程-icon04',
    category: ChatCategoryEnum.FlowChart,
    categoryName: ChatCategoryEnumName.FlowChart,
    package: PackagesCategoryEnum.DECORATES,
    chartFrame: ChartFrameEnum.STATIC,
    image: 'icon4.png'
}

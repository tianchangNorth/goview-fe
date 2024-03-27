import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const FlowChart06Config: ConfigType = {
    key: 'FlowChart06',
    chartKey: 'VFlowChart06',
    conKey: 'VCFlowChart06',
    title: '流程-icon02',
    category: ChatCategoryEnum.FlowChart,
    categoryName: ChatCategoryEnumName.FlowChart,
    package: PackagesCategoryEnum.DECORATES,
    chartFrame: ChartFrameEnum.STATIC,
    image: 'icon2.png'
}

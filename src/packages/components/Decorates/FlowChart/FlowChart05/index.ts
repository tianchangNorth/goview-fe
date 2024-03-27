import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const FlowChart05Config: ConfigType = {
    key: 'FlowChart05',
    chartKey: 'VFlowChart05',
    conKey: 'VCFlowChart05',
    title: '流程-icon01',
    category: ChatCategoryEnum.FlowChart,
    categoryName: ChatCategoryEnumName.FlowChart,
    package: PackagesCategoryEnum.DECORATES,
    chartFrame: ChartFrameEnum.STATIC,
    image: 'icon1.png'
}

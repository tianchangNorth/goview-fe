import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const FlowChart02Config: ConfigType = {
    key: 'FlowChart02',
    chartKey: 'VFlowChart02',
    conKey: 'VCFlowChart02',
    title: '流程-五边形',
    category: ChatCategoryEnum.FlowChart,
    categoryName: ChatCategoryEnumName.FlowChart,
    package: PackagesCategoryEnum.DECORATES,
    chartFrame: ChartFrameEnum.STATIC,
    image: 'flow-wubianxing.png'
}

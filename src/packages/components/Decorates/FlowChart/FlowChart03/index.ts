import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const FlowChart03Config: ConfigType = {
    key: 'FlowChart03',
    chartKey: 'VFlowChart03',
    conKey: 'VCFlowChart03',
    title: '平行四边形',
    category: ChatCategoryEnum.FlowChart,
    categoryName: ChatCategoryEnumName.FlowChart,
    package: PackagesCategoryEnum.DECORATES,
    chartFrame: ChartFrameEnum.STATIC,
    image: 'pingxing.png'
}

import { getCampaign } from './functions/getCampaign'
import { getUser } from './functions/getUser'
import { getList } from './functions/getList'
import { organizeData } from './functions/organizeData'
import { verifyUserPlanLimits } from './function/verifyUserPlanLimits'

export const functions = dependencies => ({
    getCampaign: getCampaign(dependencies),
    getUser: getUser(dependencies),
    getList: getList(dependencies),
    organizeData: organizeData(dependencies),
    verifyUserPlanLimits: verifyUserPlanLimits(dependencies)
})
import { getCampaign } from './functions/getCampaign'
import { getUser } from './functions/getUser'
import { getList } from './functions/getList'
import { organizeData } from './functions/organizeData'
import { verifyUserPlanLimits } from './function/verifyUserPlanLimits'
import { notifyUser } from './functions/notifyUser'
import { defineBatchSize } from './functions/defineBatchSize'
import { getRecipients } from './functions/getRecipients'
import { allRecipients } from './functions/allRecipients'
import { saveRecipientsToS3 } from './functions/saveRecipientsToS3'
import { renderBodies } from './functions/renderBodies'

export const functions = dependencies => ({
    getCampaign: getCampaign(dependencies),
    getUser: getUser(dependencies),
    getList: getList(dependencies),
    organizeData: organizeData(dependencies),
    verifyUserPlanLimits: verifyUserPlanLimits(dependencies),
    notifyUser: notifyUser(dependencies),
    defineBatchSize: defineBatchSize(dependencies),
    getRecipients: getRecipients(dependencies),
    saveRecipientsToS3: saveRecipientsToS3(dependencies),
    allRecipients: allRecipients(dependencies),
    renderBodies: renderBodies(dependencies)
})
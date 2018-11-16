import { getCampaign } from './functions/getCampaign'
import { getUser } from './functions/getUser'
import { getList } from './functions/getList'
import { organizeData } from './functions/organizeData'
import { verifyUserPlanLimits } from './functions/verifyUserPlanLimits'
import { notifyUser } from './functions/notifyUser'
import { defineBatchSize } from './functions/defineBatchSize'
import { manageDataSize } from './functions/manageDataSize'
import { getRecipients } from './functions/getRecipients'
import { allRecipients } from './functions/allRecipients'
import { saveRecipientsInS3 } from './functions/saveRecipientsInS3'
import { renderBodies } from './functions/renderBodies'

export const functions = dependencies => ({
    getCampaign: getCampaign(dependencies),
    getUser: getUser(dependencies),
    getList: getList(dependencies),
    organizeData: organizeData(dependencies),
    verifyUserPlanLimits: verifyUserPlanLimits(dependencies),
    notifyUser: notifyUser(dependencies),
    defineBatchSize: defineBatchSize(dependencies),
    manageDataSize: manageDataSize(dependencies),
    getRecipients: getRecipients(dependencies),
    saveRecipientsInS3: saveRecipientsInS3(dependencies),
    allRecipients: allRecipients(dependencies),
    renderBodies: renderBodies(dependencies)
})
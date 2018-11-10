export const verifyUserPlanLimits = ({ plansLimits }) => (planData) => {
    const recipientsLimit = verifyRecipientsLimit(planData.totalRecipients, plansLimits[planData.plan])
    const campaignsLimit = verifyCampaignsLimit(planData.sentCampaigns, plansLimits[planData.plan])

    if (recipientsLimit && campaignsLimit) return 'passed'
    return 'rejected'
}

export const verifyRecipientsLimit = (amount, limit) => {
    //Do any recipient stuff
    return amount < limit.recipients
}

export const verifyCampaignsLimit = (amount, limit) => {
    //Do any campaign stuff
    return amount < limit.campaigns
}
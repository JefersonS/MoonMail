export const organizeData = () => (event) => {
    return Object.assign(
        cleanCampaignData(event.campaign),
        cleanListData(event.list),
        cleanUserData(event.user),
        createSenderData(event.list.senderId, event.user),
        createReputationData(event.user),
        createThrottleData(event.user),
        createPlanData(event.user)
    )
}

/* To be done later */

export const cleanCampaignData = (campaign) => {
    return { campaignData: campaign }
}

export const cleanListData = (list) => {
    return { listData: list }
}

export const cleanUserData = (user) => {
    return { userData: user }
}

export const createSenderData = (senderId, user) => {
    return { senderData: user.senders.filter(s => s.id === senderId) }
}

export const createReputationData = (user) => {
    return { reputationData: user.reputationData }
}

export const createThrottleData = (user) => {
    return { throttleData: user.throttle }
}

export const createPlanData = (user) => {
    return { planData: user.plan }
}
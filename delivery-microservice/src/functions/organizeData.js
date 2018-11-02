export const organizeData = () => (event) => {
    const newEvent = Object.assign(
        cleanCampaignData(event.campaign),
        cleanListData(event.list),
        cleanUserData(event.user),
        createSenderData(event.user),
        createReputationData(user),
        createThrottleData(user),
        createPlanData(event.user)
    )
}

/* To be done later */

export const cleanCampaignData = (campaign) => {
    return campaign
}

export const cleanListData = (list) => {
    return list
}

export const cleanUserData = (user) => {
    return user
}

export const createSenderData = (senderId, user) => {
    return user.sender.filter(s => s.id === senderId)
}

export const createReputationData = (user) => {
    return user.reputation
}

export const createThrottleData = (user) => {
    return user.throttle
}

export const createPlanData = (user) => {
    return user.plan
}
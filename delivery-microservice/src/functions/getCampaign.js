export const getCampaign = ({ DB }) => async (userId, campaignId) => {
    const params = {
        TableName: 'MoonMail-v2-dev-campaigns',
        Key: {
            userId: userId,
            id: campaignId
        }
    }
    const { Item } = await DB.get(params).promise()
    return Item
};
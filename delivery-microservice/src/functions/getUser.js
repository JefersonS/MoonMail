export const getUser = ({ DB }) => async (userId) => {
    const params = {
        TableName: 'MoonMail-v2-dev-users',
        Key: {
            id: userId,
        }
    }
    const { Item } = await DB.get(params).promise()
    return Item
};
export const getList = ({ DB }) => async (userId, listId) => {
    const params = {
        TableName: 'MoonMail-v2-dev-lists',
        Key: {
            userId: userId,
            id: listId,
        }
    }
    const { Item } = await DB.get(params).promise()
    return Item
};
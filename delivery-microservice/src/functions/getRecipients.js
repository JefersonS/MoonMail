export const getRecipients = ({ DB, deflateToBase }) => async (listId, batchInfo, renderInfo = {}) => {
    /* TODO */
    const limit = batchInfo.totalRecipientsForEachMachine
    const lastIndex = renderInfo.lastIndex || null
    console.log(lastIndex)

    const recipientsInfo = createInfo(limit, lastIndex)
    const recipients = deflateToBase(recipientsInfo.recipients)
    return { recipients, lastIndex: recipientsInfo.lastIndex }
}

/* Demo Purposes only */
const createInfo = (limit, lastIndex) => {
    const recipients = []
    let count = lastIndex || 0
    limit += count
    while (count < limit) {
        recipients.push({
            id: count,
            email: 'jefersonebs+' + count + '@gmail.com',
            metadata: {
                name: 'Jeferson ' + count,
                surname: 'Euclides ' + count
            }
        })
        count++
    }

    return { recipients, lastIndex: count }
}
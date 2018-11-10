export const getRecipients = ({ DB }) => async (listId, batchInfo) => {
    /* TODO */
    const limit = batchInfo.totalRecipientsForEachMachine

    return createInfo(limit)
}

/* Demo Purposes only */
const createInfo = (limit) => {
    const recipients = []
    while (limit > 0) {
        recipients.push({
            id: limit,
            email: 'jefersonebs+' + limit + '@gmail.com',
            metadata: {
                name: 'Jeferson ' + limit,
                surname: 'Euclides ' + limit
            }
        })
        limit --
    }

    return recipients
}
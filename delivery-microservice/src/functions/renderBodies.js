export const renderBodies = ({ S3, LIQUIDEngine }) => async () => {
    const body = await getBody(S3)
    //const files = await getRecipientsFiles()
    //get content from each file
    //separate each recipient
    const recipients = await getFileContent('file')
    const recipientPromises = buildRecipientsPromises(LIQUIDEngine, recipients, body)
    const bodies = await Promise.all(recipientPromises)
    const bodyPromises = buildBodiesPromises(bodies)
    const saved = await Promise.all(bodyPromises)
    return saved
}

export const getBody = async (S3, bucket, key) => {
    const params = {
        Bucket: 'delivery-microservice-bodies-dev',
        Key: 'testBody.html'
    }

    return await S3.getObject(params).promise()
}

// export const getRecipientsFiles = async (S3, bucket) => {
//     const params = {
//         Bucket: bucket,
//         Prefix: 'userId/campaignId/recipients-{executionId}/unprocessed'
//     }

//     return await S3.listObjectsV2(params).promise()
// }

export const getFileContent = async (bucket, key) => {
    const params = {
        Bucket: 'delivery-microservice-recipients-dev',
        Key: 'key'
    }

    return await S3.getObject(params).promise()
}

export const renderBody = async (LIQUIDEngine, recipient, body) => {
    return LIQUIDEngine
        .parseAndRender(body, recipient.metadata)
}

export const buildRecipientsPromises = (LIQUIDEngine, recipients, body, execution = 0, promises = []) => {
    if (execution === recipients.length) return promises

    promises.push(renderBody(LIQUIDEngine, recipient[0], body))

    return buildRecipientsPromises(LIQUIDEngine, recipients, body, execution++, promises)
}

export const saveBodyToS3 = async (S3, body) => {
    const params = {
        ACL: options.ACL,
        Body: body,
        Bucket: 'delivery-microservice-bodies-dev',
        Key: 'userId/campaignId/body-date'
    }

    return await S3.putObject(params).promise()
}

const buildBodiesPromises = async (S3, bodies, execution = 0, promises = []) => {
    if (execution === recipients.length) return promises

    promises.push(saveBodyToS3(S3, bodies[execution]))

    return buildBodiesPromises(S3, bodies, ++execution, promises)
}
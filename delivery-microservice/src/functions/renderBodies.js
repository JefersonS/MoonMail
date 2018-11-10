export const renderBodies = ({ S3, LIQUIDEngine }) => async () => {
    const { Body } = await getBody(S3)
    //const files = await getRecipientsFiles()
    //get content from each file
    //separate each recipient
    const s3Object = await getFileContent(S3)
    const recipients = JSON.parse(s3Object.Body)

    const recipientPromises = buildRecipientsPromises(LIQUIDEngine, recipients, Body)
    const bodies = await Promise.all(recipientPromises)
    console.log(bodies.length)
    const bodyPromises = buildBodiesPromises(S3, bodies)
    const saved = await Promise.all(bodyPromises)
    return saved
}

export const getBody = async (S3, bucket, key) => {
    const params = {
        Bucket: 'delivery-microservice-bodies-dev',
        Key: 'body.html'
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

export const getFileContent = async (S3, bucket, key) => {
    const params = {
        Bucket: 'delivery-microservice-recipients-dev',
        Key: 'test/test.txt'
    }

    return await S3.getObject(params).promise()
}

export const renderBody = async (LIQUIDEngine, recipient, body) => {
    return LIQUIDEngine
        .parseAndRender(body, recipient.metadata)
}

export const buildRecipientsPromises = (LIQUIDEngine, recipients, body, execution = 0, promises = []) => {
    if (execution === recipients.length) return promises

    promises.push(renderBody(LIQUIDEngine, recipients[execution], body))

    return buildRecipientsPromises(LIQUIDEngine, recipients, body, ++execution, promises)
}

export const saveBodyToS3 = async (S3, body, execution) => {
    const params = {
        ACL: 'private',
        Body: body,
        Bucket: 'delivery-microservice-bodies-dev',
        Key: 'userId/campaignId/body-date-' + new Date().getTime() + '.html'
    }

    return await S3.putObject(params).promise()
}

const buildBodiesPromises = (S3, bodies, execution = 0, promises = []) => {
    if (execution === bodies.length) return promises

    promises.push(saveBodyToS3(S3, bodies[execution]))

    return buildBodiesPromises(S3, bodies, ++execution, promises)
}
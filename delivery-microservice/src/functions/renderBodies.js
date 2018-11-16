export const renderBodies = ({ S3, LIQUID, unzipFromBase, deflateToBase }) => async (recipientsList) => {
    const campaignBody = await getCampaignBody(S3)
    const recipients = unzipFromBase(recipientsList.recipients)

    const renderingPromises = buildRenderingPromises(LIQUID, recipients, campaignBody)
    const renderedBodies = await Promise.all(renderingPromises)

    // const bodyPromises = buildBodiesPromises(S3, renderedBodies)
    // const savedBodies = await Promise.all(bodyPromises)

    const deflatedBodies = deflateAllBodies(renderedBodies, deflateToBase)

    const saved = await saveBodiesInS3(deflatedBodies, S3)
    return { processedBodies: renderedBodies.length, processedRecipients: renderedBodies.length, lastRecipientIndex: recipientsList.lastIndex }
}

export const getCampaignBody = async (S3, bucket, key) => {
    const params = {
        Bucket: 'delivery-microservice-bodies-dev',
        Key: 'body.html'
    }
    const { Body } = await S3.getObject(params).promise()
    return Body
}

export const renderBody = async (LIQUID, recipient, body) => {
    return LIQUID
        .parseAndRender(body, recipient.metadata)
}

export const buildRenderingPromises = (LIQUID, recipients, body, execution = 0, promises = []) => {
    if (execution === recipients.length) return promises

    promises.push(renderBody(LIQUID, recipients[execution], body))

    return buildRenderingPromises(LIQUID, recipients, body, ++execution, promises)
}

export const deflateRenderedBody = (body, deflateToBase) => {
    const deflatedBody = deflateToBase(body)
    return deflatedBody
}

export const deflateAllBodies = (bodies, deflateToBase) => {
    return bodies.map(body => deflateRenderedBody(body, deflateToBase))
}

export const saveBodyToS3 = async (body, S3) => {
    const params = {
        ACL: 'private',
        Body: body,
        Bucket: 'delivery-microservice-bodies-dev',
        Key: 'userId/campaignId/body-date-' + new Date().getTime() + '.html'
    }

    return await S3.putObject(params).promise()
}

// const buildBodiesPromises = (S3, bodies, execution = 0, promises = []) => {
//     if (execution === bodies.length) return promises

//     promises.push(saveBodyToS3(S3, bodies[execution]))

//     return buildBodiesPromises(S3, bodies, ++execution, promises)
// }

const saveBodiesInS3 = async (bodies, S3) => {
    const singleBody = JSON.stringify(bodies)
    return await saveBodyToS3(singleBody, S3)
}
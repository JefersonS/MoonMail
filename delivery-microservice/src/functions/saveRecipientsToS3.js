export const saveRecipientsToS3 = ({ S3 }) => async (recipients) => {
    /* Should come from handler
       executionId should be an id generated from the cuncurrent exection */

    const options = {
        Bucket: 'delivery-microservice-recipients-dev',
        Key: 'test/' + new Date().getDate(), /* userId/campaignId/recipients{executionId}/unprocessed-newDate() */
        Body: recipients,
        ACL: 'private'
    };


    const bucket = await createBucket(S3, options)
    const file = await createFile(S3, options)
    return { bucket, file, processedRecipients: recipients.length };
}

const createBucket = async (S3, options) => {
    const params = {
        ACL: options.ACL,
        Bucket: options.Bucket,
    }

    return await S3.createBucket(params).promise()
}

const createFile = async (S3, options, recipients) => {
    const params = {
        ACL: options.ACL,
        Body: recipients,
        Bucket: options.Bucket,
        Key: options.Key
    }

    return await S3.putObject(params).promise()
}

const getFile = async (S3, options) => {
    const params = {
        Bucket: options.Bucket,
        Key: options.Key
    }

    return await S3.getObject(params).promise()
}
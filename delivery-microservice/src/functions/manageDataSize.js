/*
    Even after the maths of Define Batch Size, there's still the chance of running out of memory due to a high amount of data.
    In case that happens a States.Timeout or States.DataLimitExceeded will be thrown, caught and sent back here.
    The job of this function is to reduce the size of the batch as an attempt to keep the process going, while maitaning the full amount of the batch for further use
*/

export const manageDataSize = ({ }) => (batchInfo, error = {}, renderInfo = {}) => {
    if (error && (error.Error === 'States.Timeout' || error.Error === 'States.DataLimitExceeded')) {
        const batchSizeForMachine = batchInfo.batchSizeForEachMachine
        const batchSizeForRecipients = batchInfo.totalRecipientsForEachMachine

        const newSizeForMachine = batchSizeForMachine / 2
        const newSizeForRecipients = batchSizeForRecipients / 2

        batchInfo.batchSizeForEachMachine = newSizeForMachine
        batchInfo.totalRecipientsForEachMachine = newSizeForRecipients

        if (!batchInfo.execution) {
            batchInfo.totalExecutionBatchSize = batchSizeForMachine
            batchInfo.totalExecutionRecipients = batchSizeForRecipients
        }

        batchInfo.execution += 1

        return batchInfo
    } else if (error && error.Error === 'NEW_EXECUTION_REQUIRED') {
        const processedRecipients = renderInfo.processedRecipients

        batchInfo.totalProcessedRecipients += processedRecipients

        console.log(processedRecipients)

        batchInfo.execution += 1

        return batchInfo
    } else {
        batchInfo.execution = 0
        batchInfo.processedRecipients = 0
        batchInfo.totalProcessedRecipients = 0

        return batchInfo
    }
}
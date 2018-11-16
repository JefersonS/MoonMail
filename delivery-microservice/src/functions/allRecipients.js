export const allRecipients = ({ customError }) => (renderInfo, batchInfo) => {
    const totalRecipients = batchInfo.totalExecutionRecipients || batchInfo.totalRecipientsForEachMachine
    const totalProcessedRecipients = batchInfo.totalProcessedRecipients + renderInfo.processedRecipients
    if (totalProcessedRecipients < totalRecipients) { throw new customError('NEW_EXECUTION_REQUIRED', 'Not all recipients were processed yet') }
    else { return 'PASSED' }
}
export const allRecipients = ({ }) => (processedRecipients, totalRecipients) => {
    if (processedRecipients < totalRecipients) { throw 'should go back' } /* should actually throw a step error and then go back to state 1 */
    else { return 'PASSED' }
}
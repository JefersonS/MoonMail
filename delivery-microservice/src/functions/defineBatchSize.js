/* 

The number of recipients can scale to unimaginable proportions. The problem is that when dealing with Lambda we have a limit of both: memory and time.
This function is to measure how many recipients each render process can take at once, defining the batch size.
The math here is simple: 

1st: Gets the total size that will be processed, which is found by multiplying the number of recipients to the body size;
2nd: Find how many machines will be necessary, we don't want to have 5 recipients and see each machine processing one of them as we don't want to have one machine processing way more than the other;
3rd: Find how many recipients each machine will process in total, with the total size and the number of necessary machines we can find the amount of total data per machine, this can cost more than one execution;
4th: Find how many recipients each machine will process in each execution, in case there's more recipients than the lambda can process in one execution, the amount is split to fit in the limits;
5th: With the amount of recipients for each machine, we calculate the size of the batch each execution will process;

We gather all important information: totalSize, maxNecessaryMachines, totalSizeForEachMachine, batchSizeForEachMachine, totalRecipientsForEachMachine, and send forward to the next steps.

*/

export const defineBatchSize = ({ }) => (totalRecipients, bodySize, stateMachineMaxMemory = 924000000/*(1024-100) = 924 * 1000000*/, maxStateMachines = 5) => {
    const totalSize = getTotalSize(totalRecipients, bodySize)
    const maxNecessaryMachines = getMaxNecessaryMachines(totalSize, stateMachineMaxMemory, maxStateMachines)
    const totalSizeForEachMachine = getTotalSizeForEachMachine(totalSize, maxNecessaryMachines)
    const totalRecipientsForEachMachine = getTotalRecipientsForEachMachine(maxNecessaryMachines, totalSizeForEachMachine, stateMachineMaxMemory, totalRecipients, bodySize)
    const batchSizeForEachMachine = getBatchSizeForEachMachine(totalRecipientsForEachMachine, bodySize)

    return { totalSize, maxNecessaryMachines, totalSizeForEachMachine, totalRecipientsForEachMachine, batchSizeForEachMachine }
}

const getTotalSize = (totalRecipients, bodySize) => {
    const totalSize = totalRecipients * bodySize //bytes
    return Math.ceil(totalSize)
}

const getMaxNecessaryMachines = (totalSize, stateMachineMaxMemory, maxStateMachines) => {
    if (totalSize < stateMachineMaxMemory) return 1
    const necessaryMachines = totalSize / stateMachineMaxMemory
    const maxNecessaryMachines = Math.ceil(necessaryMachines)
    if (maxNecessaryMachines > maxStateMachines) return 5
    return maxNecessaryMachines
}

const getTotalSizeForEachMachine = (totalSize, maxNecessaryMachines) => {
    const totalSizeForEachMachine = totalSize / maxNecessaryMachines
    return Math.ceil(totalSizeForEachMachine)
}

const getTotalRecipientsForEachMachine = (maxNecessaryMachines, totalSizeForEachMachine, stateMachineMaxMemory, totalRecipients) => {
    if (maxNecessaryMachines == 1 || totalSizeForEachMachine <= stateMachineMaxMemory) return totalRecipients
    const totalRecipientsForEachMachine = stateMachineMaxMemory / bodySize
    return Math.ceil(totalRecipientsForEachMachine)
}

const getBatchSizeForEachMachine = (totalRecipientsForEachMachine, bodySize) => {
    const batchSizeForEachMachine = totalRecipientsForEachMachine * bodySize
    return Math.ceil(batchSizeForEachMachine)
}
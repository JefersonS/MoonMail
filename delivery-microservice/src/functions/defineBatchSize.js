export const defineBatchSize = ({ }) => (recipients, bodySize, stateMachineMaxMemory = 1024000000/*1024 * 1000000*/, maxStateMachines = 5) => {
    const totalSize = recipients * bodySize //bytes
    const maxNecessaryMachines = getMaxNecessaryMachines(totalSize, stateMachineMaxMemory, maxStateMachines)
    const totalSizeForEachMachine = totalSize / maxNecessaryMachines
    const batchSizeForEachMachine = getBatchSizeForEachMachine(totalSizeForEachMachine, maxNecessaryMachines, stateMachineMaxMemory)
    const totalRecipientsForEachMachine = batchSizeForEachMachine / bodySize

    return { totalSize, maxNecessaryMachines, totalSizeForEachMachine, batchSizeForEachMachine, totalRecipientsForEachMachine }
}

const getMaxNecessaryMachines = (totalSize, stateMachineMaxMemory, maxStateMachines) => {
    let maxNecessaryMachines = 1
    while (maxNecessaryMachines < maxStateMachines) {
        if (totalSize < stateMachineMaxMemory * maxNecessaryMachines) break
        maxNecessaryMachines++
    }
    return maxNecessaryMachines
}

const getBatchSizeForEachMachine = (totalSizeForEachMachine, maxNecessaryMachines, stateMachineMaxMemory) => {
    if (maxNecessaryMachines == 1) return totalSizeForEachMachine
    return totalSizeForEachMachine / stateMachineMaxMemory
}
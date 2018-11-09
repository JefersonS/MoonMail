import { DynamoDB } from 'aws-sdk'
import { functions } from './src/functionsHandler'
import { plansLimit } from './src/libs/plansLimits'

const DB = new DynamoDB.DocumentClient()

export const getCampaign = async (event) => {
  try {
    const dependencies = { DB }
    return await functions(dependencies).getCampaign(event.userId, event.campaignId)
  } catch (error) {
    // log where needed
    // log to cloud watch
    throw error
  }
};

export const getUser = async (event) => {
  try {
    const dependencies = { DB }
    return await functions(dependencies).getUser(event.userId)
  } catch (error) {
    // log where needed
    // log to cloud watch
    throw error
  }
};

export const getList = async (event) => {
  try {
    const dependencies = { DB }
    return await functions(dependencies).getList(event.userId, event.listId)
  } catch (error) {
    // log where needed
    // log to cloud watch
    throw error
  }
};

export const organizeData = async (event) => {
  try {
    const dependencies = {}
    return await functions(dependencies).organizeData(event)
  } catch (e) {
    // log where needed
    // log to cloud watch
    throw error
  }
}

export const verifyUserPlanLimits = async (event) => {
  try {
    const dependencies = { plansLimit }
    return await functions(dependencies).verifyUserPlanLimits(event.planData)
  } catch (error) {
    // log where needed
    // log to cloud watch
    throw error
  }
}

export const notifyUser = async (event) => {
  try {
    const dependencies = { SES }
    //const notification = await functions(dependencies).notifyUser(event.list, event.user, event.campaign/*, body*/) //working, just avoiding extra emails
    return { notification: 'notification' };
  } catch (error) {
    // log where needed
    // log to cloud watch
    throw error
  }
};

export const defineBatchSize = async (event) => {
  const dependencies = {}
  return functions(dependencies).defineBatchSize(event.sendingInfo.totalRecipients, event.sendingInfo.bodySize)
};

export const getRecipients = async (event) => {
  const dependencies = { DB }
  return functions(dependencies).getRecipients(event.list, event.batchInfo)
};

export const saveRecipientsToS3 = async () => {
  const dependencies = { S3 }
  return functions(dependencies).saveRecipientsToS3(event.recipientsList)
}

export const allRecipients = async () => {
  const dependencies = {}
  return functions(dependencies).allRecipients(event.s3Data.processedRecipients, event.batchInfo.totalRecipientsForEachMachine)
}

export const renderBodies = async () => {
  const dependencies = { S3, LIQUIDEngine }
  return functions(dependencies).renderBodies()
}
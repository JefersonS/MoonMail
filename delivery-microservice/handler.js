import { DynamoDB, SES as SESCLIENT, S3 as S3CLIENT } from 'aws-sdk'
import { functions } from './src/functionsHandler'
import { plansLimits } from './src/libs/plansLimits'
import { deflateToBase, unzipFromBase, customError } from './src/libs/utils'
const Liquid = require("liquid-node")

const DB = new DynamoDB.DocumentClient()
const S3 = new S3CLIENT()
const SES = new SESCLIENT()
const LIQUID = new Liquid.Engine

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
  } catch (error) {
    // log where needed
    // log to cloud watch
    throw error
  }
}

export const verifyUserPlanLimits = async (event) => {
  try {
    const dependencies = { plansLimits }
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
  try {
    const dependencies = {}
    return functions(dependencies).defineBatchSize(event.sendingInfo.totalRecipients, event.sendingInfo.bodySize)
  } catch (error) {
    // log where needed
    // log to cloud watch
    throw error
  }
};

export const manageDataSize = async (event) => {
  try {
    const dependencies = {}
    return functions(dependencies).manageDataSize(event.batchInfo, event.errorInfo, event.renderInfo)
  } catch (error) {
    // log where needed
    // log to cloud watch
    throw error
  }
}

export const getRecipients = async (event) => {
  try {
    const dependencies = { DB, deflateToBase }
    return functions(dependencies).getRecipients(event.list, event.batchInfo, event.renderInfo)
  } catch (error) {
    // log where needed
    // log to cloud watch
    throw error
  }
};

export const renderBodies = async (event) => {
  try {
    const dependencies = { S3, LIQUID, unzipFromBase, deflateToBase }
    return functions(dependencies).renderBodies(event.recipientsList)
  } catch (error) {
    // log where needed
    // log to cloud watch
    throw error
  }
}

export const allRecipients = async (event) => {
  try {
    const dependencies = { customError }
    console.log(functions(dependencies).allRecipients)
    return functions(dependencies).allRecipients(event.renderInfo, event.batchInfo)
  } catch (error) {
    // log where needed
    // log to cloud watch
    throw error
  }
}
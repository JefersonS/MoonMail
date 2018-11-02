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
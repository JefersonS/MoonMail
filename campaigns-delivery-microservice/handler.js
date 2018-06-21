const getCampaign = require('./functions/getCampaign')
const getUser = require('./functions/getUser')
const campaignModel = require('./lib/campaign_model')
const userModel = require('./lib/user_model')
const AWS = require('aws-sdk')
const DB = new AWS.DynamoDB.DocumentClient()

module.exports.startDeliveryProcess = async (event, context, callback) => {
  const model = campaignModel.model({ DB })
  console.log(await getCampaign.getCampaign({ model })())
  callback(null, '')
  //checkEvent
  //getCampaign
  //publishToSns
}

module.exports.findAndAttachUser = async (event, context, callback) => {
  const model = userModel.model({ DB })
  console.log(await getUser.getUser({ model })())
  callback(null, '')
}

module.exports.model = ({ DB }) => ({
  readOne: async ({ userId, id }) => readOne({ DB })({ userId, id })
})

const readOne = ({ DB }) => async ({ id }) => {
  try {
    const params = {
      TableName: process.env.USERTABLE,
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': id
      }
    };

    return await DB.query(params).promise()
  } catch (e) {
    throw e.toString()
  }
}
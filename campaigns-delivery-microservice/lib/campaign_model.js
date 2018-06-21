
module.exports.model = ({ DB }) => ({
  readOne: async ({ userId, id }) => readOne({ DB })({ userId, id })
})

const readOne = ({ DB }) => async ({ userId, id }) => {
  try {
    const params = {
      TableName: process.env.CAMPAIGNTABLE,
      KeyConditionExpression: 'userId = :userId and id = :id',
      ExpressionAttributeValues: {
        ':userId': userId,
        ':id': id
      }
    };

    return await DB.query(params).promise()
  } catch (e) {
    throw e.toString()
  }
}
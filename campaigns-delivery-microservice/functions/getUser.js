const getUser = ({ model }) => async (event) => {
  try {
    const user = await model.readOne({ id: 'google-oauth2|100043132736689063064' })
    console.log(user)
    return 'a'
  } catch (error) {
    console.log(error)
    return 'b'
  }
}

module.exports = {
  getUser
}
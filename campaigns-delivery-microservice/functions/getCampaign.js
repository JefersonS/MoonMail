const getCampaign = ({ model }) => async (event) => {
  try {
    const campaign = await model.readOne({ userId: 'google-oauth2|100043132736689063064', id: 'ciq0xnrkf000001nrly4talw1' })
    console.log(campaign)
    return 'a'
  } catch (error) {
    console.log(error)
    return 'b'
  }
}

module.exports = {
  getCampaign
}
export const notifyUser = ({ SES }) => async (list, user, campaign, bodyTemplate) => {
    const params = {
        Destination: {
            ToAddresses: [user.email]
        },
        Source: 'jeferson.euclides@microapps.com',
        Template: /*bodyTemplate*/'TEMPLATE_NAME',
        TemplateData: '{ \"name\":\"Jeferson\", \"favoriteanimal\":\"wolf\" }' // update
    };


    return await SES.sendTemplatedEmail(params).promise();
}
import { SES } from 'aws-sdk'

const handler = async (event) => {
    const params = {
        "Source": "jeferson.euclides@microapps.com",
        "Template": "TEMPLATE_NAME",
        "ConfigurationSetName": "ConfigSet",
        "Destination": {
            "ToAddresses": ["jefersonebs@gmail.com"]
        },
        "TemplateData": "{ \"name\":\"Jeferson\", \"favoriteanimal\": \"wolf\" }"
    }
}


import { Recipient, List } from 'moonmail-models';
import { debug } from '../../lib/logger';
import decrypt from '../../lib/auth-token-decryptor';
import base64url from 'base64-url';
import { ApiErrors } from '../../lib/errors';

export function respond(event, cb) {
  debug('= createRecipient.action', JSON.stringify(event));
  decrypt(event.authToken)
    .then((decoded) => checkEvent(decoded, event))
    .then(setNewRecipient)
    .then(checkRecipientExistence)
    .then(extractMetadata)
    .then(saveNewRecipient)
    .then(appendMetadataAttributes)
    .then((recipient) => cb(null, recipient))
    .catch(e => handleErrors(e, cb))
}

const checkEvent = async (user, event) => {
  debug('= createRecipient.checkEvent', JSON.stringify(user), JSON.stringify(event));
  if (!event.listId || !event.recipient || !event.recipient.email) throw 'No recipient specified'
  return { user, event }
}

const setNewRecipient = async ({ user, event }) => {
  debug('= createRecipient.setNewRecipient', JSON.stringify(user), JSON.stringify(event));
  const recipient = event.recipient;
  recipient.listId = event.listId;
  recipient.id = base64url.encode(recipient.email);
  recipient.status = recipient.status || Recipient.statuses.subscribed;
  recipient.userId = user.sub;
  recipient.subscriptionOrigin = Recipient.subscriptionOrigins.manual;

  return recipient
}

const checkRecipientExistence = async (recipient) => {
  debug('= createRecipient.checkRecipientExistence', JSON.stringify(recipient));
  const foundRecipient = await Recipient.get(recipient.listId, recipient.id);
  if (foundRecipient && foundRecipient.status == Recipient.statuses.unsubscribed) throw 'Recipient has unsubscribed from this list'
  else return recipient
}

const extractMetadata = async (recipient) => {
  debug('= createRecipient.extractMetadata', JSON.stringify(recipient));
  const metadataAttributes = Object.keys(recipient.metadata || {});
  return { recipient, metadataAttributes }
}

const saveNewRecipient = async ({ recipient, metadataAttributes }) => {
  debug('= createRecipient.saveNewRecipient', JSON.stringify(recipient), JSON.stringify(metadataAttributes));
  await Recipient.save(recipient);
  return { recipient, metadataAttributes };
}

const appendMetadataAttributes = async ({ recipient, metadataAttributes }) => {
  debug('= createRecipient.appendMetadataAttributes', JSON.stringify(recipient), JSON.stringify(metadataAttributes));
  await List.appendMetadataAttributes(metadataAttributes, { userId: recipient.userId, listId: recipient.listId });
  return recipient;
}

const handleErrors = async (e, cb) => {
  debug('= createRecipient.handleErrors', JSON.stringify(e));
  return cb(ApiErrors.response(e), null);
}
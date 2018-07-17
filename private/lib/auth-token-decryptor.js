import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import { GetUserAccountService } from '../api/users/account/lib/get_user_account_service';
import errors from '../api/lib/errors';
import { S3 } from 'aws-sdk'

const s3 = new S3();

const params = {
  Bucket: "token-pem-file",
  Key: "auth.pem"
};

export default function decrypt(authToken) {
  const cert = fs.readFileSync('lib/certs/auth.pem');
  return new Promise((resolve, reject) => {
    s3.getObject(params).promise().then(f => {
      const tokenWithoutBearer = authToken.split(' ')[1];
      jwt.verify(tokenWithoutBearer, f.Body, { algorithms: ['RS256'] }, (err, decoded) => {
        if (err) {
          reject(errors.InvalidToken);
        } else {
          resolve(Object.assign({}, decoded, decoded.app_metadata));
        }
      });
    });
  })
}

export function getUserContext(userId) {
  return GetUserAccountService.getAccount(userId);
}

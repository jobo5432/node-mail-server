# node-mail-server

You will need to add a credentials.js file at the root of this project (same directory as index.js). This will have the following format:

```javascript
module.exports = {
  emailCredentials: {
    service : 'gmail',
    username: '<your email>@gmail.com',
    password: '<your password>',
    bccRecipients: [<recipient 1>, <recipient 2>, ..., <recipient n>]
  }
};
```
This file is ignored via .gitignore and not tracked for obvious reasons.

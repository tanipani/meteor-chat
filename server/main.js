import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Messages } from '../shared/db';

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.users.remove({});
  [
    { name: 'rick', password: 'lllmb', email: 'rick@sanchez.rocks' },
    { name: 'morty', password: 'gyst', email: 'morty@gmail.com' }
  ].forEach(user => {
    Accounts.createUser({ username: user.name, password: user.password, email: user.email });
  });
});

Meteor.publish('messages', () => {
  return Messages.find();
});

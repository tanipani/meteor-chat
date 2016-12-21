import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Messages } from '../shared/db';
import { Meteor } from 'meteor/meteor';

import './main.html';
import '../node_modules/material-design-lite/dist/material.min.css';
import '../node_modules/material-design-lite/dist/material.min.js';


Meteor.subscribe('messages');

Template.chat.helpers({
  messages() {
    return Messages.find({}, { sort: { time: -1 }});
  },
  isLoggedIn() {
    return !!Meteor.userId();
  }
});

Template.chat.events({
  'submit .msg-form'(event, instance) {
    event.preventDefault();
    const username = Meteor.user() && Meteor.user().username;
    if (!username) return;
    const msg = instance.find('#msg-input').value;
    instance.find('.msg-form').reset();
    Messages.insert({ msg, username, time: Date.now() });
    console.log("Send message");
  }
});


Template.msgForm.onRendered(() => {
  componentHandler.upgradeDom();
});

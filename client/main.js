import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import '../imports/startup/accounts-config.js';
import { Template } from 'meteor/templating';
import './templates/dashboard.html';
import './templates/admin_panel.html';
import './templates/case_card.html';
import './templates/case_form.html';
import './templates/situation_form.html';
import './templates/interaction_form.html';
import './templates/login.html';
import './templates/register.html';
import './stylesheets/style.css';
import './stylesheets/bootstrap.min.css';

Meteor.startup(() => {
  // Code to run on client startup
});

Accounts.ui.config({
  requestPermissions: {
    google: ['profile', 'email'],
  },
});

Template.body.helpers({
  isAdmin() {
    return Roles.userIsInRole(Meteor.userId(), 'admin');
  },
});

Template.body.events({
  'click .logout': function(event) {
    event.preventDefault();
    Meteor.logout();
  }
});
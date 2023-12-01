import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Roles } from 'meteor/alanning:roles';

import './admin_panel.html';

Template.admin_panel.onCreated(function() {
  this.autorun(() => {
    if (!Meteor.userId() || !Roles.userIsInRole(Meteor.userId(), 'admin')) {
      FlowRouter.go('dashboard');
    }
  });
});

Template.admin_panel.helpers({
  users() {
    return Meteor.users.find();
  },
  roles() {
    return Roles.getAllRoles();
  },
  isSelected(user, role) {
    return Roles.userIsInRole(user._id, role.name) ? 'selected' : '';
  }
});

Template.admin_panel.events({
  'submit #assign-role-form'(event) {
    event.preventDefault();
    const target = event.target;
    const user = target.user.value;
    const role = target.role.value;

    Meteor.call('assignRole', user, role, (error) => {
      if (error) {
        alert(error.reason);
      } else {
        alert('Role assigned successfully.');
      }
    });
  }
});

Meteor.methods({
  assignRole(userId, role) {
    if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('not-authorized', 'You must be an admin to do this.');
    }

    Roles.addUsersToRoles(userId, role);
  }
});
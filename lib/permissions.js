import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

const Permissions = {
  isAdmin(userId) {
    return Roles.userIsInRole(userId, 'admin');
  },
  isReviewer(userId) {
    return Roles.userIsInRole(userId, 'reviewer');
  },
  canEditCase(userId) {
    return Roles.userIsInRole(userId, ['case-editor', 'admin']);
  },
  canEditSituation(userId) {
    return Roles.userIsInRole(userId, ['situation-editor', 'admin']);
  },
  canEditInteraction(userId) {
    return Roles.userIsInRole(userId, ['interaction-editor', 'admin']);
  }
};

Meteor.users.allow({
  insert(userId) {
    return Permissions.isAdmin(userId);
  },
  update(userId, user, fields, modifier) {
    return Permissions.isAdmin(userId);
  },
  remove(userId) {
    return Permissions.isAdmin(userId);
  }
});

export default Permissions;
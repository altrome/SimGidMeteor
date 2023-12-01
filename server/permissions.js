import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

Meteor.startup(() => {
  // Create default roles if they don't exist
  if (!Meteor.roles.findOne({ name: 'admin' })) {
    Roles.createRole('admin');
  }

  if (!Meteor.roles.findOne({ name: 'reviewer' })) {
    Roles.createRole('reviewer');
  }

  if (!Meteor.roles.findOne({ name: 'case-editor' })) {
    Roles.createRole('case-editor');
  }

  if (!Meteor.roles.findOne({ name: 'situation-editor' })) {
    Roles.createRole('situation-editor');
  }

  if (!Meteor.roles.findOne({ name: 'interaction-editor' })) {
    Roles.createRole('interaction-editor');
  }
});

// Helper functions to check user permissions
export const isAdmin = function(userId) {
  return Roles.userIsInRole(userId, 'admin');
};

export const isReviewer = function(userId) {
  return Roles.userIsInRole(userId, 'reviewer');
};

export const canEditCase = function(userId) {
  return Roles.userIsInRole(userId, ['admin', 'case-editor', 'reviewer'], Roles.GLOBAL_GROUP);
};

export const canEditSituation = function(userId) {
  return Roles.userIsInRole(userId, ['admin', 'situation-editor', 'reviewer'], Roles.GLOBAL_GROUP);
};

export const canEditInteraction = function(userId) {
  return Roles.userIsInRole(userId, ['admin', 'interaction-editor', 'reviewer'], Roles.GLOBAL_GROUP);
};
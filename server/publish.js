import { Meteor } from 'meteor/meteor';
import { Cases, Situations, Interactions } from '/lib/collections.js';
import { Roles } from 'meteor/alanning:roles';

Meteor.publish('cases', function () {
  if (!this.userId) {
    return this.ready();
  }

  if (Roles.userIsInRole(this.userId, ['admin', 'reviewer'])) {
    return Cases.find({});
  }

  return Cases.find({ 'authors.author1': this.userId });
});

Meteor.publish('situations', function (caseId) {
  check(caseId, String);

  if (!this.userId) {
    return this.ready();
  }

  if (Roles.userIsInRole(this.userId, ['admin', 'reviewer'])) {
    return Situations.find({ caseId: caseId });
  }

  return Situations.find({ caseId: caseId, 'authors.author1': this.userId });
});

Meteor.publish('interactions', function (caseId) {
  check(caseId, String);

  if (!this.userId) {
    return this.ready();
  }

  if (Roles.userIsInRole(this.userId, ['admin', 'reviewer'])) {
    return Interactions.find({ caseId: caseId });
  }

  return Interactions.find({ caseId: caseId, 'authors.author1': this.userId });
});

Meteor.publish('userData', function () {
  if (this.userId) {
    return Meteor.users.find({ _id: this.userId }, {
      fields: { roles: 1 }
    });
  } else {
    return this.ready();
  }
});
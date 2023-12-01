import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Cases } from '/lib/collections.js';
import { canEditCase } from '/lib/permissions.js';

Template.case_card.helpers({
  isReviewer() {
    return canEditCase(Meteor.userId());
  }
});

Template.case_card.events({
  'click .edit-case': function(event, template) {
    event.preventDefault();
    const caseId = this._id;
    if (canEditCase(Meteor.userId())) {
      FlowRouter.go('editCase', { _id: caseId });
    } else {
      alert("You don't have permission to edit this case.");
    }
  },
  'click .view-case': function(event, template) {
    event.preventDefault();
    const caseId = this._id;
    FlowRouter.go('viewCase', { _id: caseId });
  }
});
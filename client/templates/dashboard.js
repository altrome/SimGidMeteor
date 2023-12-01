import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Cases } from '/lib/collections.js';
import { Roles } from 'meteor/alanning:roles';
import './dashboard.html';

Template.dashboard.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('cases');
  });
});

Template.dashboard.helpers({
  cases() {
    return Cases.find({}, { sort: { createdAt: -1 } });
  },
  canEdit() {
    return Roles.userIsInRole(Meteor.userId(), ['reviewer', 'admin']);
  }
});

Template.dashboard.events({
  'submit #search-case'(event, template) {
    event.preventDefault();
    const caseName = event.target.caseName.value;
    template.subscribe('cases', caseName);
  },
  'change #filter-date'(event, template) {
    event.preventDefault();
    const fromDate = event.target.fromDate.value;
    const toDate = event.target.toDate.value;
    template.subscribe('cases', null, fromDate, toDate);
  },
  'click .case-card'(event) {
    event.preventDefault();
    const caseId = this._id;
    FlowRouter.go('CaseDetail', { _id: caseId });
  },
  'click #edit-case'(event) {
    event.preventDefault();
    const caseId = this._id;
    if (Roles.userIsInRole(Meteor.userId(), ['reviewer', 'admin'])) {
      FlowRouter.go('EditCase', { _id: caseId });
    } else {
      alert('You do not have permission to edit this case.');
    }
  }
});
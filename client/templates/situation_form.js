import { Template } from 'meteor/templating';
import { Cases } from '/lib/collections.js';
import { Situations } from '/lib/collections.js';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.situation_form.onCreated(function() {
  this.autorun(() => {
    this.subscribe('cases');
  });
});

Template.situation_form.helpers({
  cases() {
    return Cases.find();
  },
  canEditSituation() {
    return Roles.userIsInRole(Meteor.userId(), 'situation-editor');
  }
});

Template.situation_form.events({
  'submit #situation-form'(event) {
    event.preventDefault();
    const target = event.target;
    const author1 = target.author1.value;
    const author2 = target.author2.value;
    const author3 = target.author3.value;
    const email = target.email.value;
    const caseId = target.case.value;
    const date = target.date.value;
    const description = target.description.value;

    const situation = {
      author1,
      author2,
      author3,
      email,
      caseId,
      date,
      description,
      createdAt: new Date(),
      createdBy: Meteor.userId()
    };

    Meteor.call('createSituation', situation, (error, result) => {
      if (error) {
        alert(error.reason);
      } else {
        FlowRouter.go('dashboard');
        // Send message to case creator and reviewer
        const caseItem = Cases.findOne(caseId);
        if (caseItem) {
          const creatorId = caseItem.createdBy;
          const reviewerId = caseItem.reviewerId;
          Meteor.call('sendEmail', creatorId, 'caseCreatedEmail', situation);
          Meteor.call('sendEmail', reviewerId, 'reviewNotificationEmail', situation);
        }
      }
    });
  }
});
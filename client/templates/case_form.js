import { Template } from 'meteor/templating';
import { Cases } from '/lib/collections.js';
import { Meteor } from 'meteor/meteor';

Template.case_form.onCreated(function() {
  this.autorun(() => {
    this.subscribe('cases');
  });
});

Template.case_form.helpers({
  cases() {
    return Cases.find();
  }
});

Template.case_form.events({
  'submit #case-form'(event, instance) {
    event.preventDefault();
    const target = event.target;
    const author1 = target.author1.value;
    const author2 = target.author2.value;
    const author3 = target.author3.value;
    const nameSurname = target.nameSurname.value;
    const dateOfBirth = target.dateOfBirth.value;
    const physicalDescription = target.physicalDescription.value;
    const biologicalSex = target.biologicalSex.value;

    const caseData = {
      author1,
      author2,
      author3,
      nameSurname,
      dateOfBirth,
      physicalDescription,
      biologicalSex,
      createdAt: new Date(),
      createdBy: Meteor.userId()
    };

    Meteor.call('createCase', caseData, (error, caseId) => {
      if (error) {
        alert(error.message);
      } else {
        target.reset();
        // Send message to case creator and reviewer
        Meteor.call('sendEmail', caseId, 'caseCreatedEmail');
      }
    });
  }
});
Template.interaction_form.onCreated(function() {
  this.autorun(() => {
    this.subscribe('Cases');
  });
});

Template.interaction_form.helpers({
  cases() {
    return Cases.find();
  },
  canEditInteraction() {
    return Roles.userIsInRole(Meteor.userId(), 'interaction-editor');
  }
});

Template.interaction_form.events({
  'submit #interaction-form'(event, instance) {
    event.preventDefault();
    const target = event.target;

    const interaction = {
      author1: target.author1.value,
      author2: target.author2.value,
      author3: target.author3.value,
      email: target.email.value,
      caseId: target.case.value,
      date: target.date.value,
      description: target.description.value
    };

    Meteor.call('createInteraction', interaction, (error, interactionId) => {
      if (error) {
        alert(error.reason);
      } else {
        // Send message to case creator and reviewer
        const caseItem = Cases.findOne(interaction.caseId);
        if (caseItem) {
          const creatorId = caseItem.createdBy;
          const reviewerId = caseItem.reviewerId;
          Meteor.call('sendEmail', creatorId, 'caseCreatedEmail', interaction);
          Meteor.call('sendEmail', reviewerId, 'reviewNotificationEmail', interaction);
        }
        // Clear form
        target.author1.value = '';
        target.author2.value = '';
        target.author3.value = '';
        target.email.value = '';
        target.case.value = '';
        target.date.value = '';
        target.description.value = '';
        // Redirect to dashboard or show success message
        FlowRouter.go('dashboard');
      }
    });
  }
});
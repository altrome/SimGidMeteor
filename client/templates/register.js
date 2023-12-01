Template.register.events({
  'submit #register-form': function(event, template) {
    event.preventDefault();

    let username = template.find('#register-username').value;
    let email = template.find('#register-email').value;
    let password = template.find('#register-password').value;

    Accounts.createUser({
      username: username,
      email: email,
      password: password
    }, function(error) {
      if (error) {
        console.log(error.reason);
        // Optionally, handle the error on the UI
      } else {
        // Redirect the user to the dashboard after successful registration
        FlowRouter.go('dashboard');
      }
    });
  }
});

Template.register.onRendered(function() {
  // Initialize any Bootstrap components if necessary
});

Template.register.helpers({
  // Helper functions if needed for the registration template
});
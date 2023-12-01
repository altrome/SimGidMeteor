import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.login.events({
  'submit #login-form'(event) {
    event.preventDefault();

    const target = event.target;
    const email = target.email.value;
    const password = target.password.value;

    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        console.error('Login error:', error);
        alert(error.reason);
      } else {
        FlowRouter.go('dashboard');
      }
    });
  },
  'click .btn-google-login'() {
    Meteor.loginWithGoogle({}, (error) => {
      if (error) {
        console.error('Google login error:', error);
        alert(error.reason);
      } else {
        FlowRouter.go('dashboard');
      }
    });
  }
});
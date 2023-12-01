import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import to load these templates
import '../client/templates/dashboard.html';
import '../client/templates/admin_panel.html';
import '../client/templates/case_form.html';
import '../client/templates/situation_form.html';
import '../client/templates/interaction_form.html';
import '../client/templates/login.html';
import '../client/templates/register.html';

// Define all routes
FlowRouter.route('/', {
  name: 'Dashboard',
  action() {
    BlazeLayout.render('mainLayout', { main: 'dashboard' });
  }
});

FlowRouter.route('/admin', {
  name: 'AdminPanel',
  action() {
    BlazeLayout.render('mainLayout', { main: 'admin_panel' });
  }
});

FlowRouter.route('/case/new', {
  name: 'NewCase',
  action() {
    BlazeLayout.render('mainLayout', { main: 'case_form' });
  }
});

FlowRouter.route('/situation/new', {
  name: 'NewSituation',
  action() {
    BlazeLayout.render('mainLayout', { main: 'situation_form' });
  }
});

FlowRouter.route('/interaction/new', {
  name: 'NewInteraction',
  action() {
    BlazeLayout.render('mainLayout', { main: 'interaction_form' });
  }
});

FlowRouter.route('/login', {
  name: 'Login',
  action() {
    BlazeLayout.render('mainLayout', { main: 'login' });
  }
});

FlowRouter.route('/register', {
  name: 'Register',
  action() {
    BlazeLayout.render('mainLayout', { main: 'register' });
  }
});

// Protect routes for logged-in users only
const loggedInRoutes = ['/admin', '/case/new', '/situation/new', '/interaction/new'];
FlowRouter.triggers.enter([(context, redirect) => {
  if (!Meteor.userId() && loggedInRoutes.includes(context.path)) {
    redirect('/login');
  }
}], { only: loggedInRoutes });
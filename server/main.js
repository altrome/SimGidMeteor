import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Cases, Situations, Interactions } from '/lib/collections';
import '/server/publish';
import '/server/methods';
import '/server/permissions';
import '/server/accounts-config';

Meteor.startup(() => {
  // Code to run on server at startup
  if (!Accounts.findUserByUsername('admin')) {
    const adminUserId = Accounts.createUser({
      username: 'admin',
      email: 'admin@example.com',
      password: 'adminpassword', // You should generate a secure password in production
    });

    // Assign the admin role to the initial user
    Roles.addUsersToRoles(adminUserId, 'admin');
  }

  // Configure Google OAuth
  ServiceConfiguration.configurations.upsert(
    { service: 'google' },
    {
      $set: {
        clientId: Meteor.settings.private.google.clientId,
        loginStyle: 'popup',
        secret: Meteor.settings.private.google.secret,
      },
    }
  );

  // Email configuration
  Meteor.startup(() => {
    process.env.MAIL_URL = Meteor.settings.private.MAIL_URL;
  });

  // Create indexes for efficient searching and filtering
  Cases._ensureIndex({ 'name': 1 });
  Situations._ensureIndex({ 'caseId': 1, 'date': 1 });
  Interactions._ensureIndex({ 'caseId': 1, 'date': 1 });
});
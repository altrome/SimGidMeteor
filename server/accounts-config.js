import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

Meteor.startup(() => {
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

  // Create an admin user if none exists
  if (Meteor.users.find().count() === 0) {
    const adminId = Accounts.createUser({
      email: Meteor.settings.private.admin.email,
      password: Meteor.settings.private.admin.password,
    });

    // Assign the admin role to the first user
    Roles.addUsersToRoles(adminId, 'admin');
  }

  // Customize the email sent for account creation
  Accounts.emailTemplates.siteName = "Case Management System";
  Accounts.emailTemplates.from = "Case Management System <no-reply@casemanagement.com>";

  Accounts.emailTemplates.verifyEmail = {
    subject() {
      return "Activate your account now!";
    },
    text(user, url) {
      return `Hey ${user.emails[0].address}! Verify your email by following this link: ${url}`;
    }
  };

  // Customize the behavior of account creation
  Accounts.onCreateUser((options, user) => {
    // We still want the default hook's 'profile' behavior.
    if (options.profile) {
      user.profile = options.profile;
    }

    // Assign the default role to new users
    const defaultRole = 'user';
    if (options.roles) {
      Roles.addUsersToRoles(user._id, options.roles);
    } else {
      Roles.addUsersToRoles(user._id, defaultRole);
    }

    return user;
  });
});
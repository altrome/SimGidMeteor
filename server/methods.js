import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Email } from 'meteor/email';
import { Cases, Situations, Interactions } from '/lib/collections.js';
import { Roles } from 'meteor/alanning:roles';

Meteor.methods({
  createCase(data) {
    check(data, {
      author1: String,
      author2: String,
      author3: String,
      nameSurname: String,
      dateOfBirth: String,
      physicalDescription: String,
      biologicalSex: String
    });

    if (!this.userId || !Roles.userIsInRole(this.userId, ['admin', 'case-editor'])) {
      throw new Meteor.Error('not-authorized');
    }

    const caseId = Cases.insert({
      author1: data.author1,
      author2: data.author2,
      author3: data.author3,
      nameSurname: data.nameSurname,
      dateOfBirth: new Date(data.dateOfBirth),
      physicalDescription: data.physicalDescription,
      biologicalSex: data.biologicalSex,
      createdAt: new Date(),
      createdBy: this.userId
    });

    // Send email to case creator and reviewer
    const user = Meteor.users.findOne(this.userId);
    const reviewer = Roles.getUsersInRole('reviewer').fetch();
    const emails = reviewer.map(user => user.emails[0].address);

    if (user && user.emails) {
      emails.push(user.emails[0].address);
    }

    Email.send({
      to: emails,
      from: 'no-reply@yourapp.com',
      subject: 'New Case Created',
      html: Assets.getText('private/emailTemplates/caseCreation.html').replace('{{nameSurname}}', data.nameSurname),
    });

    return caseId;
  },

  editCase(caseId, data) {
    check(caseId, String);
    check(data, {
      author1: String,
      author2: String,
      author3: String,
      nameSurname: String,
      dateOfBirth: String,
      physicalDescription: String,
      biologicalSex: String
    });

    if (!this.userId || !Roles.userIsInRole(this.userId, ['admin', 'case-editor'])) {
      throw new Meteor.Error('not-authorized');
    }

    Cases.update(caseId, {
      $set: {
        author1: data.author1,
        author2: data.author2,
        author3: data.author3,
        nameSurname: data.nameSurname,
        dateOfBirth: new Date(data.dateOfBirth),
        physicalDescription: data.physicalDescription,
        biologicalSex: data.biologicalSex,
        lastUpdatedAt: new Date(),
        lastUpdatedBy: this.userId
      }
    });
  },

  createSituation(data) {
    check(data, {
      author1: String,
      author2: String,
      author3: String,
      email: String,
      caseId: String,
      date: String,
      description: String
    });

    if (!this.userId || !Roles.userIsInRole(this.userId, ['admin', 'situation-editor'])) {
      throw new Meteor.Error('not-authorized');
    }

    Situations.insert({
      author1: data.author1,
      author2: data.author2,
      author3: data.author3,
      email: data.email,
      caseId: data.caseId,
      date: new Date(data.date),
      description: data.description,
      createdAt: new Date(),
      createdBy: this.userId
    });
  },

  createInteraction(data) {
    check(data, {
      author1: String,
      author2: String,
      author3: String,
      email: String,
      caseId: String,
      date: String,
      description: String
    });

    if (!this.userId || !Roles.userIsInRole(this.userId, ['admin', 'interaction-editor'])) {
      throw new Meteor.Error('not-authorized');
    }

    Interactions.insert({
      author1: data.author1,
      author2: data.author2,
      author3: data.author3,
      email: data.email,
      caseId: data.caseId,
      date: new Date(data.date),
      description: data.description,
      createdAt: new Date(),
      createdBy: this.userId
    });
  }
});
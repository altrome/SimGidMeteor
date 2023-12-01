import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

const Cases = new Mongo.Collection('cases');
const Situations = new Mongo.Collection('situations');
const Interactions = new Mongo.Collection('interactions');

const CaseSchema = new SimpleSchema({
  author1: {
    type: String,
    label: "Author 1"
  },
  author2: {
    type: String,
    label: "Author 2",
    optional: true
  },
  author3: {
    type: String,
    label: "Author 3",
    optional: true
  },
  nameSurname: {
    type: String,
    label: "Name and Surname"
  },
  dateOfBirth: {
    type: String,
    label: "Date of Birth",
    regEx: SimpleSchema.RegEx.Date
  },
  physicalDescription: {
    type: String,
    label: "Physical Description",
    autoform: {
      rows: 5
    }
  },
  biologicalSex: {
    type: String,
    label: "Biological Sex",
    allowedValues: ['Male', 'Female']
  }
});

const SituationSchema = new SimpleSchema({
  author1: {
    type: String,
    label: "Author 1"
  },
  author2: {
    type: String,
    label: "Author 2",
    optional: true
  },
  author3: {
    type: String,
    label: "Author 3",
    optional: true
  },
  email: {
    type: String,
    label: "E-mail",
    regEx: SimpleSchema.RegEx.Email
  },
  caseId: {
    type: String,
    label: "Case",
    autoform: {
      options: function() {
        return Cases.find().map(function(c) {
          return {label: c.nameSurname, value: c._id};
        });
      }
    }
  },
  date: {
    type: String,
    label: "Date",
    regEx: SimpleSchema.RegEx.Date
  },
  description: {
    type: String,
    label: "Description of the Situation",
    autoform: {
      rows: 5
    }
  }
});

const InteractionSchema = new SimpleSchema({
  author1: {
    type: String,
    label: "Author 1"
  },
  author2: {
    type: String,
    label: "Author 2",
    optional: true
  },
  author3: {
    type: String,
    label: "Author 3",
    optional: true
  },
  email: {
    type: String,
    label: "E-mail",
    regEx: SimpleSchema.RegEx.Email
  },
  caseId: {
    type: String,
    label: "Case",
    autoform: {
      options: function() {
        return Cases.find().map(function(c) {
          return {label: c.nameSurname, value: c._id};
        });
      }
    }
  },
  date: {
    type: String,
    label: "Date",
    regEx: SimpleSchema.RegEx.Date
  },
  description: {
    type: String,
    label: "Description of the Interaction",
    autoform: {
      rows: 5
    }
  }
});

Cases.attachSchema(CaseSchema);
Situations.attachSchema(SituationSchema);
Interactions.attachSchema(InteractionSchema);

export { Cases, Situations, Interactions };
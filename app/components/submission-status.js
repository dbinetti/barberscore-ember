import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    saveSubmission(status) {
      this.model.set('status', status);
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.save()
      .then(() => {
        // flashMessages.success('Success');
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
    },
  },
  submissionStatus: [
    'New',
    'Validated',
  ]
});

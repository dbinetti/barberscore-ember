import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    saveAssignment() {
      var assignment = this.get('store').createRecord('assignment', {
        session: this.get('model'),
        judge: this.get('judge'),
        kind: "Official",
        category: this.get('judge.category'),
      });
      const flashMessages = Ember.get(this, 'flashMessages');
      assignment.save()
      .then(() => {
        this.set('judge', null);
        flashMessages.success("Saved");
      })
      .catch((failure) => {
        assignment.deleteRecord();
        flashMessages.danger(failure);
      });
    },
    searchAssignment(term) {
      return new Ember.RSVP.Promise((resolve, reject) => {
        Ember.run.debounce(this, this._performSearch, term, resolve, reject, 600);
      });
    },
  },
  assignmentKind: [
    'Official',
    'Practice',
  ],
  assignmentCategory: [
    'Admin',
    'Music',
    'Presentation',
    'Singing',
  ],
  _performSearch(term, resolve, reject) {
    if (Ember.isBlank(term)) { return resolve([]); }
    this.get('store').query('judge', {'name__icontains': term})
      .then(data => resolve(data), reject);
  }
});
import Ember from 'ember';

export default Ember.Controller.extend({
  sessionSortProperties: [
    'convention.start_date:asc',
  ],
  // currentSessions: Ember.computed.filterBy(
  //   'model',
  //   'status',
  //   'Published',
  // ),
  sortedSessions: Ember.computed.sort(
    'model',
    'sessionSortProperties'
  ),
  actions: {
    sortBy(sessionSortProperties) {
      this.set('sessionSortProperties', [sessionSortProperties]);
    },
  }
});
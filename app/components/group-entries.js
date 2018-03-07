import { not, sort, filterBy } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { task } from 'ember-concurrency';

export default Component.extend({
  flashMessages: service(),
  router: service(),
  store: service(),
  isDisabled: not(
    'model.permissions.write',
  ),
  filteredEntries: filterBy(
    'model.entries',
    'conventionStatus',
    'Active',
  ),
  sortedEntriesProperties: [
    'nomen',
  ],
  sortedEntries: sort(
    'filteredEntries',
    'sortedEntriesProperties'
  ),
  sessionCall: computed(
    'model',
    function() {
      let kinds = {
        'Chorus': 32,
        'Quartet': 41,
      };
      return this.get('store').query('session', {
        'status': 4, // TODO HARDCODED
        'kind': kinds[this.get('model.kind')],
        'is_invitational': false,
        'page_size': 100
    });
  }),
  sessionSortProperties: [
    'nomen',
  ],
  sessionOptions: sort(
    'sessionCall',
    'sessionSortProperties'
  ),
  createEntryModal: false,
  createEntryModalError: false,
  saveEntry: task(function* (session){
    try {
      let entry = yield this.get('model').get('entries').createRecord({
        session: session,
        description: '',
        contestants: [],
        isEvaluation: true,
        isPrivate: false,
        competitor: null,
      }).save();
      let payload = yield entry.build({
        'by': this.get('currentUser.user.id'),
      });
      this.get('store').pushPayload(payload);
      this.set('createEntryModal', false);
      this.set('createEntryModalError', false);
      this.get('flashMessages').success("Created!");
      this.get('router').transitionTo('dashboard.group-manager.group.entries.entry', entry.get('id'));
    } catch(e) {
      e.errors.forEach((e) => {
        this.set('deleteEntryModalError', true);
        this.get('flashMessages').danger(e.detail);
      })
    }
  }).drop(),
  actions: {
    cancelEntry(entry){
      entry.deleteRecord();
    },
  }
});



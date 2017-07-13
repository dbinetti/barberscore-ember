import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),
  awardSortProperties: [
    'entityKindSort',
    'isQualifier',
    'isPrimary:desc',
    'ageSort',
    'name',
  ],
  filteredAwards: Ember.computed(
  'model.convention.entity.awards.@each.kind',
    function(){
      let awards = this.get('model.convention.entity.awards');
      let kind = this.get('model.kind');
      return awards.filterBy('kind', kind);
    }
  ),
  awardOptions: Ember.computed.sort(
    'filteredAwards',
    'awardSortProperties'
  ),
  sortedAwards: Ember.computed.alias('awardOptions'),
  sessionSortProperties: [
    'nomen',
  ],
  sortedItems: Ember.computed.sort(
    'model.convention.sessions',
    'sessionSortProperties'
  ),
  isPrevDisabled: Ember.computed(
    'model',
    'sortedItems', function() {
    return this.model == this.get('sortedItems.firstObject');
  }),
  isNextDisabled: Ember.computed(
    'model',
    'sortedItems', function() {
    return this.model == this.get('sortedItems.lastObject');
  }),
  scheduleSession: task(function *() {
    let session = yield this.model.schedule({
      'by': this.get('currentUser.user.id')
    });
    this.store.pushPayload('session', session);
    this.get('flashMessages').success("Scheduled!");
  }).drop(),
  actions: {
    previousItem(cursor) {
      let nowCur = this.get('sortedItems').indexOf(cursor);
      let newCur = this.get('sortedItems').objectAt(nowCur-1);
      this.transitionToRoute('dashboard.convention-manager.convention.sessions.session', newCur);
    },
    nextItem(cursor) {
      let nowCur = this.get('sortedItems').indexOf(cursor);
      let newCur = this.get('sortedItems').objectAt(nowCur+1);
      this.transitionToRoute('dashboard.convention-manager.convention.sessions.session', newCur);
    },
  },
});

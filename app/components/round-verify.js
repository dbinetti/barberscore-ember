import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  currentUser: service(),
  store: service(),
  flashMessages: service(),
  verifyRoundModal: false,
  verifyRoundModalError: false,
  verifyRound: task(function *() {
    try {
      let round = yield this.model.verify({
        'by': this.get('currentUser.user.id')
      });
      this.get('store').pushPayload('round', round);
      this.get('model.session.competitors').invoke('reload');
      this.set('verifyRoundModal', false);
      this.set('verifyRoundModalError', false);
      this.get('flashMessages').success("Verified!");
    } catch(e) {
      this.set('verifyRoundModalError', true);
    }
  }).drop(),
});
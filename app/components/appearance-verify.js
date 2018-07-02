import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  store: service(),
  flashMessages: service(),
  verifyAppearance: task(function *() {
    try {
      let songs = yield this.get('model.songs');
      yield songs.forEach(function(item) {
        item.scores.invoke('save');
      });
      yield this.model.verify({
        'by': this.get('currentUser.user.id'),
      });
      this.get('model').reload();
      this.get('flashMessages').success("Verified!");
    } catch(e) {
      this.get('flashMessages').error(e);
    }
  }).drop(),
});
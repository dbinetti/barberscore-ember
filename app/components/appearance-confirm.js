import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  store: service(),
  flashMessages: service(),
  confirmAppearanceModal: false,
  confirmAppearanceModalError: false,
  confirmAppearance: task(function *() {
    try {
      yield this.model.confirm({
        'by': this.get('currentUser.user.id'),
      });
      this.get('model').reload();
      this.get('model.round.session.competitors').invoke('reload');
      // this.get('model.session').hasMany('competitors').reload();
      this.set('confirmAppearanceModal', false);
      this.set('confirmAppearanceModalError', false);
      this.get('flashMessages').success("Confirmed!");
    } catch(e) {
      console.log(e);
      this.set('confirmAppearanceModalError', true);
    }
  }).drop(),
});

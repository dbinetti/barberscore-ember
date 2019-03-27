import Component from '@ember/component';
import { task } from 'ember-concurrency';
import FileSaverMixin from 'ember-cli-file-saver/mixins/file-saver';

export default Component.extend(FileSaverMixin,{
  oss: task(function *() {
    let pdf = yield this.model.oss();
    this.saveFileAs('oss.pdf', pdf, 'application/pdf');
  }).drop(),
});

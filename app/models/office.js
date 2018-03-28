import { not } from '@ember/object/computed';
import { computed } from '@ember/object';
import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  name: DS.attr('string'),
  status: DS.attr('office-status'),
  kind: DS.attr('office-kind'),
  code: DS.attr('office-code'),
  isConventionManager: DS.attr('boolean'),
  isSessionManager: DS.attr('boolean'),
  isScoringManager: DS.attr('boolean'),
  isGroupManager: DS.attr('boolean'),
  isPersonManager: DS.attr('boolean'),
  isAwardManager: DS.attr('boolean'),
  isJudgeManager: DS.attr('boolean'),
  isChartManager: DS.attr('boolean'),
  officers: DS.hasMany('officer', {async: true}),
  permissions: DS.attr(),

  isDisabled: not(
    'permissions.write'
  ),

  statusOptions: [
    'New',
    'Active',
    'Inactive',
  ],

  kindOptions: [
    'SCJC',
    'DRCJ',
    'CA',
    'Judge',
    'Representative',
    'Staff',
    'Admin',
  ],

  codeOptions: [
    'SCJC Chair',
    'SCJC Chair Past',
    'SCJC CA',
    'SCJC MUS',
    'SCJC PER',
    'SCJC SNG',
    'SCJC Chart',
    'SCJC Admin',
    'DRCJ',
    'DRCJ Assistant',
    'JUDGE CA',
    'JUDGE MUS',
    'JUDGE PER',
    'JUDGE SNG',
    'CPRES',
    'CSEC',
    'CDIR',
    'CASS',
    'CMAN',
    'QADM',
  ],

  codeSort: computed(
    'code',
    'codeOptions',
    function() {
      return this.get('codeOptions').indexOf(this.get('code'));
    }
  ),

});

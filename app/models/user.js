import { not } from '@ember/object/computed';
import DS from 'ember-data';

export default DS.Model.extend({
  username: DS.attr('string'),
  isActive: DS.attr('boolean'),
  isStaff: DS.attr('boolean'),
  person: DS.belongsTo('person', {async: true}),
  permissions: DS.attr(),
  isConventionManager: DS.attr('boolean'),
  isSessionManager: DS.attr('boolean'),
  isScoringManager: DS.attr('boolean'),
  isOrganizationManager: DS.attr('boolean'),
  isGroupManager: DS.attr('boolean'),
  isPersonManager: DS.attr('boolean'),
  isAwardManager: DS.attr('boolean'),
  isJudgeManager: DS.attr('boolean'),
  isChartManager: DS.attr('boolean'),

  disabledAssignments: not(
    'person.assignments.length'
  )

});

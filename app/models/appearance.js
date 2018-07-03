import { alias, gt, lt, mapBy, sort, not, notEmpty, equal, and, sum } from '@ember/object/computed';
import { computed } from '@ember/object';
import Model from 'ember-data/model';
import DS from 'ember-data';
import { memberAction } from 'ember-api-actions';

export default Model.extend({
  status: DS.attr('appearance-status'),
  num: DS.attr('number'),
  draw: DS.attr('number'),
  actualStart: DS.attr('date'),
  actualFinish: DS.attr('date'),
  musPoints: DS.attr('number'),
  perPoints: DS.attr('number'),
  sngPoints: DS.attr('number'),
  totPoints: DS.attr('number'),
  musScore: DS.attr('number'),
  perScore: DS.attr('number'),
  sngScore: DS.attr('number'),
  totScore: DS.attr('number'),
  musRank: DS.attr('number'),
  perRank: DS.attr('number'),
  sngRank: DS.attr('number'),
  totRank: DS.attr('number'),
  allPoints: DS.attr('number'),
  varianceReport: DS.attr('string'),
  round: DS.belongsTo('round', {async: true}),
  competitor: DS.belongsTo('competitor', {async: true}),
  grid: DS.belongsTo('grid', {async: true}),
  songs: DS.hasMany('song', {async: true}),
  permissions: DS.attr(),

  scratch: memberAction({path: 'scratch'}),
  start: memberAction({path: 'start', type: 'post'}),
  verify: memberAction({path: 'verify', type: 'post'}),
  finish: memberAction({path: 'finish', type: 'post'}),
  confirm: memberAction({path: 'confirm', type: 'post'}),

  isDisabled: not(
    'permissions.write'
  ),

  varNotEmpty: notEmpty(
    'varianceReport',
  ),

  isVerified: equal(
    'status',
    'Verified',
  ),

  isDetected: and(
    'varNotEmpty',
    'isVerified',
  ),

  statusOptions: [
    'New',
    'Validated',
    'Started',
    'Finished',
    'Confirmed',
    'Included',
    'Excluded',
    'Announced',
  ],


  roundNum: alias(
    'round.num'
  ),
  competitorTotPoints: alias(
    'competitor.totPoints'
  ),
  competitorRank: alias(
    'competitor.totRank'
  ),
  isAdvancer: gt(
    'draw',
    0,
  ),
  isFinisher: lt(
    'draw',
    0,
  ),
  repertoriesFiltered: alias(
    'competitor.group.repertories'
  ),
  chartsMapped: mapBy(
    'repertoriesFiltered',
    'chart'
  ),
  chartOptionsProperties: [
    'title',
  ],
  chartOptions: sort(
    'chartsMapped',
    'chartOptionsProperties'
  ),
  songScores: mapBy(
    'songs',
    'sumScores',
  ),
  sumSongs: sum(
    'songScores',
  ),
});

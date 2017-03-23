import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {hasMany } from 'ember-data/relationships';

export default Model.extend({
  nomen: attr('string'),
  name: attr('string'),
  status: attr('entity-status'),
  kind: attr('entity-kind'),
  age: attr('entity-age'),
  is_novice: attr('boolean'),
  start_date: attr('isodate'),
  end_date: attr('isodate'),
  location: attr('string'),
  website: attr('string'),
  facebook: attr('string'),
  twitter: attr('string'),
  email: attr('string'),
  phone: attr('string'),
  picture: attr('string'),
  description: attr('string'),
  code: attr('string'),
  short_name: attr('string'),
  long_name: attr('string'),
  // parent: belongsTo('entity', {inverse: 'children', async: true}),
  // children: hasMany('entity', {inverse: 'parent', async: true}),
  memberships: hasMany('membership', {async: true}),
  performers: hasMany('performer', {async: true}),
  permissions: attr(),

  kindOptions: [
    'Organization',
    'Harmony Incorporated',
    'District',
    'Noncompetitive',
    'Affiliate',
    'Division',
    'Quartet',
    'Chorus',
    'Very Large Quartet',
  ],

  ageOptions: [
    'Seniors',
    'Youth',
    // 'Collegiate',
  ],

  kindSort: Ember.computed(
    'kind',
    'kindOptions',
    function() {
      return this.get('kindOptions').indexOf(this.get('kind'));
    }
  ),
});
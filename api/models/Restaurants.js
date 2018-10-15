/**
 * Restaurants.js
 *
 * @description :: This model holds all the restaurant information
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

const _ = require('lodash'),
  daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  keysInObj = (obj, keys) => {
    for (let key of keys) {
      if (!obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  };

module.exports = {
  
  types: {
    photograph: (val) => {
      return val.endsWith('.jpg')
    },
    coordinates: (val) => {
      return _.isObject(val) && _.isNumber(val.lat) && _.isNumber(val.lng);
    },
    hours_of_operation: (val) => {
      return _.isObject(val) && keysInObj(val, daysOfWeek);
    },
    reviews: (val) => {
      if (!_.isArray(val)) return false;
      val.forEach(review => {
        if (!_.isString(review.name) || !_.isString(review.date) ||
        !_.isInteger(review.rating) || !_.isString(review.comments)) {
          return false;
        }
      });
      return true;
    }
  },
  
  attributes: {
    id: {
      type: 'integer',
      required: true
    },
    name: {
      type: 'string',
      required: true
    },
    neighborhood: {
      type: 'string',
      required: true
    },
    photograph: {
      type: 'string',
      photograph: true,
      required: true
    },
    address: {
      type: 'string',
      required: true
    },
    latlng: {
      type: 'json',
      coordinates: true,
      required: true
    },
    cuisine_type: {
      type: 'string',
      required: true
    },
    operating_hours: {
      type: 'json',
      hours_of_operation: true,
      required: true
    },
    reviews: {
      type: 'json',
      reviews: true,
      required: true
    }
  }
  
};

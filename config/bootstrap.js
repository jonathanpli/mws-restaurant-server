const data = require('../assets/data/restaurants');

/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = async function(cb) {
  if (process.env.NODE_ENV === 'production') {
    return cb();
  }
  
  let count = await Restaurants.count();
  if (count > 0) {
    return cb();
  }
  
  // Seed data
  data.forEach(async (restaurant) => {
    await Restaurants.create(restaurant);
  });
  cb();
};

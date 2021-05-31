const environment = process.env.NODE_ENV || "development";
module.exports = require("../knexfile")[environment];
// const config = require("../knexfile")[environment];
// module.exports = require("knex")(config);

async function migrateSeedDB(knex, knexConfig) {
  console.info("Running migrations in: " + knexConfig.migrations.directory);

  knex.migrate
    .latest(knexConfig.migrations)
    .then(([batchNo, log]) => {
      if (!log.length) {
        console.info("Database is already up to date");
      } else {
        console.info("Ran migrations: " + log.join(", "));
        return knex.seed.run(knexConfig.seeds).then(() => {
          console.info("DB seeding complete.");
        });
      }
    })
    .catch((err) => console.log("ERROR @DB migration/seeding...", err));
}

module.exports = migrateSeedDB;

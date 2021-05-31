exports.up = function (knex) {
  return knex.schema.createTable("hotdogs", function (table) {
    table.increments().primary();
    table.string("title", 64).notNullable().unique();
    table.string("image", 512).notNullable();
    table.text("description").notNullable();
    table.float("price").notNullable().defaultTo(0);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("hotdogs");
};

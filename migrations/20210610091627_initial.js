/** @param {import('knex').Knex} knex  */
exports.up = async (knex) => {
  await knex.schema.createTable('channels', (table) => {
    table.increments();
    table.text('channel_id');
    table.text('name');
    table.text('discord_id');
    table.text('discord_name');
    table.dateTime('created_at');
  });
};

/** @param {import('knex').Knex} knex  */
exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('channels');
};
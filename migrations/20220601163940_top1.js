/** @param {import('knex').Knex} knex  */
exports.up = async (knex) => {
  await knex.schema.createTable('top1', (table) => {
    table.increments()
    table.text('user_id')
    table.text('user_name')
    table.text('channel_id')
    table.dateTime('created_at')
  })
}

/** @param {import('knex').Knex} knex  */
exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('top1')
}
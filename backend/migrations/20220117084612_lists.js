/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('lists', (table) => {
        table.integer('users_id');
        table.foreign('users_id').references('users.id');
        table.string('todolists');
        table.boolean('tasksDone')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('lists')
};

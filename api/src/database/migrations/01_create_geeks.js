"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('geeks', (table) => {
        table.increments('id').primary();
        table.string('desc').notNullable();
        table.string('printer_repair').notNullable();
        table.string('work').notNullable();
        table.decimal('cost').notNullable();
        table
            .integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('geeks');
}
exports.down = down;

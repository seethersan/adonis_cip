'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategoriesSchema extends Schema {
  up () {
    this.create('categories', (table) => {
      // alter table
      table.increments()
      table.timestamps()
      table.string('title')
      table.string('description')
      table.integer('user_id')
    })
  }

  down () {
    this.table('categories', (table) => {
      // reverse alternations
    })
  }
}

module.exports = CategoriesSchema

'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CipDashboardSchema extends Schema {
  up () {
    this.create('cip_dashboards', (table) => {
      table.increments()
      table.string('title')
      table.string('link')
      table.string('description')
      table.integer('user_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('cip_dashboards')
  }
}

module.exports = CipDashboardSchema

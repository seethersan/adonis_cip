'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Almevnt extends Model {
    static get table () {
        return 'almevnt';
    }

    static get dates () {
        return super.dates.concat(['AlarmDateTime']);
    }
}

module.exports = Almevnt

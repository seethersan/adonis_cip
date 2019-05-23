'use strict'

const Event = use('App/Models/Event');

const Database = use('Database');

class EventController {
    async userIndex({view, auth}) {

        // Fetch all user's events
        const events = await auth.user.events().fetch();
        const alarms = await Database.select('AlarmText').from('almevnt').distinct('AlarmText');

        return view.render('event-dashboard', { events: events.toJSON(), alarms: alarms });
    }

    async create({request, response, session, auth}) {
        const event = request.all();

        const posted = await auth.user.events().create({
            title: event.title,
            description: event.description,
            almevnt: event.almevnt
        });

        session.flash({ message: 'Your event has been posted!' });
        return response.redirect('back');
    }

    async delete({response, session, params}) {
        const event = await Event.find(params.id);

        await event.delete();
        session.flash({ message: 'Your event has been removed'});
        return response.redirect('back');
    }

    async edit({params, view}) {
        const event = await Event.find(params.id);
        const alarms = await Database.select('AlarmText').from('almevnt').distinct('AlarmText');
        return view.render('edit-event', { event: event, alarms: alarms });
    }

    async update ({response, request, session, params}) {
        const event = await Event.find(params.id);

        event.title = request.all().title;
        event.description = request.all().description;
        event.almevnt = request.all().almevnt;

        await event.save();

        session.flash({ message: 'Your event has been updated. '});
        return response.redirect('/events');
    }

    async getdates({response, params}){
        const event = await Event.find(params.id);
        const time_period = await Database.select('AlarmDateTime', 'ClearedDateTime').from('almevnt').where('AlarmText', event.almevnt).whereNotNull('AlarmDateTime').whereNotNull('ClearedDateTime').orderBy('AlarmDateTime', 'desc');

        return response.json(time_period);
    }
}

module.exports = EventController

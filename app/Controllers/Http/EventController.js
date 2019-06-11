'use strict'

const Event = use('App/Models/Event');
const Category = use('App/Models/Category');

const Database = use('Database');

class EventController {
    async userIndex({view, auth}) {

        // Fetch all user's events
        const events = await auth.user.events().fetch();
        const categories = await auth.user.categories().fetch();
        const objects = await Database.select('CIP1_REC_OBJ_Value').from('cip').distinct('CIP1_REC_OBJ_Value').whereNotNull('CIP1_REC_OBJ_Value');
        const alarms = await Database.select('AlarmText').from('almevnt').distinct('AlarmText');

        return view.render('event-dashboard', { events: events.toJSON(), categories: categories.toJSON(), alarms: alarms, objects: objects });
    }

    async create({request, response, session, auth}) {
        const event = request.all();

        const posted = await auth.user.events().create({
            title: event.title,
            description: event.description,
            category: event.category,
            objeto: event.objeto,
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

    async edit({params, view, auth}) {
        const event = await Event.find(params.id);
        const categories = await auth.user.categories().fetch();
        const objects = await Database.select('CIP1_REC_OBJ_Value').from('cip').distinct('CIP1_REC_OBJ_Value').whereNotNull('CIP1_REC_OBJ_Value');
        return view.render('edit-event', { event: event, categories: categories.toJSON(), objects: objects });
    }

    async update ({response, request, session, params}) {
        const event = await Event.find(params.id);

        event.title = request.all().title;
        event.category = request.all().category;
        event.description = request.all().description;
        event.objeto = request.all().objeto;
        event.almevnt = request.all().almevnt;

        await event.save();

        session.flash({ message: 'Your event has been updated.'});
        return response.redirect('/events');
    }

    async getevents({response, request, session, params}){
        var event;
        if (request.all().objeto){
            event = await Event.query().where('category', '=', request.all().category).where('objeto', '=', request.all().objeto).fetch();
        }
        else {
            event = await Event.query().where('category', '=', request.all().category).whereNull('objeto').fetch();
        }
        
        return response.json(event);
    }

    async getalarmevents({response, request, session, params}){
        const category = await Category.find(request.all().category);
        const objeto = request.all().objeto != null ? request.all().objeto  : "";
        const alarmevent = await Database.select('AlarmText').from('almevnt').where('AlarmText', 'LIKE', '%'+category.title+'%').where('AlarmText','LIKE', '%'+objeto.replace("%20", " ")+'%').distinct('AlarmText');

        return response.json(alarmevent);
    }

    async getdates({response, request, session, params}){
        const event = await Event.findBy({'title': request.all().event});
        const time_period = await Database.select('AlarmDateTime', 'ClearedDateTime').from('almevnt').where('AlarmText', event.almevnt).whereNotNull('AlarmDateTime').whereNotNull('ClearedDateTime').orderBy('AlarmDateTime', 'desc');

        return response.json(time_period);
    }
}

module.exports = EventController

'use strict'

const Cip = use('App/Models/Cip');

const Database = use('Database');

class CipController {
    async home({view}) {
        // Fetch a CIP Dashboard
        const cips = await Cip.all();
        const start_dates = await Database.from('ALMEVNT').where('AlarmID', 'Pump_Dig');

        return view.render('index', { cips: cips.toJSON(), start_dates: start_dates });
    }

    async userIndex({view, auth}) {

        // Fetch all user's cips
        const cips = await auth.user.cips().fetch();
        const events = await auth.user.events().fetch();

        return view.render('cip-dashboard', { cips: cips.toJSON(), events: events.toJSON() });
    }

    async create({request, response, session, auth}) {
        const cip = request.all();

        const posted = await auth.user.cips().create({
            title: cip.title,
            link: cip.link,
            description: cip.description
        });

        session.flash({ message: 'Your cip has been posted!' });
        return response.redirect('back');
    }

    async delete({response, session, params}) {
        const cip = await Cip.find(params.id);

        await cip.delete();
        session.flash({ message: 'Your cip has been removed'});
        return response.redirect('back');
    }

    async edit({params, view}) {
        const cip = await Cip.find(params.id);
        return view.render('edit', { cip: cip });
    }

    async update ({response, request, session, params}) {
        const cip = await Cip.find(params.id);

        cip.title = request.all().title;
        cip.link = request.all().link;
        cip.description = request.all().description;

        await cip.save();

        session.flash({ message: 'Your cip has been updated. '});
        return response.redirect('/post-a-cip');
    }
}

module.exports = CipController


'use strict'

const Category = use('App/Models/Category');
const Cip = use('App/Models/Cip');
const Event = use('App/Models/Event');

const Database = use('Database');

class CipController {
    async home({view}) {
        // Fetch a CIP Dashboard
        const categories = await Category.all();
        const cips = await Cip.all();
        const objects = await Database.select('CIP1_REC_OBJ_Value').from('cip').distinct('CIP1_REC_OBJ_Value').whereNotNull('CIP1_REC_OBJ_Value');

        return view.render('index', { categories: categories.toJSON(), cips: cips.toJSON(), objects: objects });
    }

    async userIndex({view, auth}) {

        // Fetch all user's cips
        const categories = await auth.user.categories().fetch();
        const cips = await auth.user.cips().fetch();
        const objects = await Database.select('CIP1_REC_OBJ_Value').from('cip').distinct('CIP1_REC_OBJ_Value').whereNotNull('CIP1_REC_OBJ_Value');

        return view.render('cip-dashboard', { categories: categories.toJSON(), cips: cips.toJSON(), objects: objects });
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


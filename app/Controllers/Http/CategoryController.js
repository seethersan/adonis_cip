'use strict'

const Category = use('App/Models/Category');

const Database = use('Database');

class CategoryController {
    async userIndex({view, auth}) {

        // Fetch all user's categories
        const categories = await auth.user.categories().fetch();

        return view.render('category-dashboard', { categories: categories.toJSON() });
    }

    async create({request, response, session, auth}) {
        const category = request.all();

        const posted = await auth.user.categories().create({
            title: category.title,
            description: category.description
        });

        session.flash({ message: 'Your category has been posted!' });
        return response.redirect('back');
    }

    async delete({response, session, params}) {
        const category = await Category.find(params.id);

        await category.delete();
        session.flash({ message: 'Your category has been removed'});
        return response.redirect('back');
    }

    async edit({params, view}) {
        const category = await Category.find(params.id);
        return view.render('edit', { category: category });
    }

    async update ({response, request, session, params}) {
        const category = await Category.find(params.id);

        category.title = request.all().title;
        category.description = request.all().description;

        await category.save();

        session.flash({ message: 'Your category has been updated. '});
        return response.redirect('/categories');
    }
}

module.exports = CategoryController

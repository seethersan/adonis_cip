'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', 'CipController.home');
Route.on('/signup').render('auth.signup');
Route.post('/signup', 'UserController.create').validator('CreateUser');
Route.on('/login').render('auth.login');
Route.get('/logout', async ({ auth, response }) => {
    await auth.logout();
    return response.redirect('/');
});
Route.post('/login', 'UserController.login').validator('LoginUser');
Route.get('/post-a-cip', 'CipController.userIndex');

Route.group(() => {
    Route.get('/delete/:id', 'CipController.delete');
    Route.get('/edit/:id', 'CipController.edit');
    Route.post('/create', 'CipController.create').validator('CreateCip');
    Route.post('/update/:id', 'CipController.update').validator('CreateCip');
}).prefix('/post-a-cip');

Route.get('/events', 'EventController.userIndex');
Route.group(() => {
    Route.get('/delete/:id', 'EventController.delete');
    Route.get('/edit/:id', 'EventController.edit');
    Route.post('/create', 'EventController.create').validator('CreateEvent');
    Route.post('/update/:id', 'EventController.update').validator('CreateEvent');
}).prefix('/events');

Route.group(() => {
    Route.get('/getdates/:id', 'EventController.getdates');
}).prefix('/api');
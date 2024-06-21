// import express from 'express';
// import UsersController from './users.controller';

// const route = express.Router();

// route.route('/')
//     .get(UsersController.getUsers)
//     .post(UsersController.createUsers);


// route.route('/:id')
//     // .get(UserController.getDetail)
//     .put(UsersController.updateUsers)
//     .delete(UsersController.deleteUser);

// export default route;
import express from 'express';
import usersController from './users.controller';

const route = express.Router();

route.route('/')
    .get(usersController.getUsers)
    .post(usersController.createUser);

route.route('/:id')
    .get(usersController.getDetailUser)
    .put(usersController.updateUser)
    .delete(usersController.deleteUser);

export default route;
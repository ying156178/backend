// import express from 'express';
// import userRoute from './users/users.router';

// const router = express.Router();

// router.use('/users', userRoute);

// export default router;
import express from 'express';
import userRoute from './users/users.router';

const router = express.Router();

router.use('/users', userRoute);

export default router;
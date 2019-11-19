var express = require('express');
var router = express.Router();
import defaultRoute from './routes/defaultRoute'


router.get('/', defaultRoute)





export default router
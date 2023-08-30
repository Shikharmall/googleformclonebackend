var express = require('express');
var task_route = express();

const multer = require('multer');
const path = require('path');

const cookieParser = require('cookie-parser');
task_route.use(cookieParser());

const bodyParser = require('body-parser');
task_route.use(bodyParser.json());
task_route.use(bodyParser.urlencoded({ extended: true }));


const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

task_route.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const tasksController = require('../controllers/tasksController');


/* checking users login */

task_route.post('/api/checklogin',tasksController.checklogin);


/* adding questions of creator to databse */

task_route.post('/api/addquestion',tasksController.addquestion);


/* showing question on users page */

task_route.get('/api/getquestion',tasksController.getquestion);


/* check already submitted */

task_route.get('/api/checkalreadysubmitted',tasksController.checkalreadysubmitted);

/* check form open */

task_route.get('/api/checkformopen',tasksController.checkformopen);


/* adding users response */

task_route.post('/api/addanswer', upload.single('image'),tasksController.addanswer);


/* getting users response */

task_route.get('/api/getresponse',tasksController.getresponse);




module.exports = task_route;
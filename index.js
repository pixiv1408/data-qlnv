const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();

const app = express();

const employeeController = require('./employee.controller');
const authController = require('./auth.controller');
const userController = require('./user.controller');
const authenticateJWT = require('./middlewares/authenticateJWT');

const port = 3100;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('LetDiv');
});

app.post('/auth/signup', authController.signup);
app.post('/auth/login', authController.login);

app.use(authenticateJWT);

app.get('/users/me', userController.getMe);

app
  .route('/employees')
  .get(employeeController.getEmployees)
  .post(employeeController.addEmployee);

app
  .route('/employees/:id')
  .get(employeeController.getEmployee)
  .patch(employeeController.updateEmployee);

app.listen(port, () => {
  console.log(`Shirayuki app listening on port ${port}`)
});
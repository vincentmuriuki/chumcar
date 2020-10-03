import express from 'express'
import { dirname } from 'path';
import path from 'path';
import carRoutes from './routes/cars.js';
import exphbs from 'express-handlebars'
import bodyParser from 'body-parser'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}))

app.set('view engine', 'hbs')

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res) => res.render('index', { layout: 'landing' }));
app.use('/cars', carRoutes);

const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(`Server listening on ${PORT}`)
);
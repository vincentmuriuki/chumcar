import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';
import dotenv from 'dotenv';
import db from './config/database.js';
import bodyParser from 'body-parser';
import carRoutes from './routes/cars.js'
import { dirname } from 'path';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

//Body parser
app.use(express.urlencoded({ extended: false }));

db.authenticate()
  .then(() => console.log('Database connected..'))
  .catch((err) => console.error(`Error, ${err}`));

app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Static folder
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => res.render('index', { layout: 'landing' }));
app.use('/cars', carRoutes)

app.listen(PORT, console.log(`Server listening on ${PORT}`));

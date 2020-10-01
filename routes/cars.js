import express from 'express';
import Cars from '../models/Cars.js';
const router = express.Router();

router.get('/', (req, res) =>
  Cars.findAll()
    .then((cars) => {
      res.render('cars', {
        cars: cars,
      });
    })
    .catch((e) => res.send(e))
);

router.get('/add', (req, res) => {
  const data = {
    name: 'Subaru Forester 2009',
    description:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
    image_url:
      'https://res.cloudinary.com/plaitnum/image/upload/v1599129938/r95wjfsirxftbwkttvbx.jpg',
    seats: '3',
  };

  let { name, description, image_url, seats } = data;

  Cars.create({
    name,
    description,
    image_url,
    seats,
  })
    .then((car) => res.redirect('/cars'))
    .catch((err) => console.log(err));
});

export default router;

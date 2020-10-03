import express from 'express';
import Cars from '../models/Cars.js';
const router = express.Router();
import Responses from '../utils/response.js';
import carsController from '../controllers/carControllers.js';

router.get('/', (re, res) => carsController.getCars(res));

router.post('/add', (req, res) => carsController.saveCar(req, res));

router.get('/:id', (req, res) => {
  Cars.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((car) => {
      res.status(200).send(car);
    })
    .catch((err) => res.send(err));
});

// update car details
router.post('/update/:id', (req, res) => {
  Cars.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((car) => {
      car.update({
        name: req.body.name,
        description: req.body.description,
      });
      res.send(car);
    })
    .catch((err) => res.send(err));
});

router.post('/approve/:id', (req, res) => {
  Cars.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((car) => {
      car.update({
        status: 'approved',
      });
      res.send(car);
    })
    .catch((err) => res.send(err));
});

export default router;

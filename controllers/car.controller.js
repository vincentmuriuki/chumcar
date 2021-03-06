import Cars from '../models/Cars.js';
import Responses from '../utils/response.js';

class CarsController {
  async saveCar(req, res) {
    const carData = {
      name: req.body.name,
      description: req.body.description,
      image_url: req.body.image_url,
      seats: req.body.seats,
      price: req.body.price,
    };
    const car = await Cars.create(carData);
    return Responses.handleSuccess(201, 'created', res, car);
  }

  async getCars(res) {
    const cars = await Cars.findAll();
    // return cars;
    res.send(cars);
  }

  async approveCar(req, res) {
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
  }
}

export default new CarsController();

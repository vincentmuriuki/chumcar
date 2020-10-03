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
    await Cars.create({ carData });
    return Responses.handleSuccess(201, 'created', res, carData);
  }

  async getCars(res) {
    const cars = await Cars.findAll();
    return cars;
  }
}

export default new CarsController();

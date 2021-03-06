import Sequelize from 'sequelize';
import db from '../config/database.js';

const Cars = db.define(
  'cars',
  {
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    image_url: {
      type: Sequelize.STRING,
    },
    seats: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
  },
  {}
);

Cars.sync().then(() => {
  console.log('Table created');
});

export default Cars;

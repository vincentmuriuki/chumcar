import Sequelize from 'sequelize';
import db from '../config/database.js';
import Cars from './Cars.js';

const Users = db.define(
  'users',
  {
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    isVerified: {
      type: Sequelize.BOOLEAN,
    },
    gender: {
      type: Sequelize.STRING,
    },
    lastLogin: {
      allowNull: true,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW'),
    },
    role: {
      type: Sequelize.ENUM,
      allowNull: false,
      defaultValue: 'customer',
      values: [
        'super_administrator',
        'travel_administrator',
        'suppliers',
        'travel_team_member',
        'manager',
        'customer',
        'car_owner',
      ],
    },
    phoneNumber: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING
    }
  },
  {}
);

Users.associate = (models) => {
  Users.hasMany(Cars),
    {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    };
};

Users.sync().then(() => {
  console.log('Table created');
});

export default Users;

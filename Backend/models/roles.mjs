import { DataTypes } from "sequelize"
import connect from "../config/db.mjs"

const roles = connect.define('roles', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  roleName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  roleDescription: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true, // Agrega createdAt y updatedAt automáticamente
  
})

export default roles

import { DataTypes } from "sequelize";
import connect from "../config/db.mjs";

export const rooms = connect.define(
    "rooms",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        tipo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        piso: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        numeroHabitacion: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        capacidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        precio: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        estado: {
            type: DataTypes.ENUM("Ocupada", "Disponible"),
            defaultValue: "Disponible",
            allowNull: false
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notEmpty: true,
              isUrl: {
                msg: "Debe ser una URL válida"
              }
            },
            defaultValue: "https://images.unsplash.com/photo-1566669437687-7040a6926753?w=400&h=300"
          }
    
    },
    {
        indexes: [
            {
                unique: true,
                fields: ["piso", "numeroHabitacion"] // Evita habitaciones duplicadas en el mismo piso
            }
        ]
    }
);

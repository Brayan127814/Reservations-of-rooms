import connect from "../config/db.mjs"
import {
    DataTypes
} from "sequelize";

const cliente = connect.define("Clientes", {


    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lastName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    cedula:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
  
 
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail:true    
        }
    },
    telefono:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            len:[10,10]
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            min:8
        }
    },

    rolID:{
        type:DataTypes.INTEGER,
        defaultValue:2

    }

})


export default cliente;

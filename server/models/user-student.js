const mongoose = require("mongoose");

const UserStudentSchema = new mongoose.Schema({
  //Image?
  name: {
    type: String,
    required: [true, "You must provide a name to subscribe to My Impact"],
    minLength: 3,
    maxLength: 50,
  },
  surname: {
    type: String,
    required: [true, "You must provide a surname to subscribe to My Impact"],
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, "You must provide an email to subscribe to My Impact"],
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "You must provide a Password to subscribe to My Impact"],
    minLength: 6,
    match: [
      "^(?=.[a-z])(?=.[A-Z])(?=.d)(?=.[@#$%^&+=])(?=.*[a-zA-Zd@#$%^&+=]).{8,}$", //Da verificare
      "Please provide a valid email",
    ]
  },
  university: {
    type: String,
    required: [true, "Please select an university"],
  },
  matricola: {
    type: String,
    required: true,
    unique: true //Posso generarla in fase di creazione utente dal DB?
  },
});

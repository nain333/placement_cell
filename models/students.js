const mongoose = require('mongoose')
const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    batch: {
      type: String,
      required: true
    },
    college: {
      type: String,
      required: true
    },
    status: {
      type: String,
      //  The enum validator is an array that will check if the value given is an item in the array.
      //  If the value is not in the array, Mongoose will throw a ValidationError when you try to save() student
      enum: ['Placed', 'Not Placed'],
      default: 'Not Placed'
    },
    dsa: {
      type: Number,
      required: true
    },
    webd: {
      type: Number,
      required: true
    },
    react: {
      type: Number,
      required: true
    },
    interviewList: [
       {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Interview'
      }
    ]
  },
  { timestamps: true }
)
const Student = mongoose.model('Student', StudentSchema)
module.exports = Student;

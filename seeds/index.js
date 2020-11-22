const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

const dotenv = require('dotenv');
dotenv.config();



// 🧨 CONNECT TO MONGODB ATLAS 🧨
mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB CONNECTED!'))
  .catch(err => console.log(err));

  const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
      const random1000 = Math.floor(Math.random() * 1000);
      const price = Math.floor(Math.random() * 20) + 10;
      const camp = new Campground({
          author: '5fadd9fdacb11dd91f7ceab0',
          location: `${cities[random1000].city}, ${cities[random1000].state}`,
          title: `${sample(descriptors)} ${sample(places)}`,
          description: 'Maecenas egestas pellentesque velit at porttitor. Ut hendrerit leo ultricies, viverra est sed, tristique erat. Vivamus ac enim diam. Curabitur et dolor auctor, auctor mi nec, lacinia massa. Mauris purus sapien, cursus at eleifend eget, fringilla id nisl. Pellentesque eu nulla dui. In est lorem',
          price,
          images: [
            {
              url: 'https://res.cloudinary.com/tink0408/image/upload/v1605979465/YelpCamp/gfjgxu6invuxnki2zgwh.jpg',
              filename: 'YelpCamp/gfjgxu6invuxnki2zgwh'
            },
            {
              url: 'https://res.cloudinary.com/tink0408/image/upload/v1605979465/YelpCamp/ghhpehtvqig2et6qywd4.jpg',
              filename: 'YelpCamp/ghhpehtvqig2et6qywd4'
            }
          ]
      })
      await camp.save();
  }
}

seedDB().then(() => {
    mongoose.connection.close();
})
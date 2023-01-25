const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '63c8fbd78e9f5972dd6b8228',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            geometry: {
                type: 'Point',
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'A wonderful camping area, with a breathtaking view and unique sunsets. Grab your tent because we are waiting for you to come visit us!',
            price,
            images:  [
                {
                  url: 'https://res.cloudinary.com/driu8s9eg/image/upload/v1674493595/YelpCamp/z5y5f28vh0icbkv7nj97.jpg',
                  filename: 'YelpCamp/z5y5f28vh0icbkv7nj97',
                },
                {
                  url: 'https://res.cloudinary.com/driu8s9eg/image/upload/v1674493596/YelpCamp/caxldie8xkreybykupzy.jpg',
                  filename: 'YelpCamp/caxldie8xkreybykupzy',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
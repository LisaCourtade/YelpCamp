const mongoose = require('mongoose');
const cities = require('./european-cities');
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
    for (let i = 0; i < 300; i++) {
        const random = Math.floor(Math.random() * 69);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '63c8fbd78e9f5972dd6b8228',
            location: `${cities[random].city}, ${cities[random].country}`,
            geometry: {
                type: 'Point',
                coordinates: [cities[random].longitude, cities[random].latitude]
            },
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'A wonderful camping area, with a breathtaking view and unique sunsets. Grab your tent because we are waiting for you to come visit us!',
            price,
            images:  [
                {
                    url: 'https://res.cloudinary.com/driu8s9eg/image/upload/v1674726485/YelpCamp/mnefwzrpb5uvhngfsds7.jpg',
                    filename: 'YelpCamp/mnefwzrpb5uvhngfsds7',
                },
                {
                  url: 'https://res.cloudinary.com/driu8s9eg/image/upload/v1674493595/YelpCamp/z5y5f28vh0icbkv7nj97.jpg',
                  filename: 'YelpCamp/z5y5f28vh0icbkv7nj97',
                },
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
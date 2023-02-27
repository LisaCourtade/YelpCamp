const mongoose = require('mongoose');
const cities = require('./european-cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.set('strictQuery', false);

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];
const img = {
    river: [
        {
            url: 'https://res.cloudinary.com/driu8s9eg/image/upload/v1675688722/YelpCamp/river_jvidew.jpg',
            filename: 'YelpCamp/river_jvidew',
        },
        {
            url: 'https://res.cloudinary.com/driu8s9eg/image/upload/v1675688719/YelpCamp/river_close_wcyghm.jpg',
            filename: 'YelpCamp/river_close_wcyghm',
        },
        {
            url: 'https://res.cloudinary.com/driu8s9eg/image/upload/v1675688661/YelpCamp/forest_xei9pn.jpg',
            filename: 'YelpCamp/forest_xei9pn',
        }
    ],
    mountain: [
        {
            url: 'https://res.cloudinary.com/driu8s9eg/image/upload/v1675688710/YelpCamp/mountain_qehddo.jpg',
            filename: 'YelpCamp/mountain_qehddo',
        },
        {
            url: 'https://res.cloudinary.com/driu8s9eg/image/upload/v1675688714/YelpCamp/moutain_tent_mbrqoo.jpg',
            filename: 'YelpCamp/moutain_tent_mbrqoo',
        }
    ],
    lake: [
        {
            url: 'https://res.cloudinary.com/driu8s9eg/image/upload/v1675688701/YelpCamp/lake_boat_kvemdp.jpg',
            filename: 'YelpCamp/lake_boat_kvemdp',
        },
        {
            url: 'https://res.cloudinary.com/driu8s9eg/image/upload/v1675689058/YelpCamp/night_ww32h1.jpg',
            filename: 'YelpCamp/night_ww32h1',
        }
    ],
    lakeTwo: [
        {
            url: 'https://res.cloudinary.com/driu8s9eg/image/upload/v1675688705/YelpCamp/lake_jujtyv.jpg',
            filename: 'YelpCamp/lake_jujtyv',
        },
        {
            url: 'https://res.cloudinary.com/driu8s9eg/image/upload/v1675688661/YelpCamp/forest_xei9pn.jpg',
            filename: 'YelpCamp/forest_xei9pn',
        }
    ]   
};

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 150; i++) {
        const random = Math.floor(Math.random() * 69);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: random >= 34 ? '63e0f372a673e476936e026a' : '63e0f396a673e476936e0271',
            location: `${cities[random].city}, ${cities[random].country}`,
            geometry: {
                type: 'Point',
                coordinates: [cities[random].longitude, cities[random].latitude]
            },
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'A wonderful camping area, with a breathtaking view and unique sunsets. Grab your tent because we are waiting for you to come visit us!',
            price,
            images: random <= 34 ? img.river : img.lake
        })
        await camp.save();
    }
    for (let i = 0; i < 150; i++) {
        const random = Math.floor(Math.random() * 69);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp2 = new Campground({
            author: random >= 34 ? '63e0f396a673e476936e0271' : '63e0f372a673e476936e026a',
            location: `${cities[random].city}, ${cities[random].country}`,
            geometry: {
                type: 'Point',
                coordinates: [cities[random].longitude, cities[random].latitude]
            },
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'A wonderful camping area, with a breathtaking view and unique sunsets. Grab your tent because we are waiting for you to come visit us!',
            price,
            images: random <= 34 ? img.mountain : img.lakeTwo
        })
        await camp2.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
const mongoose = require('mongoose');
const Post = require('../models/post');

mongoose.connect('mongodb+srv://sweetyagarwal3113_db_user:Swag3113@cluster0.dihhrqa.mongodb.net/messages?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => Post.find())
    .then(posts => {
        const promises = posts.map(p => {
            if (p.imageUrl && p.imageUrl.includes('\\')) {
                p.imageUrl = p.imageUrl.replace(/\\/g, '/');
                return p.save();
            }
            return Promise.resolve();
        });
        return Promise.all(promises);
    })
    .then(() => {
        console.log('Fixed Database Images Successfully');
        mongoose.disconnect();
    })
    .catch(e => {
        console.error(e);
        mongoose.disconnect();
    });

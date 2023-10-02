const mongoose = require('mongoose');

// Define the schema
const articleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }, 
    date: {
        type: Date,
        required: true
    },
    content: {
        type: Array,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
});

articleSchema.statics.createArticle = async function (data, callback) {
    console.log("biz kötüyüz aynen");
    if(!data.name || !data.author || !data.content || !data.description)
    return callback({ error: true, errorMessage: 'bad_request', article: null});

    const Article = this;

    const articleData = {
        name: data.name,
        description: data.description,
        date: new Date(),
        content: data.content,
        author: data.author
    };
    const newArticle = new Article(articleData);
    await newArticle.save();
    console.log(newArticle)
    return callback({ error: null, article: newArticle.id });

}

articleSchema.statics.getArticles = async function (callback) {
    
        const Article = this;
    
        const articles = await Article.find({});
        console.log("burası artickes gacı")
        console.log(articles);
        return callback({ error: null, articles: articles });
    
    }


module.exports = mongoose.model('Article', articleSchema);
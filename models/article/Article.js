const mongoose = require('mongoose');
const article_types = ['fashion', 'runway', 'beauty', 'culture', 'living', 'shopping']
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
    type: {
        type: String,
        required: true
    }
});


articleSchema.statics.createArticle = async function (data, callback) {
    if (!article_types.includes(data.type)) {
        return callback({ error: true, errorMessage: 'bad_request', article: null });
    }
    if(!data.name || !data.author || !data.content || !data.description) {
        return callback({ error: true, errorMessage: 'bad_request', article: null});
    }

    const Article = this;

    const articleData = {
        name: data.name,
        description: data.description,
        date: new Date(),
        content: data.content,
        author: data.author,
        type: data.type
    };
    const newArticle = new Article(articleData);
    await newArticle.save();
    return callback({ error: null, article: newArticle.id });

}

articleSchema.statics.getArticles = async function (callback) {
    
        const Article = this;
    
        const articles = await Article.find({});
        return callback({ error: null, articles: articles });
    
}

articleSchema.statics.deleteArticle = async function (data, callback) {

    const Article = this;

    await Article.deleteOne({ _id: data })
    return callback({ error: null, success: true });
}


module.exports = mongoose.model('Article', articleSchema);
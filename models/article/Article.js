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
    thumbnail: {
        type: String,
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
    },
    is_featured: {
        type: Boolean,
        default: false
    }
});


articleSchema.statics.createArticle = async function (data, callback) {

    if (!article_types.includes(data.type)) {
        return callback({ error: true, errorMessage: 'bad_request', article: null });
    }
    if(!data.name || !data.author || !data.content || !data.description || !data.thumbnail || !data.type) {
        return callback({ error: true, errorMessage: 'bad_request', article: null});
    }
    const Article = this;

    const articleData = {
        name: data.name,
        description: data.description,
        date: new Date(),
        content: data.content,
        thumbnail: data.thumbnail,
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

articleSchema.statics.setFeatured = async function (data, callback) {
    const Article = this;

    if(Article.find({is_featured: true})) {
        await Article.updateOne({is_featured: true}, {is_featured: false});
    }   
    await Article.updateOne({_id: data}, {is_featured: true});

    return callback({ error: null, success: true });
}

articleSchema.statics.editArticle = async function (data, callback) {
    if (!article_types.includes(data.type)) {
        return callback({ error: true, errorMessage: 'bad_request', article: null });
    }
    if(!data.name || !data.author || !data.content || !data.description || !data.thumbnail || !data.type) {
        return callback({ error: true, errorMessage: 'bad_request', article: null});
    }

    const Article = this;

    console.log(data);

    await Article.updateOne({_id: data._id}, {
        name: data.name,
        description: data.description,
        content: data.content,
        thumbnail: data.thumbnail,
        author: data.author,
        type: data.type,
    });

    return callback({ error: null, success: true});
}

articleSchema.statics.deleteArticle = async function (data, callback) {

    const Article = this;

    await Article.deleteOne({ _id: data })
    return callback({ error: null, success: true });
}

module.exports = mongoose.model('Article', articleSchema);
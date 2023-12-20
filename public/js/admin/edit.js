const addParagraph = (articleContent) => {
    const paragraphWrapper = document.createElement('textarea');
    paragraphWrapper.classList.add('each-create-article-paragraph');
    paragraphWrapper.classList.add('each-content');
    paragraphWrapper.setAttribute('placeholder', 'Paragraph');
    articleContent.appendChild(paragraphWrapper);
}
const addHeader = (articleContent) => {
    const headerWrapper = document.createElement('textarea');
    headerWrapper.classList.add('each-create-article-header');
    headerWrapper.classList.add('each-content');
    headerWrapper.setAttribute('placeholder', 'Header');
    articleContent.appendChild(headerWrapper);
    
}
const addImage = (articleContent) => {
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('each-create-article-image-wrapper');
    imageWrapper.classList.add('each-content');
    const input = document.createElement('input');
    input.classList.add('each-create-article-image-input');
    const image = document.createElement('img');
    image.classList.add('each-create-article-image');
    imageWrapper.appendChild(input);
    imageWrapper.appendChild(image);
    articleContent.append(imageWrapper);
    
}
const addVideo = (articleContent) => {
    const videoWrapper = document.createElement('div');
    videoWrapper.classList.add('each-create-article-video-wrapper');
    videoWrapper.classList.add('each-content');
    const input = document.createElement('input');
    input.classList.add('each-create-article-video-input');
    input.setAttribute('placeholder', 'Video URL'); 
    const iframe = document.createElement('iframe');
    iframe.classList.add('each-create-article-video');
    videoWrapper.appendChild(input);
    videoWrapper.appendChild(iframe);
    articleContent.append(videoWrapper);
}
const addLink = (articleContent) => {
    const linkWrapper = document.createElement('div');
    linkWrapper.classList.add('each-create-article-link');
    linkWrapper.classList.add('each-content');
    linkWrapper.setAttribute('placeholder', 'Link');
    articleContent.appendChild(linkWrapper);
    
}
const addQuote = (articleContent) => {

    const quoteWrapper = document.createElement('div');
    quoteWrapper.classList.add('each-create-article-quote-wrapper');
    quoteWrapper.classList.add('each-content');
    const quoteTextInput = document.createElement('textarea');
    const quoteAuthorInput = document.createElement('textarea');
    quoteTextInput.classList.add('each-create-article-quote-text');
    quoteTextInput.setAttribute('placeholder', 'Quote');
    quoteAuthorInput.classList.add('each-create-article-quote-author');
    quoteAuthorInput.setAttribute('placeholder', 'Author');
    quoteWrapper.appendChild(quoteTextInput);
    quoteWrapper.appendChild(quoteAuthorInput);
    articleContent.appendChild(quoteWrapper);
    
    }

window.addEventListener('load', () => {

    const articleContent = document.querySelector('.article-content-wrapper');
    const errorWrapper = document.querySelector('.error-wrapper');
    let selectedContentType = 'paragraph';

    document.addEventListener('click', (e) => {

        if(e.target.classList.contains('each-article-content-type')) {
            selectedContentButton = document.querySelector('.each-article-content-type-selected')
            if (selectedContentButton) {
                selectedContentButton.classList.remove('each-article-content-type-selected')
                selectedContentButton.classList.add('each-article-content-type')
            }
            e.target.classList.remove('each-article-content-type')
            e.target.classList.add('each-article-content-type-selected')
            selectedContentType = e.target.id;
        }
        if(e.target.classList.contains('each-article-type-option')) {
            selectedContentButton = document.querySelector('.each-article-type-option-selected')
            if (selectedContentButton) {
                selectedContentButton.classList.remove('each-article-type-option-selected')
                selectedContentButton.classList.add('each-article-type-option')
            }
            e.target.classList.remove('each-article-type-option')
            e.target.classList.add('each-article-type-option-selected')
            selectedContentType = e.target.id;
        }

        if(e.target.id === 'add-button') {

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('each-content-delete-button');
            deleteButton.id = 'delete-button';

            switch (selectedContentType) {
                case 'paragraph':
                    addParagraph(articleContent);
                    articleContent.appendChild(deleteButton);
                    break;
                case 'header':
                    addHeader(articleContent);
                    articleContent.appendChild(deleteButton);
                    break;
                case 'image':
                    addImage(articleContent);
                    articleContent.appendChild(deleteButton);
                    break;
                case 'video':
                    addVideo(articleContent);
                    articleContent.appendChild(deleteButton);
                    break;
                case 'link':
                    addLink(articleContent);
                    articleContent.appendChild(deleteButton);
                    break;
                case 'quote':
                    addQuote(articleContent);
                    articleContent.appendChild(deleteButton);
                    break;
            }
        }

        if(e.target.id === 'delete-button') {
            const button = e.target;
            const content = e.target.previousElementSibling;
            content.remove();
            button.remove();
        }
        
        if(e.target.id === 'submit-button') {
            const title = document.querySelector('.article-title-input').value;
            const description = document.querySelector('.article-description-input').value;
            const author = document.querySelector('.article-author-input').value;
            const content = document.querySelectorAll('.each-content');
            const thumbnail = document.querySelector('.article-thumbnail-input').value;
            const id = document.querySelector('.article-id-wrapper').value;
            const date = document.querySelector('.article-date-wrapper').value;
            let type = "";
            if (document.querySelector('.each-article-type-option-selected')){
                type = document.querySelector('.each-article-type-option-selected').id;
            } 
            else {
                errorWrapper.innerHTML = "You must select a type";
                errorWrapper.style.display = 'block';
                return;
            }

            if ((!title) || (!description) || (!author) || (!type) || (!thumbnail) || (title.length === 0) || (description.length === 0) || (author.length === 0) || (type.length === 0) || (thumbnail.length === 0)) {
                errorWrapper.innerHTML = "You must fill all the fields";
                errorWrapper.style.display = 'block';
                return;
            }
            if (content.length === 0) {
                errorWrapper.innerHTML = "You must have at least one content";
                errorWrapper.style.display = 'block';
                return;
            }
            const contentArray = [];
            for(i = 0; i < content.length; i++) {
                if(content[i].classList.contains('each-create-article-paragraph')) {
                    contentArray.push({
                        type: 'paragraph',
                        content: content[i].value
                    });
                }
                if(content[i].classList.contains('each-create-article-header')) {
                    contentArray.push({
                        type: 'header',
                        content: content[i].value
                    });
                }
                if(content[i].classList.contains('each-create-article-image-wrapper')) {
                    contentArray.push({
                        type: 'image',
                        content: content[i].children[0].value
                    });
                }
                if(content[i].classList.contains('each-create-article-video-wrapper')) {
                    contentArray.push({
                        type: 'video',
                        content: content[i].children[0].value
                    });
                }
                if(content[i].classList.contains('each-create-article-quote-wrapper')) {
                    contentArray.push({
                        type: 'quote',
                        content: content[i].children[0].value,
                        author: content[i].children[1].value
                    });
                }
            }
            console.log(contentArray);
            const data = {
                name: title,
                description,
                author,
                thumbnail,
                content: contentArray,
                type: type,
                date: date,
                _id: id
            }
            console.log(data);
            serverRequest('/admin/edit', 'POST', data, (res) => {
                if(res.success) {
                    window.location.href = '/admin/article';
                } else {
                    return;
                }
            });
        }

    });
    document.addEventListener('keyup', (e) => {

        console.log("keydown");
        if(e.target.classList.contains('each-create-article-image-input')) {
            console.log("keydowninput");
            console.log(e.target);
            const inputWrapper = e.target.parentElement.querySelector('.each-create-article-image-input');
            const link = e.target.parentElement.querySelector('.each-create-article-image-input').value;
            console.log(link);
            const image = inputWrapper.parentElement.querySelector('.each-create-article-image');
            image.src = link;
        }
        if(e.target.classList.contains('each-create-article-video-input')) {
            console.log("keydowninput");
            console.log(e.target);
            const inputWrapper = e.target.parentElement.querySelector('.each-create-article-video-input');
            const link = e.target.parentElement.querySelector('.each-create-article-video-input').value;
            console.log(link);
            const video = inputWrapper.parentElement.querySelector('.each-create-article-video');
            video.src = link;
        }

    })
});

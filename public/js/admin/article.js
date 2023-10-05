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
const addVideo = () => {
    
}
const addLink = () => {
    
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
            switch (selectedContentType) {
                case 'paragraph':
                    addParagraph(articleContent);
                    break;
                case 'header':
                    addHeader(articleContent);
                    break;
                case 'image':
                    addImage(articleContent);
                    break;
                case 'video':
                    addVideo(articleContent);
                    break;
                case 'link':
                    addLink(articleContent);
                    break;
            }
            //TO-DO add quote endpoint
        }

        if(e.target.id === 'submit-button') {
            const title = document.querySelector('.article-title-input').value;
            const description = document.querySelector('.article-description-input').value;
            const author = document.querySelector('.article-author-input').value;
            const content = document.querySelectorAll('.each-content');
            let type = "";
            if (document.querySelector('.each-article-type-option-selected')){
                type = document.querySelector('.each-article-type-option-selected').id;
            } 
            else {
                errorWrapper.innerHTML = "You must select a type";
                errorWrapper.style.display = 'block';
                return;
            }

            if ((!title) || (!description) || (!author) || (!type) || (title.length === 0) || (description.length === 0) || (author.length === 0)) {
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
            }
            console.log(contentArray);
            const data = {
                name: title,
                description,
                author,
                content: contentArray,
                type: type
            }
            console.log(data);
            serverRequest('/admin/article', 'POST', data, (res) => {
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
    })
});

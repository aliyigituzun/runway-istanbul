window.addEventListener('load', () => {

    document.addEventListener('click', (e) => {
        
        if(e.target.classList.contains('delete') || e.target.parentElement.classList.contains('delete')) {
            const id = e.target.getAttribute("data-id");
            const link = '/admin/delete/' + e.target.getAttribute("data-id");
            serverRequest(link, 'POST', {id}, (res) => {
                if(res.success) {
                    window.location.href = '/admin/';
                } else {
                    return;
                }
            });
            
        }
        if(e.target.classList.contains('set-featured-button') || e.target.parentElement.classList.contains('set-featured-button')) {
            const id = document.querySelector('.featured-control-panel-input').value;
            console.log(id);

            serverRequest('/admin/featured', 'POST', {id}, (res) => {
                if(res.success) {
                    window.location.href = '/admin/';
                } else {
                    return;
                }
            });

        }
    });

});

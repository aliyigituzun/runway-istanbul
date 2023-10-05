window.addEventListener('load', () => {

    document.addEventListener('click', (e) => {
        
        if(e.target.classList.contains('delete') || e.target.parentElement.classList.contains('delete')) {
            console.log("burası burası " + e.target.getAttribute("data-id"))
            const id = e.target.getAttribute("data-id");
            const link = '/admin/delete/' + e.target.getAttribute("data-id");
            serverRequest(link, 'POST', {id}, (res) => {
                console.log(res);
                if(res.success) {
                    window.location.href = '/admin/';
                } else {
                    return;
                }
            });
            
        }
    });

});

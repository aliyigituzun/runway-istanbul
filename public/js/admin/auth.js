window.addEventListener('load', () => {

    document.addEventListener('click', (e) => {
        
        if(e.target.id === 'login') {
            let password = document.getElementById('password').value;
            serverRequest('/admin/auth', 'POST', {password}, (res) => {
                if(res.status === 200) {
                    window.location.href = '/admin';
                } else {
                    return;
                }
            });
            
        }
    });
});

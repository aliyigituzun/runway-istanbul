window.addEventListener('load', () => {

    document.addEventListener('click', (e) => {
        
        if(e.target.id === 'login' || e.target.parentElement.id === 'login') {
            let password = document.getElementById('password').value;
            serverRequest('/admin/auth', 'POST', {password}, (res) => {
                if(res.success) {
                    window.location.href = '/admin/article';
                } else {
                    return;
                }
            });
            
        }
    });
    document.addEventListener('keypress', (e) => {

        if (e.key === 'Enter') {
            let password = document.getElementById('password').value;
            serverRequest('/admin/auth', 'POST', {password}, (res) => {
                if(res.success) {
                    window.location.href = '/admin';
                } else {
                    return;
                }
            });
        }
    });
});

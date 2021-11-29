window.onload = function() {

    document.querySelector('#wiki-form').addEventListener('submit', submitWiki);

    function submitWiki() {
        event.preventDefault();
        
        const getFormData = document.querySelector('#wiki-form');

        let formData = new FormData();

        formData.enctype='application/x-www-form-urlencoded';
        formData.method='post';

        formData.append("title", getFormData.querySelector('#wiki-title').value);
        formData.append("contents", getFormData.querySelector('#wiki-contents').value);
        formData.append("creatorId", 1);

        for (var pair of formData.entries()) {
            console.log(pair[0] + ' : ' + pair[1]);
        }

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === xhr.DONE) {
                if (xhr.status === 200 || xhr.status === 201) {
                    console.log('send success!');
                }
                else {
                    console.error(xhr.responseText);
                }
            }
        }
        xhr.open('POST', 'http://localhost:8080/wiki/save');
        // 헤더에 content-type 셋팅하면 서버에서 dto에 바인딩이 안된다. 왜지.
        // xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        // xhr.setRequestHeader('Content-Type', 'multipart/form-data');
        xhr.send(formData);

    }

}
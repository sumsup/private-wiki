window.onload = function () {
    const xhr = new XMLHttpRequest();

    document.querySelector('#wiki-form').addEventListener('submit', submitWiki);
    document.querySelector('#go-to-list-btn').addEventListener('click', goToListPage);

    let editor = CodeMirror.fromTextArea(document.getElementById('wiki-contents'),
        {
            lineNumbers: true,
            autoCloseBrackets: true,
            jumpToLine: true,
            runMode: true,
            activeLines: true,
            mode: "markdown"
        }
    );

    function submitWiki() {
        event.preventDefault();

        const getFormData = document.querySelector('#wiki-form');

        let formData = new FormData();

        formData.enctype = 'application/x-www-form-urlencoded';
        formData.method = 'post';

        formData.append("title", getFormData.querySelector('#wiki-title').value);
        formData.append("contents", editor.getValue());
        formData.append("creatorId", 1);

        for (var pair of formData.entries()) {
            console.log(pair[0] + ' : ' + pair[1]);
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === xhr.DONE) {
                if (xhr.status === 200 || xhr.status === 201) {
                    window.location.href = "/page/wiki/list";
                } else {
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

    function goToListPage() {
        window.location.href = '/page/wiki/list';
    }

}
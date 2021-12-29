window.addEventListener('load',function () {

    (function () {
        // global
        const formElementObj = {
            wiki: document.querySelector('#wiki-form'),
        }
        const buttonElementObj = {
            goToList: document.querySelector('#go-to-list-btn'),
        }
        const divElementObj = {
            editorDiv: document.querySelector('#editor'),
        }
        const Editor = toastui.Editor;
        let editor;

        eventListeners();
        setTuiEditor();

        function setTuiEditor() {
            editor = new Editor({
                el: divElementObj.editorDiv,
                height: '500px',
                initialEditType: 'markdown',
                previewStyle: 'vertical',
                usageStatistics: false
            });
            editor.setPlaceholder('위키를 작성해 보세요.');
        }

        function eventListeners() {
            formElementObj.wiki.addEventListener('submit', submitWiki);
            buttonElementObj.goToList.addEventListener('click', goToListPage);
        }

        function submitWiki() {
            event.preventDefault();

            const getFormData = document.querySelector('#wiki-form');

            let formData = new FormData();

            formData.append("title", getFormData.querySelector('#wiki-title').value);
            formData.append("contents", editor.getMarkdown());
            formData.append("creatorId", 1);

            for (var pair of formData.entries()) {
                console.log(pair[0] + ' : ' + pair[1]);
            }

            formData.enctype = 'application/x-www-form-urlencoded';
            formData.method = 'post';
            const URL = 'http://localhost:8080/wiki/save';
            httpRequestSend(goToListPage, 'POST', URL, failRegisterWiki, formData);
        }

        function goToListPage() {
            window.location.href = '/page/wiki/list';
        }

        function failRegisterWiki(arguments) {
            console.error(arguments[1].responseText);
        }

    })();

});
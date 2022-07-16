window.addEventListener('load',function () {

    (function () {
        // global
        const formElementObj = {
            wiki: document.querySelector('#wiki-form'),
        };
        const buttonElementObj = {
            goToList: document.querySelector('#go-to-list-btn'),
        };
        const divElementObj = {
            editorDiv: document.querySelector('#editor'),
        };
        const Editor = toastui.Editor;
        let editor;

        eventListeners();
        setTuiEditor();
        HTTP_COMMON_UTILS.keepSession();

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

            let formData = new FormData();

            formData.append("title", document.querySelector('#wiki-title').value);
            formData.append("contents", editor.getMarkdown());
            formData.append("isPrivate", document.querySelector('#is-private').checked);
            // formData.append("member.email", "testEmail@naver.com");

            for (let pair of formData.entries()) {
                console.log(pair[0] + ' : ' + pair[1]);
            }

            formData.enctype = 'application/x-www-form-urlencoded';
            formData.method = 'post';
            const URL = 'http://localhost:8080/wiki/save';
            HTTP_COMMON_UTILS.httpRequestSend(goToListPage, 'POST', URL, failRegisterWiki, formData);
        }

        function goToListPage() {
            window.location.href = '/page/wiki/list';
        }

        function failRegisterWiki(arguments) {
            console.error("wiki save status : %s" , arguments[1].status);
        }

    })();

});
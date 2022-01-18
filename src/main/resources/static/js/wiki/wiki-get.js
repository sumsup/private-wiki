window.addEventListener('load',function () {

    // 모듈화. IIFE. Immediately Invoked Function Expression.
    (function() {

        const buttonElementObj = {
            goList : document.querySelector('#go-list-btn'),
            delWiki : document.querySelector('#wiki-del-btn'),
            modify : document.querySelector('#modify-btn'),
            cancelModify : document.querySelector('#modify-cancel-btn'),
            sendModify : document.querySelector('#modify-go-btn'),
        }

        const divElementObj = {
            sendModifyBtnDiv : document.querySelector('#modify-go-div'),
            cancelModifyBtnDiv : document.querySelector('#modify-cancel-div'),
            contentsDiv : document.querySelector('#get-contents-div'),
            viwerDiv : document.querySelector('#viewer'),
            editorDiv : document.querySelector('#editor')
        }

        let wikiId = getCookie('id');

        // const Editor = toastui.Editor;
        let editor;
        let viewer;

        getWiki(wikiId);
        addEventListener();

        function setViewer(wikiContents) {
            let optionObj = {
                el: divElementObj.viwerDiv,
                height: '500px',
                usageStatistics: false,
                viewer: true,
                initialValue: wikiContents
            };

            viewer = toastui.Editor.factory(optionObj);
        }

        function setEditor(wikiContents) {
            const Editor = toastui.Editor;
            let optionObj = {
                el: divElementObj.editorDiv,
                height: '500px',
                initialEditType: 'markdown',
                previewStyle: 'vertical',
                usageStatistics: false,
                initialValue: wikiContents
            };

            editor = new Editor(optionObj);
        }


        function getWiki(id) {
            httpRequestSend(displayWiki, 'GET', 'http://localhost:8080/wiki/' + id, getWikiContentFail);
        }

        function getWikiContentFail(arguments) {
            let id = arguments[1];
            console.log('get wiki contents failed id : %s' , id);
        }

        function displayWiki(arguments) {
            let wikiData = arguments[1];

            // 위키 내용을 화면에 표시.
            let wikiDisplay = '<div>타이틀</div>' +
            '<div id="wiki-title">' + wikiData['title'] + '</div>' +
            '<div>작성날짜</div>' +
            '<div id ="wiki-created-at">' + wikiData['createdAt'] + '</div>' +
            '<div>수정날짜</div>' +
            '<div id="wiki-updated-at">' + wikiData['updatedAt'] + '</div>'
                // +
            // '<div id="get-contents-div">본문' +
            // '<div id="wiki-contents">' + wikiData['contents'] + '</div></div>'
            ;

            let wikiElem = document.querySelector('#wiki-display-div');
            wikiElem.insertAdjacentHTML('afterbegin', wikiDisplay);

            // 본문 내용을 수정창에도 추가.
            let wikiContents = wikiData['contents'];
            setViewer(wikiContents);
            setEditor(wikiContents);
            divElementObj.editorDiv.style.display = 'none';
        }

        function addEventListener() {
            buttonElementObj.goList.addEventListener('click', goToList);
            buttonElementObj.delWiki.addEventListener('click', delWiki);
            buttonElementObj.modify.addEventListener('click', modifyContents);
            buttonElementObj.cancelModify.addEventListener('click', modifyCancel);
            buttonElementObj.sendModify.addEventListener('click', sendModify);
        }

        function delWiki() {
            if (confirm('현재 위키를 삭제 하시겠습니까?')) {
                // 위키 삭제 api 를 호출하고 리스트 페이지로 리다이렉트 시킴.
                let url = 'http://localhost:8080/wiki/delete/' + getCookie('id');
                httpRequestSend(afterDelete, "DELETE", url, deleteFailCallback);
            }
        }

        function deleteFailCallback() {
            console.log('delete wiki failed');
        }

        function afterDelete() {
            console.log('삭제 완료');
            location.href = '/page/wiki/list';
        }

        function goToList() {
            // js 단에서 페이지 이동은 XHR로 하지 않는다. redirect 함.
            window.location.href= '/page/wiki/list';
        }

        function modifyContents() {
            // 수정 버튼을 화면에서 지우고. display none으로.
            buttonElementObj.modify.style.display = 'none';

            // 본문 내용도 화면에서 지우고. 자리도 차지하지 못하도록 제거.
            divElementObj.viwerDiv.style.display = 'none';

            // 수정완료 버튼 화면에 표시.
            divElementObj.sendModifyBtnDiv.style.visibility = 'visible';
            divElementObj.cancelModifyBtnDiv.style.visibility = 'visible';

            // 에디터 화면을 띄운다.
            divElementObj.editorDiv.style.display = 'block';
        }

        function modifyCancel() {
            if (confirm('수정을 취소 하시겠습니까?')) {
                // 수정취소 하면 -> 수정완료 버튼, 수정취소 버튼을 숨긴다.
                divElementObj.sendModifyBtnDiv.style.visibility = 'hidden';
                divElementObj.cancelModifyBtnDiv.style.visibility = 'hidden';

                // 수정 버튼을 표시한다.
                buttonElementObj.modify.style.display = 'unset';

                // 본문을 표시한다.
                divElementObj.viwerDiv.style.display = 'block';

                // 에디터를 숨긴다.
                divElementObj.editorDiv.style.display = 'none';
            }

        }

        function sendModify() {
            let url = 'http://localhost:8080/wiki/update/' + wikiId;

            let formData = new FormData();
            formData.enctype = 'application/x-www-form-urlencoded';
            formData.method = 'post';

            formData.append('title', document.querySelector('#wiki-title').innerText);
            formData.append('contents', editor.getMarkdown());
            formData.append('creatorId', '1');

            let createdAt = new Date(document.querySelector('#wiki-created-at').innerText)
                .toISOString();
            formData.append('createdAt', createdAt);

            httpRequestSend(afterSuccessModify, 'POST', url, afterFailModify, formData);
        }

        function afterSuccessModify() {
            location.href = '/page/wiki/get?id=' + wikiId;
        }

        function afterFailModify() {
            console.log('update fail wiki id : %s', wikiId);
        }

    })();

});


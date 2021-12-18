window.onload = function () {

    // 모듈화. IIFE. Immediately Invoked Function Expression.
    (function () {

        let wikiId = getCookie('id');

        getWiki(wikiId);
        addEventListener();

        function getWiki(id) {
            httpRequestSend(displayWiki, 'GET', 'http://localhost:8080/wiki/' + id, getWikiContentFail);
        }

        function getWikiContentFail(arguments) {
            let id = arguments[1];
            console.log('get wiki contents failed id : %s' , id);
        }

        function displayWiki(arguments) {
            let wikiData = arguments[1];

            // 본문 작성창 숨기기.
            document.querySelector('#edit-contents-div').style.display = 'none';

            // 위키 내용을 화면에 표시.
            let wikiDisplay = '<div>타이틀</div>' +
            '<div id="wiki-title">' + wikiData['title'] + '</div>' +
            '<div>작성날짜</div>' +
            '<div id ="wiki-created-at">' + wikiData['createdAt'] + '</div>' +
            '<div>수정날짜</div>' +
            '<div id="wiki-updated-at">' + wikiData['updatedAt'] + '</div>' +
            '<div id="get-contents-div">본문' +
            '<div id="wiki-contents">' + wikiData['contents'] + '</div></div>';

            let wikiElem = document.querySelector('#wiki-display-div');
            wikiElem.insertAdjacentHTML('afterbegin', wikiDisplay);

            // 본문 내용을 수정창에도 추가.
            document.querySelector('#wiki-contents-edit').value = wikiData['contents'];
        }

        function addEventListener() {
            document.querySelector('#go-list-btn').addEventListener('click', goToList);
            document.querySelector('#wiki-del-btn').addEventListener('click', delWiki);
            document.querySelector('#modify-btn').addEventListener('click', modifyContents);
            document.querySelector('#modify-cancel-btn').addEventListener('click', modifyCancel);
            document.querySelector('#modify-go-btn').addEventListener('click', sendModify);
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
            document.querySelector('#modify-btn').style.display = 'none';

            // 본문 내용도 화면에서 지우고. 자리도 차지하지 못하도록 제거.
            document.querySelector('#get-contents-div').style.visibility = 'hidden';

            // 수정완료 버튼 화면에 표시.
            document.querySelector('#modify-go-div').style.visibility = 'visible';
            document.querySelector('#modify-cancel-div').style.visibility = 'visible';

            // 에디터 화면을 띄운다.
            document.querySelector('#edit-contents-div').style.display = 'unset';

        }

        function modifyCancel() {
            // 수정 취소 할건지?
            if (confirm('정말 수정 취소할꺼야?')) {
                // 수정취소 하면 -> 수정완료 버튼, 수정취소 버튼을 숨긴다.
                document.querySelector('#modify-go-div').style.visibility = 'hidden';
                document.querySelector('#modify-cancel-div').style.visibility = 'hidden';

                // 에디터를 숨긴다.
                document.querySelector('#edit-contents-div').style.display = 'none';

                // 수정 버튼을 표시한다.
                document.querySelector('#modify-btn').style.display = 'unset';

                // 본문을 표시한다.
                document.querySelector('#get-contents-div').style.visibility = 'visible';
            }

        }

        function sendModify() {
            let url = 'http://localhost:8080/wiki/update/' + wikiId;

            let formData = new FormData();
            formData.enctype = 'application/x-www-form-urlencoded';
            formData.method = 'post';

            formData.append('title', document.querySelector('#wiki-title').innerText);
            formData.append('contents', document.querySelector('#wiki-contents-edit').value);
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

}


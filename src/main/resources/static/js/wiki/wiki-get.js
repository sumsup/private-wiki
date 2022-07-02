window.addEventListener('load',function () {

        let wikiId = HTTP_COMMON_UTILS.getCookie('id');

        // const Editor = toastui.Editor;
        let editor;
        let viewer;

        getWiki(wikiId);

        const buttonElementObj = {
            delWiki : document.querySelector('#wiki-del-btn'),
            modify : document.querySelector('#modify-btn'),
            cancelModify : document.querySelector('#modify-cancel-btn'),
            sendModify : document.querySelector('#modify-go-btn'),
        };

        const divElementObj = {
            titleDiv : document.querySelector('#wiki-title'),
            wrapTitleDiv: document.querySelector('#wiki-title-wrap-div'),
            createdAtDiv : document.querySelector('#wiki-created-at'),
            updatedAtDiv : document.querySelector('#wiki-updated-at'),
            nicknameDiv : document.querySelector('#wiki-creator-nickname'),
            sendModifyBtnDiv : document.querySelector('#modify-go-div'),
            cancelModifyBtnDiv : document.querySelector('#modify-cancel-div'),
            contentsDiv : document.querySelector('#get-contents-div'),
            viwerDiv : document.querySelector('#viewer'),
            editorDiv : document.querySelector('#editor'),
            titleModifyDiv: document.querySelector('#title-input-div'),
            deleteDiv: document.querySelector('#wiki-del-btn-div')
        };

        const inputElementObj = {
            title : document.querySelector('#wiki-title-input'),
        };

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
            HTTP_COMMON_UTILS
                .httpRequestSend(displayWiki, 'GET', 'http://localhost:8080/wiki/get/' + id, getWikiContentFail);
        }

        function getWikiContentFail(arguments) {
            let xhr = arguments[1];
            console.log('get wiki contents failed URL : %s' , xhr.responseURL);
            if (xhr.status === 503) {
                location.href = '/page/member/login';
            }
        }

        function displayWiki(arguments) {
            let wikiData = arguments[1];

            let title = wikiData['title'];
            let createdAt = wikiData['createdAt'].replace('T', ' ');
            let updatedAt = wikiData['updatedAt'] === null ? '-' : wikiData['updatedAt'];
            let creatorNickname = wikiData.member.nickname;

            // 위키 내용을 화면에 표시.
            // 이렇게 나중에 화면에 표시하면, dom 객체에서 읽지 못하고 null 을 반환하는 경향이 있음.
            // let wikiDisplay = `<div id="wiki-title-div"><h3>타이틀</h3>
            //     <div id="wiki-title">${title}</div></div>
            //     <div id="title-input-div" style="display: none;">
            //         <label for="wiki-title-input"><h3>타이틀</h3></label>
            //         <input type="text" id="wiki-title-input" value="${title}">
            //     </div>
            //     <div><h3>작성날짜</h3></div>
            //     <div id ="wiki-created-at">${createdAt}</div>
            //     <div><h3>수정날짜</h3></div>
            //     <div id="wiki-updated-at">${updatedAt}</div>`;
            //
            // let wikiElem = document.querySelector('#wiki-display-div');
            // wikiElem.insertAdjacentHTML('afterbegin', wikiDisplay);

            divElementObj.titleDiv.innerText = title;
            divElementObj.createdAtDiv.innerText = createdAt;
            divElementObj.updatedAtDiv.innerText = updatedAt;
            divElementObj.nicknameDiv.innerText = creatorNickname;
            inputElementObj.title.value = title;

            // 본문 내용을 수정창에도 추가.
            let wikiContents = wikiData['contents'];
            setViewer(wikiContents);
            setEditor(wikiContents);
            divElementObj.editorDiv.style.display = 'none';
        }

        function addEventListener() {
            buttonElementObj.delWiki.addEventListener('click', delWiki);
            buttonElementObj.modify.addEventListener('click', modifyContents);
            buttonElementObj.cancelModify.addEventListener('click', modifyCancel);
            buttonElementObj.sendModify.addEventListener('click', sendModify);
        }

        function delWiki() {
            if (confirm('현재 위키를 삭제 하시겠습니까?')) {
                // 위키 삭제 api 를 호출하고 리스트 페이지로 리다이렉트 시킴.
                let url = 'http://localhost:8080/wiki/delete/' + HTTP_COMMON_UTILS.getCookie('id');
                HTTP_COMMON_UTILS.httpRequestSend(afterDelete, "DELETE", url, deleteFailCallback);
            }
        }

        function deleteFailCallback() {
            console.log('delete wiki failed');
        }

        function afterDelete() {
            console.log('삭제 완료');
            location.href = '/page/wiki/list';
        }

        function modifyContents() {
            disappearElementForModify();
            displayElementForModify();
            HTTP_COMMON_UTILS.keepSession();
        }

        function disappearElementForModify() {
            // 수정 버튼을 화면에서 지우고. display none으로.
            buttonElementObj.modify.style.display = 'none';

            // 본문 내용도 화면에서 지우고. 자리도 차지하지 못하도록 제거.
            divElementObj.viwerDiv.style.display = 'none';
            // 본문 타이틀 표시 내용 숨김.
            divElementObj.wrapTitleDiv.style.display = 'none';

            // 삭제 버튼도 숨김.
            divElementObj.deleteDiv.style.display = 'none';
        }

        function displayElementForModify() {
            // 수정완료 버튼 화면에 표시.
            divElementObj.sendModifyBtnDiv.style.visibility = 'visible';
            divElementObj.cancelModifyBtnDiv.style.visibility = 'visible';

            // 에디터 화면을 띄운다.
            divElementObj.editorDiv.style.display = 'block';
            // 타이틀 수정 input을 표시.
            divElementObj.titleModifyDiv.style.display = 'inline';
        }

        function modifyCancel() {
            if (confirm('수정을 취소 하시겠습니까?')) {
                disappearElementForCancelModify();
                displayElementForCancelModify();
                HTTP_COMMON_UTILS.keepSessionFlag = false;
            }

        }

        function disappearElementForCancelModify() {
            // 수정취소 하면 -> 수정완료 버튼, 수정취소 버튼을 숨긴다.
            divElementObj.sendModifyBtnDiv.style.visibility = 'hidden';
            divElementObj.cancelModifyBtnDiv.style.visibility = 'hidden';
            // 에디터를 숨긴다.
            divElementObj.editorDiv.style.display = 'none';
            // 타이틀 수정창을 숨긴다.
            divElementObj.titleModifyDiv.style.display = 'none';
        }

        function displayElementForCancelModify() {
            // 수정 버튼을 표시한다.
            buttonElementObj.modify.style.display = 'unset';
            // 타이틀을 표시한다.
            divElementObj.wrapTitleDiv.style.display = 'inline';
            // 본문을 표시한다.
            divElementObj.viwerDiv.style.display = 'block';
            // 삭제 버튼을 표시한다.
            divElementObj.deleteDiv.style.display = 'inline-block';
        }

        function sendModify() {
            let url = 'http://localhost:8080/wiki/update/' + wikiId;

            let formData = new FormData();
            formData.enctype = 'application/x-www-form-urlencoded';
            formData.method = 'post';

            formData.append('title', inputElementObj.title.value);
            formData.append('contents', editor.getMarkdown());
            formData.append('member.id', '1');

            // let createdAt = new Date(document.querySelector('#wiki-created-at').innerText)
            //     .toISOString();
            // formData.append('createdAt', createdAt);

            HTTP_COMMON_UTILS.httpRequestSend(afterSuccessModify, 'POST', url, afterFailModify, formData);
        }

        function afterSuccessModify() {
            HTTP_COMMON_UTILS.keepSessionFlag = false;
            location.href = '/page/wiki/get?id=' + wikiId;
        }

        function afterFailModify() {
            console.log('update fail wiki id : %s', wikiId);
        }

});


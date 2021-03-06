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

            // ?????? ????????? ????????? ??????.
            // ????????? ????????? ????????? ????????????, dom ???????????? ?????? ????????? null ??? ???????????? ????????? ??????.
            // let wikiDisplay = `<div id="wiki-title-div"><h3>?????????</h3>
            //     <div id="wiki-title">${title}</div></div>
            //     <div id="title-input-div" style="display: none;">
            //         <label for="wiki-title-input"><h3>?????????</h3></label>
            //         <input type="text" id="wiki-title-input" value="${title}">
            //     </div>
            //     <div><h3>????????????</h3></div>
            //     <div id ="wiki-created-at">${createdAt}</div>
            //     <div><h3>????????????</h3></div>
            //     <div id="wiki-updated-at">${updatedAt}</div>`;
            //
            // let wikiElem = document.querySelector('#wiki-display-div');
            // wikiElem.insertAdjacentHTML('afterbegin', wikiDisplay);

            divElementObj.titleDiv.innerText = title;
            divElementObj.createdAtDiv.innerText = createdAt;
            divElementObj.updatedAtDiv.innerText = updatedAt;
            divElementObj.nicknameDiv.innerText = creatorNickname;
            inputElementObj.title.value = title;

            // ?????? ????????? ??????????????? ??????.
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
            if (confirm('?????? ????????? ?????? ???????????????????')) {
                // ?????? ?????? api ??? ???????????? ????????? ???????????? ??????????????? ??????.
                let url = 'http://localhost:8080/wiki/delete/' + HTTP_COMMON_UTILS.getCookie('id');
                HTTP_COMMON_UTILS.httpRequestSend(afterDelete, "DELETE", url, deleteFailCallback);
            }
        }

        function deleteFailCallback() {
            console.log('delete wiki failed');
        }

        function afterDelete() {
            console.log('?????? ??????');
            location.href = '/page/wiki/list';
        }

        function modifyContents() {
            disappearElementForModify();
            displayElementForModify();
            HTTP_COMMON_UTILS.keepSession();
        }

        function disappearElementForModify() {
            // ?????? ????????? ???????????? ?????????. display none??????.
            buttonElementObj.modify.style.display = 'none';

            // ?????? ????????? ???????????? ?????????. ????????? ???????????? ???????????? ??????.
            divElementObj.viwerDiv.style.display = 'none';
            // ?????? ????????? ?????? ?????? ??????.
            divElementObj.wrapTitleDiv.style.display = 'none';

            // ?????? ????????? ??????.
            divElementObj.deleteDiv.style.display = 'none';
        }

        function displayElementForModify() {
            // ???????????? ?????? ????????? ??????.
            divElementObj.sendModifyBtnDiv.style.visibility = 'visible';
            divElementObj.cancelModifyBtnDiv.style.visibility = 'visible';

            // ????????? ????????? ?????????.
            divElementObj.editorDiv.style.display = 'block';
            // ????????? ?????? input??? ??????.
            divElementObj.titleModifyDiv.style.display = 'inline';
        }

        function modifyCancel() {
            if (confirm('????????? ?????? ???????????????????')) {
                disappearElementForCancelModify();
                displayElementForCancelModify();
                HTTP_COMMON_UTILS.keepSessionFlag = false;
            }

        }

        function disappearElementForCancelModify() {
            // ???????????? ?????? -> ???????????? ??????, ???????????? ????????? ?????????.
            divElementObj.sendModifyBtnDiv.style.visibility = 'hidden';
            divElementObj.cancelModifyBtnDiv.style.visibility = 'hidden';
            // ???????????? ?????????.
            divElementObj.editorDiv.style.display = 'none';
            // ????????? ???????????? ?????????.
            divElementObj.titleModifyDiv.style.display = 'none';
        }

        function displayElementForCancelModify() {
            // ?????? ????????? ????????????.
            buttonElementObj.modify.style.display = 'unset';
            // ???????????? ????????????.
            divElementObj.wrapTitleDiv.style.display = 'inline';
            // ????????? ????????????.
            divElementObj.viwerDiv.style.display = 'block';
            // ?????? ????????? ????????????.
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


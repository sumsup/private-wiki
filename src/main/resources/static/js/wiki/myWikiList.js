window.addEventListener('load',function () {
        const buttonElementObj = {
            goToWritePage : document.querySelector('#go-to-write-btn'),
        };

        pageStarter();

        function pageStarter() {
            eventListeners();
            selectList();
            displayButtonWriteWiki();
        }

        // 로그인 상태일 시 위키 작성 버튼을 표시.
        function displayButtonWriteWiki() {
            let isLogined = HTTP_COMMON_UTILS.getCookie('isLogined');

            if (isLogined === 'true') {
                document.querySelector('#write-wiki-div').style.visibility = 'visible';
            }

        }

        function eventListeners() {
            buttonElementObj.goToWritePage.addEventListener('click', goToWritePage);
        }

        function selectList() {
            const URL = 'http://localhost:8080/wiki/list';
            HTTP_COMMON_UTILS.httpRequestSend(displayList, 'GET', URL, afterFailGetList);
        }

        // 위키 리스트를 화면에 표시해 준다.
        function displayList(arguments) {

            let wikiListJson = arguments[1];

            // element를 생성해서 추가하는 방식으로 하려고 했는데, 너무 노가다, 복잡. 그래서 아래처럼 문자열 방식으로 함.
            for (let i = 0; i < wikiListJson.length; i++) {

                let wikiId = wikiListJson[i]['id'];
                let wikiTitle = wikiListJson[i]['title'];
                let contentPreview = wikiListJson[i]['contents'].substring(0,30);
                let createdDate = wikiListJson[i]['createdAt'].replace('T',' ');
                let isPrivate = wikiListJson[i]['isPrivate'] === true ? '비공개' : '공개';

                let oneWikiTemplateElem =
                    `<div class="one-wiki-div">
                    <div class="wiki-title-value-div"><h3><a href="/page/wiki/get?id=${wikiId}">${wikiTitle}</a></h3></div>
                    <div class="content-preview-div"><a href="/page/wiki/get?id=${wikiId}">${contentPreview}</a></div>
                    <div class="is-private-btn">[${isPrivate}]</div>
                    <div class="wiki-created-time-value-div">${createdDate}</div>
                    </div><br>`;

                document.querySelector('#list-div').insertAdjacentHTML('beforeend', oneWikiTemplateElem);
            }

        }

        function goToWritePage() {
            location.href = '/page/wiki/write';
        }

        function afterFailGetList() {
            location.href = '/page/member/login';
        }

});
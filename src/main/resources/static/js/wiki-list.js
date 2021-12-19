window.onload = function (where, html) {
    // 모듈화. IIFE. Immediately Invoked Function Expression.
    (function () {

        const buttonElementObj = {
            goToWritePage : document.querySelector('#go-to-write-btn'),
        }

        eventListeners();
        selectList();

        function eventListeners() {
            buttonElementObj.goToWritePage.addEventListener('click', goToWritePage);
        }

        function selectList() {
            const URL = 'http://localhost:8080/wiki/list';
            httpRequestSend(displayList, 'GET', URL);
        }

        // 위키 리스트를 화면에 표시해 준다.
        function displayList(arguments) {

            let wikiListJson = arguments[1];

            // element를 생성해서 추가하는 방식으로 하려고 했는데, 너무 노가다, 복잡. 그래서 아래처럼 문자열 방식으로 함.
            for (let i = 0; i < wikiListJson.length; i++) {
                let oneWikiTemplate =
                    '<div class="wiki-number-div">' + (i + 1) + '</div>'
                    + '<div class="one-wiki-div">'
                    + '<div class="wiki-title-value-div">'
                    + '<a href="/page/wiki/get?id=' + wikiListJson[i]['id'] + '">'
                    + wikiListJson[i]['title'] + '</a></div>'
                    + '<div class="wiki-created-time-value-div">' + wikiListJson[i]['createdAt'] + '</div>'
                    + '</div>';

                document.querySelector('#list-div').insertAdjacentHTML('beforeend', oneWikiTemplate);
            }

        }

        function goToWritePage() {
            window.location.href = '/page/wiki/write';
        }

    })();

}
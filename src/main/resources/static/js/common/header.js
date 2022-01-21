window.addEventListener('load',function () {

    (function() {
        displayHeader();

        document.body.addEventListener('click', clickEventDispatcher);

        function displayHeader() {
            let displayElem = '<div id="header-div">';
            // 마이 위키 리스트로 가는 버튼 표시.
            // 전체공개 위키 리스트로 가는 버튼 표시.
            displayElem = displayWikiListButton(displayElem);

            let isLogined = getCookie("isLogined");

            // 로그인 상태면 로그아웃 버튼을 띄워주고.
            if (isLogined === 'true') {
                displayElem = displayLogoutButton(displayElem);
            }

            // 로그아웃 상태면 헤더에 회원가입, 로그인 버튼을 띄워 주고.
            if (isLogined !== 'true') {
                displayElem = displayLoginButton(displayElem);
            }

            displayElem += '</div>';
            document.body.insertAdjacentHTML('afterbegin', displayElem);

        }

        function displayWikiListButton(displayElem) {
            displayElem +=
                '<a href="/page/wiki/list"><button type="button" id="go-my-wiki-list">내 위키 목록</button></a>\n' +
                '<a href="/page/wiki/all"><button type="button" id="go-all-wiki-list">모든 위키 목록</button></a>\n';

            return displayElem;
        }

        function displayLogoutButton(displayElem) {
            displayElem += '<button type="button" id="logout-btn">로그아웃</button>\n';

            return displayElem;
        }

        function displayLoginButton(displayElem) {
            displayElem +=
                '<a href="/page/member/join"><button type="button" id="member-join-btn">회원가입</button></a>\n' +
                '<a href="/page/member/login"><button type="button" id="login-btn">로그인</button></a>\n';

            return displayElem;
        }

        // 클릭된 버튼에 따라서 로그인을 수행할지, 로그아웃을 수행할지 결정.
        function clickEventDispatcher() {
            let target = event.target.getAttribute('id');

            // 로그인 이벤트.
            if (target === 'login-btn') {
                // 로그인 페이지로.
                location.href = '/page/member/login';
            }

            // 로그아웃 이벤트.
            else if (target === 'logout-btn') {
                // 로그아웃 api 호출.
                const URL = 'http://localhost:8080/logout';
                httpRequestSend(afterLogout, 'POST', URL, afterLogoutFail, null);

            }

            // 회원가입 이벤트.
            else if (target === 'member-join-btn') {
                // 회원 가입 페이지로.
                location.href = '/page/member/join';
            }

        }

        function afterLogout() {
            console.log('logout success..');
            location.href = '/page/wiki/all';
        }

        function afterLogoutFail() {
            console.log('logout fail..');
        }

    })();



});
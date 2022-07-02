window.addEventListener('load',function () {

    displayHeader();

    document.body.addEventListener('click', clickEventDispatcher);

    function displayHeader() {
        let headerDiv = `<div id="header-div"></div>`;

        document.body.insertAdjacentHTML('afterbegin', headerDiv);

        let displayRightElem = '<div id="right-header-div">';
        let displayLeftElem = '<div id="left-header-div">';
        // 마이 위키 리스트로 가는 버튼 표시.
        // 전체공개 위키 리스트로 가는 버튼 표시.
        displayLeftElem = displayWikiListButton(displayLeftElem);

        let isLogined = HTTP_COMMON_UTILS.getCookie("isLogined");

        // 로그인 상태면 로그아웃 버튼, 위키 작성 버튼을 띄워주고.
        if (isLogined === 'true') {
            displayLeftElem = displayButtonWriteWiki(displayLeftElem);
            displayRightElem = displayLogoutButton(displayRightElem);
        }

        // 로그아웃 상태면 헤더에 회원가입, 로그인 버튼을 띄워 주고.
        if (isLogined !== 'true') {
            displayRightElem = displayLoginButton(displayRightElem);
        }

        displayRightElem += `</div>`;
        displayLeftElem += `</div>`;

        document.querySelector('#header-div').insertAdjacentHTML('afterbegin', displayLeftElem);
        document.querySelector('#header-div').insertAdjacentHTML('beforeend', displayRightElem);

    }

    function displayButtonWriteWiki(displayElem) {
        displayElem += `<div id="write-wiki-div"><button id='go-to-write-btn'>위키작성</button></div>`;

        return displayElem;
    }

    function displayWikiListButton(displayElem) {
        displayElem +=
            `<div class="header-item-div">
             <a href="/page/wiki/list"><button type="button"
                class="header-btn" id="go-my-wiki-list">내 위키 목록</button></a></div> \
             <div class="header-item-div"><a href="/page/wiki/all"><button type="button"
                class="header-btn" id="go-all-wiki-list">모든 위키 목록</button></a></div>`
                .replace(/\s{2,}/g,""); // html 요소 줄바꿈 방지용.

        return displayElem;
    }

    function displayLogoutButton(displayElem) {
        displayElem += `<div class="header-item-div"><button type="button" id="logout-btn">로그아웃</button></div>`;

        return displayElem;
    }

    // backtick 안에서 \ 는 줄바꿈 방지용.
    function displayLoginButton(displayElem) {
        displayElem +=
            `<div class="header-item-div">
             <a href="/page/member/join"><button type="button" 
                    class="header-btn" id="member-join-btn">회원가입</button></a></div>
             <div class="header-item-div">
             <a href="/page/member/login"><button type="button" 
                    class="header-btn" id="login-btn">로그인</button></a></div>`
                .replace(/\s{2,}/g,""); // html 요소 줄바꿈 방지용.

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
            HTTP_COMMON_UTILS.httpRequestSend(afterLogout, 'POST', URL, afterLogoutFail, null);

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

});
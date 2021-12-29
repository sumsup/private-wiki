window.addEventListener('load',function () {

    (function() {
        displayHeader();

        document.body.addEventListener('click', clickEventDispatcher);

        function displayHeader() {
            let isLogined = getCookie("isLogined");

            // 로그인 상태면 로그아웃 버튼을 띄워주고.
            if (isLogined === 'true') {
                let headerElement = '<div>\n' +
                    '        <button type="button" id="logout-btn">로그아웃</button>\n' +
                    '    </div>';

                document.body.insertAdjacentHTML('afterbegin', headerElement);

            }

            // 로그아웃 상태면 헤더에 회원가입, 로그인 버튼을 띄워 주고.
            if (isLogined === null) {
                let headerElement = '<div>\n' +
                    '        <button type="button" id="member-join-btn"><a href="/page/member/join">회원가입</a></button>\n' +
                    '        <button type="button" id="login-btn"><a href="/page/member/login">로그인</a></button>\n' +
                    '    </div>';

                document.body.insertAdjacentHTML('afterbegin', headerElement);
            }

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
            location.href = '/page/member/login';
        }

        function afterLogoutFail() {
            console.log('logout fail..');
        }

    })();



});
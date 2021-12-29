window.addEventListener('load',function () {

    (function () {
        // global variables.
        const buttonElementObj = {
            login: document.querySelector('#login-submit-btn')
        };

        const inputElementObj = {
            email: document.querySelector('#email'),
            password: document.querySelector('#password')
        };

        initLoginPage();

        function initLoginPage() {
            eventListeners();
        }

        function eventListeners() {
            buttonElementObj.login.addEventListener('click', submitLogin);
        }

        function submitLogin() {
            const EMAIL = inputElementObj.email.value;
            const PASSWORD = inputElementObj.password.value;

            const formData = new FormData();

            formData.append('email', EMAIL);
            formData.append('password', PASSWORD);

            const URL = 'http://localhost:8080/login';

            httpRequestSend(afterSuccessLogin, 'POST', URL, afterFailLogin, formData);

        }

        function afterSuccessLogin() {
            console.log("로그인 성공~!!!!");
            // 클라이언트가 로그인 화면에서 로그인 한 거면 리스트 페이지로 이동 시켜줘야 함.
            location.href = "/page/wiki/list";

        }

        function afterFailLogin() {
            alert('로그인에 실패 했습니다.\n 아이디와 패스워드를 확인해 주세요!');
        }

    })();

});
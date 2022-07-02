window.addEventListener('load',function () {

    (function () {
        // global variables.
        const buttonElementObj = {
            login: document.querySelector('#login-submit-btn')
        };

        const inputElementObj = {
            email: document.querySelector('#email'),
            password: document.querySelector('#password'),
        };

        initLoginPage();

        function initLoginPage() {
            eventListeners();
            document.querySelector('#email').focus();
        }

        function eventListeners() {
            buttonElementObj.login.addEventListener('click', submitLogin);
        }

        function submitLogin() {
            // eventListener가 form validation 보다 우선 작동함. 그래서 가입하기 이벤트 발생시,
            // 우선적으로 form validation을 체크.
            if (!document.querySelector('#login-form').reportValidity()) {
                return false;
            }

            const EMAIL = inputElementObj.email.value;
            const PASSWORD = inputElementObj.password.value;

            const formData = new FormData();

            formData.append('email', EMAIL);
            formData.append('password', PASSWORD);

            const URL = 'http://localhost:8080/login';

            HTTP_COMMON_UTILS.httpRequestSend(afterSuccessLogin, 'POST', URL, afterFailLogin, formData);

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
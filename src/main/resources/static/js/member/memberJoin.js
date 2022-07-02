window.addEventListener('load',function () {

    // 모듈화 IIFE. 익명즉시실행함수. Immediately Invoked Function Expression.
    (function () {

        // global variables.
        const buttonElementObj = {
            joinSubmitBtn : document.querySelector('#join-submit-btn')
        };

        const inputElementObj = {
            email : document.querySelector('#email'),
            password : document.querySelector('#password'),
            nickname: document.querySelector('#nickname')
        };

        const formElement = document.querySelector('#member-join-form');

        initJoinPage();

        function initJoinPage() {
            eventListeners();
            document.querySelector('#email').focus();
        }

        function eventListeners() {
            buttonElementObj.joinSubmitBtn.addEventListener('click', joinSubmit);
        }

        function joinSubmit() {
            // eventListener가 form validation 보다 우선 작동함. 그래서 가입하기 이벤트 발생시,
            // 우선적으로 form validation을 체크.
            if (!document.querySelector('#member-join-form').reportValidity()) {
                return false;
            }

            let formData = new FormData();
            formData.append('email', inputElementObj.email.value);
            formData.append('password', inputElementObj.password.value);
            formData.append('nickname', inputElementObj.nickname.value);

            const URL = 'http://localhost:8080/member/join';

            HTTP_COMMON_UTILS.httpRequestSend(successJoinMember, 'POST', URL, failJoinMember, formData);
        }

        function successJoinMember() {
            location.href = '/page/wiki/list';
        }

        function failJoinMember(arguments) {
            console.error('fail join member, reason is : ' + arguments[1].responseText);
        }


    })();

});
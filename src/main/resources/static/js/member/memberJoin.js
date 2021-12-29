window.addEventListener('load',function () {

    // 모듈화 IIFE. 익명즉시실행함수. Immediately Invoked Function Expression.
    (function () {

        // global variables.
        const buttonElementObj = {
            joinSubmitBtn : document.querySelector('#join-submit-btn')
        };

        const inputElementObj = {
            email : document.querySelector('#email'),
            password : document.querySelector('#password')
        };

        const formElement = document.querySelector('#member-join-form');

        initJoinPage();

        function initJoinPage() {
            eventListeners();
        }

        function eventListeners() {
            buttonElementObj.joinSubmitBtn.addEventListener('click', joinSubmit);
        }

        function joinSubmit() {
            event.preventDefault();

            let formData = new FormData();
            formData.append('email', inputElementObj.email.value);
            formData.append('password', inputElementObj.password.value);

            const URL = 'http://localhost:8080/member/join';

            httpRequestSend(successJoinMember, 'POST', URL, failJoinMember, formData);
        }

        function successJoinMember() {
            location.href = '/page/wiki/list';
        }

        function failJoinMember(arguments) {
            console.error('fail join member, reason is : ' + arguments[1].responseText);
        }


    })();

});
// function도 Object에 property로 할당 가능.
// 이 이후부터는 이렇게 도메인 별로 객체로 나누어 보관 하도록 하자.
const HTTP_COMMON_UTILS = {
    keepSessionFlag : true,

    httpRequestSend : function (callback, method, url, failCallback, formData) {
        // XmlHttpRequest를 쓰면 this의 context는 해당 Object가 아니라 XmlHttpRequest 객체를 가리키게 됨.
        // 그래서 해당 객체의 property를 호출 하려면 아래와 같이 this 컨텍스를 변수에 넣고 다시 참조해야 함.
        // this를 할당해 주기 위함.
        const $this = this;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === xhr.DONE) {
                if (xhr.status === 200 || xhr.status === 201) {

                    if (method === 'GET') {
                        if (callback !== null) {
                            $this.finishCallBack(callback, JSON.parse(xhr.responseText));
                        }
                    } else if (method === 'DELETE') {
                        $this.finishCallBack(callback);
                    } else if (method === 'POST') {
                        $this.finishCallBack(callback);
                    }

                } else {
                    $this.finishCallBack(failCallback, xhr);
                }

            }

            if (xhr.status === 503) {
                $this.finishCallBack(failCallback, xhr);
            }

        };

        xhr.open(method, url);

        if (method === 'POST' && formData !== null) {
            xhr.send(formData);
        } else {
            xhr.send();
        }
    },

    finishCallBack : function (callback) {
        if (callback !== null) {
            callback(arguments);
        }
    },

    getCookie : function (cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";

    },

    keepSession : function () {
        const that = this;
        let keepSessionRequest = setInterval(function () {
            if (that.keepSessionFlag === true) {
                console.log("keep session request get going");
                const URL = 'http://localhost:8080/session';
                HTTP_COMMON_UTILS.httpRequestSend(null, 'GET', URL, null, null);
            } else {
                clearInterval(keepSessionRequest);
            }
        }, 50 * 60 * 1000); // 50분 마다 세션 갱신.

    },

};

// function httpRequestSend(callback, method, url, failCallback, formData) {
//     const xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === xhr.DONE) {
//             if (xhr.status === 200 || xhr.status === 201) {
//
//                 if (method === 'GET') {
//                     finishCallBack(callback, JSON.parse(xhr.responseText));
//                 } else if (method === 'DELETE') {
//                     finishCallBack(callback);
//                 } else if (method === 'POST') {
//                     finishCallBack(callback);
//                 }
//
//             } else {
//                 finishCallBack(failCallback, xhr);
//             }
//
//         }
//
//         if (xhr.status === 503) {
//             finishCallBack(failCallback, xhr);
//         }
//
//     };
//
//     xhr.open(method, url);
//
//     if (method === 'POST' && formData !== null) {
//         xhr.send(formData);
//     } else {
//         xhr.send();
//     }
// }

// function getCookie(cname) {
//     let name = cname + "=";
//     let decodedCookie = decodeURIComponent(document.cookie);
//     let ca = decodedCookie.split(';');
//     for (let i = 0; i < ca.length; i++) {
//         let c = ca[i];
//         while (c.charAt(0) == ' ') {
//             c = c.substring(1);
//         }
//         if (c.indexOf(name) == 0) {
//             return c.substring(name.length, c.length);
//         }
//     }
//     return "";
//
// }


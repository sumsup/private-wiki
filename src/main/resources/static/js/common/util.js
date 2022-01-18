    function getCookie(cname) {
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

    }

    function httpRequestSend(callback, method, url, failCallback, formData) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === xhr.DONE) {
                if (xhr.status === 200 || xhr.status === 201) {

                    if (method === 'GET') {
                        finishCallBack(callback, JSON.parse(xhr.responseText));
                    }
                    else if (method === 'DELETE') {
                        finishCallBack(callback);
                    }
                    else if (method === 'POST') {
                        finishCallBack(callback);
                    }

                } else {
                    finishCallBack(failCallback, xhr);
                }

            }
        };

        xhr.open(method, url);

        if (method === 'POST' && formData !== null) {
            xhr.send(formData);
        } else {
            xhr.send();
        }
    }

    function finishCallBack(callback) {
        callback(arguments);
    }


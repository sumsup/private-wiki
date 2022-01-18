window.addEventListener('load', function () {

    displayFooter();

    function displayFooter() {
        const footerElement = '<div>\n' +
            '        <p>All Right Reserved Zetta</p>\n' +
            '    </div>';

        document.body.insertAdjacentHTML('beforeend', footerElement);
    }

});
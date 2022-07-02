window.addEventListener('load', function () {

    displayFooter();

    function displayFooter() {
        const footerElement = `<div id="footer-div"><p>All Right Reserved Zetta</p></div>`;

        document.body.insertAdjacentHTML('beforeend', footerElement);
    }

});
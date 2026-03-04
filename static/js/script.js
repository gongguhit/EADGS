class BeforeAfter {
    constructor(enteryObject) {
        const beforeAfterContainer = enteryObject;
        const before = beforeAfterContainer.querySelector('.bal-before');
        const afterText = beforeAfterContainer.querySelector('.bal-afterPosition');
        const handle = beforeAfterContainer.querySelector('.bal-handle');

        beforeAfterContainer.querySelector('.bal-before-inset').setAttribute("style", "width: " + beforeAfterContainer.offsetWidth + "px;");
        window.addEventListener('resize', function () {
            beforeAfterContainer.querySelector('.bal-before-inset').setAttribute("style", "width: " + beforeAfterContainer.offsetWidth + "px;");
        });
        before.setAttribute('style', "width: 50%;");
        handle.setAttribute('style', "left: 50%;");

        // Touch events
        beforeAfterContainer.addEventListener("touchstart", () => {
            beforeAfterContainer.addEventListener("touchmove", (e2) => {
                let containerWidth = beforeAfterContainer.offsetWidth;
                let currentPoint = e2.changedTouches[0].clientX;
                let startOfDiv = beforeAfterContainer.offsetLeft;
                let modifiedCurrentPoint = currentPoint - startOfDiv;

                if (modifiedCurrentPoint > 10 && modifiedCurrentPoint < beforeAfterContainer.offsetWidth - 10) {
                    let newWidth = modifiedCurrentPoint * 100 / containerWidth;
                    before.setAttribute('style', "width:" + newWidth + "%;");
                    afterText.setAttribute('style', "z-index: 1;");
                    handle.setAttribute('style', "left:" + newWidth + "%;");
                }
            });
        });

        // Mouse events
        beforeAfterContainer.addEventListener('mousemove', (e) => {
            let containerWidth = beforeAfterContainer.offsetWidth;
            let widthChange = e.offsetX;
            let newWidth = widthChange * 100 / containerWidth;

            if (e.offsetX > 10 && e.offsetX < beforeAfterContainer.offsetWidth - 10) {
                before.setAttribute('style', "width:" + newWidth + "%;");
                afterText.setAttribute('style', "z-index: 1;");
                handle.setAttribute('style', "left:" + newWidth + "%;");
            }
        });
    }
}

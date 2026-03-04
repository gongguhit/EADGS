class BeforeAfter {
    constructor(enteryObject) {
        const beforeAfterContainer = enteryObject;
        const before = beforeAfterContainer.querySelector('.bal-before');
        const inset = beforeAfterContainer.querySelector('.bal-before-inset');
        const handle = beforeAfterContainer.querySelector('.bal-handle');
        const afterImg = beforeAfterContainer.querySelector('.bal-after img');

        // Calculate the actual rendered image bounds inside the object-fit:contain container
        function getImageBounds(img) {
            var cw = img.clientWidth, ch = img.clientHeight;
            var nw = img.naturalWidth, nh = img.naturalHeight;
            if (!nw || !nh) return { left: 0, top: 0, width: cw, height: ch };
            var ratio = Math.min(cw / nw, ch / nh);
            var rw = nw * ratio, rh = nh * ratio;
            return {
                left: (cw - rw) / 2,
                top: (ch - rh) / 2,
                width: rw,
                height: rh
            };
        }

        function updateLayout() {
            inset.style.width = beforeAfterContainer.offsetWidth + "px";
            positionLabels();
        }

        function positionLabels() {
            if (!afterImg || !afterImg.naturalWidth) return;
            var bounds = getImageBounds(afterImg);
            var bottomOffset = (beforeAfterContainer.offsetHeight - bounds.top - bounds.height) + 8;
            var leftOffset = bounds.left + 8;
            var rightOffset = (beforeAfterContainer.offsetWidth - bounds.left - bounds.width) + 8;

            // Position "Input" label at image's left-bottom
            var beforeLabel = beforeAfterContainer.querySelector('.bal-before .beforeLabel');
            if (beforeLabel) {
                beforeLabel.style.bottom = bottomOffset + "px";
                beforeLabel.style.left = leftOffset + "px";
                beforeLabel.style.margin = "0";
            }

            // Position "Ours" label at image's right-bottom
            var afterLabel = beforeAfterContainer.querySelector('.bal-after .afterLabel');
            if (afterLabel) {
                afterLabel.style.bottom = bottomOffset + "px";
                afterLabel.style.right = rightOffset + "px";
                afterLabel.style.margin = "0";
            }
        }

        // Wait for images to load
        var imgs = beforeAfterContainer.querySelectorAll('img');
        var loaded = 0;
        imgs.forEach(function(img) {
            if (img.complete) {
                loaded++;
                if (loaded >= imgs.length) updateLayout();
            } else {
                img.addEventListener('load', function() {
                    loaded++;
                    if (loaded >= imgs.length) updateLayout();
                });
            }
        });
        updateLayout();

        window.addEventListener('resize', updateLayout);

        before.setAttribute('style', "width: 50%;");
        handle.setAttribute('style', "left: 50%;");

        // Touch events
        beforeAfterContainer.addEventListener("touchstart", function() {
            beforeAfterContainer.addEventListener("touchmove", function(e2) {
                var containerWidth = beforeAfterContainer.offsetWidth;
                var rect = beforeAfterContainer.getBoundingClientRect();
                var currentPoint = e2.changedTouches[0].clientX;
                var modifiedCurrentPoint = currentPoint - rect.left;

                if (modifiedCurrentPoint > 10 && modifiedCurrentPoint < containerWidth - 10) {
                    var newWidth = modifiedCurrentPoint * 100 / containerWidth;
                    before.style.width = newWidth + "%";
                    handle.style.left = newWidth + "%";
                }
            });
        });

        // Mouse events
        beforeAfterContainer.addEventListener('mousemove', function(e) {
            var containerWidth = beforeAfterContainer.offsetWidth;
            var widthChange = e.offsetX;
            var newWidth = widthChange * 100 / containerWidth;

            if (e.offsetX > 10 && e.offsetX < containerWidth - 10) {
                before.style.width = newWidth + "%";
                handle.style.left = newWidth + "%";
            }
        });
    }
}

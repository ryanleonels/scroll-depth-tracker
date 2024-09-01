var milestonesReached = 0;
var percentageMilestones = [25,50,100]; // 25%, 50%, 100% in ascending order

function dispatchScrollDepthNotificationEvent(scrollDepthPercent) {
    const scrollDepthEvent = new CustomEvent('SCROLL_DEPTH_NOTIFICATION', {
        detail: {
            percent: scrollDepthPercent,
        }
    })
    window.dispatchEvent(scrollDepthEvent);
}

function handleScrollDepthNotificationEvent(e) {
    alert("You have scrolled past " + e.detail.percent + "%"); // TODO use something like jQuery's $.notify() or even better integrate it into a visual element on the page (e.g. "scroll progress bar" that is always visible in the bottom of page)
}

window.addEventListener('SCROLL_DEPTH_NOTIFICATION', handleScrollDepthNotificationEvent);

window.addEventListener("scroll", function (event) {
    var curScrollHeight = this.scrollY;
    var maxScrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (maxScrollHeight == 0) maxScrollHeight = 1; // exception handling to avoid division by 0 just in case the clientHeight is too tall to have a scroll bar = nothing to scroll
    var curScrollPercent = (curScrollHeight / maxScrollHeight) * 100;
    while ((milestonesReached < percentageMilestones.length) && (curScrollPercent >= percentageMilestones[milestonesReached])) {
        dispatchScrollDepthNotificationEvent(percentageMilestones[milestonesReached]);
        milestonesReached++;
    }
});


document.getElementsByTagName("button").onclick = function(button) {
    if (button.getAttribute("href")) {
        document.location = button.getAttribute("href")
    }
}

document.getElementsByTagName("p").onclick = function(p) {
    if (p.getAttribute("role" == "logo")) {
        document.location = button.getAttribute("href")
    }
}
/*
window.onload = function() {
    for (var i = 0; i < document.getElementsByTagName("a").length; i++) {
        if (!document.getElementsByTagName("a")[i].href.includes("coderkick.com/")) {
            document.getElementsByTagName("a")[i].setAttribute("href", `/redirect:${btoa(document.getElementsByTagName("a")[i].href)}`);
        }
    };
}
*/

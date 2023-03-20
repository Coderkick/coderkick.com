
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
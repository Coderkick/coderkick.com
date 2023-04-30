
document.getElementsByTagName("button").onclick = function(button) {
    if (button.getAttribute("href")) {
        document.location = button.getAttribute("href")
    }
}

function changeTheme() {
    if (document.getElementsByTagName("html")[0].getAttribute("data-bs-theme") == "dark") {
        document.getElementsByTagName("html")[0].setAttribute("data-bs-theme", "light")
        document.getElementById("theme").setAttribute("class", "bi bi-moon-fill")
        $('img').map(function() { return this.src = this.src.replace("dark", "light"); }).get()
        Cookies.set("theme", "light", { "Domain": "coderkick.com", "SameSite": "None", "Secure": true, expires: 365 })

    } else {
        document.getElementsByTagName("html")[0].setAttribute("data-bs-theme", "dark")
        document.getElementById("theme").setAttribute("class", "bi bi-sun-fill")
        $('img').map(function() { return this.src = this.src.replace("light", "dark"); }).get()
        Cookies.set("theme", "dark", { "Domain": "coderkick.com", "SameSite": "None", "Secure": true, expires: 365 })
    }
}



window.onload = async function() {
    if (!Cookies.get("theme") || !["light", "dark"].includes(Cookies.get("theme"))) {
        Cookies.set("theme", window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light", { "Domain": "coderkick.com", "SameSite": "None", "Secure": true, expires: 365 });
        window.matchMedia('(prefers-color-scheme: dark)').matches ? document.getElementsByTagName("html")[0].setAttribute("data-bs-theme", "dark") : document.getElementsByTagName("html")[0].setAttribute("data-bs-theme", "light")
        window.matchMedia('(prefers-color-scheme: dark)').matches ? document.getElementById("theme").setAttribute("class", "bi bi-sun-fill") : document.getElementById("theme").setAttribute("class", "bi bi-moon-fill")
        window.matchMedia('(prefers-color-scheme: dark)').matches ? $('img').map(function() { return this.src = this.src.replace("$theme$", "dark"); }).get() : $('img').map(function() { return this.src = this.src.replace("$theme$", "light"); }).get()
    } else {
        document.getElementsByTagName("html")[0].setAttribute("data-bs-theme", Cookies.get("theme"))
        Cookies.get("theme") == "dark" ? document.getElementById("theme").setAttribute("class", "bi bi-sun-fill") : document.getElementById("theme").setAttribute("class", "bi bi-moon-fill")
        Cookies.get("theme") == "dark" ? $('img').map(function() { return this.src = this.src.replace("$theme$", "dark"); }).get() : $('img').map(function() { return this.src = this.src.replace("$theme$", "light"); }).get()
    }
    if (!Cookies.get("debugMode") || Cookies.get("debugMode") == "false") {
        document.getElementById("cdk-dm").remove();
    } else {
        if (!Cookies.get("enabledExtensions")) {
            Cookies.set("enabledExtensions", "", { "Domain": "coderkick.com", "SameSite": "None", "Secure": true, expires: 365 });
        }
        document.getElementById("cdk-dm").style.display = 'inline';
        var dbgList = await fetch("/api/internal/debug.list").then((response) => response.text()).then(data => data.split("\n"))
        for (i = 0; i < dbgList.length; i++) {
            const ext = dbgList[i];
            if (Cookies.get("enabledExtensions").includes(ext)) {
                var item = document.createElement("a");
                item.setAttribute("class", "list-group-item list-group-item-action active");
                item.setAttribute("href", "#");
                item.setAttribute("onclick", "removeExtension(\"" + ext + "\")");
                item.innerText = ext;
                document.getElementById("cdk-dmt").appendChild(item);
            } else {
                var item = document.createElement("a");
                item.setAttribute("class", "list-group-item list-group-item-action");
                item.setAttribute("href", "#");
                item.setAttribute("onclick", "addExtension(\"" + ext + "\")");
                item.innerText = ext;
                document.getElementById("cdk-dmt").appendChild(item);
            }
        }
    }
    $('ext').map(function() { if (Cookies.get("enabledExtensions") && Cookies.get("enabledExtensions").split("|").includes(this.getAttribute("ext-id"))) { this.style.display = "block"; } else { this.remove(); } }).get()
}

document.getElementById("cdk").addEventListener("dblclick", (key) => {
    if (!Cookies.get("debugMode") || Cookies.get("debugMode") == "false") {
        Cookies.set("debugMode", "true", { "Domain": "coderkick.com", "SameSite": "None", "Secure": true, expires: 365 })
        Cookies.set("enabledExtensions", "", { "Domain": "coderkick.com", "SameSite": "None", "Secure": true, expires: 365 })
        location.reload();
    };
});

function addExtension(id) {
    Cookies.set("enabledExtensions", Cookies.get("enabledExtensions") + "|" + id, { "Domain": "coderkick.com", "SameSite": "None", "Secure": true, expires: 365 })
    location.reload();
}

function removeExtension(id) {
    Cookies.set("enabledExtensions", Cookies.get("enabledExtensions").replace("|" + id, ""), { "Domain": "coderkick.com", "SameSite": "None", "Secure": true, expires: 365 })
    location.reload();
}

function exitDebugMode() {
    if (Cookies.get("debugMode")) {
        Cookies.set("debugMode", "false", { "Domain": "coderkick.com", "SameSite": "None", "Secure": true, expires: 365 })
        Cookies.set("enabledExtensions", "", { "Domain": "coderkick.com", "SameSite": "None", "Secure": true, expires: 365 })
        location.reload();
    }
}


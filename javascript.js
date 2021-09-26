document.addEventListener("DOMContentLoaded", function () {

    LoadCss();
    SetDefault(true);

    document.getElementById("input").addEventListener("keydown", function (e) {

        if (e.key === "Enter") {

            if (this.value === undefined ||
                this.value === null ||
                this.value.length === 0) {

                SetDefault();
                return;
            }

            SetContainer(this.value);
        }
    });
});

function GetData(value) {
    var result = null;

    if (value === undefined ||
        value === null ||
        typeof (value) !== "string" ||
        value.length === 0) {

        SetDefault();
        return null;
    }

    try {
        result = CryptoJS.AES
            .decrypt(data, value)
            .toString(CryptoJS.enc.Utf8);
    }
    catch {
        SetDefault();
        return null;
    }

    return result;
}

function LoadCss() {
    var link = null;

    link = document.createElement("link");
    link.rel = "stylesheet";

    if (navigator.userAgent.indexOf("iPhone") != -1) {
        link.href = "style_iPhone.css";
    }
    else {
        link.href = "style.css";
    }

    document.head.appendChild(link);
    link = null;
}

function SetContainer(value) {
    var dataCell = null;
    var container = null;
    var pageData = null;
    var page = null;
    var pageValue = null;
    var chapter = null;
    var sentence = null;

    if (value === undefined ||
        value === null ||
        typeof (value) !== "string" ||
        value.length === 0) {

        SetDefault();
        return;
    }

    try {
        dataCell = JSON.parse(GetData(value));
    } catch {
        SetDefault();
        return;
    }

    if (dataCell === undefined ||
        dataCell === null ||
        typeof (dataCell) !== "object" ||
        Array.isArray(dataCell) !== true ||
        dataCell.length === 0) {

        dataCell = null;
        SetDefault();
        return;
    }

    container = document.getElementById("container");

    if (container === undefined ||
        container === null ||
        typeof (container) !== "object" ||
        container.tagName !== "DIV") {

        dataCell = null;
        container = null;
        SetDefault();
        return;
    }

    container.innerHTML = "";

    for (var pageIndex = 0; pageIndex < dataCell.length; pageIndex++) {
        pageData = dataCell[pageIndex];

        if (pageData.Title !== undefined && pageData.Title !== null) {
            document.head.title = pageData.Title;
        }

        page = document.createElement("div");
        container.appendChild(page);
        page.className = "page";

        pageValue = document.createElement("span");
        page.appendChild(pageValue);
        pageValue.className = "pageValue";
        pageValue.innerHTML = pageData.Page;
        pageValue = null;

        if (pageData.Chapter !== undefined && pageData.Chapter !== null) {
            chapter = document.createElement("div");
            page.appendChild(chapter);
            chapter.className = "chapter";
            chapter.innerHTML = pageData.Chapter;
            chapter = null;
        }

        for (var i = 0; i < pageData.SentenceCell.length; i++) {
            sentence = document.createElement("div");
            page.appendChild(sentence);
            sentence.className = "sentence";
            sentence.innerHTML = pageData.SentenceCell[i];
            sentence = null;
        }

        pageData = null;
        page = null;
    }

    dataCell = null;
    container = null;
}

function SetDefault(isText) {
    var container = document.getElementById("container");
    var input = null;

    if (isText !== true) {
        isText = false;
    }

    if (container === undefined ||
        container === null ||
        typeof (container) !== "object" ||
        container.tagName !== "DIV") {

        container = null;
        return;
    }

    container.innerHTML = "";

    if (isText) {
        input = document.createElement("input");
        container.appendChild(input);
        container = null;

        input.id = "input";
        input.placeholder = "Hello, World!";
        input.type = "text";

        input.style.border = "none";
        input.style.cursor = "default";
        input.style.fontSize = "20px";
        input.style.width = "130px";

        input = null;
    }
    else {
        container.innerHTML = "Hello, World!";

        container.style.cursor = "default";
        container.style.fontSize = "20px";
        container.style.width = "100%";
    }

    container = null;
}
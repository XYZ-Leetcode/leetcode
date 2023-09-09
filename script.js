const Eng = document.getElementById("englishContent")
const Chn = document.getElementById("chineseContent")

function showE(){
    Eng.style.display = "block"
    Chn.style.display = "none"
}

function showC(){
    Chn.style.display = "block"
    Eng.style.display = "none"
}

function readTxtFile() {
const fileContentDiv = document.getElementById('englishContent');
const txtFileName = `problem/${probnum}.txt`; 
const title_ = document.getElementById('title');
const link_ = document.getElementById('link');
 
fetch(txtFileName)
    .then(response => {
        if (!response.ok) {
            throw new Error('無法讀取檔案');
        }
        return response.text();
    })
    .then(fileContent => {
        console.log("444")
        let parts = fileContent.split('///////////////////////////////////////');

        let title = parts[0];
        let englishText = replacePreWithBlockquote(parts[1]);
        let chineseText = replacePreWithBlockquote(parts[2]);
        Eng.innerHTML = englishText;
        Chn.innerHTML = chineseText;
        document.title = title;
        title_.innerHTML = `<span>[leetcode] ${title}</span>`
        link_.href = `https://leetcode.com/problems/${convertToSlug(title)}/`
    })
    .catch(error => {
        console.log("error")
        const body_ = document.getElementsByName("body")
        body_.innerHTML = `<p4>題目尚未翻譯</p4>`

    });
}

var urlGet = decodeURIComponent(window.location.search.substring(1)).split("/");
probnum = (urlGet[0].match(/[0-9]+/g) || [0])[0];
readTxtFile()


function convertToSlug(text) {
    let withoutNumbersAndDot = text.replace(/^\d+\. /, '');
    let lowercaseText = withoutNumbersAndDot.toLowerCase();
    
    let slug = lowercaseText.replace(' ', '-').trim(); 
    
    return slug;
}


function replacePreWithBlockquote(htmlText) {
let replacedText = htmlText.replace(/pre/g, 'blockquote');
    replacedText = replacedText.replace(/Output:/g,'<br>Output:');
    replacedText = replacedText.replace(/Explanation:/g,'<br>Explanation:');
    replacedText = replacedText.replace(/輸出：/g,'<br>輸出： ');
    replacedText = replacedText.replace(/解釋：/g,'<br>解釋：');
    console.log("change")
    return replacedText;
}

console.log("888")

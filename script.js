const Eng = document.getElementById("englishContent")
const Chn = document.getElementById("chineseContent")
var url
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
 
fetch(txtFileName)
    .then(response => {
        if (!response.ok) {
            throw new Error('無法讀取檔案');
        }
        return response.text();
    })
    .then(fileContent => {
        let parts = fileContent.split('///////////////////////////////////////');

        let title = parts[0];
        let englishText = replacePreWithBlockquote(parts[1]);
        let chineseText = replacePreWithBlockquote(parts[2]);
        Eng.innerHTML = englishText;
        Chn.innerHTML = chineseText;
        document.title = title;
        title_.innerHTML = `<span>[leetcode] ${title}</span>`
        url = `https://leetcode.com/problems/${convertToSlug(title)}/`
    })
    .catch(error => {
        console.log("error")
        Chn.innerHTML = `<span style="color : red">尚未翻譯或錯誤</span><br><span style="color : red">"https://xyz-leetcode.github.io/leetcode/?<span style ="color:blue">題號</span>"查看中文翻譯</span>`

        Eng.innerHTML = `<span style="color : red">尚未翻譯或錯誤</span><br><span style="color : red">"https://xyz-leetcode.github.io/leetcode/?<span style ="color:blue">題號</span>"查看中文翻譯</span>`
    });
}

var urlGet = decodeURIComponent(window.location.search.substring(1)).split("/");
probnum = (urlGet[0].match(/[0-9]+/g) || [0])[0];
readTxtFile()


function convertToSlug(text) {
    let withoutNumbersAndDot = text.replace(/^\d+\. /, '').replace(/[^\w\s-]/g, '');
    
    let lowercaseText = withoutNumbersAndDot.toLowerCase();
    let slug = lowercaseText.replace(/ /g, '-').trim(); 
    
    return slug;
}




function replacePreWithBlockquote(htmlText) {
let replacedText = htmlText.replace(/pre/g, 'blockquote');
    replacedText = replacedText.replace(/Output:/g,'<br>Output:');
    replacedText = replacedText.replace(/Explanation:/g,'<br>Explanation:');
    replacedText = replacedText.replace(/輸出：/g,'<br>輸出： ');
    replacedText = replacedText.replace(/解釋：/g,'<br>解釋：');
    return replacedText;
}

function openleetcode(){
            window.open(url);
}


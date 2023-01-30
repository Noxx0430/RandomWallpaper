// ↓基本色につき、編集しないことを推奨
Colors = "#ffffff\n#c0c0c0\n#808080\n#000000\n#ff0000\n#800000\n#ffff00\n#808000\n#00ff00\n#008000\n#00ffff\n#008080\n#0000ff\n#000080\n#ff00ff\n#800080";

// 要素取得
const content = document.getElementById("content");
const items = document.getElementById("item_number");
const textarea = document.getElementById("color_area");
const colorAreaElm = document.getElementById("color_area");
const backColorElm = document.getElementById("back_color");
const minSizeElm = document.getElementById("min_size");
const maxSizeElm = document.getElementById("max_size");
const minNumElm = document.getElementById("min_num");
const maxNumElm = document.getElementById("max_num");
const generateTimeElm = document.getElementById("generate_time");
const showTimeElm = document.getElementById("show_time");
const settingElm = document.getElementById("setting");
const expElm = document.getElementById("exp_content");

window.onload = function(){
  const rawData = localStorage.getItem("RandomNumData");
  if(rawData !== null){
    const data = rawData.split(",");
    console.log(data[0]);
    if(data[0] == ""){
      textarea.value = Colors;
    }else{
      console.log("a");
      const color = data[0].replace(/\|/g, "\n");
      textarea.value = color;
    }
    minSizeElm.value = data[1];
    maxSizeElm.value = data[2];
    minNumElm.value = data[3];
    maxNumElm.value = data[4];
    generateTimeElm.value = data[5];
    showTimeElm.value = data[6];
    backColorElm.value = data[7];
  }else{
    textarea.value = Colors;
  }

  const backColor = backColorElm.value;
  const body = document.querySelector("body");
  body.setAttribute("style", "background: " + backColor + ";");

  
  start();
}



/*==============================
  乱数生成表示JS
==============================*/
function start(){

  // 入力数値取得
  const minFontSize = Number(minSizeElm.value);
  const maxFontSize = Number(maxSizeElm.value);
  const minNumber = Number(minNumElm.value);
  const maxNumber = Number(maxNumElm.value);
  const geneTime = Number(generateTimeElm.value);
  const showTime = Number(showTimeElm.value);

  setInterval(function(){
    // 表示領域サイズ取得
    const winHeight = window.outerHeight;
    const winWidth = window.outerWidth;

    // 座標生成
    const top = Math.floor(Math.random() * winHeight);
    const left = Math.floor(Math.random() * winWidth);

    // 要素CSS生成
    const size = Math.floor(Math.random() * (maxFontSize - minFontSize) + minFontSize);
    const colorList = textarea.value.split("\n");
    const colorNum = Math.floor(Math.random() * colorList.length);
    const color = colorList[colorNum];

    // 乱数生成
    const num = Math.floor(Math.random() * (maxNumber - minNumber) + minNumber);

    // 要素生成・追加
    const itemNumber = Number(items.textContent);
    if(itemNumber > 100){
      items.textContent = 0;
    }else{
      items.textContent = itemNumber + 1;
    }
    const createDiv = document.createElement("div");
    createDiv.textContent = num;
    createDiv.setAttribute("id", itemNumber);
    createDiv.setAttribute("class", "number");
    createDiv.setAttribute("style", "position: absolute; top: " + top + "px; left: " + left + "px; color: " + color + "; font-size: " + size + "px;");
    content.append(createDiv);

    // 要素削除
    setTimeout(function(){
      document.getElementById(itemNumber).remove();
    }, showTime);
  }, geneTime);
}



/*==============================
  設定画面ボタンJS
==============================*/
function settingOpen(){
  settingElm.setAttribute("style", "display: block;");
}

function exp(){
  settingElm.setAttribute("style", "display: none;");
  expElm.setAttribute("style", "display: block;");
}

function closeExp(){
  expElm.setAttribute("style", "display: none;");
}

function save(){
  const color = colorAreaElm.value.replace(/\n/g, "|");
  const back = backColorElm.value;
  const minFontSize = Number(minSizeElm.value);
  const maxFontSize = Number(maxSizeElm.value);
  const minNumber = Number(minNumElm.value);
  const maxNumber = Number(maxNumElm.value);
  const geneTime = Number(generateTimeElm.value);
  const showTime = Number(showTimeElm.value);
  if(minFontSize > 1000||maxFontSize > 1000||showTime > 10000){
    const userSelect = confirm("入力した値が大きすぎます。\n極端な数字の入力は端末への負荷となります。\n\nそれでも実行しますか？");
    if(userSelect == true){
      const data = color + "," + minFontSize + "," + maxFontSize + "," + minNumber + "," + maxNumber + "," + geneTime + "," + showTime + "," + back;
      localStorage.setItem("RandomNumData", data);

      // リロード
      location.reload();
    }
  }else{
    const data = color + "," + minFontSize + "," + maxFontSize + "," + minNumber + "," + maxNumber + "," + geneTime + "," + showTime + "," + back;
    localStorage.setItem("RandomNumData", data);

    // リロード
    location.reload();
  }
}

function cancel(){
  settingElm.setAttribute("style", "display: none;");
}

function reset(){
  localStorage.removeItem("RandomNumData");
  const userInput = confirm("全ての設定を初期状態に戻します。\nこの操作は取り消せません。");
  if(userInput == true){
    colorAreaElm.value = Colors;
    backColorElm.value = "#333333";
    minSizeElm.value = "0";
    maxSizeElm.value = "50";
    minNumElm.value = "0";
    maxNumElm.value = "100";
    generateTimeElm.value = "10";
    showTimeElm.value = "1000";

    // リロード
    location.reload();
  }
}
//defining variables from html elements
const hexTextInput = document.getElementById('hexTextInput');
const inputTextColor = document.getElementById('inputTextColor');
const hexBgInput = document.getElementById('hexBgInput');
const inputBgColor = document.getElementById('inputBgColor');

const sliderTextText = document.getElementById('sliderTextText');
const sliderText = document.getElementById('sliderText');
const sliderTextBg = document.getElementById('sliderTextBg');
const sliderBg = document.getElementById('sliderBg');

const sampleText = document.getElementById('sampleText')

//functions for keyup on text inputs both for text color and background color
hexTextInput.addEventListener('keyup', () => {
    const hexText = hexTextInput.value;
    if(!isValidHexText(hexText)) return;

    const strippedHex = hexText.replace('#', '');

    inputTextColor.style.backgroundColor = "#" + strippedHex;

    sampleText.style.color = '#'+strippedHex;
})

hexBgInput.addEventListener('keyup', () => {
    const hexBg = hexBgInput.value;
    if(!isValidHexBg(hexBg)) return;

    const strippedHex = hexBg.replace('#', '');

    inputBgColor.style.backgroundColor = "#" + strippedHex;

    sampleText.style.backgroundColor = '#' + strippedHex;
})

//checking if the input text is a valid hex value (again, both for text and background color inputs)
const isValidHexText = (hexText) => {
    if(!hexText) return false;

    const strippedHex = hexText.replace('#', '');
    return strippedHex.length === 3 || strippedHex.length === 6;
}

const isValidHexBg = (hexBg) => {
    if(!hexBg) return false;

    const strippedHex = hexBg.replace('#', '');
    return strippedHex.length === 3 || strippedHex.length === 6;
}

//converting hex to RGB values
const convertHexToRGB = (hexText, opacity) => {
  if(!isValidHexText(hexText)) return null;

  let strippedHex = hexText.replace('#','');
  if (strippedHex.length===3) {
    let strippedHexMod = [];
    for (let i=0;i<strippedHex.length;i++) {
      strippedHexMod.push(strippedHex[i]);
      strippedHexMod.push(strippedHex[i]);
    }
    strippedHex = strippedHexMod.join("");
  }
  const r  = parseInt(strippedHex.substring(0,2), 16);
  const g  = parseInt(strippedHex.substring(2,4), 16);
  const b  = parseInt(strippedHex.substring(4,6), 16);
  const a = opacity;

  return {r,g,b,a}
}




sliderBg.addEventListener('input', () => {
  sliderTextBg.textContent = sliderBg.value+"%";
  const rgba = convertHexToRGB(hexBgInput.value,sliderBg.value/100);
  sampleText.style.backgroundColor = "rgba("+rgba["r"]+","+rgba["g"]+","+rgba["b"]+","+rgba["a"]+")";
})

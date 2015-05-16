
'use strict';

var word = function word(){
	var dictionaryFile = document.getElementById("dictionaryFile").files[0];
	var startWord = document.getElementById("startWord").value;
	var endWord = document.getElementById("endWord").value;
	var resultFile = document.getElementById("resultFile");
	var output = document.getElementById("output");
	var dictionaryResult = [];
	var wordCache = [];

	if(startWord === null | startWord === "" | startWord.length < 4){
		alert("missing or invalid start word");
		return;
	}

	if(endWord === null | endWord === "" | endWord.length < 4){
		alert("missing or invalid end word");
		return;
	}

	if (window.File && window.FileReader) {
		var fileReader = new FileReader();
		fileReader.onload = function(e){
			dictionaryResult = fileReader.result.split(/\r\n|\r|\n/g);
			if(dictionaryResult.indexOf(startWord) === -1){
				alert("Start Word does not exist in file");
				return;
			}
			if(dictionaryResult.indexOf(endWord) === -1){
				alert("End Word does not exist in file");
				return;
			}
			output.innerHTML = printToHtml(wordChecker(startWord, endWord, dictionaryResult));
		}
		fileReader.readAsText(dictionaryFile);
	} else {
	  	alert('The File APIs are not fully supported in this browser.');
	}
};

var printToHtml = function printToHtml(array){
	var htmlString = "";
	for(var i = 0; i < array.length; i++){
		htmlString += array[i] + "&#10;";
	}
	return htmlString;
}

var wordChecker = function wordChecker2(startWord, endWord, wordArray){
	var found = false;
	var checked = [];
	var wordCache = [];
	var result = [];
	wordArray.splice(wordArray.indexOf(startWord), 1);
	wordCache = getChildNodes(startWord, wordArray);
	while(found === false){
		if(wordCache[0].name !== endWord){
			if(wordArray.indexOf(wordCache[0].name) !== -1){
				wordArray.splice(wordArray.indexOf(wordCache[0].name), 1)
			}
			wordCache = wordCache.concat(getChildNodes(wordCache[0].name, wordArray));
			checked.push(wordCache[0]);
			wordCache.splice(0, 1);
		} else {
			checked.push(wordCache[0]);
			found = true;
		}
	}
	var nextName = wordCache[0].name;
	while(nextName !== startWord){
		for(var i = 0; i < checked.length; i++){
			if(checked[i].name === nextName){
				result.push(checked[i].name);
				nextName = checked[i].parent;
			}
		}
	}
	result.push(startWord);
	result = result.reverse();
	return result;
}

var getChildNodes = function getChildNodes(primaryNode, mainArray){
	var childArray = [];
	for(var i = 0; i < mainArray.length; i++){
		var dif = 0;
		for(var j = 0; j < mainArray[i].length; j++){
			if(mainArray[i].charAt(j) !== primaryNode.charAt(j)){
			dif++;
		}
		}
		if(dif === 1){
			var childNode = {name: mainArray[i], parent: primaryNode};
			childArray.push(childNode);
		}
	}
	return childArray;
};


function saveTextAsFile()
{      
    var textToWrite = document.getElementById("output").value;
    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
    var fileNameToSaveAs = "myNewFile.txt";
    var downloadLink = document.createElement("a");

    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "HiddenLink";

    window.URL = window.URL || window.webkitURL;

    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.onclick = destroyClickedElement;

    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    
    downloadLink.click();
}

function destroyClickedElement(event)
{
    document.body.removeChild(event.target);
}

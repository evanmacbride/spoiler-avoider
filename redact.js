/**
 * Redacts text containing a keyword. Any child nodes "downstream" from a node
 * containing the keyword will also be redacted.
 */

async function getRedactWords() {
	let res = await browser.storage.sync.get("redactWords");
	res = res.redactWords;
	let redactWords = res.split(/\r?\n/);
	return redactWords;
}

function redactContent(node, downstream, words) {
	if (node.nodeType === Node.TEXT_NODE) {
		if (node.parentNode && node.parentNode.nodeName === 'TEXTAREA') {
			return;
		}
		let content = node.textContent;
		if (words == undefined) {
			return;
		}
		if (downstream || words.some(function(word) {return content.toLowerCase().includes(word.toLowerCase());})) {
			let replacement = "";
			const replacingWords = content.split(" ");
			for (let i = 0; i < replacingWords.length; i++) {
				for (let j = 0; j < replacingWords[i].length; j++) {
					replacement += "X";
				}
				replacement += " ";
			}
			content = replacement;
			downstream = true;
			node.textContent = content;
		
			node.parentNode.setAttribute("title","Content redacted by spoiler-avoider extension.");
			node.parentNode.style.color = "black";
			node.parentNode.style.background = "black";
			downstream = true;
		}
	}
	else if (node.nodeName == "A" && (downstream || node.getAttribute("href") && words.some(function(word) {return node.getAttribute("href").toLowerCase().includes(word.toLowerCase());}))) {
		node.style.color = "black";
		node.style.background = "black";
		node.setAttribute("title","Content redacted by spoiler-avoider extension.");
		downstream = true;
	}
	else if (node.nodeName == "IMG" && (downstream || node.getAttribute("src") && words.some(function(word) {return node.getAttribute("src").toLowerCase().includes(word.toLowerCase());}))) {
		node.src = "";
		node.setAttribute("title","Content redacted by spoiler-avoider extension.");
		downstream = true;
	}
	if (downstream) {
		if (node.classList) {
			node.style.color = "black";
			node.style.background = "black";
		}
	}
	for (let i = 0; i < node.childNodes.length; i++) {
		redactContent(node.childNodes[i], downstream, words);
	}
}

async function avoidSpoilers() {
	const redactWords = await getRedactWords();
	redactContent(document.body, false, redactWords);
}

avoidSpoilers();

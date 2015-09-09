/*
 * Copyright 2011 Research In Motion Limited.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Standard library of common functionality.
 */

 
/**
 * Basic StringBuilder object:
 */
function StringBuilder(value) {
    this.strings = [];
    this.append(value);
}
StringBuilder.prototype.append = function (value) {
    if (value) {
        this.strings.push(value);
    }
};
StringBuilder.prototype.clear = function () {
    this.strings.length = 0;
};
StringBuilder.prototype.toString = function () {
    return this.strings.join("");
};


/**
 * Debugger object - used to output messages to console window.
 */
	var debug = { logLevel  : 0,
			info : 1,
			warning : 2,
			error : 3,
			exception : 4,
			numMsgs : 0,
			log : function (source, message, debugLevel) {
				if (debugLevel >= this.logLevel) {
					console.log("DEBUG [" + source + "] " + message);
					debug.numMsgs = debug.numMsgs + 1;
				}
			},
			size : function() {
				return debug.numMsgs;
			},
			clear : function() {
				debug.numMsgs = 0;
			}
	};



/**
 * Methods to add content to page elements.
 */
function setContent(id, content) {
	var ele = document.getElementById(id);
	if (ele) {
		ele.innerHTML = content;
	}
}
function appendContent(id, content) {
	var ele = document.getElementById(id);
	if (ele) {
//		ele.innerHTML = ele.innerHTML + content;
		ele.insertAdjacentHTML("beforeend", content);		//try a faster construct instead of insertHTML
	}
}
function prependContent(id, content) {
	var ele = document.getElementById(id);
	if (ele) {
//		ele.innerHTML = content + ele.innerHTML;
		ele.insertAdjacentHTML("afterbegin", content);		//try a faster construct instead of insertHTML
	}
}


function show(id) {
	var ele = document.getElementById(id); 
	if (id) {
		ele.style.display = '';
	}
}
function hide(id) {
	var ele = document.getElementById(id);
	if (id) {
		ele.style.display = 'none';
	}
}
function setClassName(id, className) {
	var ele = document.getElementById(id);
	if (ele) {
		ele.className = className;
	}
}


function openUrl(url) {
	try
	{
		//Attempt to use the WebWorks Invoke API to open the URL in the native broser application:
		if ((window.blackberry !== undefined) && (blackberry.invoke !== undefined) && (blackberry.invoke.BrowserArguments !== undefined)) {
			var args = new blackberry.invoke.BrowserArguments(url);
			blackberry.invoke.invoke(blackberry.invoke.APP_BROWSER, args);
			return true;
		}
		
		//Otherwise open the URL in the current window (if done from a WebWorks app, this may prevent the user from returning to the current page as there is no native 'back' button)
		window.location = url;
	}
	catch(e) {
		debug.log("openUrl", e, debug.exception);
	}
}


function isBlackBerrySmartphone() {
	var ua, isMIDP, isWebKit, isBlackBerry;
	ua = navigator.userAgent.toLowerCase();		
	isMIDP = (ua.indexOf("midp") >= 0);
	isWebKit = (ua.indexOf("webkit") >= 0);
	isBlackBerry = (ua.indexOf("blackberry") >= 0);
	return ((isMIDP || isWebKit) && isBlackBerry);
}
function isBlackBerryPlayBook() {
	var ua, isWebKit, isTablet;
	ua = navigator.userAgent.toLowerCase();		
	isWebKit = (ua.indexOf("webkit") >= 0);
	isTablet = (ua.indexOf("playbook") >= 0);
	return (isWebKit && isTablet);
}



/**
 * 
 */
function setGlobalVariables(event) {
	debug.logLevel = debug.info;
	debug.log("setGlobalVariables", "Complete: " + event.type, debug.info);
}

function goBack() {
	history.back();
}
function goHome() {
    bb.refresh();
    bb.pushScreen('menu.htm', 'Menu');
}

/**
 * Adds a page header (breadcrumbs) and page footer (links) to a page.




 */

function createDialog() {
    var diaContainer, progL, indic, modalSTR;

   

    progL = document.createElement('progress');
    progL.id = "progress_div";
    progL.setAttribute("max", "100");
    progL.value = "0";

    indic = document.createElement('div');
    indic.className = "indicator";
    indic.setAttribute("data-bb-type", "activity-indicator");
    indic.setAttribute("data-bb-size", "medium");

    modalSTR = document.createElement('div');
    modalSTR.className = "message";
    modalSTR.value = "Dialog";
    modalSTR.setAttribute("data-bb-size", "medium");
    modalSTR.id = "modal_message";

    diaContainer = document.createElement("div");
    diaContainer.id = "actitvityIndicator";
    diaContainer.style.display = "none";
    diaContainer.appendChild(indic);
   diaContainer.appendChild(progL);
    diaContainer.appendChild(modalSTR);
    document.body.appendChild(diaContainer);
    debug.log("createDiag", "Complete: ", debug.info);

}

function createPageHeader(event) {
	try
	{

	 


	        var header, backAnchor, homeAnchor;
	        progL = document.createElement('progress');
	        progL.id = "progress_div";
	        progL.setAttribute("max", "100");
	        progL.value = "0";

	        indic = document.createElement('div');
	        indic.className = "indicator";
	        indic.setAttribute("data-bb-type", "activity-indicator");
	        indic.setAttribute("data-bb-size", "medium");

	        modalSTR = document.createElement('div');
	        modalSTR.className = "message";
	        modalSTR.value = "Dialog";
	        modalSTR.setAttribute("data-bb-size", "medium");
	        modalSTR.id = "modal_message";
	    
	       


		header = document.createElement("div");
		header.id = "pageHeader";


	

	//	header.appendChild(homeAnchor);
	//	header.appendChild(diaContainer);

		backAnchor = document.createElement("a");
		backAnchor.addEventListener("click", goBack, false);
		backAnchor.className = "back";
		backAnchor.innerHTML = "back";
		backAnchor.style.display = "none";
		backAnchor.id = "back_button";
		///header.appendChild(backAnchor);

	




		homeAnchor = document.createElement("div");
		homeAnchor.addEventListener("click", goHome, true);
		homeAnchor.className = "home_btn";
	//	homeAnchor.style.display = "none";
		homeAnchor.innerHTML = "<span class='icon icon-home'></span>";
		homeAnchor.setAttribute("data-bb-type","button");
	//	homeAnchor.setAttribute("data-bb-img", "images/toolbar_home.png");
		homeAnchor.setAttribute('data-bb-style', 'stretch');
		homeAnchor.id = "home_button";
	//	header.appendChild(homeAnchor);

		backAnchor = document.createElement("div");
		backAnchor.addEventListener("click", goBack, false);
		backAnchor.className = "logo";
		backAnchor.innerHTML = "<img src='images/logo_white.png' alt='Dont Waste Services' width='310' />";
		header.appendChild(backAnchor);
				
		document.body.insertBefore(header, document.body.firstChild);
				
		debug.log("createPageHeader", "Complete: " + event.type, debug.info);
	}
	catch (e) {
		debug.log("createPageHeader", e, debug.exception);
	}
}
function createPageFooter(event) {
	try
	{
		var footer;

		footer = document.createElement("div");
		footer.id = "pageFooter";
		footer.innerHTML = "<a href='#'>Top</a> <div style='float:right'>by <a href='https://twitter.com/#!/n_adam_stanley' target='#new'>@n_adam_stanley</a></div>";
		//document.body.appendChild(footer);	//add footer as the last element in the body
		
		debug.log("createPageFooter", "Complete: " + event.type, debug.info);
	}
	catch (e) {
		debug.log("createPageFooter", e, debug.exception);
	}
}

/**
 * Cleans up any unmanaged resources.
 */
function cleanupPageResources(event) {

var actM =    actMonitor = document.getElementById('actitvityIndicator');

    try {
        if ($.modal) {
            $.modal.close();
        }
    }
    catch(e){
        alert('err- ' + e.message);
    }
//}
	// Not implemented
	debug.log("cleanupPageResources", "Event: " + event.target + "," + event.type, debug.info);
}


/**
 * Add event listeners to the current page.
 */
window.addEventListener("load",   setGlobalVariables,   false);
window.addEventListener("load", createPageHeader, false);
//window.addEventListener("load", createDialog, false);
//window.addEventListener("load",   createPageFooter,     false);
window.addEventListener("unload", cleanupPageResources, false);


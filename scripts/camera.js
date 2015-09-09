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
var _sID;
var _pDB;

var fNamet2;

function set_count(cntp, pdb, siteID) {
   
    _sID = siteID;

    if (cntp === 1) {
        // _pDB = null;
       
        _pDB = pdb;
    }
    else {
        pCnt = cntp;
    }
}


var dws_dir = "file:///store/home/user/pictures/DWS/";
function get_exist() {

    if (doCam === 'ws_out') {
        do_menu_nav('sites.htm', 'ws_out');
    }



    var arrp = [], lenp, imgp, div;

   
  var pjson = _pDB; // localStorage.getItem('SitePhoto' + _sID);
 for (key in pjson) {
  
        arrp.push(key);
    }

 lenp = arrp.length;

 actLen = 0;
    for (i = 0; i < lenp; i++) {
        if (pjson[i].Sid === _sID) {
            //  alert(' new: ' + pjson[i].fpath);
            var fltmp = pjson[i].fpath;
            Lindt2 = fltmp.lastIndexOf('/');
            fNamet2 = fltmp.substring(Lindt2 + 1, fltmp.length);

        imgp = new Image();
        imgp.src = pjson[i].fpath;
        imgp.width = Math.round(screen.width * 0.3);
       
        actLen += 1;
        imgp.className = "img_galery";
        imgp.setAttribute('onclick', 'do_img_click(\"' + pjson[i].fpath + '\", ' + i + ')');
     
    div = document.createElement("div");
    div.className = "photo_img";
    div.innerHTML = pjson[i].comments

    $(imgp).prependTo(div);
    $("#photoDetails").appendChild(div);
        }
    }
    pCnt = actLen;
   //

}
var upSucc;
var upErr;
var checkCnt;

function upload_Photos() {
    upSucc = 0;
    checkCnt = 0;
    var arrp2 = [], lenp2;

    var cStor = localStorage.getItem('SitePhotos');
    var pjson2 = JSON.parse(cStor);
    _pDB = pjson2;
  
  //  var pjson2 = _pDB;
    for (key in pjson2) {
  
        arrp2.push(key);
    }

    lenp2 = arrp2.length;
    lastNo = lenp2 - 1;
    
    actLen = 0;
    for (i = 0; i < lenp2; i++) {
        var islast = 'no';
        if (i === lastNo) {
           
            islast = 'yes';
        }
      //  else {
    //        uupPhoto(pjson2[i].fpath, 'no', pjson2[i].Sid);
        //     }
        uupPhoto(pjson2[i].fpath, islast, pjson2[i].Sid, lastNo);
        upSucc += 1;

    }
    
    if (upSucc === 0) {
       window.setTimeout(close_Dialog, 2000);
     //   blackberry.ui.dialog.standardAskAsync('no Files to upload', blackberry.ui.dialog.D_OK, dialPhotoUp, { title: "Uploading Photos" });
      show_Dialog('no Files to upload', 'menu.htm', 'Menu');
        

    }
    else {
        try {
             buttons = ["Hide", "Cancel"];
             ops = { title: "Uploading Photos" };
        //    blackberry.ui.dialog.customAskAsync("Uploading " + upSucc + " images", buttons, dialPhotoUp, ops);
            //   blackberry.ui.dialog.standardAskAsync(msg, blackberry.ui.dialog.D, dialogCallBack, { title: titleSTR });
        } catch (e) {
            alert("Exception in standardDialog: " + e);
        }
        //  show_Dialog(upSucc + ' files Uploading', 'menu.htm', 'Menu');
        alert("Uploading Photos");
    }


  //  alert(upSucc + ' files Uploading');
   
  //  _pDB = null;

}




function dialPhotoUp(selection) {
  alert(selection);
    if (selection === 1) {
       // del_Photo(_curImgID);
        blackberry.ui.dialog.close_Dialog();
        //   alert('delete photo');

    }
    else if (selection === 0) {
        blackberry.ui.dialog.close_Dialog();
     //   get_comments(_curImgID);
        //   photo_comments(_curImgID);
        // alert('add comments');

    }
}

function close_diag_after() {

}

//var server_url = "http://bus.dontwaste.co.za/BB/";
//var server_url = "http://localhost:13244/BB/"
//var callPage = server_url + "DWS_Photos_JSON.ashx";

function uupPhoto(pFile, isLast, siteID, _lastNo)
{
  //  var DwsUserDB = localStorage.getItem('DWS_User');
    // upErr = 0;
    
   sIMEI = '359410051630786';
    //sIMEI = blackberry.identity.IMEI;
    var idjob = uPI = localStorage.getItem('ID_JOB');
    //  var uDATA = JSON.parse(DwsUserDB);
   //  var uDATA = JSON.parse(DwsUserDB);
   
       Lind = pFile.lastIndexOf('/');
       var fName = pFile.substring(Lind + 1, pFile.length);
      // alert(callPage + '?cmd=Photos&site_id=' + _sID + '&u_pin=' + uDATA[0].BBPin + '&imei=' + uDATA[0].IMEI + '&file_name=' + fName + '&isLast=' + isLast);

    var options = {
        url: callPage + '?cmd=Photos&site_id=' + _sID + '&id_job=' + idjob + '&imei=' + sIMEI + '&file_name=' + fName + '&isLast=' + isLast + '&pCount=' + _lastNo,
        file: pFile,
        fileKey: 'myFile',
        mimeType: 'image/jpg',
        timeout: 60000, // in milliseconds default is 30000
        params: {
         //   cmd: 'Photos'
        },
        headers: {
        //    'Authorization': 'AUTH_HERE'
           },
        success: function (data) {
            blackberry.io.file.deleteFile(pFile);
            checkCnt += 1;

            if (checkCnt === upSucc) {
               
                localStorage.setItem('SitePhotos', null);
               $("#photoDetails").html();

            //    close_Dialog();
            }
         //   upSucc = upSucc + 1;
      
        },
        error: function (e, code) {
          //  upErr += 1;
            alert("uploader err - " + e + " " + code);
        }
    };

    webworks.io.FileUploader.upload(options);
}


function del_Photo(id) {
    var  arrd = [];
    var cStord = localStorage.getItem('SitePhotos');
    var pjsond = JSON.parse(cStord);
    for (key in pjsond) {

        arrd.push(key);
    }
  //  _pDB = pjsond;
    filePaths = pjsond[id].fpath;
    if (blackberry.io.file.exists(filePaths)) {
        blackberry.io.file.deleteFile(filePaths);
    }
    pjsond.splice(id, 1);
    _pDB = pjsond;
  //  delete _pDB[id];
    localStorage.setItem('SitePhotos', JSON.stringify(pjsond));
    bb.refresh();
    $("#photoDetails").html();
    get_exist();

}


function photo_comments(id, commSTR) {
    var arrc = [];
    var cStorc = localStorage.getItem('SitePhotos');
    var pjsonc = JSON.parse(cStorc);
    for (key in pjsonc) {

        arrc.push(key);
    }
    //  _pDB = pjsond;
    //filePaths = pjsonc[id].fpath;
    //if (blackberry.io.file.exists(filePaths)) {
    //    blackberry.io.file.deleteFile(filePaths);
    //}
    //pjsond.splice(id, 1);
    pjsonc[id].comments = commSTR;
    _pDB = pjsonc;
    //  delete _pDB[id];
    localStorage.setItem('SitePhotos', JSON.stringify(pjsonc));
 //  bb.refresh();
   $("#photoDetails").html();
     get_exist();
  //  alert('added!');
  



}



function mock_add() {
    // SPhotos = new;
    if (pCnt === null) {
        pCnt = 0;
    }
    else {
        pCnt += 1;
    }
    //  var arrSP = [];
    var SPhotos = {};
    SPhotos.Sid = "" + _sID;
    SPhotos.cnt = "" + pCnt;
    SPhotos.fpath = "testing_url" + pCnt;
    SPhotos.comments = "tester comments " + pCnt;

 // arrSP.push(SPhotos);
 //var crecu = JSON.stringify(SPhotos);
 appendItem('SitePhotos', SPhotos);
  
  //  alert('cnt: ' + pCnt);

}

var pCnt;

function onPhotoCaptured(filePath) {

     newFile;
  
   

    try {
        //For Smartphone, add "file://" prefix before path
        if (isBlackBerrySmartphone()) {
            filePath = "file://" + filePath;
        }

        if (pCnt === null) {
            pCnt = 0;
        }


       // 
        var SPhotos = {};
        SPhotos.Sid = "" + _sID;
        SPhotos.cnt = pCnt + '';
        SPhotos.fpath = filePath;
        SPhotos.comments = "";
        //  var crecu = JSON.stringify(SPhotos);
        appendItem('SitePhotos', SPhotos);
        pCnt += 1;
        _sID = _sID;

        try{
       //   blackberry.io.file.deleteFile(filePath);
        }
        catch (e) {
         //  alert("del photo ", e.message);
        }

        //  }




    }
    catch (e) {
        alert("copy photo ", e.message);
    }

	try {
		var img;
		
		debug.log("onPhotoCaptured", "Start: " + filePath, debug.info);

		Lindt = filePath.lastIndexOf('/');
		 fNamet = filePath.substring(Lindt + 1, filePath.length);
	//	var dws_file = filePath + "/DWS/";
		//if (blackberry.io.file.exists(filePath)) {
		//    blackberry.io.file.copy(filePath, dws_file);
		// //   blackberry.io.file.readFile(filePath, handleOpenedFile);
		//}
		
		img = new Image();
		img.src =  filePath;
		//img.width = 640;
		//img.height = 480;
		img.width = Math.round(screen.width * 0.3);
		//img.style.border = "2px solid transparent";
		img.className = "img_galery";
		img.setAttribute('onclick', 'do_img_click(\"' + filePath + '\", ' + (pCnt - 1) + ')');
		
	//	div = document.createElement("div");
		//div.setAttribute('onclick', 'do_img_click(\"' + fNamet + '\")');
		//$(img).appendTo(div);
		//document.getElementById("photoDetails").appendChild(div);
		$("#photoDetails").appendChild(img);
	} 
	catch(e) {
		debug.log("onPhotoCaptured", e, debug.exception);
	}
}

function onVideoCaptured(filePath) {
	try {
		var video, div;
		
		debug.log("onVideoCaptured", "Start: " + filePath, debug.info);
		
		//Close the camera control?
		//	blackberry.media.camera.close();
		
		video = document.createElement('video');
		video.src = filePath;
		video.controls = "controls";
		video.width = Math.round(screen.width / 2);
		
		div = document.createElement("div");
		div.innerHTML = filePath;

		document.getElementById("videoDetails").appendChild(div);
		document.getElementById("videoDetails").appendChild(video);
	} 
	catch(e) {
		debug.log("onVideoCaptured", e, debug.exception);
	}
}

function onVideoClosed(closedEvent) {
	debug.log("onVideoClosed", "Start: " + closedEvent, debug.info);
}
function onCameraClosed(closedEvent) {
	debug.log("onCameraClosed", "Start: " + closedEvent, debug.info);
}

function onError(errorEvent) {
	debug.log("onError", "onError: " + errorEvent, debug.info);
}


function takeVideo() {
	try {
		debug.log("takeVideo", "Start", debug.info);
		
		if ((window.blackberry === undefined) || (blackberry.media === undefined)) {
			debug.log("takeVideo", "blackberry.media.camera object is undefined.", debug.error);
			return false;
		}
		
		debug.log("takeVideo", "calling blackberry.media.camera.takeVideo.", debug.info);
		 result = blackberry.media.camera.takeVideo(onVideoCaptured, onVideoClosed, onError);
        
	} 
	catch(e) {
		debug.log("takeVideo", e, debug.exception);
	}
}


function takePicture() {
    try {
        // 0 = 2048
        // 1 = 1024
        // 2 = 640


      //  var app = {

         //   setRes: function () {
                //sets camera res
    //    var vibrateStartResult = webworks.camera.size.setSize('1');
          //  }
       // }
      
      //  app.setRes();



      //  var displres = igain.camera.size.setSize("1");

    //    alert('disp ' + vibrateStartResult);
    }
    catch (e) {
    //    alert('err-' + e.message);
    }

	try {
		debug.log("takePicture", "Start", debug.info);
		
		if ((window.blackberry === undefined) || (blackberry.media === undefined)) {
			debug.log("takePicture", "blackberry.media.camera object is undefined.", debug.error);
			//return false;
		}
	
		debug.log("takePicture", "calling navigator.takePicture.", debug.info);
		 result = navigator.takePicture(onPhotoCaptured, onCameraClosed, onError);
	} 
	catch(e) {
		debug.log("takePicture", e, debug.exception);
	}

  


}

  var pictureSource;   // picture source
var destinationType; // sets the format of returned value

// Wait for device API libraries to load
//
document.addEventListener("deviceready",onDeviceReady,false);

// device APIs are available
//
function onDeviceReady() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
}

// Called when a photo is successfully retrieved
//
function onPhotoDataSuccess(imageData) {
    // Uncomment to view the base64-encoded image data
    // console.log(imageData);

    // Get image handle
    //
    var smallImage = document.getElementById('smallImage');

    // Unhide image elements
    //
    smallImage.style.display = 'block';

    // Show the captured photo
    // The in-line CSS rules are used to resize the image
    //
    smallImage.src = "data:image/jpeg;base64," + imageData;
}

// Called when a photo is successfully retrieved
//
function onPhotoURISuccess(imageURI) {
    // Uncomment to view the image file URI
    // console.log(imageURI);

    // Get image handle
    //
    var largeImage = document.getElementById('largeImage');

    // Unhide image elements
    //
    largeImage.style.display = 'block';

    // Show the captured photo
    // The in-line CSS rules are used to resize the image
    //
    largeImage.src = imageURI;
}

// A button will call this function
//
function capturePhoto() {
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
        destinationType: destinationType.DATA_URL });
}

// A button will call this function
//
function capturePhotoEdit() {
    // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
        destinationType: destinationType.DATA_URL });
}

// A button will call this function
//
function getPhoto(source) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source });
}

// Called if something bad happens.
//
function onFail(message) {
    alert('Failed because: ' + message);
}


//function doPageLoad() {
//	try  {
//		debug.log("doPageLoad", "Start", debug.info);
		
//		if ((window.blackberry === undefined) || (blackberry.media === undefined)) {
//			debug.log("doPageLoad", "blackberry.media.camera object is undefined.", debug.error);
//			prependContent("photoDetails", "<p><i><b>blackberry.media.camera</b> object not found (likely cause is WebWorks APIs are not supported by this user agent).</i></p>");
//			prependContent("videoDetails", "<p><i><b>blackberry.media.camera</b> object not found (likely cause is WebWorks APIs are not supported by this user agent).</i></p>");
//		}
//	}
//	catch(e) {
//		debug.log("doPageLoad", e, debug.exception);
//	}
//}


//window.addEventListener("load", doPageLoad, false);
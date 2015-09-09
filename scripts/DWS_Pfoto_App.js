/**
Dont Waste Services - Photo app commands

Jan Nortje, May 2014


SET dev SETTINGS LINE 95 96
// & LINE 125


**/


/*  ------------------------------------------------ Set some variables for later use ---------------------------------------- */
var smsNO = "+27716875929";
//var smsNO;

var nID;

var actMonitor;

var modDiag;
var curUser;

function show_menu_sub(mobj) {
  //  var cm = document.getElementById(mobj);
    $('#' + mobj).toggle();
}

function do_menus() {
  
    var DwsUserDBc = localStorage.getItem('DWS_User');
    var cUs = JSON.parse(DwsUserDBc);
    curUser = cUs[0].SName;
   
 

}



var server_url = "http://bus.dontwaste.co.za/BB/";
var callPage = "http://mbus.dontwaste.co.za/bb_9320_v2.ashx";
var vidServer = 'http://bus.dontwaste.co.za/bb/videos/';

function get_DWS_settings() {
    try {
       
        var DwsSets = localStorage.getItem('DWS_Settings');
        if (DwsSets) {
            var dSet = JSON.parse(DwsSets);
            // server_url = "http://bus.dontwaste.co.za/BB/";
            smsNO = dSet[0].SMSset;
           // callPage = dSet[0].Primary;
          //  $.modal.close();
           // close_Dialog();
         //   return;
        }
        else {
            get_Default_settings();
         //   window.setTimeout(get_DWS_settings, 1000);
          //  return false;
        }
    }
    catch (e) {
        alert('DWS Settings - ' + e.message);
    }

}



/*----------------------------------------------------------------- App Start - First RUN -------------------------------------------------*/
/* See also
 standard.js
 DWS_Menus.js
 geo.js

*/

//var _timeRefr = 5;
var _ver = '1_0_0_0';
var GEOtimer;

var todayDt;




function start_app() {

  ///  alert('started');
   // get_Default_settings();
    /* use these for blackberry sim on pc !!! */

 localStorage.setItem('pre_Auth', 'true');
 localStorage.setItem('DWS_Spy', 'true');
 localStorage.setItem('DWS_Spy', 'true');

    /* --END-- */

    //sIMEI = Device.uuid;
 sIMEI = '359410051630786';
 //alert('IMEI: ' + sIMEI);
    _ver = '1_0_0_0';
    var timeRefr =  localStorage.getItem('sendGEO');

    if(!timeRefr){
        timeRefr = '10';
        localStorage.setItem('sendGEO', '10');
    }
   var refrate = parseInt(timeRefr);
    /* Timer to send gps every 10 minutes */
    GEOtimer = setInterval(function () {
        // your code goes here...
        try {
            getPosition('');
            do_locationPost();
        }
        catch (e) {
            //  alert('Please activate your GPS \nunder your Camera settings');
        }
    }, refrate * 60 * 1000);
  

    try{
        var appVer = localStorage.getItem('_vers');
        if (!appVer) {
            send_version();
        }
        else {
            if (appVer !== _ver) {
                localStorage.removeItem('_vers');
                send_version();
            }
        }
    }
    catch(e){}

   todayDt = new Date();
  //  get_DWS_settings();
    var didSpy = localStorage.getItem('DWS_Spy');
    if (!didSpy) {
        //    reset_db();
        try{
            localStorage.removeItem('pre_Auth');
            localStorage.removeItem('DWS_User');
            localStorage.removeItem('Last_Login');
        }
        catch(e){}
        //  localStorage.setItem('Last_Login', '0');
      //  sIMEI = blackberry.identity.IMEI;
        init_PRE();
        pre_auth();
    }

    else {
        // 
        //try{
        //    getPosition('');
        //}
        //catch (e) {
        //    alert('Please activate your GPS \nunder your Camera settings');
        //}
        try {
           
            var DwsUserDB = localStorage.getItem('DWS_User');
            var ispres = localStorage.getItem('PIN');
            var lastLogin = localStorage.getItem('Last_Login');
           // 
            if (DwsUserDB) {
                if (!ispres || ispres === '' || cSName === 'undifined') {
                   do_menu_nav('linkStaff.htm', 'link');
                }
                if (!lastLogin || lastLogin === '') {
                    
                   do_menu_nav('login.htm', 'Login');
                }
                else{
                    var tdDtae = todayDt.getDate();
                    if (tdDtae === lastLogin) {
                       do_menu_nav('menu.htm', 'Menu');
                    }
                    else {
                       do_menu_nav('login.htm', 'Login');
                    }

                }
             
            }
            else {
                //  
                   
                set_user();
                // if (!ispres) {
             //   
               do_menu_nav('linkStaff.htm', 'link');
                //  }
            }
             
   



        }
        catch (e) {
          //  console.log('exception (StartApp): ' + e.name + '; ' + e.message);

        }
    }
}


var moreVal = 0;
var progressIntervalMore = null;
function more_screen() {
    actMonitorm = document.getElementById('actitvityIndicator');

    // }


    $.modal(actMonitorm, { width: '25px', height: '29px', display: 'inline' });
    var idJbs = localStorage.getItem('ID_JOB');
    document.getElementById('more_frame').src = 'http://mbus.dontwaste.co.za/moreInfo.aspx?ID_JOB=' + idJbs;
   /// $('#more_frame').css('display', 'none');
   // window.setTimeout(afterLoading, 3000);
    window.setTimeout('afterLoading();', 4000);
  //checkIframeLoaded();

}



function afterLoading() {
    // alert("I am here");
 //   moreVal = 0;
  //  
 //   show_iframe();
    $('#more_frame').css('display', '');
    $('#more_top_div').css('display', '');
   // $('#actitvityIndicator').css('display', 'none');

   $.modal.close();
 //  show_iframe();
    //more_top_div
  //  $('#more_busy').css('display', 'none');
  //  $('#more_top_div').css('display', '');
  //  $('#more_frame').css('display', '');
  
}

function show_iframe() {
  //  
  //  alert('loaded');


   // $.modal.close();
    $('#more_frame').css('display', '');
    $('#more_top_div').css('display', '');
    $('#actitvityIndicator').css('display', 'none');

}

function setting_screen() {
    var DwsSettings = localStorage.getItem('DWS_Settings');
    if (DwsSettings) {

        var D_Setts = JSON.parse(DwsSettings);
        var _userS = localStorage.getItem('DWS_User');
        var _uSett = JSON.parse(_userS);
        var uPI = "not Registered";

        try {
            var cJOB2 = localStorage.getItem('ID_STAFF');
            var wDATA3 = _uSett;

            wDATA3 = wDATA3.filter(function (obj) {
                return (obj.ID_Staff === cJOB2);
            });

            var cSNamecc = wDATA3[0].SName;
            uPI = cSNamecc;
        }
        catch (e) {

        }
        

        //if (_userS) {
        //    uPI = _uSett[0].SName;
        //}
        document.getElementById('txt_SMS_Server').value = D_Setts[0].SMSset;
        document.getElementById('txt_P_Server').value = D_Setts[0].Primary;
        document.getElementById('txt_S_Server').value = D_Setts[0].Secondary;
        document.getElementById('txt_MyPin').innerHTML = 'Registered: ' + uPI;
        var lastLogin2 = localStorage.getItem('Last_Login');
        var lDton = JSON.parse(lastLogin2);


         lDton = date_DB_ToYMD_HHmm(lDton);
        //  var lastDTime = new Date(lDton);
        document.getElementById('txt_lastLogin').innerHTML = 'Last login: ' + lastLogin2;
    }
    else {
        get_DWS_settings();


    }
}

function set_about() {
    var lastNos = 0;
    try {
        var arrp9 = [], lenp9;

        var cStor1 = localStorage.getItem('DWS_User');
        var pjson212 = JSON.parse(cStor1);
      //  _pDB = pjson21;

        //  var pjson2 = _pDB;
        for (key in pjson212) {

            arrp9.push(key);
        }

        lenp9 = arrp9.length;
        lastNos = lenp9 - 1;

    }
    catch(e){}
    document.getElementById('cur_version').innerHTML = 'version: ' + _ver;
    document.getElementById('staff_found').innerHTML = '' + lastNos + ' users available';
    try {
        var cJOB = localStorage.getItem('ID_STAFF');
        var wDATA2 = pjson212;

        wDATA2 = wDATA2.filter(function (obj) {
            return (obj.ID_Staff === cJOB);
        });

        var cSNamec = wDATA2[0].SName;
    }
    catch (e) {
      
    }

    document.getElementById('active_user').innerHTML = cSNamec;
 


}

var sIMEI;
var curr_command;
var _sID;
var _SName;



var cur_lat;
var cur_long;






function send_version() {

    sIMEI = '359410051630786';
  //  sIMEI = blackberry.identity.IMEI;
    // alert('First: Latt: ' + cur_lat + ' Long: ' + cur_long + 'imei: ' + sIMEI);
    //   alert('Second: Latt: ' + cLatc + ' Long: ' + cLongc + 'imei: ' + sIMEI);
    var pageParamsLoc = {
        cmd: "setVersion",
        IMEI: sIMEI,
        nVer: _ver + ''

    }

    $.support.cors = true;
    jQuery.ajax({
        type: "GET",
        url: callPage,
        data: pageParamsLoc,
        contentType: "application/json; charset=utf-8",
        dataType: 'jsonp',
        crossDomain: true,
        success: function (json) {
            var crecss99 = JSON.stringify(json);
            //   var items = [];
            var crec999 = jQuery.parseJSON(crecss99);

            var resp555 = crec999[0].Status;
            //    alert('st: ' + resp55);
            if (resp555 === 'success') {
                localStorage.setItem('_vers', _ver + '');

            }
            else if (resp555 === 'error') {
                  alert('error cominicating with server');
                // err = crec99[0].Value;
                // alert('GPS - error-' + err);
            }




        },
        error: function (xhr, textStatus, errorThrown) {
            alert("error" + errorThrown);
        }
    });

}

function set_coords(coordinates) {

    cur_lat = coordinates.latitude;
    cur_long = coordinates.longitude;
}

function check_in() {
    show_Dialog('Clock in..wait', 'menu.htm', 'Menu', true);
    set_clock("Start");
  //  alert('arrive at work sent \n' + todayDt);
}

function check_out() {
    show_Dialog('Clock out..wait', 'menu.htm', 'Menu', true);
    set_clock("End");
  //  alert('leave work sent!! \n' + todayDt);
}

/*----------------------------------------------------------------- 1 once only SMS Registration ------------------------------------------------- */
var actMonitorPRE;
function pre_auth() {
  //  alert('pre auth ssed');
 // actMonitorPRE = document.getElementById('actitvityIndicatorPRE');

    //$.modal(actMonitorPRE, { width: '200px', height: '50px', display: 'inline' });
 // 
 // show_Dialog('Registering........Please Wait..', 'linkStaff.htm', 'link', true);

   
 //   sIMEI = blackberry.identity.IMEI;
    sIMEI = '359410051630786';

  //if (!sIMEI) {
  //    window.setTimeout(pre_auth(), 500);
  //}

    try{
        var SMStexts = "DWSpreA:" + sIMEI;
        alert(SMStexts);
        //blackberry.message.sms.send(SMStexts, smsNO);
        //blackberry.message.sms.isListeningForMessage = true;
        //blackberry.message.sms.addReceiveListener(listenerP);
    }
    catch (e) {
       // alert('-err-sms-new' + e.message);
    }
}


function sim_change() {
    //  alert('pre auth ssed');
    // actMonitorPRE = document.getElementById('actitvityIndicatorPRE');

    //$.modal(actMonitorPRE, { width: '200px', height: '50px', display: 'inline' });
    
   // show_Dialog('Registering........Please Wait..', 'linkStaff.htm', 'link', true);


 //   sIMEI = blackberry.identity.IMEI;
    sIMEI = '359410051630786';
    //if (!sIMEI) {
    //    window.setTimeout(pre_auth(), 500);
    //}

    try {
        var SMStexts = "DWSsimC:" + sIMEI;

        blackberry.message.sms.send(SMStexts, smsNO);
        blackberry.message.sms.isListeningForMessage = true;
        blackberry.message.sms.addReceiveListener(listenerP);
    }
    catch (e) {
        // alert('-err-sms-new' + e.message);
    }
}

function init_PRE() {
    //  get_Default_settings();

   // alert('pre auth ssed');


     listenerP = function (msg) {
        var isDWS = msg.substring(0, 3);
        var _nID = msg.substring(3, msg.length);
        if (isDWS === 'DWS') {
            //    close_Dialog();

            if (_nID === '0') {
            close_Dialog();
            //   $.modal.close();
                alert('There was a problem doing the Pre Auth \nPlease check all settings and try again');
              //  bb.popScreen();
            }
            else if (_nID === 'simSWAP') {
                alert('SIM swap registered');
               // bb.popScreen();

            }
            else {


                //  nID = _nID;
                // swap_reg_screen();
                localStorage.setItem('pre_Auth_ID', _nID);
                localStorage.setItem('pre_Auth', 'true');
                localStorage.setItem('DWS_Spy', 'true');
                close_Dialog();
                // $.modal.close();
                alert('Pre Authorisation Successfull \nPhone can be sent to region for staff registration');
                try {
                    getPosition('');
                    do_locationPost();
                }
                catch (e) {
                    alert('Please activate your GPS \nunder your Camera settings');
                }
             //   localStorage.removeItem('DWS_User');
                set_user();
               // bb.popScreen();
              //  blackberry.app.exit();

            }
            //   alert('new id: ' + nID);
        }
        else {

            alert('There was a problem with the Pre Auth \nPlease ensure Cell no is loaded on the system and try again');
          close_Dialog();
          //  $.modal.close();
          //  bb.popScreen();
        }
        //  alert(from + " " + msg + " " + date);
    }
    try {
        //  blackberry.message.sms.send('hello world', '27832636063');
      //  blackberry.message.sms.isListeningForMessage = true;
      //  blackberry.message.sms.addReceiveListener(listenerP);


        //   alert("sent");
    }
    catch (e) {
        debug.log("PRE menu ", e, debug.exception);

    }
}



/*----------------------------------------------- after pre auth db registration ----------------------------------------------- */
var your_pin;

function show_IMEI() {
    sIMEI = '359410051630786';
  //   sIMEI = blackberry.identity.IMEI;
  //   document.getElementById('txt_IMEI_pre').innerHTML = sIMEI;
    $("#txt_IMEI_pre").html("sIMEI");
   

}

function link_me() {
  //  sIMEI = blackberry.identity.IMEI;
    sIMEI = '359410051630786';
//    var upin = document.getElementById('txt_PIN_link').value;
       var upin = $('#txt_PIN_link').val();
    
 //   var upin2 = document.getElementById('txt_PIN2_link').value;
    
   var upin2 = $('#txt_PIN2_link').val();
    
     //     var S_ID = document.getElementById('txt_id_link').value;
    var S_ID = $('#txt_id_link').val();
    


    if (upin !== upin2) {
        alert('Your PINs does not match!!');
        return false;
    }
    if (upin.length <= 3) {
        alert('Your PIN must be at least 4 digits!');
        return false;
    }
 //   else {
     

        your_pin = upin;
        var lUsr = localStorage.getItem('DWS_User');
        if (!lUsr) {
            set_user();
            show_Dialog('SETUP incomplete <br\>please wait..', 'login.htm', 'Login', true);
          //  close_Dialog();
            //  
          //  blackberry.app.exit();
            // do_menu_nav('login.htm', 'Login');
        }
        else {

            try{
                var wDATA = JSON.parse(lUsr);

                wDATA = wDATA.filter(function (obj) {
                    return (obj.RSAID === S_ID);
                });

                var cSName = wDATA[0].SName;
            }
            catch (e) {
                alert('Your ID was not found on this device \ Please contact callcentre for help');
                close_Dialog();
                
               do_menu_nav('linkStaff.htm', 'link');
            }
            //   alert('SN: ' + cSName);
            if (cSName !== '' || cSName !== 'undefined') {
                show_Dialog('please wait..', 'login.htm', 'Login', true);

                //  wDATA[0].BBPin = upin;
                //   localStorage.removeItem('PIN');
                localStorage.setItem('PIN', your_pin);
                localStorage.setItem('ID_JOB', wDATA[0].ID_JOB);
                localStorage.setItem('ID_STAFF', wDATA[0].ID_Staff);
               
                alert('Welcome: ' + cSName);
                localStorage.setItem('Last_Login', todayDt.getDate());
                try {
                    getPosition('');
                     do_locationPost();
                }
                catch (e) {
                    //  alert('Please activate your GPS \nunder your Camera settings');
                }
                // sync_all();
                set_sites();
            }
            else {
              
                alert('Your ID was not found on this device \ Please contact callcentre for help');
                try {

                    localStorage.removeItem('ID_JOB');
                    localStorage.removeItem('PIN');
                }
                catch (e) { }
                close_Dialog();
                
               do_menu_nav('linkStaff.htm', 'link');
            }
        }
     
}


var actMonitorSMS;
function send_SMS() {
    getPosition('');
    var dwsPIN = '-1';
    var s_cnt = 1;
    job_type = document.getElementById('job_type_id');
    s_id = document.getElementById('txt_id');
    dwsPIN = document.getElementById('txt_PIN').value;
    s_cnt = document.getElementById('txt_no_sites').value;
    s_name = document.getElementById('txt_site_name').value;

    if (dwsPIN === '') {
        dwsPIN = "-1";
    }
    if (s_name === '') {
        s_name = "BB_Sites";
    }

    if (job_type.value === -1) {
        alert('Please select your Job Description');
        return false;
    }

    if (s_id.value === '') {
        alert('Please supply your ID Number!!');
        return false;
    }


  actMonitorSMS = document.getElementById('actitvityIndicatorSMS');

    $.modal(actMonitorSMS, {width:'25px',height:'29px',display:'inline'});
 
  

    try {
        
       // sIMEI = blackberry.identity.IMEI;
        sIMEI = '359410051630786';
        //  BB_Pins = blackberry.identity.your_pin;
        if (cur_lat !== 'undefined') {

            //document.getElementById('modal_message').innerHTML = "please Wait..";
            //currentProgress = 0;
            //showProgress();
        //    phoneDiscription = blackberry.identity.PIN;
            var SMStext = "DWSIMEI:" + sIMEI + "ID:" + s_id.value + "DWS:" + dwsPIN + "JI:" + job_type.value + "SC:" + s_cnt + "cLat:" + cur_lat + "cLong:" + cur_long + 'JOBno:' + s_name;
         //  alert(SMStext);
            blackberry.message.sms.send(SMStext, smsNO);
            blackberry.message.sms.isListeningForMessage = true;
            blackberry.message.sms.addReceiveListener(listener);
           

        }
        else {
            alert('Please activate your GPS \nunder your Camera settings');
        }
       
    }
    catch (e) {
        debug.log("SMS menu ", e, debug.exception);

    }

   
}

//function show_Dialog(msg, nScrn, cmnd, progre) {
    function show_Dialog(diaMsg, fromScreen, fromID, autoProgress) {

        //  actMonitor = document.getElementById('actitvityIndicator');

        //  if (actMonitor === null) {
        //   alert(" Dialog Created - ");
        //    createDialog();
        //  }

        alert(diaMsg);

        _fromScreen = fromScreen;
        _fromID = fromID;
        _msgSTR = diaMsg;
        do_menu_nav('dialog.htm', 'dialog', { auto: autoProgress });

    }
   
//}

function init_SMS() {
    get_Default_settings();
     listener = function (msg, from, date) {
        var isDWS = msg.substring(0, 3);
        var _nID = msg.substring(3, msg.length);
        if (isDWS === 'DWS') {
            //    close_Dialog();

            if (_nID === '0') {
                $.modal.close();
                alert('Your ID was not found \nPlease contact support to rectify');
              //  bb.popScreen();
            }
            else {


                nID = _nID;
                swap_reg_screen();
            }
            //   alert('new id: ' + nID);
        }
        else {
            
            alert('Your ID was not found \nPlease contact support to rectify');
            $.modal.close();
          //  bb.popScreen();
        }
        //  alert(from + " " + msg + " " + date);
    }
    try {
        //  blackberry.message.sms.send('hello world', '27832636063');
      //  blackberry.message.sms.isListeningForMessage = true;
       // blackberry.message.sms.addReceiveListener(listener);

     
        //   alert("sent");
    }
    catch (e) {
        debug.log("SMS menu ", e, debug.exception);

    }
}

function swap_reg_screen() {
 // actMonitor = document.getElementById('actitvityIndicator');
   
    //  $(actMonitor).hide();
    //   close_Dialog();

    
    $.modal.close();
    
   
   do_menu_nav('smsConfirm.htm', 'SMSCon');

}





var currentdate = new Date();




function body_start() {
   
  initMenus();

}


/*----------------------------------------------------------------- Add records to any localstore & reset DB ------------------------------------------------- */
var Site_P_ARR = [];
var Mail_ARR = [];
var CollDocs_ARR = [];

function appendItem(key, data) {

  
 var tmpDB = localStorage.getItem(key);

 if (tmpDB === null) {
     if (key === 'SitePhotos') {
         Site_P_ARR.push(data);
         localStorage.setItem(key, JSON.stringify(Site_P_ARR));
     }
     else if (key === 'Messages') {
         Mail_ARR.push(data);
         localStorage.setItem(key, JSON.stringify(Mail_ARR));

     }
     else if (key === 'CollDocs') {
         CollDocs_ARR.push(data);
         localStorage.setItem(key, JSON.stringify(CollDocs_ARR));

     }
       

    }
 else {
     //  varARR = window[varARR + key];
     if (key === 'SitePhotos') {
         if (Site_P_ARR === null) {
                Site_P_ARR = localStorage.getItem(key);
            
            
         }
         Site_P_ARR.push(data);
         localStorage.setItem(key, JSON.stringify(Site_P_ARR));
     }
     else if (key === 'Messages') {
      
         Mail_ARR = new Array();
         Mail_ARR = JSON.parse(tmpDB);
             Mail_ARR.push(data);
             localStorage.setItem(key, JSON.stringify(Mail_ARR));
     }
     else if (key === 'CollDocs') {

         CollDocs_ARR = new Array();
         CollDocs_ARR = JSON.parse(tmpDB);
         CollDocs_ARR.push(data);
         localStorage.setItem(key, JSON.stringify(CollDocs_ARR));
     }
        
     }
  
   //  alert('append: ' + JSON.stringify(varARR));
     
  //  }
 
}

function reset_db() {

  //  var _user = localStorage.getItem('DWS_User');
//  var _dwsSett = localStorage.getItem('DWS_Settings');
    var storagecount = localStorage.length; //Get the Storage Count 
    if (storagecount > 0) {
        for (i = 0; i < storagecount; i++) {
            localStorage.clear();
        }
    }
 //   localStorage.setItem('DWS_User', _user);
    //  localStorage.setItem('DWS_Settings', _dwsSett);
  //  blackberry.app.exit();
  //  window.location.reload();



}


function set_clock(tpe) {
  

    var  uID_JOB = localStorage.getItem('ID_STAFF');
  //  sIMEI = blackberry.identity.IMEI;
    sIMEI = '359410051630786';
        //  }
        var pageParamsS = {
            cmd: "Clock",
            id_job: uID_JOB,
            IMEI: sIMEI,
            action: tpe
        }
        // alert('u: ' + your_pin + 'ver ' + _ver + 'imei: ' + sIMEI);
        $.support.cors = true;
        jQuery.ajax({
            type: "GET",
            url: callPage,
            data: pageParamsS,
            contentType: "application/json; charset=utf-8",
            dataType: 'jsonp',
            crossDomain: true,
            success: function (json) {
                var crcss = JSON.stringify(json);
                //   var items = [];
                var crec9 = jQuery.parseJSON(crcss);

                var resp9 = crec9[0].Status;

                if (resp9 === 'success') {
                    close_Dialog();
                   // showProgress(25);
                  //  var sdb2 = crec[0].Value;
                    //  var crecss2 = JSON.stringify(sdb);
                 //   var crec22 = JSON.stringify(sdb2);
                    // alert('sname: ' + sdb[0].SiteName);
                    alert(tpe + ' day \n Success!');
                  //  localStorage.setItem('DWS_Sites', crec22);
                  //  get_SiteWaste()
                  close_Dialog();

                    //   actMonitor = document.getElementById('actitvityIndicator');

                    //  $(actMonitor).hide();
                }
                else if (resp === 'error') {
                    err = crec[0].Value;
                   close_Dialog();
                    alert('-error- \nClock in ' + err);
                }




            },
            error: function (xhr, textStatus, errorThrown) {
             close_Dialog();
                alert("-error- \n" + errorThrown);
            }
        });

    }


/*----------------------------------------------------------------- Dialog Control ------------------------------------------------- */
var DialogCallcode;
var wasBackground;
function dialogCallBack(selection) {
    if (DialogCallcode === 0) {
     //   webworks.bbalert.led.flashLED('stop');
     //   if (wasBackground)
         //   blackberry.app.requestBackground();

     //  do_menu_nav('menu.htm', 'Menu');
      //  hide('Login');
       // initMenus();
    }
    else {
      //  initMenus();

    }

   
  //  var selS = selection.return;
   // alert(selection.return);
}

function dialogCallBackStandard(selection) {
 
}
function standardDialog(msg, titleSTR, code) {
    DialogCallcode = code;
    try {
      //  blackberry.ui.dialog.standardAskAsync(msg, blackberry.ui.dialog.D_OK, dialogCallBack, { title: titleSTR });
    } catch (e) {
        alert("Exception in standardDialog: " + e);
    }
}



/*----------------------------------------------------------------- Default global settings ------------------------------------------------- */
function get_Default_settings() {
    // showProgress('configuring..', 'menu.htm', 'Menu');
    var pageParams = { cmd: "BB_Web_Settings" };


    var Master_url = "http://bus.dontwaste.co.za/BB_Web_Settings.ashx";

    $.support.cors = true;

    $.ajax({
        type: 'GET',
        url: Master_url,
        data: pageParams,
        async: false,
        //  jsonpCallback: 'JSON',
        contentType: "application/json; charset=utf-8",
        dataType: 'jsonp',
        crossDomain: true,
        success: function (json) {
            var crecm = JSON.stringify(json);
            var getContact = JSON.parse(crecm);
            localStorage.setItem('DWS_Settings', JSON.stringify(getContact));
        //    close_Dialog();
            //   server_url = getContact[0].Secondary;
            //    alert('Default Settings applied!!');
            alert("Data Loaded" + getContact[0].Secondary);
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("error" + errorThrown);
        }
    });

}
var timeOUT;
/*----------------------------------------------------------------- Lets Login ------------------------------------------------- */
function click_login() {
    get_DWS_settings();
    //   alert('Login');
    // 
    //show_Dialog();
    your_pin = document.getElementById('txt_password').value;
    var cPIN = localStorage.getItem('PIN');
    if (your_pin === cPIN) {
        localStorage.setItem('Last_Login', todayDt.getDate());
       

        try {
            // set_user();
          //  var cUs = wDATA[0].SName;
          //  localStorage.setItem('CurrentStaff', cSName);
            set_sites();
            alert('updating..');
            do_menu_nav('menu.htm', 'Menu');
        //    show_Dialog('updating..', 'menu.htm', 'Menu', true);

         //   timeOUT = window.setTimeout(check_timeout(), 10000);
            //  set_sites();
            //   get_SiteWaste();
            //    get_WS_Outstanding();
        }
        catch (e) {
          //  close_Dialog();
         //   alert('Timeout \n will try again later');
          //  alert('error - login - ' + e.message);
        }

    }
    else {
        alert('Incorrect PIN');
    }
}

function check_timeout() {

    if (timeOUT) {
        close_Dialog();
        alert('Timeout \n will try again later');
       // timeOUT.clear();
    }

}

/*----------------------------------------------------------------- Get all relevant data from server ------------------------------------------------- */



function set_user() {

  //  var DwsUserDB7 = localStorage.getItem('DWS_User');
 
  //  var uDATA7 = JSON.parse(DwsUserDB7);
/*---------------------------------------------------------------------------------- DEV SETTINGS --------------------------------------------------------------------------------*/
   // sIMEI = uDATA7[0].IMEI;
 // sIMEI = blackberry.identity.IMEI;
    sIMEI = '359410051630786';

    var pageParams = {
        cmd: "firstLogin",
        IMEI: sIMEI
    }
    //try{
    $.support.cors = true;
    //  alert('pin: ' + your_pin + ':simei' + sIMEI);
    $.ajax({

        type: "GET",
        url: callPage,
        data: pageParams,
        contentType: "application/json; charset=utf-8",
        //   contentType: "text/plain",
        dataType: 'jsonp',
        crossDomain: true,
        success: function (json) {
            //  alert('got data');
            var crecu = JSON.stringify(json);
            var getContact = jQuery.parseJSON(crecu);
            var resp = getContact[0].Status;
            if (resp === 'success') {
             //   localStorage.removeItem('DWS_User');
              //  showProgress(25);
                var sdb = getContact[0].Value;
              //  alert(sdb);
                if (sdb === 'no Staff') {

                    alert('This Job has not been completely setup. \nNo Staff assigned!!');
                }
                else {
            //   localStorage.removeItem('DWS_User');
                    localStorage.setItem('DWS_User', sdb);
                  
                    //   var lDT = date_SYS_ToYMD_HHmm(currentdate);
                    try{
                        localStorage.removeItem('Last_Login');
                        localStorage.removeItem('PIN');
                        localStorage.removeItem('ID_JOB');
                    }
                    catch(e){}
                
                   do_menu_nav('linkStaff.htm', 'link');
               

                }

            }


           
     
          //  set_sites();
           

        },
        error: function (xhr, textStatus, errorThrown) {
            alert("error" + errorThrown);
        }

    });
  

}


function close_Dialog() {
    try {
        //  actMonitor = document.getElementById('actitvityIndicator');
     //   bb.refresh();
        try{


            $.modal.close();
        }
        catch(e){}


        if (_fromScreen !== null) {
            do_menu_nav(_fromScreen, _fromID);
        }

    }
    catch (e) {
    //    debug.log(" Dialog-error ", e.message, debug.exception);
    }
}
//function close_Dialog() {
//    do_menu_nav('menu.htm', 'Menu');
//}

var ID_JOBS;


function set_sites() {
    var _userS = localStorage.getItem('DWS_User');
    _uSett = JSON.parse(_userS);
    sIMEI = '359410051630786';
    var uPI = "not Registered";

    if (_userS) {

        uPI = localStorage.getItem('ID_JOB');
        ID_JOBS = uPI;
        //  }
        var pageParamsS = {
            cmd: "Sites",
            id_job: uPI,
            IMEI: sIMEI
        }
        // alert('u: ' + your_pin + 'ver ' + _ver + 'imei: ' + sIMEI);
        $.support.cors = true;
        jQuery.ajax({
            type: "GET",
            url: callPage,
            data: pageParamsS,
            contentType: "application/json; charset=utf-8",
            dataType: 'jsonp',
            crossDomain: true,
            success: function (json) {
                var crecss = JSON.stringify(json);
                //   var items = [];
                var crec = jQuery.parseJSON(crecss);

                var resp = crec[0].Status;

                if (resp === 'success') {
                   // showProgress(25);
                    var sdb = crec[0].Value;
                    //  var crecss2 = JSON.stringify(sdb);
                    var crec2 = JSON.stringify(sdb);
                  //  alert('sname: ' + sdb);
                    localStorage.removeItem('DWS_Sites');
                    localStorage.setItem('DWS_Sites', crec2);
                    get_SiteWaste()
                    //  close_Dialog();

                    //   actMonitor = document.getElementById('actitvityIndicator');

                    //  $(actMonitor).hide();
                }
                else if (resp === 'error') {
                    err = crec[0].Value;
                    close_Dialog();
                    alert('-error- \n' + err);
                }




            },
            error: function (xhr, textStatus, errorThrown) {
                close_Dialog();
                alert("-error- \n" + errorThrown);
            }
        });

    }
}


function get_SiteWaste() {

    var pageParamsS = {
        cmd: "siteWaste",
        id_job: ID_JOBS,
        IMEI: sIMEI
    }

    $.support.cors = true;
    jQuery.ajax({
        type: "GET",
        url: callPage,
        data: pageParamsS,
        contentType: "application/json; charset=utf-8",
        dataType: 'jsonp',
        crossDomain: true,
        success: function (json2) {
            var crecss2 = JSON.stringify(json2);
            //   var items = [];
            var crec3 = jQuery.parseJSON(crecss2);

            var resp2 = crec3[0].Status;

            if (resp2 === 'success') {
               // showProgress(50);
                var sdb1 = crec3[0].Value;
                //  var crecss2 = JSON.stringify(sdb);
                var crec4 = JSON.stringify(sdb1);
                // alert('sname: ' + sdb[0].SiteName);
              //  localStorage.removeItem('SiteWaste');
                localStorage.setItem('SiteWaste', crec4);
             get_WS_Outstanding(true);

                
               
            }
            else if (resp2 === 'error') {
                close_Dialog();
                err = crec3[0].Value;
                alert('-error- \n' + err);
            }




        },
        error: function (xhr, textStatus, errorThrown) {
            alert("error" + errorThrown);
        }
    });


}


function get_WS_Outstanding(clsModal) {
  
    ID_JOBS = localStorage.getItem('ID_JOB');
   // sIMEI = blackberry.identity.IMEI;


    var pageParamsS = {
        cmd: "WS_Out",
        id_job: ID_JOBS,
        IMEI: sIMEI
    }
  
    $.support.cors = true;
    jQuery.ajax({
        type: "GET",
        url: callPage,
        data: pageParamsS,
        contentType: "application/json; charset=utf-8",
        dataType: 'jsonp',
        crossDomain: true,
        success: function (json4) {
            var crecss4 = JSON.stringify(json4);
            //   var items = [];
            var crec6 = jQuery.parseJSON(crecss4);

            var resp5 = crec6[0].Status;

            if (resp5 === 'success') {
             //   close_Dialog();
                var sdb2 = crec6[0].Value;
              //  showProgress(75);
                //  var crecss2 = JSON.stringify(sdb);
                var crec7 = JSON.stringify(sdb2);
                // alert('sname: ' + sdb[0].SiteName);
                try{
                    localStorage.removeItem('WS_Outstanding');
                }
                catch(e){}
                localStorage.setItem('WS_Outstanding', crec7);
             
                if (clsModal) {
               //     timeOUT.clear();
           // close_Dialog();
                }
           ////     start_app();

           //     actMonitor = document.getElementById('actitvityIndicator');

           //     $(actMonitor).hide();
           do_menu_nav('menu.htm', 'Menu');
          //  start_app();
            }
            else if (resp5 === 'error') {
                err = crec6[0].Value;
                alert('error-' + err);
            }




        },
        error: function (xhr, textStatus, errorThrown) {
            alert("error" + errorThrown);
        }
    });


}

function how_id(id) {

    alert(id);
}

/*----------------------------------------------------------------- Routines to build screen lists from data ------------------------------------------------- */




function site_list_one(commDo) {
  
 
    try{
        var DwsSitess = localStorage.getItem('DWS_Sites');

        var sDATAs = JSON.parse(DwsSitess);

        var arrs = [], lens;

        for (key in sDATAs) {
            arrs.push(key);
        }

        lens = arrs.length;

    }
    catch (e) {
        alert('your Sites has not been configured \nyou will be informed as soon as its configured');

        
       do_menu_nav('menu.htm', 'Menu');

    }
    if (lens === 0) {


        alert('your Sites has not been configured \nyou will be informed as soon as its configured');

        
       do_menu_nav('menu.htm', 'Menu');
       // goHome();
    }
    else {


        try {


            var col = $("<div/>", {
                "id": "Site_List"
                //     "data-bb-type": "scroll-panel",
                //    "style": "height:240px"

            });
            for (i = 0; i < lens; i++) {

                var SitName = sDATAs[i].SiteName;
                var itemss = sDATAs[i].coll_points;
                var collP = [];
                for (key in itemss) {
                    collP.push(key);
                }



                var list_items = '';
                var SList = '';

                if (collP.length === 1) {
                    SList = '<div   x-blackberry-focusable="true"  class="menu"  onclick="do_site_nav(\'' + itemss[0].id + '\',\'' + commDo + '\');setSite(\'' + SitName + '\');"><span class="butt icon-sites"></span>' + SitName + '</div>';
                }
                else {
                    SList = '<div   x-blackberry-focusable="true"  class="menu"  onclick="show_site_menu(' + i + ');"><span class="butt icon-sites"></span>' + SitName + '</div>';

              
                //   alert(SitName + ' sites');
                
                //  var SList = "<div class='menu'  onclick='show_site_menu(" + i + ");'><span class='butt icon-sites'></span>" + SitName + "</div>";
              

                for (j = 0; j < collP.length; j++) {
                    //  list_items += "<div data-bb-type='item' onclick='do_site_nav(" + itemss[j].id + ", " + commDo + ");setSite(\"" + SitName + "\");'>" + itemss[j].CollectionPoint + "</div>";

                    list_items += '<div  x-blackberry-focusable="true" class="menu-inner"  onclick="do_site_nav(\'' + itemss[j].id + '\',\'' + commDo + '\');setSite(\'' + SitName + '\');">' + itemss[j].CollectionPoint + '</div>';
                    //  alert(list_items);
                }
                }
                // });
                var list = $("<div/>", {
                    "id": "siteMenu" + i,
                    "style": "display:none;",
                    "class": "menuss"
                });

                //     var    smenu = "SiteMenu" + i;
                //  var      lview = "listview" + i;
                $(list).append(list_items);
                // $(list).hide();
                $(SList).appendTo(col);

                $(list).appendTo(col);
                //  


                //  $(col).

            }
            //  var site_div = element.getElementById('div_sites');


            $('#div_sites').html($(col).html());



        } catch (e) {
            alert("Site List - error " + e.message);
            // handle exception
        }


    }
 


}


function site_list_two(commDo) {
 //   alert('build sites');
 
    try{
        var DwsSitess = localStorage.getItem('DWS_Sites');

        var sDATAs = JSON.parse(DwsSitess);

        var arrs = [], lens;

        for (key in sDATAs) {
            arrs.push(key);
        }

        lens = arrs.length;

    }
    catch (e) {
        alert('your Sites has not been configured \nyou will be informed as soon as its configured');

        
       do_menu_nav('menu.htm', 'Menu');

    }
    if (lens === 0) {


        alert('your Sites has not been configured \nyou will be informed as soon as its configured');

        
       do_menu_nav('menu.htm', 'Menu');
       // goHome();
    }
    else {


        try {


            var col = $("<div/>", {
                "id": "Site_List"
                //     "data-bb-type": "scroll-panel",
                //    "style": "height:240px"

            });
            for (i = 0; i < lens; i++) {

                var SitName = sDATAs[i].SiteName;
                var itemss = sDATAs[i].coll_points;
                var collP = [];
                for (key in itemss) {
                    collP.push(key);
                }



                var list_items = '';
                var SList = '';

                if (collP.length === 1) {
                    SList = '<div   x-blackberry-focusable="true"  class="menu"  onclick="do_site_nav(\'' + itemss[0].id + '\',\'' + commDo + '\');setSite(\'' + SitName + '\');"><span class="butt icon-sites"></span>' + SitName + '</div>';
                }
                else {
                    SList = '<div   x-blackberry-focusable="true"  class="menu"  onclick="show_site_menu(' + i + ');"><span class="butt icon-sites"></span>' + SitName + '</div>';

              
                //   alert(SitName + ' sites');
                
                //  var SList = "<div class='menu'  onclick='show_site_menu(" + i + ");'><span class='butt icon-sites'></span>" + SitName + "</div>";
              

                for (j = 0; j < collP.length; j++) {
                    //  list_items += "<div data-bb-type='item' onclick='do_site_nav(" + itemss[j].id + ", " + commDo + ");setSite(\"" + SitName + "\");'>" + itemss[j].CollectionPoint + "</div>";

                    list_items += '<div  x-blackberry-focusable="true" class="menu-inner"  onclick="do_site_nav(\'' + itemss[j].id + '\',\'' + commDo + '\');setSite(\'' + SitName + '\');">' + itemss[j].CollectionPoint + '</div>';
                    //  alert(list_items);
                }
                }
                // });
                var list = $("<div/>", {
                    "id": "siteMenu" + i,
                    "style": "display:none;",
                    "class": "menuss"
                });

                //     var    smenu = "SiteMenu" + i;
                //  var      lview = "listview" + i;
                $(list).append(list_items);
                // $(list).hide();
                $(SList).appendTo(col);

                $(list).appendTo(col);
                //  


                //  $(col).

            }
            //  var site_div = element.getElementById('div_sites');


            $('#div_sites2').html($(col).html());



        } catch (e) {
            alert("Site List - error " + e.message);
            // handle exception
        }


    }
 


}


function site_list_three(commDo) {
 //   alert('build sites');
 
    try{
        var DwsSitess = localStorage.getItem('DWS_Sites');

        var sDATAs = JSON.parse(DwsSitess);

        var arrs = [], lens;

        for (key in sDATAs) {
            arrs.push(key);
        }

        lens = arrs.length;

    }
    catch (e) {
        alert('your Sites has not been configured \nyou will be informed as soon as its configured');

        
       do_menu_nav('menu.htm', 'Menu');

    }
    if (lens === 0) {


        alert('your Sites has not been configured \nyou will be informed as soon as its configured');

        
       do_menu_nav('menu.htm', 'Menu');
       // goHome();
    }
    else {


        try {


            var col = $("<div/>", {
                "id": "Site_List"
                //     "data-bb-type": "scroll-panel",
                //    "style": "height:240px"

            });
            for (i = 0; i < lens; i++) {

                var SitName = sDATAs[i].SiteName;
                var itemss = sDATAs[i].coll_points;
                var collP = [];
                for (key in itemss) {
                    collP.push(key);
                }



                var list_items = '';
                var SList = '';

                if (collP.length === 1) {
                    SList = '<div   x-blackberry-focusable="true"  class="menu"  onclick="do_site_nav(\'' + itemss[0].id + '\',\'' + commDo + '\');setSite(\'' + SitName + '\');"><span class="butt icon-sites"></span>' + SitName + '</div>';
                }
                else {
                    SList = '<div   x-blackberry-focusable="true"  class="menu"  onclick="show_site_menu(' + i + ');"><span class="butt icon-sites"></span>' + SitName + '</div>';

              
                //   alert(SitName + ' sites');
                
                //  var SList = "<div class='menu'  onclick='show_site_menu(" + i + ");'><span class='butt icon-sites'></span>" + SitName + "</div>";
              

                for (j = 0; j < collP.length; j++) {
                    //  list_items += "<div data-bb-type='item' onclick='do_site_nav(" + itemss[j].id + ", " + commDo + ");setSite(\"" + SitName + "\");'>" + itemss[j].CollectionPoint + "</div>";

                    list_items += '<div  x-blackberry-focusable="true" class="menu-inner"  onclick="do_site_nav(\'' + itemss[j].id + '\',\'' + commDo + '\');setSite(\'' + SitName + '\');">' + itemss[j].CollectionPoint + '</div>';
                    //  alert(list_items);
                }
                }
                // });
                var list = $("<div/>", {
                    "id": "siteMenu" + i,
                    "style": "display:none;",
                    "class": "menuss"
                });

                //     var    smenu = "SiteMenu" + i;
                //  var      lview = "listview" + i;
                $(list).append(list_items);
                // $(list).hide();
                $(SList).appendTo(col);

                $(list).appendTo(col);
                //  


                //  $(col).

            }
            //  var site_div = element.getElementById('div_sites');


            $('#div_sites3').html($(col).html());



        } catch (e) {
            alert("Site List - error " + e.message);
            // handle exception
        }


    }
 


}


var slCnt;

var selWasteDB = [];
var id_msg;
function list_WS_Outstanding() {
    wsMenu = document.getElementById('ws_Menu');

    $(wsMenu).innerHTML = "WSlips for " + _SName;

    var load_type = ["Initial Delivery", "Lift and Empty", "Lift and Remove (Full)", "Lift and Remove (Empty)"];
    
    var WSOut = localStorage.getItem('WS_Outstanding');

    var wDATA = JSON.parse(WSOut);

    wDATA = wDATA.filter(function (obj) {
        return (obj.ID_Department === _sID);
    });



    var arrw = [], lenw;

    for (key in wDATA) {
        arrw.push(key);
    }

    lenw = arrw.length;
    selWasteDB = wDATA;
    try {


        var cols = $("<div/>", {
            "id": "WS_List",
            "class": "wSlips",
          "data-bb-type": "scroll-panel"
          //  "style": "height:240px"

        });

     slCnt = 0;
        for (i = 0; i < lenw; i++) {

         //   if (wDATA[i].ID_Department === _sID) {
                slCnt += 1;
             
              var dateout = wDATA[0].dtWhenToCollect;
              var strNow = dateout.substring(4, 0) + "/" + dateout.substring(7, 5) + "/" + dateout.substring(10, 8);
              dtExpect = strNow;

             


              var SList = "<div  x-blackberry-focusable='true'  onclick='show_ws_detail(" + i + ", this);' class='wslipsi'><strong>White Slip: " + wDATA[i].ClientOrderNo + "</strong><br />O/N: " + wDATA[i].DWS_ORDER_NUMBER + " -  Coll Date: " + dtExpect + "<br />";
          //    var SList = "<div  x-blackberry-focusable='true'   onclick='show_ws_detail(" + i + ", this);' class='wslipsi'><strong>WS No: " + wDATA[i].ClientOrderNo + "</strong>Coll Date: " + dtExpect + "</div>";

          
             SList += "SP: " + wDATA[i].CollectingParty + " - " + load_type[wDATA[i].load_type] + "</div>";

              

              //  SList = sTab;
                var itemsw = wDATA[i].WS_Items;
                var colli = [];
                for (key in itemsw) {
                    colli.push(key);
                }
              //  var list_itemsw = "O/N: " + wDATA[i].DWS_ORDER_NUMBER;
                var list_itemsw = '';

                for (j = 0; j < colli.length; j++) {
                    list_itemsw += "<div  >" + itemsw[j].Quantity + " X " + itemsw[j].Waste_Description + " - " + itemsw[j].CONTAINER_DESC + "</div>";
                }
             ///   var sPar = { "id_msg": wDATA[i].ID_MSG_SLIP + "" };
               
              //  list_itemsw += ' <div data-bb-type="button" data-bb-style="stretch" onclick="click_confirm_ws(' + wDATA[i].ID_MSG_SLIP + ')" ><span class="butt icon-check"></span>Confirm</div>';
                list_itemsw += ' <div data-bb-type="button" style="width:60%;" onclick="click_confirm_ws(' + wDATA[i].ID_MSG_SLIP + ')" ><span class="butt icon-check"></span>Confirm</div>';
        //        list_itemsw += ' <div data-bb-type="button" style="width:40%;" onclick="click_complaint_ws(' + wDATA[i].ID_MSG_SLIP + ')" ><span class="butt icon-warning"></span>Complaint</div>';
                // });
                var list = $("<div/>", {
                    "id": "wsMenu" + i,
                    "style": "display:none;",
                    "class": "wSlipsDet"
                 //   "onclick": "do_ws_confirm(" + wDATA[i].ID_MSG_SLIP + ");"

                });

                //     var    smenu = "SiteMenu" + i;
                //  var      lview = "listview" + i;
                $(list).append(list_itemsw);
                // $(list).hide();
                $(SList).appendTo(cols);

                $(list).appendTo(cols);
                //  

         //   }
            //  $(col).

        }
       // var site_div = element.getElementById('div_ws');
        $('#site_div').append(cols);

      

    } catch (e) {
        debug.log("WS List ", e, debug.exception);
        // handle exception
    }

}




/*----------------------------------------------------------------- Photo image commands ------------------------------------------------- */

var _curImg;
var _curImgID;
function do_img_click(imgP, id) {
  // alert('img: ' + imgP);
    _curImg = imgP;
    _curImgID = id;
    try {
        var buttons = ["Comments", "Delete", "Cancel"];
        var ops = { title: "Selected" };
        blackberry.ui.dialog.customAskAsync("Add Comments to \nor Delete \nthe Selected Photo!!", buttons, dialogPhotoCallBack, ops);
     //   blackberry.ui.dialog.standardAskAsync(msg, blackberry.ui.dialog.D, dialogCallBack, { title: titleSTR });
    } catch (e) {
        alert("Exception in standardDialog: " + e);
    }


}

function dialogPhotoCallBack(selection) {
   // alert(selection);
    if (selection === 1) {
        del_Photo(_curImgID);
     //   alert('delete photo');

    }
    else if (selection === 0) {
        get_comments(_curImgID);
     //   photo_comments(_curImgID);
       // alert('add comments');

    }
}

function get_comments(id) {

  //  var ops2 = { title: "Comments" };
    try {
       
        var pComm = prompt("Comments for selected Photo?", "");

        if (pComm) {
            photo_comments(id, pComm);
          //  alert('pComments: ' + pComm);
        }



    }
    catch (e) {
        alert('prompt - error: ' + e.message);
    }
}



/*----------------------------------------------------------------- Date constructs ------------------------------------------------- */


function get_min_from_last() {

    var lastLogin2 = localStorage.getItem('Last_Login');
    var cDt = new Date();
    var curDt = date_SYS_ToYMD_HHmm(cDt);
    var lDton = JSON.parse(lastLogin2);


    lDton = date_DB_ToYMD_HHmm(lDton);
    var lastDTime = new Date(lDton);
    var crDTime = new Date(curDt);

    d_diff = crDTime.getDate() - lastDTime.getDate();

    if (d_diff > 0) {
        localStorage.removeItem('Last_Login');
        
       do_menu_nav('index.htm', 'index');

    }

    //  d_diff = (d_diff / 1000); //sec
    var m_diff = ((crDTime - lastDTime) / 1000);
    m_diff = m_diff / 60; 


    return m_diff;




  //  alert('sDT: ' + lDton + '\nCurDT: ' + curDt + '\ndiff: ' + d_diff + ' mDiff: ' + m_diff);

}


function check_date() {
    var obj = document.getElementById('txt_col_date');
    var cur = $(obj).val() + "";
    try {
       
        return cur.replace(/-/g, "/");
    }
    catch (e) {
        return cur;
    }
}

function date_DB_ToYMD(date) {
   

    return date.substring(4, 0) + "/" + date.substring(7, 5) + "/" + date.substring(10, 8);

}
function date_DB_ToYMD_HHmm(date) {


    return date.substring(4, 0) + "/" + date.substring(7, 5) + "/" + date.substring(10, 8) + " " + date.substring(13, 11) + ":" + date.substring(16, 14) + ":" + date.substring(19, 17);

}
function date_SYS_ToYMD(date) {
   
    return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + "";
 

}
function date_SYS_ToYMDHH(date) {

    return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":00";


}
function date_SYS_ToYMD_HHmm(date) {

    var mi = date.getMinutes() + "";
    var cmin;
    if (mi.length === 1) {
        cmin = "0" + mi;
    }
    else {
        cmin = "" + mi;
    }
    ho = date.getHours() + "";
    if (ho.length === 1) {
        ho = "0" + ho;
    }

    else {
        ho = "" + ho;
    }
  

    return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " " + ho + ":" + cmin + ":00";
//    var ddate = new Date()
//ddate.get
}

function date_getTime() {

    date = new Date();
    return date.getHours() + ":" + date.getMinutes();
}


function get_pin(element) {
    your_pin = element.getElementById('txt_password').value;
}



function show_menu(mshow) {
    if (mshow === 'menu1') {
        $('#menu2').css('display', 'none');
    }
    else {
        $('#menu1').css('display', 'none');
    }

  $('#' + mshow).toggle();
  
}

function show_site_menu(m_id) {
    $('#siteMenu' + m_id).toggle();
}

function show_ws_detail(m_id, obj) {

    $('#wsMenu' + m_id).toggle();

        $(obj).toggleClass('wslipsi-active');

   
}

function do_ws_confirm(id) {
    alert('confirm: ' + id);
}




function menu_nav(menu_page, menu_id) {
    //('sites.htm', 'ws_out')
    curr_command = menu_id;

    //if (menu_id === 'ws_out') {
    //    doCam = 'ws_out';
    //   do_menu_nav('camera.htm', 'camera');
    //}
    //else {
    //   do_menu_nav(menu_page, menu_id);
    //    //  hide('Menu');
    //}
    if (menu_id === 'TakePhoto') {
   //  site_list();
      //  do_sites();
    }


}



function show_cnt() {

  
   
}

function setSite(SiName) {
    _SName = SiName;
}

var doCam;
/*----------------------------------------------------------------- Navagation from Sites screen ------------------------------------------------- */
function do_site_nav(id, commDo) {
    _sID = id;
     
   // capturePhoto();
    
    //  alert(curr_command);
    if (commDo === 1) {

        if (curr_command === 'TakePhoto') {

            try {

                var scnt = localStorage.getItem('SitePhotos');
                if (scnt === null) {
                    set_count(0, null, id);
                    //  alert('store: ' + scnt);
                }

                else {
                    var pDATA = JSON.parse(scnt);
                    set_count(1, pDATA, id);
                    //  get_exist();
                }
            }

            catch (e) {
                alert('error-' + e.message);
            }
           
             set_cam_id(id);
            doCam = 'camera';
         do_menu_nav('camera.htm', 'camera');

            //   hide('TakePhoto');
        }
    }
  
    else if (commDo === 2) {
       do_menu_nav('new_order.htm', 'newOrder');
       
    }
    else if (commDo === 3) {
       
     //  do_menu_nav('camera.htm', 'camera');
       do_menu_nav('ws_out.htm', 'ws_con');

    }
 
  //  hide('Menu');
   // if (menu_id === 'TakePhoto') {
   //     site_list();
   // }


}

/*----------------------------------------------------------------- Messaging screen ------------------------------------------------- */
function mail_screen() {
    var mmail = localStorage.getItem('Messages');

    var sDATAm = JSON.parse(mmail);

    var arrm = [], lenm;

    for (key in sDATAm) {
        arrm.push(key);
    }
//    alert('do  : ' + JSON.stringify(sDATAm));
    lenm = arrm.length;
    lenm = lenm - 1;
    var msgSTR = "";
  //  alert('You have ' + lenm + ' messages');
   // for (m = 0; m <= lenm; m++) {
    for (m = lenm; m >= 0; m--) {
        var stl = sDATAm[m].bubPos;
        var bbStyle = stl;
      
      
      
         //   var datem = new Date(sDATAm[m].dateitem);
         //   datem = ;
        //  var dtMail = date_SYS_ToYMD_HHmm(datem);
          //  var dtMail = date_SYS_ToYMDHH(datem) + "";
            var dtMail = sDATAm[m].dateitem + "";
          //  dtMail = datem + "";
            msgSTR = "something";
            var innHtml = 'From: ' + sDATAm[m].fromu + '<br />Date: ' + dtMail + '<hr/>' + sDATAm[m].mText + '';
            if (stl === 'left') {
                //date_DB_ToYMD_HHmm
               // dtMail = date_DB_ToYMD_HHmm(datem);
                innHtml = 'To: ' + sDATAm[m].fromu + '<br />Date: ' + dtMail + '<hr/>' + sDATAm[m].mText + '';

            }

        var bubble = document.createElement('div');
        bubble.setAttribute('data-bb-type', 'bbm-bubble');
        bubble.setAttribute('data-bb-style', bbStyle);

        var item = document.createElement('div');
        item.setAttribute('data-bb-type', 'item');
     item.setAttribute('data-bb-img', 'images/mail_open.png');
       item.innerHTML = innHtml;
        bubble.appendChild(item);

        bubble = bb.bbmBubble.style(bubble);

        document.getElementById('bubbleContainer').appendChild(bubble);

    }
    if (msgSTR === "") {
        var itemss = document.createElement('div');
        itemss.setAttribute('data-bb-type', 'header');
        itemss.innerHTML = "no-Messages";
      //  msgSTR = '<div data-bb-type="header" >no-Messages</div>';
        document.getElementById('bubbleContainer').appendChild(itemss);
    }

    
}
/*----------------------------------------------------------------- Message + Push notifications ------------------------------------------------- */
var fMsg;
function mssg_add() {
    if (fMsg === null) {
        fMsg = 0;
    }
 //   var dateNow = new Date();
    var dSTR = new Date();

    var strNow = date_SYS_ToYMDHH(dSTR);

    var mmsg = {};
    
    mmsg.mText = "Tester no " + fMsg;
    mmsg.fromu = "Callcenter";
    mmsg.bubPos = "right";
    mmsg.dateitem = strNow + "";
   
   
    appendItem('Messages', mmsg);
    fMsg += 1;
    document.getElementById('bubbleContainer').innerHTML = "";
    mail_screen();
   
}

function newMessage() {
    
    var listD = document.getElementById('bubbleContainer');
    var newD = document.getElementById('messageNEW');
    var mFoot = document.getElementById('bot_butt_mm');
    $(mFoot).css('display', 'none');
    $(listD).css('display', 'none');
    $(newD).css('display', '');
    document.getElementById('mssg_txt').value = "";
    var msgSTR_toN = document.getElementById('msg_to');
    $(msgSTR_toN).val('-1');

}
function msgCancel() {
    var listD = document.getElementById('bubbleContainer');
    var newD = document.getElementById('messageNEW');
    var mFoot = document.getElementById('bot_butt_mm');
    
    $(mFoot).css('display', '');
    $(listD).css('display', '');
    $(newD).css('display', 'none');
   

}

function resetMessages() {
    localStorage.removeItem("Messages");
    alert('Message history reset');

}

function mssgSend() {
    //  alert('Message Sent');
    var dSTRs = new Date();

    var strNow = date_SYS_ToYMDHH(dSTRs);
  //  alert('formated: ' + strNow);
    var msgSTR_New = document.getElementById('mssg_txt').value;
    var msgSTR_to = document.getElementById('msg_to');
    var toSTR = $(msgSTR_to).find("option:selected").text();
    if (toSTR === 'New message to:') {
        alert('Please select to !');
        //  return true;
    }
    else {


        msgSTR_New = msgSTR_New.replace(/\r\n/g, '<br />').replace(/[\r\n]/g, '<br />');
        var mmsgs = {};

        mmsgs.mText = msgSTR_New;
        mmsgs.fromu = toSTR;
        mmsgs.bubPos = "left";
        mmsgs.dateitem = strNow + "";
       

        appendItem('Messages', mmsgs);
        ID_JOBS = localStorage.getItem('ID_JOB');
       // sIMEI = blackberry.identity.IMEI;

        sIMEI = '359410051630786';
        var cJOBm = localStorage.getItem('ID_STAFF');
      //  var DwsUserDB6 = localStorage.getItem('DWS_User');
        // upErr = 0;

        //  var uDATA = JSON.parse(DwsUserDB);
       // var uDATA6 = JSON.parse(DwsUserDB6);

        var nMessPar = {
            cmd: 'newMessage', IMEI: sIMEI, pin: ID_JOBS, mText: msgSTR_New, id_staff: cJOBm,
            msgTo: toSTR + ""
        };


        $.support.cors = true;
        jQuery.ajax({
            type: "GET",
            url: callPage,
            data: nMessPar,
            contentType: "application/json; charset=utf-8",
            dataType: 'jsonp',
            crossDomain: true,
            success: function (json) {
                var listD = document.getElementById('bubbleContainer');
                var newD = document.getElementById('messageNEW');
                var mFoot = document.getElementById('bot_butt_mm');
                $(mFoot).css('display', '');
                $(listD).css('display', '');
                $(newD).css('display', 'none');
                document.getElementById('bubbleContainer').innerHTML = "";
                alert('message sent');
                mail_screen();

                if (respn === 'success') {

                   

                }
                else if (respn === 'error') {
                    err = crecn[0].Value;
                    if (err === 'already used') {

                        alert('The WS has already been used \nPlease provide the next WS No: \nthen resubmit your order');
                    }
                    else {
                        alert('error-' + err);
                    }

                }




            },
            error: function (xhr, textStatus, errorThrown) {
                alert("error" + errorThrown);
            }
        });






      
    }

}



/* ---------------------- open help url ---------------------------------- */






/* ------------------------------------------------ open media folder to find videos --------------------------------------------*/

//invoke the filePicker Card
function showVideos() {
    webworks.ui.filePicker.open(doCallback);
}

function doCallback(file) {
    blackberry.app.requestForeground();
    newVid = file;
    
 do_menu_nav('video.htm', 'video');

//  alert('You selected file: ' + file);
}


/*----------------------------------------------------------------- PUSH - Logic ------------------------------------------------- */
/*
0 => Send Please call me
1 => New Message
2 => Sync All
3 => New collection order, syncs slips
4 => find the phone, gps geo
5 => Download training video
6 => Set GEO Time
8 => Push SMS Reg again
9 => Push Sync - sets sites and Staff

eg. 1FromName~Send value

*/

function proccess_push(pText, wasBack) {
    wasBackground = wasBack;
    var doCmd = pText.substring(0, 1);
    var userIn = pText.indexOf('~');
   
    var doTEXT = pText.substring(userIn + 1, pText.length);
  var frmUser = pText.substring(1, userIn);
  if (doCmd === "0") {
      try {
        //  var carrierNetwork = blackberry.network;
      //    var lNumber = blackberry.identity.phone.getLineNumber(0);
        //  alert('Carrier: ' + carrierNetwork);
          var args = new blackberry.invoke.PhoneArguments('*' + doTEXT + '*0716875929#', true);
          args.view = blackberry.invoke.PhoneArguments.VIEW_CALL;

          blackberry.invoke.invoke(blackberry.invoke.APP_PHONE, args);
       //   window.location = "tel:*121*0716875929#";
          //blackberry.invoke.invoke({
          //    uri: "tel:5555555555"
          //}, onInvokeSuccess, onInvokeError)

      }
      catch (e) {
          alert('error Request Call Me: ' + e.message);
      }
     

  }
    
 else if (doCmd === "1") {
     var dSTRm = new Date();

     var strNow = date_SYS_ToYMDHH(dSTRm);
        var mmsg = {};
       
        mmsg.mText = doTEXT;
        mmsg.fromu = frmUser;
        mmsg.bubPos = "right";
        mmsg.datetimem = strNow + "";
        appendItem('Messages', mmsg);
        standardDialog("New Message: " + doTEXT + ' \nFrom:' + frmUser, " Messaging", 0);
      //   alert('Message: ' + doTEXT + ' -From:' + frmUser);
    //    var app = {
      //      flashLED: function () {
                var pattern = '[{"hex-color": "0x00B22234","on-duration-in-milliseconds": "1000","transition-time-in-milliseconds": "500"},' +
                                '{"hex-color": "0x00000000","on-duration-in-milliseconds": "1000","transition-time-in-milliseconds": "500"},' +
                                '{"hex-color": "0x00FFFFFF","on-duration-in-milliseconds": "1000","transition-time-in-milliseconds": "500"},' +
                                '{"hex-color": "0x00000000","on-duration-in-milliseconds": "1000","transition-time-in-milliseconds": "500"},' +
                                '{ "hex-color": "0x00000FB3","on-duration-in-milliseconds": "1000","transition-time-in-milliseconds": "500"}]';
                webworks.bbalert.led.flashLED('start', pattern, 'true');
        //    },
        //    stopLED: function () {
        //        webworks.bbalert.led.flashLED('stop');
        //    }
        //}

    }
  else if (doCmd === "2") {
      sync_all();
      //  alert('do a server sync');
     // if (wasBack) {
    //      blackberry.app.requestBackground();
  //    }
    }
   else if (doCmd === "3") {
       get_WS_Outstanding();
        alert('New collection order recieved');
  }
  else if (doCmd === "4") {
      getPosition('');
      
      if (!cur_lat)
         // alert('cmd 4: Latt: ' + cur_lat + ' Long: ' + cur_long);
          do_locationPost();
      alert('Location Sent: Latt: ' + cur_lat + ' Long: ' + cur_long);
      //if (wasBack) {
      //    blackberry.app.requestBackground();
      //}
  }
  else if (doCmd === "5") {
     
      download_file(doTEXT);
  }
  else if (doCmd === "6") {
      var refrate = parseInt(doTEXT);
      localStorage.setItem('sendGEO', doTEXT);
      clearTimeout(GEOtimer);

    GEOtimer = setInterval(function () {
          // your code goes here...
          try {
              getPosition('');
              do_locationPost();
          }
          catch (e) {
              //  alert('Please activate your GPS \nunder your Camera settings');
          }
    }, refrate * 60 * 1000);
     // checkUpdate();
  }
  else if (doCmd === "7") {
      alert('Your access details have been reset!! \nPlease re-register this handset');
      reset_db();
      localStorage.removeItem('PIN');
      localStorage.removeItem('DWS_User');
      localStorage.setItem('Last_Login', null);

      
     //do_menu_nav('sms.htm', 'SMS');
  }
  else if (doCmd === "8") {
      localStorage.removeItem('pre_Auth');
      localStorage.removeItem('DWS_Spy');
      pre_auth();
  }
  else if (doCmd === "9") {
      try{
          localStorage.removeItem('DWS_User');
      }
      catch(e){}
      set_user();
      set_sites();
      //if (wasBack) {
      //    blackberry.app.requestBackground();
      //}
  }

}
var newVid;

function linkStaff_Sync() {
    try {
        localStorage.removeItem('DWS_User');
    }
    catch (e) { }
    set_user();
    set_sites();
}

function do_locationPost() {
   

   // sIMEI = blackberry.identity.IMEI;

    sIMEI = '359410051630786';
   // alert('First: Latt: ' + cur_lat + ' Long: ' + cur_long + 'imei: ' + sIMEI);
 //   alert('Second: Latt: ' + cLatc + ' Long: ' + cLongc + 'imei: ' + sIMEI);
    var pageParamsLoc = {
        cmd: "ReqLocation",
        IMEI: sIMEI,
        cLat: cur_lat,
        cLong: cur_long

    }

    $.support.cors = true;
    jQuery.ajax({
        type: "GET",
        url: callPage,
        data: pageParamsLoc,
        contentType: "application/json; charset=utf-8",
        dataType: 'jsonp',
        crossDomain: true,
        success: function (json) {
            var crecss9 = JSON.stringify(json);
            //   var items = [];
            var crec99 = jQuery.parseJSON(crecss9);

            var resp55 = crec99[0].Status;
        //    alert('st: ' + resp55);
            if (resp55 === 'success') {
              
          
            }
            else if (resp55 === 'error') {
             //   alert('error');
               // err = crec99[0].Value;
               // alert('GPS - error-' + err);
            }




        },
        error: function (xhr, textStatus, errorThrown) {
            alert("error" + errorThrown);
        }
    });

}



function download_file(filestr)
{
    
    fileDStr = vidServer + filestr;
    var options = {
        url: fileDStr,
        file: 'file:///store/home/user/videos/' + filestr,
        timeout: 60000, // in milliseconds default is 30000
        params: {
          //  custom1: 'test'
        },
        headers: {
          //  'Authorization', 'AUTH_HERE'
            },
        success: function (data) {
            blackberry.app.requestForeground();
            alert('Training video recieved \nPlease watch now');
            newVid = 'file:///store/home/user/videos/' + filestr;
           do_menu_nav('video.htm', 'video');
          //  blackberry.app.exit();
         //   alert('Success!');
        },
        error: function(e, code) {
            alert(e + " " + code);
        }
    };

    webworks.io.FileDownloader.download(options);
}

function doOnload() {
    try {
        var video = document.createElement('video');
        video.src = newVid;
        video.controls = "controls";
        video.id = "newVidM4V";

        video.addEventListener("playing", onPlaying, false);
        video.addEventListener("ended", onEnded, false);
        video.addEventListener("error", onError, false);
        video.addEventListener("waiting", onWaiting, false);
        video.addEventListener("stalled", onStalled, false);

        document.getElementById("newVid").appendChild(video);

        //need to set any brief delay in order for the proper video events to occur.
        //event shoud be: waiting --> playing --> ended
        setTimeout(playVideo, 10);
        //If you immediately call playVideo with no delay, 
        //the events are: waiting --> playing --> stalled
        //	playVideo();

        //I suspect the reason for this behavior is a timing issue.  The DOM has not fully loaded
        //	the video element.
    }
    catch (e) {
        debug.log("doOnload", e, debug.exception);
    }
}


function checkUpdate() {

    window.location = 'http://localbus.dontwaste.local/bb/apps/dwsapp.jad';

}


function settings_save() {
    localStorage.removeItem('DWS_Settings');
    var DSet = {};

    DSet.Primary = document.getElementById('txt_P_Server').value;
    DSet.Secondary = document.getElementById('txt_S_Server').value;
    DSet.SMSset = document.getElementById('txt_SMS_Server').value;
    var dw_ss = [];
    dw_ss.push(DSet);

    localStorage.setItem('DWS_Settings', JSON.stringify(dw_ss));
    alert('Settings Saved!');
    goHome();


}

function settings_default() {
    
    show_Dialog('configuring..', 'options.htm', 'options', true);
    get_Default_settings();


    //  window.setTimeout(setting_screen,1500);

}


/* ------------------------------------------------------- new orders section ----------------------------------------------------------- */
var actButt;
var wastRecl;

function set_div(div_id, obj) {
  
    if (actButt !== null) {
      //  alert(actButt);
        $(actButt).css('background', '');
        $(actButt).css('color', '');
    }
    
    $(obj).css('background', 'none');
    $(obj).css('background-clip', 'padding-box');
    $(obj).css('background-image', '-webkit-gradient(linear, center top, center bottom, from(#098CEE), to(#1766DB))');
    $(obj).css('color', 'white');
    actButt = obj;
   // no_div = document.getElementById('div_NO_new');
    no_div = $('#div_NO_new');
    $(no_div).css('display', '');
   
    if (div_id === 'div_waste') {
        wastRecl = 'False';
      
    }
    else{
        wastRecl = 'True';
    }
    set_waste();
}

var wasteDrop = [];
var _sWaste = [];
var _sWasteDesc = [];
var wArr = [];
var wArr_min = [];
var wCnt;
var spID;

function set_waste() {
   // var sWaste = localStorage.getItem('SiteWaste');
    var sWaste =$('#SiteWaste');

    var swDATA = JSON.parse(sWaste);
   

    swDATA = swDATA.filter(function (obj) {
        return (obj.ID_Department === _sID) && (obj.boolIsRecycleable === wastRecl);
    });

    _sWaste = swDATA;
    var lensw;
    wasteDrop = new Array;
    for (key in swDATA) {
        wasteDrop.push(key);
      //  if (key === Waste_Description) { }
    }

    Witems = new Array();
    WitemsID = new Array();
    lensw = wasteDrop.length;
  //  var selWaste = document.getElementById("select_no_waste");
  //  $(selWaste).empty();
    //var oplistSel = $("<option/>", {
    //    'value': '-1',
    //    'selected': 'true',
    //    text: '** please Select **'

    //});
  //  $(selWaste).append(oplistSel);
   // alert('items: ' + lensw);
    for (i = 0; i < lensw; i++) {
     //   alert('is: ' + swDATA[i].boolIsRecycleable);
      //  if (swDATA[i].ID_Department === _sID && swDATA[i].boolIsRecycleable === wastRecl) {
            slCnt += 1;
            //var oplist = $("<option/>", {
            //    'value': swDATA[i].ID_WASTETYPEITEM,
            //    text: swDATA[i].Waste_Description + '&crlf;' + swDATA[i].CONTAINER_DESC,
            //    'border-bottom':'1px solid #333'
               
            //});

            wstrl = swDATA[i].Waste_Description + ' \n ' + swDATA[i].CONTAINER_DESC;
   //  $(selWaste).append(oplist);
     Witems.push(wstrl);
     WitemsID.push(swDATA[i].ID_WASTETYPEITEM);
       // }
    }
    var myDate = new Date();
    myDate.setDate(myDate.getDate() + 1);
    
    var dtSTR = date_SYS_ToYMD(myDate);

  //  var dt = document.getElementById('txt_col_date');
    var dt = $('#txt_col_date');
// $(dt).datepicker();
    dt.setAttribute('value', '' + dtSTR);
    wCnt = 0;
    wArr = new Array;
    wArr_min = new Array;
}


function cancel_waste_add() {

    //document.getElementById('add_waste_desc').innerHTML = "";
    //document.getElementById('but_choose_waste').style.display = '';
    //document.getElementById('add_now_waste_command').style.display = 'none';
   $('#add_waste_desc').html('');
    $('#but_choose_waste').css('display','none');
    $('#add_now_waste_command').css('display', 'none');
}


var Witems = {};
var WitemsID = {};

function show_waste_types() {
    var rowHeight;
    var visibleRows;

    // Populate our items
   

    // Figure out our height and rows based on screen size
    if (screen.height < 480) {
        rowHeight = 80;  //60
        visibleRows = 3;
    }
    else {
        rowHeight = 75;
        visibleRows = 4;
    }

    // Configure the options 
    var options = {
        'title': 'Choose waste for collection:',
        'rowHeight': rowHeight,
        'visibleRows': visibleRows,
        'selectedIndex': 2,
        'items': Witems
    };

    // Open the spin dialog
    Spinner.open(options, function (selectedIndex) {
        wasteSTR = Witems[selectedIndex];
        wasteSTR = wasteSTR.replace('\n', '<br />');

        $('#add_waste_desc').html(Witems[selectedIndex]);
        $('#but_choose_waste').css('display', 'none');
        $('#add_now_waste_command').css('display', '');
       wID = WitemsID[selectedIndex];
       wSTR = Witems[selectedIndex];

      // var wIDt = $(obj).find("option:selected").val();
       var selWt = [];
       selWt = _sWaste.filter(function (obj) {
           return (obj.ID_WASTETYPEITEM === wID);
       });
        //  alert('dQty: ' + selWt[0].Qty_Default);
   $('#txt_col_item_Qty').val(selWt[0].Qty_Default);
       $('#but_add_waste').focus();
       // alert(WitemsID[selectedIndex]);
    }
);
}




var lSelW;
var spID;
var wID;
var wSTR;
function add_waste_order() {
  //  alert('add');

    var wQty = $('#txt_col_item_Qty').val();



    var nWstItem = {};
    nWstItem.qty = wQty;
    nWstItem.Desc = wSTR;
    nWstItem.wasteid = wID;

    wArr.push(nWstItem);

    //var wstMin = {};
    //wstMin.wasteid = wID;
    //wstMin.qty = wQty;

    //wArr_min.push(wstMin);

    lSelW = wID;
    var selW = [];
    selW = _sWaste.filter(function (obj) {
        return (obj.ID_WASTETYPEITEM === wID);
    });

    spID = selW[0].ID_COLLECTINGPARTY;
    $('#div_sp_name').html("for Collection by: " + selW[0].COLLECTINGPARTY);
    
    update_waste_dropdown(spID);
    set_waste_display();
    $('#order_buttons').css('display','');
    $('#txt_col_item_Qty').val("1");
  //  $(wIDstr).val(-1);


    $('#add_waste_desc').html();
  //  $('add_waste_desc').style.borderTop = '';
    $('#but_choose_waste').css('display', '');
    $('#add_now_waste_command').css('display', 'none');

}

function update_waste_dropdown(id) {
    var uLen;
    var tmpW = [];

    if (lSelW === null) {
        lSelW = -1;
    }


    if (id !== -1) {

        _sWaste = _sWaste.filter(function (obj) {
            return (obj.ID_COLLECTINGPARTY === id && obj.ID_WASTETYPEITEM !== lSelW);
        });
    }
    for (key in _sWaste) {
        tmpW.push(key);
    }
    uLen = tmpW.length;
    
    
   /* WASTE SPINNER CONTROL*/
/*
if (uLen === 0) {
        $('#add_waste_control').css('display', 'none');
    }
    else {
        $('#add_waste_control').css('display', 'none');
    }
*/


    Witems = new Array();
    WitemsID = new Array();
    for (i = 0; i < uLen; i++) {
     
        slCnt += 1;
     
        wstrl = _sWaste[i].Waste_Description + ' \n '  + _sWaste[i].CONTAINER_DESC;
        //  $(selWaste).append(oplist);
      
        Witems.push(wstrl);
        WitemsID.push(_sWaste[i].ID_WASTETYPEITEM);

     //   $(selWaste).append(oplist);
    }
  wasteDrop = tmpW;
}

function del_waste_item(idw) {
    // alert('remove row ' + idw);
    
    wArr.splice(idw, 1);
   // lSelW = -1;
   update_waste_dropdown(-1);
   $('#add_waste_control').css('dispLay', '');
   $('#add_waste_desc').css('border-top','none');
 //   set_waste();
    set_waste_display();
   
}

function set_waste_display() {

    var wItemsR = $('#waste_items');
    wItemsR.html();
    var HeadTab = document.createElement('table');
    HeadTab.setAttribute('style', 'width:100%');
   
    var HeadR = document.createElement('tr');
    HeadR.innerHTML = ' <tr ><td style="font-weight:700;">&nbsp;Qty&nbsp;</td><td style="font-weight:700;">&nbsp;Waste Grade</td><td ></td></tr>';
 //   var clnSTR = "";
    $(HeadR).appendTo(HeadTab);
  
    var wLen = wArr.length;

    for (var w = 0; w < wLen; w++){
        var newRow = document.createElement('tr');
        newRow.innerHTML = "<td style='text-align:center;'>" + wArr[w].qty + "</td><td>" + wArr[w].Desc + "</td><td style='text-align:right;'><div onclick='del_waste_item(" + w + ")' style='cursor:pointer;'><span class='butt icon-delete'></span>&nbsp;</div></td>"

        $(newRow).appendTo(HeadTab);

    }

    $(HeadTab).appendTo(wItemsR);
  

}
 
function waste_place_order() {
   // sIMEI = blackberry.identity.IMEI;
    sIMEI = '359410051630786';

    var uJI = localStorage.getItem('ID_JOB');
    var nWSno = $('#txt_no_wsno').val();
    if (nWSno === "") {
        alert('Please provide Whiteslip No!');
    }
    else {
         NwQty = $('#txt_col_item_Qty').val();
      //  var NwIDstr = document.getElementById('select_no_waste');
     //   var NwID = $(NwIDstr).find("option:selected").val();
        var NwLType = document.getElementById('no_load_type');
        var NwLTypeID = $(NwLType).find("option:selected").val();
      //  var dtCol = document.getElementById('txt_col_date').value;
        var dtCol = date_SYS_ToYMD(todayDt);
        //var obj = document.getElementById('txt_confirm_dt');
        //var nDt = date_SYS_ToYMD_HHmm($(obj).val());
        //$(obj).val(nDt);
      var  NdtCol = dtCol.replace(/-/g, '/');


     

        var DwsUserDB = localStorage.getItem('DWS_User');
        // upErr = 0;

        //  var uDATA = JSON.parse(DwsUserDB);
        uDATA = JSON.parse(DwsUserDB);
        var detSTRwaste = JSON.stringify(wArr);
        var nOrderPar = {
            cmd: 'PlaceOrder', IMEI: sIMEI, id_job: uJI, depid: _sID,
            ws_no: nWSno, type_load: NwLTypeID, sp_id: spID, dtCollect: NdtCol, details: detSTRwaste
        };
   

        $.support.cors = true;
        jQuery.ajax({
            type: "GET",
            url: callPage,
            data: nOrderPar,
            contentType: "application/json; charset=utf-8",
            dataType: 'jsonp',
            crossDomain: true,
            success: function (json) {
                var crecss8 = JSON.stringify(json);
                //   var items = [];
                var crecn = jQuery.parseJSON(crecss8);

                var respn = crecn[0].Status;

                if (respn === 'success') {
                  
                    var sdb = crecn[0].Value;
                    
                    //    show_Dialog('Your reference No: \n' + sdb, 'menu.htm', 'Menu');
                    alert('Order successfully placed \nYour Reference no: \n' + sdb + ' ');
                  //  your_pin = uDATA[0].BBPin;
                  //  sIMEI = uDATA[0].IMEI;
                    get_WS_Outstanding();
                    window.setTimeout(goHome,1000);
                 
                }
                else if (respn === 'error') {
                    err = crecn[0].Value;
                    if (err === 'already used') {

                        alert('The WS has already been used \nPlease provide the next WS No: \nthen resubmit your order');
                    }
                    else {
                        alert('error-' + err);
                    }
                   
                }




            },
            error: function (xhr, textStatus, errorThrown) {
                alert("error" + errorThrown);
            }
        });


    }

}
/*-----------------------------------                  ------------------------------ Sync all Data ------------------------                         ------------------------- */
function sync_all() {
    
    try {
       
        
        var _userS = localStorage.getItem('DWS_User');
        var _uSett = JSON.parse(_userS);
        your_pin = localStorage.getItem('PIN');
        sIMEI = _uSett[0].IMEI;
        ID_JOBS = _uSett[0].ID_JOB;

     //   your_pin = document.getElementById('txt_password').value;
        //  set_user();
       // show_Dialog('synchronising..', 'menu.htm', 'Menu', false);
         show_Dialog('synchronising..', 'new_order.htm', 'newOrder', false);
        
        set_sites();
      //  get_SiteWaste();
    ///    get_WS_Outstanding(false);
      //  confirmSLIP();
     //   upload_Photos();
    }
    catch (e) {
        close_Dialog();
        alert('error - sync - ' + e.message);
    }


}

/*----------------------------------------------------------------- Confirm White Slips ------------------------------------------------- */

function click_confirm_ws(id) {
    id_msg = id;
   do_menu_nav("confirm_ws.htm", "confirm_ws_screen");
}


var _cWSno;
var itemsc;
var itemsCnt;
var wsPhotos = [];
var scanWS;
var scanSP;


function confirm_ws() {
    var load_type2 = ["Initial Delivery", "Lift and Empty", "Lift and Remove (Full)", "Lift and Remove (Empty)"];
    var _wDATAc = [];
    //  alert('id: ' + id_msg);
    _wDATAc = selWasteDB.filter(function (obj) {
        return (obj.ID_MSG_SLIP === id_msg);
    });
    wsMenu = document.querySelector('[data-bb-type=header]');
    wsMenu.innerHTML = "<p><span class='butt icon-home'></span>" + _SName + " WS: " + _wDATAc[0].ClientOrderNo + "</p>";
    _cWSno = _wDATAc[0].ClientOrderNo;
    var dateout = _wDATAc[0].dtWhenToCollect;
    var cTime = date_getTime();
    var strNow = dateout.substring(4, 0) + "/" + dateout.substring(7, 5) + "/" + dateout.substring(10, 8) + " "  + cTime;
    dtExpect = strNow;

    var detHeadStr = "O/N: " + _wDATAc[0].DWS_ORDER_NUMBER + "<br />"
    detHeadStr += "Service: " + load_type2[_wDATAc[0].load_type] + "<br />Service Provider: " + _wDATAc[0].CollectingParty + "<br />";
    detHeadStr += 'Collection Date: <input id="txt_confirm_dt" type="datetime"  onblur="format_dt()" />'
    //Date: " + dtExpect + "


    document.getElementById('div_confirm_master_detail').innerHTML = detHeadStr;
    document.getElementById('txt_confirm_dt').value = dtExpect;

    itemsc = _wDATAc[0].WS_Items;
    var collic = [];
    for (key in itemsc) {
        collic.push(key);
    }
    var list_itemscs = '';
    itemsCnt = collic.length;
    for (j = 0; j < collic.length; j++) {
        list_itemscs += '<tr><td> <input id="txt_qty_' + j + '" type="number" style="width:50px; text-align:center;" value="' + itemsc[j].Quantity + '"  /></td><td>' + itemsc[j].Waste_Description + " - " + itemsc[j].CONTAINER_DESC + '</td></tr>';
    }
   
    var mTab = document.createElement('table');
    mTab.setAttribute('style', 'width:100%;');
    $(mTab).append(list_itemscs);
    var m_div = document.getElementById('div_confirm_items');
    $(mTab).appendTo(m_div);
    


    wsPhotos = new Array;
    scanSP = false;
    scanWS = false;


}


function format_dt() {
   // alert('dtchang');
    var obj = document.getElementById('txt_confirm_dt');
 var nDt = date_SYS_ToYMD_HHmm($(obj).val());
 $(obj).val(nDt);

}

var _tpePic;
var spDocNo;
function confirm_ws_photo(tpe) {
  // do_menu_nav('camera.htm', 'camera');
   //do_menu_nav("confirm_ws.htm", "confirm_ws_screen");
   // 
    _tpePic = tpe;
   

    try {
        debug.log("take_ws_Picture", "Start", debug.info);

        if ((window.blackberry === undefined) || (blackberry.media === undefined)) {
            debug.log("takePicture", "blackberry.media.camera object is undefined.", debug.error);
            //return false;
        }
        spDocNo = "";
        if (tpe === 'sp') {
            spDocNo = prompt("Please provide SP Document no:", "");
            if (spDocNo) {
                //  alert('sp: ' + spDocNo);
                scanSP = true;
                 resultsSP = blackberry.media.camera.takePictureMax(on_ws_Captured, onCameraClosedca, onErrorSS);

            }
            else {
                alert('Please supply Service Provider \nDocument number!!');
            }


        }
        else {
            scanWS = true;
            resultsWP = blackberry.media.camera.takePictureMax(on_ws_Captured, onCameraClosedca, onErrorSS);

        }
    }
    catch (e) {
       alert("take_ws_Picture - err: " + e.message);
    }

}


function onCameraClosedca(closedEvent) {
  //  alert("onCameraClosed" + closedEvent.message);
}

function onErrorSS(errorEvent) {
    debug.log("onError", "onError: " + errorEvent, debug.info);
}

function on_ws_Captured(filePath) {
    tpe = _tpePic;
    newFile;
 
            filePath = "file://" + filePath;
  




     arrpS = [], lenS, imgp, divS, tmDocNo, isSPdoc;

    try{
 


   

        imgp = new Image();
        imgp.src =  filePath;
        //   imgp.setAttribute('style', 'width:120px;height:120px;');
        imgp.width = 120;
        imgp.height = 90;

        //  imgp.width = Math.round(screen.width * 0.4);

        actLen += 1;
        imgp.className = "img_galery";
     //   imgp.setAttribute('onclick', 'do_img_click(\"' + filePath + '\")');

        divS = document.createElement("div");
        divS.className = "photo_img_ws";
        if (tpe === 'sp') {
            divS.innerHTML = spDocNo + "";
            tmDocNo = spDocNo;
            isSPdoc = 'yes'
        }
        else {
            divS.innerHTML = _cWSno + "";
            tmDocNo = _cWSno;
            isSPdoc = 'no'
        }

            

        $(imgp).prependTo(divS);
        document.getElementById("slip_container").appendChild(divS);
        
        //   }
    }
          catch (e) {
                alert("comfirm photo " + e.message);
            }

   // }
    pCnt = actLen;

        try {
            //For Smartphone, add "file://" prefix before path
        
        //    alert('items: ' + "id_msg_slip" + "" + id_msg + "tpePic" + tpe + "docNumber" + tmDocNo);
           var dtCol1 = document.getElementById("txt_confirm_dt").value;
            var NdtCol1 = dtCol1.replace(/-/g, '/');
            var wPh = {};
            wPh.id_msg_slip = "" + id_msg;
            wPh.fpath = filePath + '';

           // if (tpe === '') 
            wPh.isSP = isSPdoc;
            wPh.tpePic = tpe;
            wPh.dtCollected = NdtCol1;
      
            wPh.items = itemsc;
            wPh.docNumber = tmDocNo;
            wsPhotos.push(wPh);
     //     appendItem('CollOrders',JSON.stringify(wsPhotos));
      
            pCnt += 1;
            //   _sID = _sID;

        }
        catch (e) {
            alert('add ph: ' + e.message);
        }

 

}


var upCheckCnt;
function confirmCollOrder() {

    if (scanSP === true && scanWS === true) {

        for (var it = 0; it < itemsCnt; it++) {

            nqty = document.getElementById('txt_qty_' + it).value;
            itemsc[it].Quantity = nqty;
         //   alert('nqty: ' + itemsc[it].Quantity);

        }


    
      var stFitems = JSON.stringify(itemsc);
      upCheckCnt = 0;
     show_Dialog('confirming..', 'confirm_ws.htm', 'confirm_ws_screen_fin', true);
      confirmSLIP(wsPhotos[0].fpath, 'no', wsPhotos[0].id_msg_slip, wsPhotos[0].docNumber, stFitems, wsPhotos[0].tpePic);
      confirmSLIP(wsPhotos[1].fpath, 'yes', wsPhotos[1].id_msg_slip, wsPhotos[1].docNumber, stFitems, wsPhotos[1].tpePic);


     


    }
    else {
        alert('Please scan both slips before confirming!!');

    }

   

}


function del_Order_Confirm(id) {
    var arrd = [];
    var cStord1 = localStorage.getItem('CollOrders');
    var pjsond1 = JSON.parse(cStord1);
    for (key in pjsond1) {

        arrd.push(key);
    }
    //  _pDB = pjsond;
    filePaths = pjsond1[id].fpath;
    if (blackberry.io.file.exists(filePaths)) {
        blackberry.io.file.deleteFile(filePaths);
    }
    pjsond1.splice(id, 1);
   // itemsc.splice(id, 1);
    wsPhotos = pjsond1;
    //  delete _pDB[id];
    localStorage.setItem('CollOrders', JSON.stringify(pjsond1));

}


function confirmSLIP(pFile, isLast, id_msg, doc_no, itmSS, ftpe) {

    var DwsUserDB1 = localStorage.getItem('DWS_User');
    // upErr = 0;

     uDATA1 = JSON.parse(DwsUserDB1);
    var itmDD = JSON.parse(itmSS);
 //   sIMEI = blackberry.identity.IMEI;
    sIMEI = '359410051630786';

    var uJIc = localStorage.getItem('ID_JOB');

    Lind = pFile.lastIndexOf('/');
    var fName = pFile.substring(Lind + 1, pFile.length);
  

    var options = {
        // url: callPage + '?cmd=Colldocs&id_msg=' + id_msg + '&u_pin=' + uDATA1[0].BBPin + '&imei=' + uDATA1[0].IMEI + '&file_name=' + fName + '&final=' + isLast + '&doc_no=' + doc_no + '&imgData=' + itmSS,
        url: callPage + '?cmd=Colldocs&id_msg=' + id_msg + '&id_job=' + uJIc + '&imei=' + sIMEI + '&file_name=' + fName + '&final=' + isLast + '&doc_no=' + doc_no + '&ftpe=' + doc_no,
        file: pFile,
        fileKey: 'myFile',
        mimeType: 'image/jpg',
        timeout: 30000, // in milliseconds default is 30000
        params: {
            cmd: 'Colldocs',
            items: JSON.stringify(itmDD)
        },
        headers: {
            //    'Authorization': 'AUTH_HERE'
        },
        success: function (data) {

            blackberry.io.file.deleteFile(pFile);
            upCheckCnt += 1;

            if (upCheckCnt === 2) {
                close_Dialog();
                upCheckCnt = 0;
                alert('order proccessed');
                wsPhotos = [];
              //  your_pin = uDATA1[0].BBPin;
             //   sIMEI = uDATA1[0].IMEI;
                get_WS_Outstanding(false);
                 window.setTimeout("window.location = 'index.htm';", 1000);
              //  window.location = 'index.htm';
                // localStorage.setItem('SitePhotos', null);
                //  document.getElementById("photoDetails").innerHTML = "";

                //   close_Dialog();
            }
            //   upSucc = upSucc + 1;

        },
        error: function (e, code) {
            close_Dialog();

              var CollDocsAr = {};

              CollDocsAr.fpath = pFile;
            //    if (i === 0) {
              CollDocsAr.isSP = isLast;
            //    }
            //    else {
            //        CollDocsAr.isSP = 'yes';
            //    }
              CollDocsAr.msg_slip = id_msg;
              CollDocsAr.docNumber = doc_no;
              CollDocsAr.stFitems = itmSS;
            //    CollDocsAr.tpePic = wsPhotos[i].tpePic;

            //    CollDocs_ARR.push(CollDocsAr);
              appendItem('CollDocs', JSON.stringify(CollDocsAr));
            //  upErr += 1;
              alert("upload failed \nScheduled upload active");
              window.setTimeout("window.location = 'index.htm';", 1000);
          //  alert("uploader err - " + e + " " + code);
        }
    };

    webworks.io.FileUploader.upload(options);
}





  
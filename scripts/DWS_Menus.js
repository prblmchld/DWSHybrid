/**
* Create callback methods that are invoked when a 
*	user selects their corresponding menu item
* @return
*/

function onInvokeSuccessH() {
    alert("Invocation successful!");
}

function onInvokeErrorH(error) {
    alert("Invocation failed, error: " + error);
}
//function goHome() {
//    // bb.refresh();
//   do_menu_nav('menu.htm', 'Menu');
//}
function moreInfo() {
    //  do_img_click("tester.jpg");
   do_menu_nav('more.htm', 'more');

    // old working config
    //var res  = localStorage.getItem('ID_JOB');
    //var args = new blackberry.invoke.BrowserArguments('http://mbus.dontwaste.co.za/moreInfo.aspx?ID_JOB=' + res);
    //blackberry.invoke.invoke(blackberry.invoke.APP_BROWSER, args);

    //  end******
}
function milkruns() {
    //  do_img_click("tester.jpg");
    var mrOpen = window.open('http://mbus.dontwaste.co.za/milk.aspx');


    //  standardDialog("User Manual Pressed", "DWS - Messaging", 0);
    //   alert("manual");
}

function userManual() {
    //  do_img_click("tester.jpg");
    var umOpen = window.open('http://mbus.dontwaste.co.za/PhotoApp_help.html');
 
   
   standardDialog("User Manual Pressed", "DWS - Messaging", 0);
 //   alert("manual");
}
function Options() {
    //   alert("options");
    // bb.refresh();
   do_menu_nav('options.htm', 'options');
  //  download_file('308.mp4');
}
function showAbout() {
    // bb.refresh();
   do_menu_nav('about.htm', 'about');
  //  phoneDiscription = blackberry.identity.PIN;

  //  standardDialog("Your PIN: " + phoneDiscription, "DWS", 0);
}
function resetDB() {
    get_Default_settings();
  //  alert("reset db");
}

function set_newUser() {
   do_menu_nav('linkStaff.htm', 'link');
}

function do_pre_Auth() {
    try {
      //  blackberry.message.sms.isListeningForMessage = false;
    //    blackberry.message.sms.removeReceiveListener();
    }
    catch (e) { }
    // bb.refresh();
   do_menu_nav('smsPre.htm', 'smspre');
}

function masterReset() {

    var mrest = prompt("Please supply admin PIN", "");
    if (mrest) {
        var curD = new Date();
        var phour = curD.getHours();
        var pYear = curD.getFullYear();
        var fReset = phour + pYear;
        if (mrest === '9949') {
          
         //   reset_db();
            localStorage.setItem('Last_Login', '0');
            localStorage.removeItem('PIN');
            localStorage.removeItem('ID_JOB');
            localStorage.removeItem('_vers');
         //   localStorage.removeItem('PIN');
            //  bb.popScreen();
          //  sync_all();
            // bb.refresh();
           do_menu_nav('login.htm', 'Login');
        }
        else if (mrest === fReset) {
           
            reset_db();
         //   localStorage.removeItem('_vers');
         //   localStorage.removeItem('PIN');
         //   localStorage.removeItem('DWS_Spy');
         //   localStorage.removeItem('pre_Auth');
         //localStorage.removeItem('DWS_User');
         //   localStorage.setItem('Last_Login', '0');
         //   blackberry.app.exit();
          //  // bb.refresh();
           // sync_all();
         //  do_menu_nav('login.htm', 'SMS');
        }
        else {
            alert('Incorect PIN');
        }
    }


   // var lastLogin = localStorage.getItem('Last_Login');
  //  alert("Last Login: " + lastLogin);
}
function switchApplication() {
  //  reset_db();
  //  localStorage.setItem('Last_Login', null);
  //  bb.popScreen();
}
function mcloseApp() {
 
   localStorage.setItem('Last_Login', '0');
    //  bb.popScreen();
 //  blackberry.app.exit();
  do_menu_nav('login.htm', 'Login');
// window.location = 'index.htm';
}
function goSMS() {
   do_menu_nav('sms.htm', 'SMS');
    //localStorage.setItem('Last_Login', null);
    //bb.popScreen();
    //window.location = 'index.htm';
}
function ScanNow() {
   do_menu_nav('scancodeCam.htm', 'scan');
    //localStorage.setItem('Last_Login', null);
    //bb.popScreen();
    //window.location = 'index.htm';
}
function settings() {
   do_menu_nav('sms.htm', 'SMS');
    //localStorage.setItem('Last_Login', null);
    //bb.popScreen();
    //window.location = 'index.htm';
}
function mDebug() {
  
    var lastLogin2 = localStorage.getItem('Last_Login');
    var cDt = new Date();
    var curDt = date_SYS_ToYMD_HHmm(cDt);
     var lDton = JSON.parse(lastLogin2);

   
     lDton = date_DB_ToYMD_HHmm(lDton);
     var lastDTime = new Date(lDton);
     var crDTime = new Date(curDt);

     d_diff = crDTime.getDate() - lastDTime.getDate();

   //  d_diff = (d_diff / 1000); //sec
     m_diff = (crDTime - lastDTime) / 1000; //min

   





     alert('sDT: ' + lDton + '\nCurDT: ' + curDt + '\ndiff: ' + d_diff + ' mDiff: ' + m_diff);

}




function initMenus() {
   try {
  

  }
  catch (e) {
      alert('exception (addMenus): ' + e.name + '; ' + e.message);
   }
}


function contextualMenuItem() {
    alert("Contextual menu item selected");
}

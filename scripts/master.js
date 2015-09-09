var port = 100;
var serverUrl = "http://bbserver2.dontwaste.local";
var appId = "DWS_Photo";
var max = 100;
var wakeUpPage = "index.htm";
function openBISPushListener() {
    try {
        var ops = { port: port, appId: appId, serverUrl: serverUrl, wakeUpPage: wakeUpPage, maxQueueCap: max };
        blackberry.push.openBISPushListener(ops, onData, onRegister, onSimChange);
    }
    catch (err) {
        alert(err);
    }
}

function openBESPushListener() {
    try {
        var ops = { port: port,  wakeUpPage: wakeUpPage, maxQueueCap: max };
        blackberry.push.openBESPushListener(ops, onData, onSimChange);
    }
    catch (err) {
        alert(err);
    }
}

function onRegister(status) {
    if (status == 0) {
        PushWoosh.register(function (data) {
            alert("PushWoosh register success: " + JSON.stringify(data));
        }, function (errorregistration) {
            alert("Couldn't register with PushWoosh" + errorregistration);
        });
    }
    else if (status == 1) {
        alert("push register status network error");
    }
    else if (status == 2) {
        alert("push register status rejected by server");
    }
    else if (status == 3) {
        alert("push register status invalid parameters");
    }
    else if (status == -1) {
        alert("push register status general error");
    }
    else {
        alert("push register status unknown");
    }
}
var wasBackground;
function onData(data) {
   wasBackground = false;
    if (!blackberry.app.isForeground) {
        wasBackground=true;
        blackberry.app.requestForeground();
    }
    if (data!==null) {
        var text = blackberry.utils.blobToString(data.payload);
        // var frm = blackberry.utils.blobToString(data.f);
   
        proccess_push(text, wasBackground);
       // alert("Push notifications received. Data is " + text);
    }

    //if (wasBackground) 
    //    blackberry.app.requestBackground();

 
    try {
        return 0; //indicate acceptance of payload for reliable push
    }
    catch (err) {
        alert(err);
    }
}

function onSimChange() {
    sim_change();
    alert('SIM changed!!');
    //handle Sim Card change
}
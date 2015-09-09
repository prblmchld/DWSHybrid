
/* Processing images for White slips */

//function onCapturePhotoSuccess(imageData) {
//    if (imageData != null) {
//        var smallImage = document.getElementById('cameraImage');

//        // hide upload button
//        var uploadButton = document.getElementById('uploadButton');
//        uploadButton.style.display = 'none';

//        // Unhide image element
//        smallImage.style.display = 'block';

//        // Show the captured photo
//        // The inline CSS rules are used to resize the image
//        smallImage.src="data:image/jpeg;base64," + imageData;
//    }
//}

//function onCapturePhotoURISuccess(imageURI) {
//    if (imageURI != null) {
//        var smallImage = document.getElementById('cameraImage');
//        var uploadButton = document.getElementById('uploadButton');

//        // Unhide image elements
//        smallImage.style.display = 'block';
//        uploadButton.style.display = 'block';
          
//        // Show the captured photo
//        // The inline CSS rules are used to resize the image
//        smallImage.src=imageURI;
//    }
//}

////<img style="display:none;width:120px;height:120px;" id="cameraImage" src="" />

//public static void closeCamera()
//{
//    // simulate two escape characters to exit native camera application
//    // no, there is no other way to do this
//    UiApplication.getUiApplication().invokeLater(new Runnable() {
//        public void run() {
//            try
//{
//                EventInjector.KeyEvent inject = new EventInjector.KeyEvent(
//                        EventInjector.KeyEvent.KEY_DOWN, Characters.ESCAPE, 0);
//    inject.post();
//    inject.post();
//}
//                catch (ControlledAccessException e)
//{
//                    // the application doesn't have key injection permissions
//                    Logger.log(Camera.class.getName() + ": Unable to close camera. " +
//                         ApplicationDescriptor.currentApplicationDescriptor().getName() +
//                            " does not have key injection permissions.");
//}
//}
//});
//}


//http://supportforums.blackberry.com/t5/Java-Development/WebWorks-app-crashing-event-queue-too-large/td-p/733525

// <feature id="blackberry.ui.Spinner" />
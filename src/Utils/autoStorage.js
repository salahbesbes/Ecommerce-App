import { storageApp } from "../firebase/config";
import { useState, useEffect } from "react";

const SaveToStorage = (file, formData) => {
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState(null);

  useEffect(
    () => {
      if (file.name) {
        // this create a folder named prodImages which inside we put all our upload
        const storageRef = storageApp
          .ref()
          .child("prodImages")
          .child(file.name);

        // callback while loading
        const next = function (snapshot) {
          let percentage = Math.floor(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(percentage);
          // to pause or resume upload
          /*
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          */
        };

        // callback when error occure
        const error = function (error) {
          // handle Error
          /*
           switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;

            case 'storage/canceled':
              // User canceled the upload
              break;


            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
           */
          console.log("error", error);
        };

        // callback when loading is complete
        const complete = async function () {
          let StorageUrl = await storageRef.getDownloadURL();

          setUrl(StorageUrl);
        };

        // we can specify a new metadata that will replace the existing one
        // and pass it with file argument  (second argument for the put() function)
        // var metadata = {
        //   contentType: 'image/jpeg',
        // };
        storageRef.put(file).on("state_changed", next, error, complete);
      }
    },
    [file] // fire every time a new file is loaded
  );

  return { progress, url };
};

export default SaveToStorage;

import React, { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

const MyDropzone = ({updateErrorMsg, updateNewRecipe}) => {
    
  // Action(s) taken by the Dropzone box when there is a file upload attempt
  const onDrop = useCallback(async (acceptedFiles, fileRejections) => {
    const acceptedFile = acceptedFiles;
    const fileRejected = fileRejections[0];

    if (acceptedFile) {
      console.log("ACCEPTED:", acceptedFile);
      const formData = new FormData();

      const appendPromise = new Promise((resolve, reject) => {
        formData.append('image', acceptedFile);
        resolve(formData);
      });

      // Chain the updateNewRecipe call to the resolution of the Promise
      appendPromise.then((formData) => {
        console.log("FORMDATA1:", formData);
        updateNewRecipe(acceptedFile);
      });
      
      console.log("File accepted:", acceptedFile);
      updateErrorMsg(null);

    } else {
      updateErrorMsg(`File Rejected: ${fileRejected.file.path} - ${fileRejected.file.size} bytes`);
      console.log(`File Rejected: ${fileRejected.file.path}`);
    }
  
  }, [updateErrorMsg, updateNewRecipe]);




    // Defines the Dropzone box and it's settings
  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpg': ['.jpg'],
      'image/jpeg': ['.jpeg'],
      'image/gif': ['.gif'],
      'image/jp2': ['.jp2'],
      'image/bmp': ['.bmp'],
    },
    multiple: false,
    minSize: 0,
    //maxSize: 10485760, // 10 MB max size
    maxWidth: 800,
    maxHeight: 600,
  });


  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Images: click or drag to upload</p>
      )}
    </div> 
  );
};

export default MyDropzone;

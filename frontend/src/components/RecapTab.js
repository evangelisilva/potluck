import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecapTab = ({userId, eventId}) => {

    /* EVENT RECAP SECTION */

const [s3FileData, setS3FileData] = useState()

console.log("Original user id in this class: ", userId)

/* getting all the file data */
useEffect(() => {
    // Make GET request to Node.js server
    axios.get(`http://localhost:8000/api/eventRecap/${userId}`)
      .then(data => {
        setS3FileData(data.data);
        console.log("In useEffect - what is the file data result from the server?");
        console.log(data.data);
        /* for (let i = 0; i < ) */
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


const [file, setFile] = useState(null)

////const [currentFileName, setCurrentFileName] = useState('')

const [fileValidation, setFileValidation] = useState()

const [fileList, setFileList] = useState([])

const [fileNameList, setFileNameList] = useState([])

/*
const handleCurrentFileNameChange = (e) => {
    setCurrentFileName(e.target.value);
}
*/

const handleFileChange = (e) => {

  console.log("Option 1 for setting the file: ")
  console.log(document.getElementById("fileUploaded").value);
  console.log("Option 2 for setting the file: ")
  console.log(e.target.value.split("\\")[2])

  const supportedFileTypes = ['jpg', 'jpeg', 'png', 'svg', 'mp4', 'mov', 'avi', 'wmv', 
  'JPG', 'JPEG', 'PNG', 'SVG', 'MP4', 'MOV', 'AVI', 'WMV'];

  // Reset the validation for the file
  setFileValidation('');

  // 1st validation: check whether the file name is appropriate (no backslash, no forward slash, only one period)


  const currentFileName = e.target.value.split("\\")[2];

  let periodCount = 0;

  for (let i = 0; i < currentFileName.length; i++){
    if (currentFileName.charAt(i) === '\\' || currentFileName.charAt(i) === '/'){
        setFileValidation("Invalid file type. File cannot contain the characters '\\' or '/'");
        return false;
    }
    if (currentFileName.charAt(i) === '.'){
        periodCount++;
        if (periodCount >= 2){
            setFileValidation("Invalid file type. File cannot contain more than one period");
            return false;
        }
    }

  }


  console.log("NOW what is the value of the current file name?: ", currentFileName)
  console.log(currentFileName)


  

  // In addition to setting the image, you have to mark that in this case, you starting over with the image, and therefore, it hasn't been uploaded yet
  const currentFile = e.target.files[0];
  if (currentFile){

    const fileExtension = currentFileName.split(".")[1]
    // If not in the supported types, set a validation message
    if (supportedFileTypes.indexOf(fileExtension) === -1){
        console.log("In the file extension validator - the file extension is - ", fileExtension)
        console.log("The current file name is ", currentFileName)
        setFileValidation("Invalid file type. Supported file types are 'jpg', 'jpeg', 'png', 'svg', 'mp4', 'mov', 'avi', 'wmv'.");
    }
    // otherwise, add the file to the list of files, as well as the STRING list of file NAMES
    else {
        setFileList([...fileList, currentFile]);
        setFileNameList([...fileNameList, currentFileName]);
    }

    setFile(currentFile);
  }
  else {
    setFile(null);
  }
};

const handleFileSubmit = (e) => {
    e.preventDefault()

    // take the caption for everything
    const caption = document.getElementById("fileCaption").value;

    for (let i = 0; i < fileList.length; i++){

        console.log("What is the ith element in the file name list?");
        console.log(fileNameList[i])

        const fileData = new FormData();
        fileData.append('userId', userId);
        fileData.append('eventId', eventId);
        fileData.append('file', fileList[i]);
        fileData.append('fileExtension', fileNameList[i].split('.')[1]);
        fileData.append('caption', caption);

        axios.post(`http://localhost:8000/api/eventRecap`, fileData
        , {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
        
        })
        .then(response => {
            // Handle success, if needed
            console.log("Create image response: ");
            console.log(response.data);

            // after you get done with the LAST one - reset the lists of files

            if (i === fileList.length - 1){
                setFileList([]);
                setFileNameList([]);
            }
          })
        .catch(error => {
          // Handle error, if needed
          console.error(error);
        });
        
    }
    
    
    

    
   
}

    return (
        <div style={{ marginTop: '20px', marginLeft: '10px', marginRight: '10px' }}>
            <h2>Recap</h2>
            <p>Welcome to the recap tab!</p>
            <div>
                <p>Upload an image to represent your inventory item.</p>
                <input type="file" id="fileUploaded" onChange={handleFileChange}/>
                <input 
                    type="text" 
                    id="fileCaption"
                    placeholder="Add a caption for your image upload"
                required />
                {fileValidation}
                <p>Files currently uploaded: </p>
                {fileNameList.map((name, index) => (<div>{name}</div>))}
                <button onClick={handleFileSubmit}>Submit to Database</button>                                    
            </div>
        </div>
    );
}

export default RecapTab;
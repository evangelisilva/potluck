import React, { useState, useEffect } from 'react';
import { Container, Row, Form, Button, Col, Image, Card } from 'react-bootstrap';

import DeleteComponent from '../components/DeleteComponent';


import axios from 'axios';

const RecapTab = ({userId, eventId}) => {

    /* EVENT RECAP SECTION */

const [s3FileData, setS3FileData] = useState({metaData : [], userMatch : [], userName : []})

console.log("Original user id in this class: ", userId)

/* getting all the file data */
useEffect(() => {
    // Make GET request to Node.js server
    axios.get(`http://localhost:8000/api/eventRecap/${userId}/${eventId}`)
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
const [fileName, setFileName] = useState('')
const [fileCaption, setFileCaption] = useState('')

////const [currentFileName, setCurrentFileName] = useState('')

const [fileValidation, setFileValidation] = useState('')
const [submissionValidation, setSubmissionValidation] = useState('')

const [fileList, setFileList] = useState([])

const [fileNameList, setFileNameList] = useState([])

const [showRecap, setShowRecap] = useState(false)

/*
const [loadingImage, setLoadingImage] = useState(false);

setTimeout(() => {
  // Check for the image url from the s3 data
  if (s3FileData.metaData[0].imageUrl)
})
*/

/*
const handleCurrentFileNameChange = (e) => {
    setCurrentFileName(e.target.value);
}
*/

const handleFileChange = (e) => {

  // must reset the file and its name fisrt thing
  setFile(null);
  setFileName('');

  if (e.target.value === undefined || e.target.files === undefined){
    return false;
  }

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

  if (currentFileName === undefined){
    return false;
  }

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
        ////setFileList([...fileList, currentFile]);
        ////setFileNameList([...fileNameList, currentFileName]);
        setFile(currentFile);
        setFileName(currentFileName);
    }

    
  }
  else {
    setFile(null);
  }
};



const handleFileSubmit = (e) => {
    e.preventDefault();

    // set the submission validation here (you must have all of a caption and a file)
    if (fileCaption === ''){
      setSubmissionValidation("Invalid submission. your submission must include both a caption and a media file");
    }

   
    /*
    for (let i = 0; i < fileList.length; i++){

        console.log("What is the ith element in the file name list?");
        console.log(fileNameList[i])

        const fileData = new FormData();
        fileData.append('userId', userId);
        fileData.append('eventId', eventId);
        fileData.append('file', fileList[i]);
        fileData.append('fileExtension', fileNameList[i].split('.')[1]);
        fileData.append('caption', fileCaption);

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
                setSubmissionValidation('');
            }
          })
        .catch(error => {
          // Handle error, if needed
          console.error(error);
        });
        
    }
    */

    

        const fileData = new FormData();
        fileData.append('userId', userId);
        fileData.append('eventId', eventId);
        fileData.append('file', file);
        fileData.append('fileExtension', fileName.split(".")[1]);
        fileData.append('caption', fileCaption);

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

            setFile(null);
            setFileName('');
            setSubmissionValidation('');
          })
        .catch(error => {
          // Handle error, if needed
          console.error(error);
        });
    
    
    

    
   
}

const recapToggle = () => {
  setShowRecap(!showRecap);
}

const handleFileCaptionChange = (e) => {
  setFileCaption(e.target.value);
}


let metadataToDelete;
const handleDelete = () => {
  ////alert("Are you sure you want to delete your post?")
  /* const response = await axios.delete('https://your-api-endpoint.com/resource-to-delete'); */
  const response = axios.delete(`http://localhost:8000/api/eventRecap/${metadataToDelete}`)
  console.log(response);
  

  // TODO: add further logic for deletion
  // add delete request
  // reload the page
}

const [doDelete, setDoDelete] = useState(false)

const toggleDoDelete = () => {
  setDoDelete(!doDelete)
}

/**
const storeDeleteData = (dataToDelete) => {
  metadataToDelete = dataToDelete;
}
*/

    return (
        <div style={{ marginTop: '20px', marginLeft: '10px', marginRight: '10px' }}>
            <h2>Recap</h2>
            <p>Welcome to the recap tab!</p>
            
            {(showRecap === false) ?

            (<Container>
              <Row>
              <Button 
              variant="primary" 
              onClick={recapToggle} 
              style={{ float: 'right', borderColor: '#A39A9A', backgroundColor: "transparent", color: '#4D515A', fontSize: '15px', marginRight: '5px'  }}>+ Create Recap</Button>
              </Row>
            </Container>
            ) :
            (<div>
                <Container>
                <p>Upload an image to represent your inventory item.</p>
                <input type="file" id="fileUploaded" onChange={handleFileChange}/>
                <Row>
                <input 
                    type="text" 
                    id="fileCaption"
                    placeholder="Add a caption for your image upload"
                    value={fileCaption}
                    onChange={handleFileCaptionChange}
                required />
                </Row>
                
                {fileValidation}
                <Row>
                <p>File currently uploaded: </p>
                {/*{fileNameList.map((name, index) => (<div>{name}</div>))}*/}
                {fileName}
                </Row>
                <Row>
                  <button onClick={handleFileSubmit}>Submit to Database</button>
                  <button onClick={recapToggle}>Done</button>
                </Row>
                {submissionValidation}
                </Container>                      
            </div>)}

            {/*Map all of the recap items to cards*/}

            {/* Note: if ynot contained the metadata, you need to reference directly from the S3 data returned*/}
            {/* style={(Recap.fileKey === undefined) ? ({ fontSize: '16px', width: '620px', height: '1000px' }) : ({ fontSize: '16px', width: '620px', height: '1000px' })*/}

            {(s3FileData.metaData === undefined) ? (<></>) : (<div>{s3FileData.metaData.map((Recap, index) => (<Card style={{  marginLeft: '20px' }}>
            <Card.Body style={{ fontSize: '16px', width: '100%', height: '100%' }}>
              <Container>
                <Row>
                  <p>Recap published by user {s3FileData.userName[index]} </p>
                  <p>at {Recap.createdAt.split("T")[0] + " at " + Recap.createdAt.split("T")[1]}</p>
                </Row>
                <Row>
                  {/* Description*/}
                  {Recap.caption}
                </Row>
                  {/* Images (conditional)*/}
                  {(Recap.imageUrl === undefined) ? (<></>) : (<img src={Recap.imageUrl} alt={"image"} style={{ width: '430px', marginRight: '10px'}} />)}
                <Row>
                  {/* Delete button (conditional)*/}
                  {(s3FileData.userMatch[index] === false) ? (<></>) :                   
                  (<form onSubmit={() => {axios.delete(`http://localhost:8000/api/eventRecap/${Recap._id}`)}}>
                    {/* Method of passing parameter from here - likely conditionally call a form for doing delete, and make them form return by setting do delete as false*/}
                    
                    <button style={{ fontSize: '16px', width: '150px', height: '35px' }} type="submit">Delete post</button>
                  </form>)}
                  {/* <div>{(doDelete === true) ? (<div></div>) : (<DeleteComponent metadata={Recap._id} returnFunction={toggleDoDelete}/>)}</div> */}
                  
                  

                </Row>
              </Container>
              
              
              


            </Card.Body>
            </Card>))}</div>)}
            {/* New thing - do a conditional rendering for each card in the mapping (if the image of the recap ojbect is undefined, make the height 500 instead of 1000*/}

            

            

            
            
        </div>
    );
}

/* 

{/*Map all of the recap items to cards 

{(s3FileData.metaData === undefined) ? (<></>) : (<div>{s3FileData.metaData.map((Recap, index) => (<Card style={{  marginLeft: '20px' }}>
<Card.Body style={{ fontSize: '12px', width: '620px' }}>
  <p>Recap published by user {Recap.user}</p>
</Card.Body>
</Card>))}</div>)}

*/

export default RecapTab;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeleteComponent = ({metadata, returnFunction}) => {


    axios.delete(`http://ec2-18-222-195-53.us-east-2.compute.amazonaws.com:8000/api/eventRecap/${metadata}`);
    returnFunction();

    
    return (
        <div></div>
    )
}

export default DeleteComponent;
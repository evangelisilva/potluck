import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeleteComponent = ({metadata, returnFunction}) => {


    axios.delete(`http://ec2-3-134-116-74.us-east-2.compute.amazonaws.com:8000/api/eventRecap/${metadata}`);
    returnFunction();

    
    return (
        <div></div>
    )
}

export default DeleteComponent;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeleteComponent = ({metadata, returnFunction}) => {


    axios.delete(`http://localhost:8000/api/eventRecap/${metadata}`);
    returnFunction();

    
    return (
        <div></div>
    )
}

export default DeleteComponent;
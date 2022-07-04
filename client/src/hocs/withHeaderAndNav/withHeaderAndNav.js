import React, {useState} from 'react';

//TODO: DO WHATEVER YOU WANT HERE including changing the name of the folders and functions
const withHeaderAndNav = (Component) => {

    return (props) =>{
        return(
            <Component/>
        )
    }
};

export default withHeaderAndNav;
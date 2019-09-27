import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

const RenderRedirect = (props) => {
    if (props.redirect) {
        return <Redirect to="/" />
    }
    else {
        return null
    }
}

export default RenderRedirect
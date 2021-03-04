import React from 'react';

export default ({ state, handler }) => {
    const toggleStyle = {
        backgroundColor:'black',
        transition:'1.5s',
        color:'white',
        height: state.toggle ? '100px' : '',
        cursor:'pointer'
    }
    return (
        <p onClick={handler.toggle} style={toggleStyle}>Toggle</p>
    )

};
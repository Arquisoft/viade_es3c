import React from 'react';

const Checkbox = ({ type = 'checkbox', name, value, checked = false, onChange }) => {
    console.log("Checkbox: ", name, value, checked);

  return (<input type={type} name={name} value={value} checked={checked} onChange={onChange} /> )
}
export default Checkbox;
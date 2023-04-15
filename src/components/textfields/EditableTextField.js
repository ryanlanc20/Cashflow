import { useState } from "react";

const EditableTextField = (props) => {

    // Styles
    const fieldWrapper = {
        "float": "left"
    };

    const dashedBox = {
        "border-style": "dashed",
        "float": "left",
        "padding": "5px"
    };

    const textField = {
        "padding": "5px"
    };

    // State management
    const [isSelected,setSelected] = useState(false);

    const toggleFocus = () => {
        setSelected((isSelected) => !isSelected);
    };

    // Update datastore with textbox value
    const updateValue = (e) => {

        // No validation functions, so update store straight away
        if (
            !props.validators || 
            (props.validators && props.validators.length === 0)
        )
        {
            props.onChange(e.target.value);
            return;
        }

        // Validate input using validation functions
        let didValidate = true;
        props.validators.forEach(validator => {
            if (!validator(e.target.value))
            {
                didValidate = false;
                return;
            }
        });

        // Validation success
        if (didValidate)
            props.onChange(e.target.value);
    }

    return (
        <div style={fieldWrapper}>
            {isSelected ? 
                <input 
                    type="text"
                    value={props.currentValue}
                    onBlur={toggleFocus}
                    onChange={updateValue}
                    style={textField}
                    autoFocus
                /> 
            : 
                <span onClick={toggleFocus} style={dashedBox}>
                    {
                        props.currentValue.length === 0 ? 
                            "Click to edit"
                        :
                            props.currentValue
                    }
                </span>}
        </div>
    )
};

export default EditableTextField;
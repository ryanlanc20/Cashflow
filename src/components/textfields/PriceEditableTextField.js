import EditableTextField from "./EditableTextField.js";

const PriceEditableTextField = (props) => {
    
    const validatePrice = (string) => {
        return string.match(/^([0-9]+\.{0,1}){0,1}[0-9]*$/);
    };

    return (
        <EditableTextField
            validators={[validatePrice]}
            onChange={props.onChange}
            currentValue={props.currentValue}
        />
    )
};

export default PriceEditableTextField;
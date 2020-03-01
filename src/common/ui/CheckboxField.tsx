import React from "react";
import { InputFieldProps } from "./InputFieldProps";

export const CheckboxField = (props: InputFieldProps<boolean>) => (
    <input
        {...props}
        type="checkbox"
        value={undefined}
        checked={props.value}
        onChange={e => props.onChange(e.target.checked, e)}
    />
);
import React from "react";
import { InputFieldProps } from "./InputFieldProps";

export const TextField = React.forwardRef((props: InputFieldProps<string>, ref: any) => (
    <input
        {...props}
        type="text"
        value={props.value}
        onChange={e => props.onChange(e.target.value, e)}
        ref={ref}
    />
));
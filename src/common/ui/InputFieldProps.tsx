import React from "react";

export type InputFieldProps<T>
    = Omit<
        React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
        'value' | 'checked' | 'onChange'
    >
    & {
        value: T,
        onChange: (value: T, e: React.ChangeEvent<HTMLInputElement>) => void
    };
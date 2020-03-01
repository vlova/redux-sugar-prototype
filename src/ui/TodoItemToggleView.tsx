import React from "react";
import { InputFieldProps } from "../common/ui";
import classNames from "classnames";
import styles from './TodoItemToggleView.module.css';

export const TodoItemToggleView = (props: InputFieldProps<boolean>) => (
    <input
        {...props}
        className={classNames(props.className, styles.toggle)}
        type="checkbox"
        value={undefined}
        checked={props.value}
        onChange={e => props.onChange(e.target.checked, e)}
    />
);
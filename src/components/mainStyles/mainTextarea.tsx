import React, {FC, TextareaHTMLAttributes} from "react";

interface InputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string
}

const Textarea: FC<InputProps> = ({className, placeholder, value, name, onChange, label}) => {
    return (
        <div className="field">
            <div className="control">
                <label htmlFor={name}>{label}</label>
                <textarea
                    className={`textarea ${className}`}
                    placeholder={placeholder}
                    value={value}
                    name={name}
                    onChange={onChange}
                    required
                />
            </div>
        </div>
    )
}

export default Textarea

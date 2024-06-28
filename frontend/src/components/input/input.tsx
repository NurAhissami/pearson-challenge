import { ChangeEvent, FC } from "react";
import { InputProps } from "./input.interface";

export const Input: FC<InputProps> = ({
  classname,
  datatestid,
  onChange,
  placeholder,
  type,
  value,
}) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange(e.target.value);
  };

  return (
    <>
      {type === "textarea" ? (
        <textarea
          className={`input__textarea ${classname} `}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          data-testid={datatestid}
        />
      ) : (
        <input
          className={`input__text ${classname} `}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          data-testid={datatestid}
        />
      )}
    </>
  );
};

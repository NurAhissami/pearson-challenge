export interface InputProps {
  classname?: string;
  datatestid?: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
  type: string;
  value: string;
}

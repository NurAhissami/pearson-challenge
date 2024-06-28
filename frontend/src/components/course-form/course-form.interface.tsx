import { Dispatch, SetStateAction } from "react";

export interface CourseFormProps {
  name: string;
  description: string;
  schedule: string;
  setName: Dispatch<SetStateAction<string>>;
  setDescription: Dispatch<SetStateAction<string>>;
  setSchedule: Dispatch<SetStateAction<string>>;
  onSubmit: () => void;
  editCourseId: number | null;
  showModal: boolean;
  closeModal: () => void;
}

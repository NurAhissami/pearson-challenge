export interface Student {
  id: number;
  name: string;
}

export interface Course {
  id: number;
  name: string;
  description: string;
  schedule: string;
  students: Student[];
}

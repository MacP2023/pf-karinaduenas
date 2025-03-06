import { Course } from '../../courses/models/course';
import { Student } from '../../students/models/student';

export interface Enrollment {
  id: number;
  studentId: number;
  courseId: number;
  course?: Course;
  student?: Student;
}

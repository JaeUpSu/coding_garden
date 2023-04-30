interface IInstructor {
  username: string;
  instructorField: null | string;
  instructorAbout: string;
  instructorCareer: string;
}

interface ICategories {
  parent: null | {
    name: string;
    classification: string;
    parent: null;
  };
  name: string;
  classification: string;
}

export interface ILectureData {
  LectureId: number;
  lectureTitle: string;
  lectureDifficulty: string;
  lectureDescription: string;
  targetAudience: string;
  lectureFee: number;
  thumbnail: string;
  isOpened: boolean;
  grade: null | string;
  instructor: IInstructor;
  categories: ICategories;
  reviews_num: number;
  rating: number;
}

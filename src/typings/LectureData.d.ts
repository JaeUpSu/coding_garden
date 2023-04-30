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

export interface CalculatedLectureItem {
  img: string;
  LectureId: number;
  thumbnail: string;
  lectureDescription: string;
  lectureTitle: string;
  targetAudience: string;
  rating: number;
  instructor: {
    username: string;
  };
}
export interface UserData {
  username: string;
  email: string;
  password: string;
  passwordCheck: string;
  name: string;
  dateBirth: string;
  gender: string;
  phoneNumber: string;
  position: string;
  skill: string;
  termsOfUse: String;
  funnel: string;
}

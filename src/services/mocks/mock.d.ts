interface Category {
  parent: {
    name: string;
    classification: string;
    parent: null;
  };
  name: string;
  classification: string;
}

interface Instructor {
  username: string;
  instructorField: null;
  instructorAbout: string;
  instructorCareer: string;
}

export interface Cart {
  LectureId: number;
  lectureTitle: string;
  lectureDifficulty: string;
  targetAudience: string;
  lectureDescription: string;
  lectureFee: number;
  thumbnail: string;
  isOpened: boolean;
  grade: null;
  instructor: Instructor;
  categories: Category;
  reviews_num: number;
  rating: number;
}

export interface Carts {
  data: Cart[];
}

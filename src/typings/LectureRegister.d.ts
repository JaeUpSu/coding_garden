export interface IRegisterLecture {
  lectureTitle: string;
  lectureDifficulty: string;
  lectureDescription: string;
  targetAudience: string;
  lectureFee: number;
  thumbnail: string;
  video: string[];
  categories: string;
}

export interface ILectureFormData {
  categories: string;
  lectureDescription: string;
  lectureDifficulty: string;
  lectureFee: string;
  lectureTitle: string;
  targetAudience: string;
  thumbnail: string;
  videos: string[];
  videoDescriptions: string[];
  videoTitles: string[];
}

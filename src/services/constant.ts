export const imgTypes = [".jpg", ".png", ".jpeg", ".webp"];
export const videoTypes = [".mp4", ".mov", ".wmv", ".avi", ".mkv", ".webm"];
export const lectureRegisterData = {
  lectureTitle: "테스트 강의",
  lectureFee: 10000,
  lectureDescription: "테스트 강의 설명입니다.",
  targetAudience: "theory",
  lectureDifficulty: "upper",
  categories: "html",
  thumbnail: "img1",
  videos: [
    {
      url: "vidoe1",
      title: "vidoeTitle1",
      description: "vidoeDescription1",
    },
    { url: "vidoe2", title: "vidoeTitle2", description: "vidoeDescription2" },
  ],
};

export const skeletonArray = new Array(24).fill(0);

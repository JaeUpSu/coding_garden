import { Cart, Carts } from "./mock";

export const mock_data: Carts = {
  data: [
    {
      LectureId: 27,
      lectureTitle: "지브러시 세계로 떠나는 여행자 가이드 (Zbrush)\n대시보드",
      lectureDifficulty: "입문자",
      lectureDescription:
        "입문자를 위해 준비한\n[CAD · 3D 모델링, 게임 아트 · 그래픽] 강의입니다.",
      targetAudience: "입문자",
      lectureFee: 66000,
      thumbnail:
        "https://cdn.inflearn.com/public/courses/326364/cover/99d3cdc2-e6fe-44f5-a235-0563c951bfde/326364-eng.jpg",
      isOpened: true,
      grade: null,
      instructor: {
        username: "admin",
        instructorField: null,
        instructorAbout: "",
        instructorCareer: "",
      },
      categories: {
        parent: {
          name: "기초코딩",
          classification: "basic",
          parent: null,
        },
        name: "html",
        classification: "html",
      },
      reviews_num: 6,
      rating: 3.5,
    },
    {
      LectureId: 29,
      lectureTitle: "타입스크립트 입문 - 기초부터 실전까지\n대시보드",
      lectureDifficulty: "초급자",
      lectureDescription:
        "초급자를 위해 준비한\n[프론트엔드, 프로그래밍 언어] 강의입니다.",
      targetAudience: "초급자",
      lectureFee: 55000,
      thumbnail:
        "https://cdn.inflearn.com/public/courses/326082/cover/c6519e92-f334-46ac-8a31-6290db19b32a",
      isOpened: true,
      grade: null,
      instructor: {
        username: "admin",
        instructorField: null,
        instructorAbout: "",
        instructorCareer: "",
      },
      categories: {
        parent: {
          name: "기초코딩",
          classification: "basic",
          parent: null,
        },
        name: "html",
        classification: "html",
      },
      reviews_num: 0,
      rating: 0,
    },
    {
      LectureId: 30,
      lectureTitle: "HTML+CSS+JS 포트폴리오 실전 퍼블리싱(시즌1)\n대시보드",
      lectureDifficulty: "초급자",
      lectureDescription:
        "초급자를 위해 준비한\n[웹 퍼블리싱, 프론트엔드] 강의입니다.\nHTML+CSS+JQUERY 초중급 퍼블리싱으로 다양한 실전 예제 학습을 통해 퍼블리싱 중급 실력을 위한 퍼블리싱 기본기를 익히시게 됩니다.",
      targetAudience: "초급자",
      lectureFee: 46200,
      thumbnail:
        "https://cdn.inflearn.com/public/courses/325450/course_cover/a15141ac-4d33-4f6d-a38b-3a0b5773031c/webdesign-cover-03.png",
      isOpened: true,
      grade: null,
      instructor: {
        username: "admin",
        instructorField: null,
        instructorAbout: "",
        instructorCareer: "",
      },
      categories: {
        parent: {
          name: "기초코딩",
          classification: "basic",
          parent: null,
        },
        name: "html",
        classification: "html",
      },
      reviews_num: 0,
      rating: 0,
    },
    {
      LectureId: 31,
      lectureTitle: "[개정판] 딥러닝 컴퓨터 비전 완벽 가이드\n대시보드",
      lectureDifficulty: "중급자",
      lectureDescription:
        "중급자를 위해 준비한\n[인공지능, 데이터 사이언스] 강의입니다.",
      targetAudience: "중급자",
      lectureFee: 121000,
      thumbnail:
        "https://cdn.inflearn.com/public/courses/325035/cover/d69f088c-41c2-4023-a416-fdcb35567ae4/325035-eng.png",
      isOpened: true,
      grade: null,
      instructor: {
        username: "admin",
        instructorField: null,
        instructorAbout: "",
        instructorCareer: "",
      },
      categories: {
        parent: {
          name: "기초코딩",
          classification: "basic",
          parent: null,
        },
        name: "html",
        classification: "html",
      },
      reviews_num: 0,
      rating: 0,
    },
    {
      LectureId: 32,
      lectureTitle:
        "프론트엔드 개발환경의 이해와 실습 (webpack, babel, eslint..)\n대시보드",
      lectureDifficulty: "중급자",
      lectureDescription:
        "중급자를 위해 준비한\n[웹 개발, 프론트엔드] 강의입니다.",
      targetAudience: "중급자",
      lectureFee: 69300,
      thumbnail:
        "https://cdn.inflearn.com/public/courses/324671/course_cover/638eee1a-6381-402d-a17b-3724751414f1/frontend-env-eng.png",
      isOpened: true,
      grade: null,
      instructor: {
        username: "admin",
        instructorField: null,
        instructorAbout: "",
        instructorCareer: "",
      },
      categories: {
        parent: {
          name: "기초코딩",
          classification: "basic",
          parent: null,
        },
        name: "html",
        classification: "html",
      },
      reviews_num: 0,
      rating: 0,
    },
  ],
};

export const default_cart: Cart = {
  LectureId: 0,
  lectureTitle: "",
  lectureDifficulty: "",
  lectureDescription: "",
  targetAudience: "",
  lectureFee: 0,
  thumbnail: "",
  isOpened: true,
  grade: null,
  instructor: {
    username: "",
    instructorField: null,
    instructorAbout: "",
    instructorCareer: "",
  },
  categories: {
    parent: {
      name: "",
      classification: "",
      parent: null,
    },
    name: "",
    classification: "",
  },
  reviews_num: 0,
  rating: 0,
};

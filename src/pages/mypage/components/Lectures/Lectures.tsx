import React, { useEffect } from "react";
import { useRouter } from "next/router";

import MylectureCard from "@/components/LectureCard/MyLectureCard";
import { Grid, GridItem } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getLectureInfo } from "@/services/api";
import { skeletonArray } from "@/services/constant";
import SkeletonCard from "@/components/LectureCard/SkeletonCard";

interface CalculatedLectureItem {
  id: string;
  lecture: {
    img: string;
    LectureId: number;
    thumbnail: string;
    lectureDescription: string;
    lectureTitle: string;
    targetAudience: string;
    lectureFee: number;
    instructor: {
      username: string;
    };
  };
}

const MyLectures: React.FC = () => {
  const router = useRouter();

  const { isLoading, data, isError } = useQuery(["lectureInfo"], () =>
    getLectureInfo()
  );

  if (isError) {
    router.push("/notfound");
  }

  return (
    <div>
      <Grid>
        <GridItem mx="auto">
          <Grid templateColumns={["repeat(1, 1fr)", "repeat(4, 1fr)"]} gap="5">
            {!isLoading
              ? data?.calculatedLecture?.map((item: CalculatedLectureItem) => (
                  <GridItem key={item.lecture.LectureId} mx="auto">
                    <MylectureCard
                      lectureNumber={item.lecture.LectureId}
                      key={item.id}
                      img={item.lecture.thumbnail}
                      lectureDescription={item.lecture.lectureDescription}
                      lectureTitle={item.lecture.lectureTitle}
                      targetAudience={item.lecture.targetAudience}
                      instructor={item.lecture.instructor.username}
                      rating={data.ratings[item.lecture.lectureTitle]}
                      lectureFee={item.lecture.lectureFee}
                    />
                  </GridItem>
                ))
              : skeletonArray.map((_: number, idx: number) => (
                  <GridItem key={idx} mx="auto">
                    <SkeletonCard />
                  </GridItem>
                ))}
          </Grid>
        </GridItem>
      </Grid>
    </div>
  );
};

export default MyLectures;

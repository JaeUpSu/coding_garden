import React from "react";
import css from "./Home.module.scss";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

import styles from "./Home.module.scss";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllLectures } from "@/services/api";
import { SiSpring } from "react-icons/si";
import LectureCard from "@/components/LectureCard/LectureCard";
import { ILectureData } from "@/typings/LectureData";
// import StarRating from "../../components/LectureCard/StarRating";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Flex,
  Link,
  Button,
  Heading,
  Text,
  Box,
  Image,
  Container,
  Stack,
  SimpleGrid,
  CardBody,
  Card,
  VStack,
  HStack,
  GridItem,
} from "@chakra-ui/react";

import { skeletonArray } from "@/services/constant";
import SkeletonCard from "@/components/LectureCard/SkeletonCard";

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

function PopularLecture() {
  const { isLoading, data } = useQuery(["lectureInfo"], () => getAllLectures());
  const NextArrow = (props: ArrowProps) => {
    const { className, style, onClick } = props;

    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          backgroundColor: "transparent",
          top: "47%",

          transform: "translateY(-50%)",
          zIndex: 1,
        }}
        onClick={onClick}
      >
        <svg fill="black" width="24" height="24" viewBox="0 0 24 24">
          <path d="M8.59 16.58L13.17 12 8.59 7.41 10 6l6 6-6 6z"></path>
        </svg>
      </div>
    );
  };
  const PrevArrow = (props: ArrowProps) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          backgroundColor: "transparent",
          top: "47%",
          right: "5%",
          transform: "translateY(-50%)",
          zIndex: 1,
        }}
        onClick={onClick}
      >
        <svg fill="red" width="24" height="24" viewBox="0 0 24 24">
          <path d="M15.41 16.58L10.83 12l4.58-4.58L14 6l-6 6 6 6z"></path>
        </svg>
      </div>
    );
  };
  const sliderSettings = {
    dots: false,
    arrows: false,
    autoplay: true,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    rows: 2,
  };

  return (
    <div>
      {!isLoading ? (
        <Container as="section" maxW={"6xl"}>
          <Slider {...sliderSettings}>
            {data?.data?.map((lecture: ILectureData) => (
              <GridItem key={lecture.LectureId} ml="20px">
                <LectureCard data={lecture} />
              </GridItem>
            ))}
          </Slider>
        </Container>
      ) : (
        <Container as="section" maxW={"6xl"}>
          <Slider {...sliderSettings}>
            {skeletonArray.map((_: number, idx: number) => (
              <GridItem key={idx} ml="20px">
                <SkeletonCard />
              </GridItem>
            ))}
          </Slider>
        </Container>
      )}
    </div>
  );
}

export default PopularLecture;

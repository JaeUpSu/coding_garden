import { Card, CardBody, Skeleton } from "@chakra-ui/react";

const SkeletonCard: React.FC = () => {
  return (
    <Card
      width="230px"
      height="260px"
      direction={{ base: "column" }}
      variant="outline"
      _hover={{ background: "rgba(0, 0, 0, 0.4 )", zIndex: 10 }}
      overflow="hidden"
    >
      <Skeleton
        objectFit="cover"
        maxW={{ base: "100%", sm: "100%" }}
        minH="140px"
        maxH="140px"
      />
      <CardBody px="1" py="4">
        <Skeleton h="30px" py="2" />
        <Skeleton h="15px" w="35%" mt="3" />
        <Skeleton h="15px" w="40%" mt="2" />
        <Skeleton h="15px" w="40%" mt="2" />
      </CardBody>
    </Card>
  );
};

export default SkeletonCard;

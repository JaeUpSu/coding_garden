import {
  HStack,
  Card,
  CardBody,
  Skeleton,
  SkeletonCircle,
} from "@chakra-ui/react";

const SkeletonPurchasedCard: React.FC = () => {
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
        <HStack w="100%" justifyContent={"flex-end"}>
          <SkeletonCircle />
        </HStack>
      </CardBody>
    </Card>
  );
};

export default SkeletonPurchasedCard;

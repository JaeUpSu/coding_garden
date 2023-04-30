import {
  Image,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Text,
  Heading,
} from "@chakra-ui/react";
import { ILecture } from "../../../../typings/PaymentResult";
export function LectureCard({
  id,
  title,
  thumbnail,
  instructor,
}: ILecture): React.ReactElement {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">{title}</Heading>
        <Text px="3">{instructor}</Text>
      </CardHeader>
      <CardBody>
        <Image objectFit="cover" src={thumbnail} />
      </CardBody>
      <CardFooter>
        <Button>강의보기</Button>
      </CardFooter>
    </Card>
  );
}

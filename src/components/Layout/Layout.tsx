import { Box } from "@chakra-ui/react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

interface Props {
  children: JSX.Element;
}

export default function Layout({ children }: Props) {
  return (
    <Box>
      <Header />
      {children}
      <Footer />
    </Box>
  );
}

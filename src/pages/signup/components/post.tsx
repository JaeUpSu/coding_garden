import React from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import css from "../signup.module.scss";
import { useColorMode } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { addressState } from "@/services/atoms";

interface PostProps {
  myAddress: {
    address: string;
  };
  setmyAddress: (myAddress: { address: string }) => void;
}

interface Address {
  address: string;
  addressType: string;
  bname: string;
  buildingName: string;
}

const Post: React.FC<PostProps> = (props) => {
  const { colorMode } = useColorMode();
  const [address, setaddress] = useRecoilState<string>(addressState);
  const open = useDaumPostcodePopup(
    "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
  );

  const handleComplete = (data: Address) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'

    props.setmyAddress({
      ...props.myAddress,
      address: fullAddress,
    });

    setaddress(fullAddress);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <button
      type="button"
      name="address"
      onClick={handleClick}
      className={colorMode === "light" ? css.checkButton : css.darkCheckButton}
    >
      주소 <br />
      찾기
    </button>
  );
};

export default Post;

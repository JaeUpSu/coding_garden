export default function getAddCommas(num: number): string {
  // 숫자를 문자열로 변환
  const numString = num.toString();

  // 소수점 부분과 정수 부분 나누기
  const parts = numString.split(".");

  // 정수 부분에 쉼표 추가
  const integerPart = parts[0];
  let integerPartWithCommas = "";
  for (let i = 0; i < integerPart.length; i++) {
    if (i > 0 && (integerPart.length - i) % 3 === 0) {
      integerPartWithCommas += ",";
    }
    integerPartWithCommas += integerPart[i];
  }

  // 정수 부분과 소수점 부분 합치기
  if (parts.length > 1) {
    const decimalPart = "." + parts[1];
    return integerPartWithCommas + decimalPart;
  } else {
    return integerPartWithCommas;
  }
}

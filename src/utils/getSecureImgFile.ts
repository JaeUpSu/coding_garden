export const getSecureImgFile = (
  value: string | ArrayBuffer | null
): string => {
  if (value == null) {
    return "";
  } else if (typeof value === "string") {
    return value;
  } else {
    const buffer = new Uint8Array(value);
    const binary = Array.from(buffer)
      .map((byte) => String.fromCharCode(byte))
      .join("");
    const dataUri = `data:image/png;base64,${btoa(binary)}`;
    return dataUri;
  }
};

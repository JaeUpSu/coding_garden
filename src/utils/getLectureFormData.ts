import { FieldValues } from "react-hook-form";

interface Props {
  formData: FieldValues;
  img: File;
  thumbnails: File[];
  videoFiles: File[];
}

export const getFormData = ({
  formData,
  img,
  thumbnails,
  videoFiles,
}: Props) => {
  const data = {
    categories: formData.categories,
    description: formData.description,
    level: formData.level,
    fee: formData.fee,
    title: formData.title,
    targetAudience: formData.targetAudience,
    thumbnail: img,
  };

  const videos = videoFiles.map((f: File, idx: number) => {
    return {
      description: formData.videoDescription[idx],
      title: formData.videoTitle[idx],
      videoFile: f,
      thumbnail: thumbnails[idx],
    };
  });
  const result = { ...data, videos };
  return result;
};

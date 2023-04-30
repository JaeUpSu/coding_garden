// video.currentTime 속성을 사용하여 비디오의 시간을 1초로 설정
// 이렇게 하면 비디오의 첫 번째 프레임이 로드되며,
// seeked 이벤트가 발생합니다.이 이벤트가 발생하면 캔버스에
// 프레임을 그릴 수 있습니다.

// 이렇게 수정하면 흰색 배경이 아닌 실제 비디오의 썸네일이 표시
export function createVideoThumbnail(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    const canvas = document.createElement("canvas");
    const URL = window.URL || window.webkitURL;

    video.src = URL.createObjectURL(file);

    video.addEventListener("loadedmetadata", () => {
      video.currentTime = 1;
    });

    video.addEventListener("seeked", () => {
      const aspectRatio = video.videoWidth / video.videoHeight;
      canvas.width = 400;
      canvas.height = canvas.width / aspectRatio;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to create 2D context"));
        return;
      }

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      if (ctx.globalAlpha) {
        ctx.globalAlpha = 1;
      }

      const dataUri = canvas.toDataURL("image/png");
      URL.revokeObjectURL(video.src);
      resolve(dataUri);
    });

    video.addEventListener("error", () => {
      reject(new Error("Failed to load video"));
    });
  });
}

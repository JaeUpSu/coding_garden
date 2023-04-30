import axios, { AxiosInstance, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { ILectureFormData } from "../../typings/LectureRegister";
import { FieldValues } from "react-hook-form";

interface delProps {
  LectureId: number;
}

export const instance: AxiosInstance = axios.create({
  headers: {
    "X-CSRFToken": Cookies.get("csrftoken"),
  },
  withCredentials: true,
});

export const getMockCarts = () =>
  instance.get("/carts").then((res) => res.data);

export const delMockCarts = ({ LectureId }: delProps) => {
  instance.delete(`/carts/${LectureId}`);
};

export const postMockLecture = (Lecture: FieldValues) =>
  instance.post(`/register`, { ...Lecture });

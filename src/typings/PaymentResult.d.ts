export interface ILecture {
  id: number;
  title: string;
  instructor: string;
  thumbnail: string;
}

export interface IPayProps {
  name: string;
  amount: number;
  buyer_email: string;
  buyer_name: string;
  buyer_tel: string;
  lectures: ILecture[];
  buyer_id: string;
}

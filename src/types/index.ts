export type BaseEntity = {
  id: string;
  createdAt: number;
};

export type IHeader = {
  id: string;
  title: string;
  classHeader?:string,
  classBody?:string
  isShowToolTip?:boolean
};




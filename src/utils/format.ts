import { default as dayjs } from "dayjs";

export const formatDate = (date: number) =>
  dayjs(date).format("MMMM D, YYYY h:mm A");

export const isString = (value:any) => {
  return !!value && typeof value === 'string'
}
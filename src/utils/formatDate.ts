import { format } from "date-fns";

export const formatDate = (date: string, type: string = "HH:mm"): string =>
    format(new Date(date), type);

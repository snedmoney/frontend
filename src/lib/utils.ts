import {
  CalendarDate,
  DateFormatter,
  DateValue,
  getLocalTimeZone,
  parseAbsoluteToLocal,
} from "@internationalized/date";
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { padHex, Address, toHex } from "viem";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function addressToBytes32(address: Address) {
  const bytes = padHex(address, { size: 32 });

  return bytes;
}

export function generateRandomBytes32(): `0x${string}` {
  const randomBytes = new Uint8Array(32);

  crypto.getRandomValues(randomBytes);

  return toHex(randomBytes) as `0x${string}`;
}

export function convertDateValueToString(dateValue: undefined): undefined;
export function convertDateValueToString(dateValue: DateValue): string;
export function convertDateValueToString(dateValue: any): any {
  if (!dateValue) {
    return undefined;
  }

  return dateValue.toString();
}

const dateFormatter = new DateFormatter("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export const formatDate = (date: CalendarDate) => {
  const formatted = dateFormatter.format(date.toDate(getLocalTimeZone()));

  return formatted.replace(/^\w/, (c) => c.toLowerCase());
};

export const formatDateFromISOString = (isoString: string) => {
  const date = parseAbsoluteToLocal(isoString);

  return date.toDate().toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
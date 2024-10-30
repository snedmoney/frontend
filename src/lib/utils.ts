import { DateValue } from "@internationalized/date";
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Address, padHex } from "viem";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function addressToBytes32(address: Address) {
  const bytes = padHex(address, { size: 32 });

  return bytes;
}

export function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;

    return v.toString(16);
  });
}

export function convertDateValueToString(dateValue: undefined): undefined;
export function convertDateValueToString(dateValue: DateValue): string;
export function convertDateValueToString(dateValue: any): any {
  if (!dateValue) {
    return undefined;
  }

  return dateValue.toString();
}
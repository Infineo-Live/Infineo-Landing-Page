import { parsePhoneNumberFromString } from "libphonenumber-js";

export function verifyPhone(dialCode, localNumber) {
  try {
    // Remove all non-digit characters
    const cleaned = localNumber.replace(/\D/g, "");

    // Reject empty numbers
    if (!cleaned) {
      return {
        valid: false,
        type: "empty",
      };
    }

    // Reject numbers like 7777777777 or 9999999999
    if (/^(\d)\1+$/.test(cleaned)) {
      return {
        valid: false,
        type: "fake",
      };
    }

    // Create complete international number
    const fullNumber = `${dialCode}${cleaned}`;

    console.log("Checking:", fullNumber);

    // Parse number
    const phoneNumber = parsePhoneNumberFromString(fullNumber);

    // Invalid number
    if (!phoneNumber || !phoneNumber.isValid()) {
      return {
        valid: false,
        type: "invalid",
      };
    }

    return {
      valid: true,
      type: phoneNumber.getType() || "unknown",
    };
  } catch (error) {
    console.error("Phone validation error:", error);

    return {
      valid: false,
      type: "unknown",
    };
  }
}
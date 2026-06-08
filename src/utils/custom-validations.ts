/**
 * Custom validators for Vuelidate.
 * @see https://vuelidate-next.netlify.app/custom_validators.html
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { helpers } from '@vuelidate/validators'
import { parsePhoneNumber } from 'libphonenumber-js/max'

/**
 * Must have one lowercase & uppercase letter, one number
 */
export const passwordRule = () => helpers.regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)

/**
 * Must have a certain count of digits
 */
export const digitCountRule =
  (numOfDigits: number): any =>
  (value: string) => {
    if (value === null || value === '' || value === undefined) return true
    const pattern = '^\\d{' + numOfDigits + '}$'
    const regex = new RegExp(pattern)
    return regex.test(value)
  }

/**
 * Must be a valid Philippine mobile number
 */
export const mobilePhoneRule =
  (country = 'PH'): any =>
  (value: string) => {
    if (value === null || value === '' || value === undefined) return true
    try {
      const phone = parsePhoneNumber(value, country)
      return phone ? phone.isValid() : false
    } catch {
      return false
    }
  }

/** Only allow certain file extensions */
export const mimeTypeRule = (mimeTypes: string[]) => (value: File) => {
  return mimeTypes.includes(value.type)
}

/** File size must not exceed the specified size in MB */
export const maxFileSizeRule = (maxMb: number) => (value: File) => {
  return value.size <= maxMb * 1024 * 1024
}

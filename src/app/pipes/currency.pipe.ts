import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency',
  standalone: true,
})
export class CurrencyPipe implements PipeTransform {
  /**
   * Transform a number into a currency string with the specified format
   * @param value The number to format
   * @param currencyCode The ISO 4217 currency code (e.g., 'USD', 'EUR', 'GBP', 'INR')
   * @param display The display format (symbol, code, name)
   * @param digitsInfo The decimal and thousand separator format
   * @param locale The locale to use for formatting
   * @returns Formatted currency string
   */
  transform(
    value: number | null | undefined,
    currencyCode: string = 'USD',
    display: 'symbol' | 'code' | 'name' = 'symbol',
    digitsInfo: string = '1.2-2',
    locale: string = 'en-US'
  ): string {
    if (value == null) {
      return '';
    }

    try {
      // Special handling for Indian Rupee (INR)
      if (currencyCode === 'INR') {
        return this.formatIndianRupee(value, display, digitsInfo);
      }

      // Get currency symbol based on display format
      let currencySymbol = '';
      if (display === 'symbol') {
        // Get symbol for the currency code
        const formatter = new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: currencyCode,
          currencyDisplay: 'symbol',
        });
        const parts = formatter.formatToParts(0);
        currencySymbol =
          parts.find((part) => part.type === 'currency')?.value || currencyCode;
      } else if (display === 'code') {
        currencySymbol = currencyCode;
      } else if (display === 'name') {
        // Get full name like "US Dollar"
        const formatter = new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: currencyCode,
          currencyDisplay: 'name',
        });
        const parts = formatter.formatToParts(0);
        currencySymbol =
          parts.find((part) => part.type === 'currency')?.value || currencyCode;
      }

      // Parse digits info
      const [minInt, fractionalPart] = digitsInfo.split('.');
      const [minFraction, maxFraction] = fractionalPart
        ? fractionalPart.split('-')
        : ['2', '2'];

      // Format the number
      const formatter = new Intl.NumberFormat(locale, {
        style: 'decimal',
        minimumIntegerDigits: parseInt(minInt) || 1,
        minimumFractionDigits: parseInt(minFraction) || 0,
        maximumFractionDigits:
          parseInt(maxFraction) || parseInt(minFraction) || 2,
      });

      const formattedValue = formatter.format(value);

      // Position the currency symbol based on locale convention
      if (display === 'symbol') {
        const testFormatter = new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: currencyCode,
        });
        const parts = testFormatter.formatToParts(value);
        const currencyFirst =
          parts.findIndex((part) => part.type === 'currency') === 0;

        return currencyFirst
          ? `${currencySymbol}${formattedValue}`
          : `${formattedValue} ${currencySymbol}`;
      }

      return `${currencySymbol} ${formattedValue}`;
    } catch (error) {
      console.error('Error formatting currency:', error);
      return `${value}`;
    }
  }

  /**
   * Format a number as Indian Rupee with proper placement of commas
   * @param value The number to format
   * @param display The display format (symbol, code, name)
   * @param digitsInfo The decimal and thousand separator format
   * @returns Formatted Indian Rupee string
   */
  private formatIndianRupee(
    value: number,
    display: 'symbol' | 'code' | 'name' = 'symbol',
    digitsInfo: string = '1.2-2'
  ): string {
    // Parse digits info for decimal places
    const [minInt, fractionalPart] = digitsInfo.split('.');
    const [minFraction, maxFraction] = fractionalPart
      ? fractionalPart.split('-')
      : ['2', '2'];
    const fractionDigits = parseInt(maxFraction) || 2;

    // Get the currency representation based on display format
    let currencyRepresentation = '';
    switch (display) {
      case 'symbol':
        currencyRepresentation = '₹';
        break;
      case 'code':
        currencyRepresentation = 'INR';
        break;
      case 'name':
        currencyRepresentation = 'Indian Rupee';
        break;
    }

    // Format the number with Indian number system (lakhs and crores)
    const parts = value.toFixed(fractionDigits).split('.');
    let integerPart = parts[0];
    const decimalPart = parts[1] || '';

    // Apply Indian number system formatting (different comma placement)
    let formattedIntegerPart = '';

    // Special handling for numbers >= 1000
    if (integerPart.length > 3) {
      // Add comma after first 3 digits from right
      formattedIntegerPart = integerPart.slice(-3);
      integerPart = integerPart.slice(0, -3);

      // Add commas after every 2 digits for remaining part (lakhs, crores)
      while (integerPart.length > 0) {
        const segment = integerPart.slice(-2);
        formattedIntegerPart =
          segment +
          (formattedIntegerPart
            ? ',' + formattedIntegerPart
            : formattedIntegerPart);
        integerPart = integerPart.slice(0, -2);
      }
    } else {
      formattedIntegerPart = integerPart;
    }

    // Combine the parts with the decimal
    const formattedValue =
      decimalPart.length > 0
        ? `${formattedIntegerPart}.${decimalPart}`
        : formattedIntegerPart;

    // Position the currency symbol according to Indian convention (prefix)
    return display === 'symbol'
      ? `${currencyRepresentation}${formattedValue}`
      : `${currencyRepresentation} ${formattedValue}`;
  }
}

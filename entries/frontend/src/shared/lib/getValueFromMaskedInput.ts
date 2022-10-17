import { SyntheticEvent } from 'react';

/**
 * Получает значение без маски из Masked Input.
 */
export const getValueFromMaskedInput = (
  e: SyntheticEvent & {
    /**
     * Модифицированное значение.
     */
    maskedValue: string;
    /**
     * Значение без маски.
     */
    unmaskedValue: string;
  },
): string => e.unmaskedValue;

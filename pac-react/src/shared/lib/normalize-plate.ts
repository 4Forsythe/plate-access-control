const mapToLatin: Record<string, string> = {
  А: 'A',
  В: 'B',
  Е: 'E',
  К: 'K',
  М: 'M',
  Н: 'H',
  О: 'O',
  Р: 'P',
  С: 'C',
  Т: 'T',
  У: 'Y',
  Х: 'X',
};

export function normalizePlate(plate: string): string {
  return plate
    .toUpperCase()
    .split('')
    .map((char) => {
      if (mapToLatin[char]) {
        return mapToLatin[char];
      }
      return char;
    })
    .join('');
}

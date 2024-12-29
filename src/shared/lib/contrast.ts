const luminance = (color: string) => {
  color = color.replace("#", "").toUpperCase();

  if (color.length !== 6) {
    throw new Error("Invalid hex color format.");
  }

  const rgb = color.match(/\w\w/g)!.map((hex) => parseInt(hex, 16) / 255);
  const [r, g, b] = rgb;

  const a = [r, g, b].map((v) =>
    v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
  );
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

// Функция для вычисления контраста
const contrast = (color1: string, color2: string) => {
  const lum1 = luminance(color1);
  const lum2 = luminance(color2);
  const ratio = (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
  return ratio;
};

export const getContrastColor = (bg: string) => {
  if (!/^#[0-9A-F]{6}$/i.test(bg)) {
    throw new Error("Invalid hex color format.");
  }

  const calculatedContrast = contrast(bg, "#ffffff");

  // Возвращаем контрастный цвет
  if (calculatedContrast < 4.5) {
    return "#000000"; // Если контраст низкий, используем белый
  }

  return "#ffffff"; // Если контраст достаточен, используем черный
};

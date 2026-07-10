export type DevicePreset = {
  id: string;
  label: string;
  width: number;
  height: number;
  platform: "iphone" | "android" | "custom";
};

export const IPHONE_DEVICES: DevicePreset[] = [
  // iPhones (models that share a resolution are grouped into one entry)
  { id: "iphone-16-pro-max", label: "iPhone 16 Pro Max", width: 1320, height: 2868, platform: "iphone" },
  { id: "iphone-16-pro", label: "iPhone 16 Pro", width: 1206, height: 2622, platform: "iphone" },
  { id: "iphone-1290x2796", label: "iPhone 16 Plus / 15 Pro Max / 15 Plus / 14 Pro Max", width: 1290, height: 2796, platform: "iphone" },
  { id: "iphone-1179x2556", label: "iPhone 16 / 15 Pro / 15 / 14 Pro", width: 1179, height: 2556, platform: "iphone" },
  { id: "iphone-1284x2778", label: "iPhone 14 Plus / 13 Pro Max", width: 1284, height: 2778, platform: "iphone" },
  { id: "iphone-1170x2532", label: "iPhone 14 / 13 / 13 Pro", width: 1170, height: 2532, platform: "iphone" },
  { id: "iphone-se", label: "iPhone SE (3rd gen)", width: 750, height: 1334, platform: "iphone" },

  // iPad (portrait, models that share a resolution are grouped into one entry)
  { id: "ipad-pro-13-m4", label: "iPad Pro 13\" (M4)", width: 2064, height: 2752, platform: "iphone" },
  { id: "ipad-pro-11-m4", label: "iPad Pro 11\" (M4)", width: 1668, height: 2420, platform: "iphone" },
  { id: "ipad-2048x2732", label: "iPad Pro 12.9\" (M2) / iPad Air 13\" (M2/M3)", width: 2048, height: 2732, platform: "iphone" },
  { id: "ipad-pro-11-m2", label: "iPad Pro 11\" (M2)", width: 1668, height: 2388, platform: "iphone" },
  { id: "ipad-1640x2360", label: "iPad Air 11\" (M2/M3) / iPad Air 5 / iPad 10th gen", width: 1640, height: 2360, platform: "iphone" },
  { id: "ipad-a16-11", label: "iPad (A16, 11th gen)", width: 1620, height: 2160, platform: "iphone" },
  { id: "ipad-mini-a17", label: "iPad mini (A17 Pro / 6th gen)", width: 1488, height: 2266, platform: "iphone" },

  { id: "iphone-custom", label: "Custom width x height", width: 1179, height: 2556, platform: "custom" },
];

export const ANDROID_DEVICES: DevicePreset[] = [
  // Custom (kept at the top for Android)
  { id: "android-custom", label: "Custom width x height", width: 1080, height: 2400, platform: "custom" },

  // Samsung Galaxy
  { id: "galaxy-s25-ultra", label: "Samsung Galaxy S25 Ultra", width: 1440, height: 3120, platform: "android" },
  { id: "galaxy-s25-plus", label: "Samsung Galaxy S25+", width: 1440, height: 3120, platform: "android" },
  { id: "galaxy-s25", label: "Samsung Galaxy S25", width: 1080, height: 2340, platform: "android" },
  { id: "galaxy-s24-ultra", label: "Samsung Galaxy S24 Ultra", width: 1440, height: 3120, platform: "android" },
  { id: "galaxy-s24-plus", label: "Samsung Galaxy S24+", width: 1440, height: 3120, platform: "android" },
  { id: "galaxy-s24", label: "Samsung Galaxy S24", width: 1080, height: 2340, platform: "android" },
  { id: "galaxy-s23-ultra", label: "Samsung Galaxy S23 Ultra", width: 1440, height: 3088, platform: "android" },
  { id: "galaxy-s23", label: "Samsung Galaxy S23", width: 1080, height: 2340, platform: "android" },
  { id: "galaxy-z-fold6", label: "Samsung Galaxy Z Fold 6 (cover)", width: 968, height: 2376, platform: "android" },
  { id: "galaxy-z-flip6", label: "Samsung Galaxy Z Flip 6", width: 1080, height: 2640, platform: "android" },
  { id: "galaxy-a55", label: "Samsung Galaxy A55", width: 1080, height: 2340, platform: "android" },

  // Google Pixel
  { id: "pixel-9-pro-xl", label: "Google Pixel 9 Pro XL", width: 1344, height: 2992, platform: "android" },
  { id: "pixel-9-pro", label: "Google Pixel 9 Pro", width: 1280, height: 2856, platform: "android" },
  { id: "pixel-9", label: "Google Pixel 9", width: 1080, height: 2424, platform: "android" },
  { id: "pixel-8-pro", label: "Google Pixel 8 Pro", width: 1344, height: 2992, platform: "android" },
  { id: "pixel-8", label: "Google Pixel 8", width: 1080, height: 2400, platform: "android" },
  { id: "pixel-7-pro", label: "Google Pixel 7 Pro", width: 1440, height: 3120, platform: "android" },
  { id: "pixel-7", label: "Google Pixel 7", width: 1080, height: 2400, platform: "android" },
  { id: "pixel-6a", label: "Google Pixel 6a", width: 1080, height: 2400, platform: "android" },

  // Xiaomi / Redmi / Poco
  { id: "xiaomi-14-pro", label: "Xiaomi 14 Pro", width: 1440, height: 3200, platform: "android" },
  { id: "xiaomi-14", label: "Xiaomi 14", width: 1200, height: 2670, platform: "android" },
  { id: "redmi-note-13-pro", label: "Redmi Note 13 Pro", width: 1220, height: 2712, platform: "android" },
  { id: "redmi-note-12", label: "Redmi Note 12", width: 1080, height: 2400, platform: "android" },
  { id: "poco-f6-pro", label: "Poco F6 Pro", width: 1440, height: 3200, platform: "android" },

  // OnePlus
  { id: "oneplus-12", label: "OnePlus 12", width: 1440, height: 3168, platform: "android" },
  { id: "oneplus-11", label: "OnePlus 11", width: 1440, height: 3216, platform: "android" },
  { id: "oneplus-nord-4", label: "OnePlus Nord 4", width: 1240, height: 2772, platform: "android" },

  // Nubia / RedMagic
  { id: "nubia-z60-ultra", label: "Nubia Z60 Ultra", width: 1116, height: 2480, platform: "android" },
  { id: "redmagic-9-pro", label: "RedMagic 9 Pro", width: 1116, height: 2480, platform: "android" },

  // ZTE
  { id: "zte-axon-40-ultra", label: "ZTE Axon 40 Ultra", width: 1116, height: 2480, platform: "android" },

  // Motorola
  { id: "moto-edge-50-pro", label: "Motorola Edge 50 Pro", width: 1220, height: 2712, platform: "android" },
  { id: "moto-g84", label: "Motorola Moto G84", width: 1080, height: 2400, platform: "android" },

  // Asus
  { id: "asus-rog-8", label: "Asus ROG Phone 8", width: 1080, height: 2400, platform: "android" },
  { id: "asus-zenfone-11", label: "Asus Zenfone 11 Ultra", width: 1080, height: 2400, platform: "android" },

  // Generic resolutions
  { id: "android-1440x3200", label: "Generic 1440 x 3200 (QHD+)", width: 1440, height: 3200, platform: "android" },
  { id: "android-1080x2400", label: "Generic 1080 x 2400 (FHD+)", width: 1080, height: 2400, platform: "android" },
  { id: "android-1080x1920", label: "Generic 1080 x 1920 (FHD)", width: 1080, height: 1920, platform: "android" },
];

export const DEFAULT_IPHONE =
  IPHONE_DEVICES.find((d) => d.id === "iphone-16-pro") ?? IPHONE_DEVICES[0];
export const DEFAULT_ANDROID =
  ANDROID_DEVICES.find((d) => d.id === "galaxy-s24-ultra") ??
  ANDROID_DEVICES.find((d) => d.platform === "android") ??
  ANDROID_DEVICES[0];
export const DEFAULT_DEVICE = DEFAULT_IPHONE;

export function devicesForPlatform(platform: "iphone" | "android"): DevicePreset[] {
  return platform === "iphone" ? IPHONE_DEVICES : ANDROID_DEVICES;
}

export type DevicePreset = {
  id: string;
  label: string;
  width: number;
  height: number;
  platform: "iphone" | "android" | "custom";
};

export const IPHONE_DEVICES: DevicePreset[] = [
  { id: "iphone-16-pro-max", label: "iPhone 16 Pro Max", width: 1320, height: 2868, platform: "iphone" },
  { id: "iphone-16-pro", label: "iPhone 16 Pro", width: 1206, height: 2622, platform: "iphone" },
  { id: "iphone-16-plus", label: "iPhone 16 Plus", width: 1290, height: 2796, platform: "iphone" },
  { id: "iphone-16", label: "iPhone 16", width: 1179, height: 2556, platform: "iphone" },
  { id: "iphone-15-pro-max", label: "iPhone 15 Pro Max", width: 1290, height: 2796, platform: "iphone" },
  { id: "iphone-15-pro", label: "iPhone 15 Pro", width: 1179, height: 2556, platform: "iphone" },
  { id: "iphone-15-plus", label: "iPhone 15 Plus", width: 1290, height: 2796, platform: "iphone" },
  { id: "iphone-15", label: "iPhone 15", width: 1179, height: 2556, platform: "iphone" },
  { id: "iphone-14-pro-max", label: "iPhone 14 Pro Max", width: 1290, height: 2796, platform: "iphone" },
  { id: "iphone-14-pro", label: "iPhone 14 Pro", width: 1179, height: 2556, platform: "iphone" },
  { id: "iphone-14-plus", label: "iPhone 14 Plus", width: 1284, height: 2778, platform: "iphone" },
  { id: "iphone-14", label: "iPhone 14", width: 1170, height: 2532, platform: "iphone" },
  { id: "iphone-13-pro-max", label: "iPhone 13 Pro Max", width: 1284, height: 2778, platform: "iphone" },
  { id: "iphone-13", label: "iPhone 13 / 13 Pro", width: 1170, height: 2532, platform: "iphone" },
  { id: "iphone-se", label: "iPhone SE (3rd gen)", width: 750, height: 1334, platform: "iphone" },
];

export const ANDROID_DEVICES: DevicePreset[] = [
  { id: "android-1440x3200", label: "1440 × 3200 (QHD+)", width: 1440, height: 3200, platform: "android" },
  { id: "android-1440x3120", label: "1440 × 3120", width: 1440, height: 3120, platform: "android" },
  { id: "android-1080x2400", label: "1080 × 2400 (FHD+)", width: 1080, height: 2400, platform: "android" },
  { id: "android-1080x2340", label: "1080 × 2340", width: 1080, height: 2340, platform: "android" },
  { id: "android-1080x2280", label: "1080 × 2280", width: 1080, height: 2280, platform: "android" },
  { id: "android-1080x1920", label: "1080 × 1920 (FHD)", width: 1080, height: 1920, platform: "android" },
  { id: "android-custom", label: "Custom width × height", width: 1080, height: 2400, platform: "custom" },
];

export const ALL_DEVICES: DevicePreset[] = [...IPHONE_DEVICES, ...ANDROID_DEVICES];

export function getDeviceById(id: string): DevicePreset | undefined {
  return ALL_DEVICES.find((d) => d.id === id);
}

export const DEFAULT_DEVICE = IPHONE_DEVICES[3]; // iPhone 16

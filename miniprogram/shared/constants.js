const WEATHER_TYPES = Object.freeze([
  Object.freeze({ code: 'SUNNY', label: '晴天', labelEn: 'Sunny' }),
  Object.freeze({ code: 'CLOUDY', label: '多云', labelEn: 'Cloudy' }),
  Object.freeze({ code: 'OVERCAST', label: '阴天', labelEn: 'Overcast' }),
  Object.freeze({ code: 'LIGHT_RAIN', label: '小雨', labelEn: 'Light Rain' }),
  Object.freeze({ code: 'WIND_RAIN', label: '风雨', labelEn: 'Wind and Rain' }),
  Object.freeze({ code: 'HEAVY_RAIN', label: '暴雨', labelEn: 'Heavy Rain' }),
  Object.freeze({ code: 'TYPHOON', label: '台风', labelEn: 'Typhoon' }),
]);
const JOURNAL_TAGS = Object.freeze([
  Object.freeze({ id: 'STUDY', label: '课业' }),
  Object.freeze({ id: 'REST', label: '休息' }),
  Object.freeze({ id: 'EXERCISE', label: '运动' }),
  Object.freeze({ id: 'SOCIAL', label: '社交' }),
  Object.freeze({ id: 'ALONE_TIME', label: '独处' }),
  Object.freeze({ id: 'ANTICIPATION', label: '期待' }),
  Object.freeze({ id: 'TIREDNESS', label: '疲惫' }),
  Object.freeze({ id: 'CALM', label: '平静' }),
]);
const LIMITS = Object.freeze({
  journalTextCodePoints: 1000,
  journalTags: 5,
  newEntryWindowDays: 30,
  correctionTextCodePoints: 200,
  taskSuggestions: 3,
  staticStickers: 6,
  staticBackgrounds: 2,
  minimumTrendEntries: 3,
  exportCredentialSeconds: 300,
  exportFileHours: 24,
});
const DEFAULT_PREFERENCES = Object.freeze({ cardTextPreview: false, decorationsEnabled: true });
module.exports = {
  APP_NAME: 'MoodSky',
  APP_VERSION: '0.1.0',
  API_VERSION: '1',
  CLOUD_FUNCTION_NAME: 'moodsky',
  BUSINESS_TIMEZONE: 'Asia/Shanghai',
  WEATHER_TYPES,
  JOURNAL_TAGS,
  LIMITS,
  DEFAULT_PREFERENCES,
  REVIEW_WINDOWS: Object.freeze([7, 30, 90]),
  ACCOUNT_STATUS: Object.freeze({ ACTIVE: 'active', DISABLED: 'disabled' }),
  TASK_STATUS: Object.freeze({
    SELECTED: 'selected',
    COMPLETED: 'completed',
    SKIPPED: 'skipped',
    REPLACED: 'replaced',
  }),
};

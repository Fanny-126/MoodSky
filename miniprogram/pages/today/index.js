const environment = require('../../config/environment.local');
const { WEATHER_TYPES, JOURNAL_TAGS } = require('../../shared/constants');
const journal = require('../../modules/journal/service');
const { createJournalController } = require('../../modules/journal/controller');
const {
  getSharedDemoService,
  clearSharedDemoService,
} = require('../../modules/journal/demo-session');

const WEATHER_ICONS = {
  SUNNY: '☀️',
  CLOUDY: '⛅',
  OVERCAST: '☁️',
  LIGHT_RAIN: '🌦️',
  WIND_RAIN: '🌧️',
  HEAVY_RAIN: '⛈️',
  TYPHOON: '🌀',
};
const WEATHER_LABEL_MAP = WEATHER_TYPES.reduce((map, item) => {
  map[item.code] = item.label;
  return map;
}, {});
const TAG_LABEL_MAP = JOURNAL_TAGS.reduce((map, item) => {
  map[item.id] = item.label;
  return map;
}, {});

Page({
  data: { phase: 'loading', recordStatus: '正在读取', loaded: false },

  onLoad() {
    const isDemo = environment.journalDemo === true && environment.cloudEnabled === false;
    this._demo = isDemo ? getSharedDemoService() : null;
    this._journal = createJournalController({
      service: this._demo || journal,
      isDemo,
      onChange: (state) => this.setData(this._mapState(state)),
    });
    this._journal.loadDate();
  },

  onShow() {
    if (!this._journal) {
      return;
    }
    this._journal.refreshToday();
    // 从 record 页返回时重新读取（record 页可能已保存或删除）
    if (this._shownOnce && !this._journal.getState().inputLocked) {
      this._journal.loadDate();
    }
    this._shownOnce = true;
  },

  onUnload() {
    if (this._journal) {
      this._journal.dispose();
    }
  },

  _mapState(state) {
    const weatherOptions = state.weatherOptions.map((item) => ({
      ...item,
      icon: WEATHER_ICONS[item.code] || '🌈',
    }));
    const selected = weatherOptions.find((item) => item.selected);
    const tagText = state.entry
      ? state.entry.tags.map((id) => TAG_LABEL_MAP[id] || id).join(' · ')
      : '';
    return {
      ...state,
      weatherOptions,
      selectedWeatherLabel: selected ? selected.label : '',
      saveButtonText: !selected
        ? '先选一种天气'
        : state.isOlderNewDate
          ? '超出可新建范围'
          : '保存今天的天气',
      entryWeatherIcon: state.entry ? WEATHER_ICONS[state.entry.weather] || '🌈' : '',
      entryWeatherLabel: state.entry ? WEATHER_LABEL_MAP[state.entry.weather] || '' : '',
      entryTagText: tagText,
      isToday: state.date === state.today,
    };
  },

  onWeather(event) {
    this._journal.chooseWeather(event.currentTarget.dataset.code);
  },
  onSave() {
    return this._journal.save();
  },
  onRetry() {
    return this._journal.retry();
  },
  onReload() {
    return this._journal.loadDate();
  },
  onDate(event) {
    return this._journal.loadDate(event.detail.value);
  },
  onPreviousDate() {
    return this._journal.moveDate(-1);
  },
  onNextDate() {
    return this._journal.moveDate(1);
  },
  onToday() {
    return this._journal.moveDate('today');
  },
  // 想写几句？→ 私人记录页（带当前选中天气）
  onWrite() {
    const state = this._journal.getState();
    const weather = state.entry ? '' : state.weather;
    const url =
      '/pages/record/index?date=' + state.date + (weather ? '&weather=' + weather : '');
    wx.navigateTo({ url });
  },
  // 轻选择入口（YF05，待 Qizhen Chen 任务页接入）
  onNeeds() {
    wx.showToast({ title: '即将开放', icon: 'none' });
  },
  // 修改今天这条记录 → 私人记录页
  onEditEntry() {
    const state = this._journal.getState();
    if (state.entry) {
      wx.navigateTo({ url: '/pages/record/index?date=' + state.date });
    }
  },
  onDemoFailure() {
    if (this._demo && this._journal.getState().canSave) {
      this._demo.failNext('after-save');
      return this._journal.save();
    }
  },
  onDemoClear() {
    clearSharedDemoService();
    this._journal.reset();
    this._journal.loadDate();
  },
});
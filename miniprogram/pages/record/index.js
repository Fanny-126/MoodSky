const environment = require('../../config/environment.local');
const journal = require('../../modules/journal/service');
const { createJournalController } = require('../../modules/journal/controller');
const { getSharedDemoService } = require('../../modules/journal/demo-session');

const ICONS = {
  SUNNY: '☀️',
  CLOUDY: '⛅',
  OVERCAST: '☁️',
  LIGHT_RAIN: '🌦️',
  WIND_RAIN: '🌧️',
  HEAVY_RAIN: '⛈️',
  TYPHOON: '🌀',
};

Page({
  data: { phase: 'loading', recordStatus: '正在读取', loaded: false },

  onLoad(query) {
    const isDemo = environment.journalDemo === true && environment.cloudEnabled === false;
    this._demo = isDemo ? getSharedDemoService() : null;
    this._journal = createJournalController({
      service: this._demo || journal,
      isDemo,
      onChange: (state) =>
        this.setData({
          ...state,
          weatherOptions: state.weatherOptions.map((item) => ({
            ...item,
            icon: ICONS[item.code] || '🌈',
          })),
          isToday: state.date === state.today,
        }),
    });
    this._pendingWeather = query && query.weather ? query.weather : '';
    const date = query && query.date ? query.date : undefined;
    this._journal.loadDate(date).then((ok) => {
      if (ok && this._pendingWeather && !this._journal.getState().entry) {
        this._journal.chooseWeather(this._pendingWeather);
      }
    });
  },

  onShow() {
    if (this._journal) {
      this._journal.refreshToday();
    }
  },

  onUnload() {
    if (this._journal) {
      this._journal.dispose();
    }
  },

  onWeather(event) {
    this._journal.chooseWeather(event.currentTarget.dataset.code);
  },
  onTag(event) {
    this._journal.toggleTag(event.currentTarget.dataset.id);
  },
  onText(event) {
    this._journal.setText(event.detail.value);
  },
  onSave() {
    return this._journal.save();
  },
  onDelete() {
    this._journal.requestDelete();
  },
  async onConfirmDelete() {
    const ok = await this._journal.confirmDelete();
    if (ok && !this._journal.getState().entry) {
      wx.navigateBack();
    }
  },
  onCancel() {
    this._journal.cancelConfirm();
  },
  onRetry() {
    return this._journal.retry();
  },
  onReload() {
    return this._journal.loadDate();
  },
});
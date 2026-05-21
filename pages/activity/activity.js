const { activityNews } = require('../../data/site');
const {
  isRegisteredActivity,
  registerActivity
} = require('../../utils/storage');

const categories = ['全部'].concat(
  activityNews.reduce((result, item) => {
    if (!result.includes(item.category)) {
      result.push(item.category);
    }
    return result;
  }, [])
);

Page({
  data: {
    heroImage: '/assets/images/temple.jpg',
    categories,
    activeCategory: '全部',
    activityNews: []
  },

  onShow() {
    this.refreshActivities();
  },

  refreshActivities(category = this.data.activeCategory) {
    const filtered = category === '全部'
      ? activityNews
      : activityNews.filter((item) => item.category === category);

    const formatted = filtered.map((item) => ({
      ...item,
      remaining: Math.max(item.capacity - item.enrolled, 0),
      registered: isRegisteredActivity(item.id)
    }));

    this.setData({
      activeCategory: category,
      activityNews: formatted
    });
  },

  previewPoster(event) {
    const { image } = event.currentTarget.dataset;
    wx.previewImage({
      current: image,
      urls: [image]
    });
  },

  switchCategory(event) {
    const { category } = event.currentTarget.dataset;
    this.refreshActivities(category);
  },

  register(event) {
    const { id } = event.currentTarget.dataset;
    const activity = activityNews.find((item) => item.id === id);
    const result = registerActivity(activity);
    wx.showToast({
      title: result.registered ? '你已报名该活动' : '报名成功',
      icon: 'none'
    });
    this.refreshActivities();
  },

  openGuide() {
    wx.switchTab({
      url: '/pages/guide/guide'
    });
  },

  openProfile() {
    wx.switchTab({
      url: '/pages/profile/profile'
    });
  }
});

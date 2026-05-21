const {
  scenicSpots,
  activityNews,
  profileStats,
  profileServices
} = require('../../data/site');
const {
  getActivityRegistrations,
  getFavoriteSpots,
  getRecentSpots
} = require('../../utils/storage');

Page({
  data: {
    coverImage: '/assets/images/stone-marker.jpg',
    profileStats,
    profileServices,
    favoriteSpots: [],
    recentSpots: [],
    registeredActivities: [],
    reminders: [
      '建议出发前先查看活动资讯与导览路线，合理安排停留时长。',
      '景点讲解按钮当前为演示模式，后续可直接接入真实音频资源。',
      '步行游览时建议关注天气变化，并优先选择舒适时段慢游古街。'
    ]
  },

  onShow() {
    const favoriteSpots = getFavoriteSpots();
    const recentSpots = getRecentSpots();
    const registeredActivities = getActivityRegistrations();
    const profileStats = [
      { label: '已浏览景点', value: `${recentSpots.length}` },
      { label: '已报名活动', value: `${registeredActivities.length}` },
      { label: '已收藏景点', value: `${favoriteSpots.length}` }
    ];

    this.setData({
      favoriteSpots,
      recentSpots,
      registeredActivities,
      profileStats
    });
  },

  openService(event) {
    const { type, target } = event.currentTarget.dataset;
    if (type === 'tab') {
      wx.switchTab({
        url: target
      });
      return;
    }

    wx.navigateTo({
      url: target
    });
  },

  openSpot(event) {
    const { id } = event.currentTarget.dataset;
    const spot = scenicSpots.find((item) => item.id === id);
    if (!spot) {
      return;
    }

    wx.navigateTo({
      url: `/pages/scenic-detail/scenic-detail?id=${id}`
    });
  },

  openActivity(event) {
    const { id } = event.currentTarget.dataset;
    const activity = activityNews.find((item) => item.id === id);
    if (!activity) {
      return;
    }

    wx.navigateTo({
      url: '/pages/activity/activity'
    });
  }
});

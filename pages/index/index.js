const {
  scenicSpots,
  routePlans,
  homeStats,
  homeBanners,
  activityNews
} = require('../../data/site');

Page({
  data: {
    homeBanners,
    homeStats,
    featuredSpots: scenicSpots.slice(0, 3),
    popularSpots: scenicSpots,
    routePlans,
    hotActivities: activityNews.slice(0, 2),
    quickServices: [
      { title: '活动报名', desc: '查看近期活动并快速报名', action: 'page', target: '/pages/activity/activity' },
      { title: '收藏景点', desc: '把感兴趣的点位保存在我的页面', action: 'tab', target: '/pages/profile/profile' },
      { title: '音频讲解', desc: '进入景点详情开启讲解播放', action: 'detail', target: 'ship-museum' }
    ],
    featureCards: [
      {
        title: '景点智能讲解',
        desc: '围绕红头船、古港遗址与侨乡建筑提供重点讲解内容。',
        action: 'detail',
        target: 'ship-museum'
      },
      {
        title: '全域游玩导览',
        desc: '按半日游、一日游、亲子研学等场景组织路线。',
        action: 'tab',
        target: '/pages/guide/guide'
      },
      {
        title: '地域文化科普',
        desc: '系统梳理红头船文化、侨乡文脉和古港建筑知识。',
        action: 'tab',
        target: '/pages/culture/culture'
      },
      {
        title: '特色风物推介',
        desc: '整合在地茶饮、文创手作与生活风物体验。',
        action: 'tab',
        target: '/pages/specialty/specialty'
      },
      {
        title: '活动资讯',
        desc: '查看近期讲解专场、夜游活动与亲子研学资讯。',
        action: 'page',
        target: '/pages/activity/activity'
      },
      {
        title: '我的页面',
        desc: '集中查看常用服务入口、活动提醒与出行建议。',
        action: 'tab',
        target: '/pages/profile/profile'
      }
    ]
  },

  handleFeatureTap(event) {
    const { action, target } = event.currentTarget.dataset;
    this.handleAction(action, target);
  },

  handleBannerTap(event) {
    const { action, target } = event.currentTarget.dataset;
    this.handleAction(action, target);
  },

  handleQuickTap(event) {
    const { action, target } = event.currentTarget.dataset;
    this.handleAction(action, target);
  },

  handleAction(action, target) {
    if (action === 'tab') {
      wx.switchTab({ url: target });
      return;
    }

    if (action === 'page') {
      wx.navigateTo({ url: target });
      return;
    }

    wx.navigateTo({
      url: `/pages/scenic-detail/scenic-detail?id=${target}`
    });
  },

  openSpot(event) {
    const { id } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/scenic-detail/scenic-detail?id=${id}`
    });
  },

  openGuide() {
    wx.switchTab({
      url: '/pages/guide/guide'
    });
  },

  openActivity() {
    wx.navigateTo({
      url: '/pages/activity/activity'
    });
  },

  openPopularSpot(event) {
    const { id } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/scenic-detail/scenic-detail?id=${id}`
    });
  }
});

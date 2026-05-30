const {
  scenicSpots,
  routePlans,
  homeStats,
  newHomeBanners,
  activityNews,
  cultureTimeline,
  todayData
} = require('../../data/site');

function getTagClass(tag) {
  if (tag.indexOf('亲子') >= 0 || tag.indexOf('家庭') >= 0 || tag.indexOf('研学') >= 0) return 'tag-family';
  if (tag.indexOf('拍照') >= 0 || tag.indexOf('摄影') >= 0) return 'tag-photo';
  if (tag.indexOf('夜') >= 0) return 'tag-night';
  if (tag.indexOf('打卡') >= 0 || tag.indexOf('热门') >= 0) return 'tag-hot';
  return '';
}

function mapSpotsWithTags(spots) {
  return spots.map(function(spot) {
    return Object.assign({}, spot, {
      tagList: (spot.tags || []).map(function(tag) {
        return { text: tag, cssClass: getTagClass(tag) };
      })
    });
  });
}

Page({
  onReady() {
    var that = this;
    var observer = wx.createIntersectionObserver(this, { observeAll: true });
    observer.relativeToViewport({ bottom: 60 }).observe('.scroll-fade', function(res) {
      if (res.intersectionRatio > 0) {
        that.setData({ ['anim_' + res.id]: true });
      }
    });
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 });
    }
    this.startTypewriter();
  },

  startTypewriter() {
    var messages = [
      '我是古港文化助手，可以为你讲解红头船历史、推荐游玩路线和特色风物~',
      '樟林古港是海上丝绸之路的重要节点，想了解哪段故事？',
      '今日适合漫步古港遗址，体验侨乡建筑与工夫茶文化'
    ];
    var that = this;
    var currentMsg = messages[Math.floor(Math.random() * messages.length)];
    var index = 0;
    that.setData({ typewriterFull: currentMsg, typewriterText: '' });
    clearInterval(that._typeInterval);
    that._typeInterval = setInterval(function() {
      if (index < currentMsg.length) {
        index++;
        that.setData({ typewriterText: currentMsg.slice(0, index) });
      } else {
        clearInterval(that._typeInterval);
      }
    }, 60);
  },

  onShareAppMessage() {
    return { title: '樟林归舟 — 深度整合红头船文化、侨乡文脉与古港遗址', path: '/pages/index/index' };
  },

  data: {
    homeBanners: newHomeBanners,
    homeStats,
    featuredSpots: mapSpotsWithTags(scenicSpots.slice(0, 4)),
    popularSpots: mapSpotsWithTags(scenicSpots).map(({ id, name, image, summary, tagList }) => ({
      id, name, image, summary, tagList
    })),
    routePlans,
    hotActivities: activityNews.slice(0, 2),
    quickServices: [
      { title: '活动报名', icon: '🎯', desc: '查看近期活动并快速报名', action: 'page', target: '/pages/activity/activity' },
      { title: '收藏景点', icon: '⭐', desc: '把感兴趣的点位保存在我的页面', action: 'tab', target: '/pages/profile/profile' },
      { title: '音频讲解', icon: '🎧', desc: '进入景点详情开启讲解播放', action: 'detail', target: 'ship-museum' },
      { title: '导览路线', icon: '🗺️', desc: '查看半日游、一日游等推荐路线', action: 'tab', target: '/pages/guide/guide' }
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
    ],
    cultureTimeline,
    todayData,
    mapMarkers: [
      { id: 1, latitude: 23.462, longitude: 116.781, width: 30, height: 30, title: '红头船展示点', callout: { content: '红头船文化展示点', padding: 8, borderRadius: 8, display: 'ALWAYS', bgColor: '#8b3a1a', color: '#fff' } },
      { id: 2, latitude: 23.460, longitude: 116.779, width: 30, height: 30, title: '古港遗址', callout: { content: '古港遗址游览区', padding: 8, borderRadius: 8, display: 'ALWAYS', bgColor: '#8b3a1a', color: '#fff' } },
      { id: 3, latitude: 23.464, longitude: 116.783, width: 30, height: 30, title: '侨乡建筑群', callout: { content: '侨乡古建筑群', padding: 8, borderRadius: 8, display: 'ALWAYS', bgColor: '#8b3a1a', color: '#fff' } },
      { id: 4, latitude: 23.459, longitude: 116.777, width: 30, height: 30, title: '侨史记忆长廊', callout: { content: '侨史记忆长廊', padding: 8, borderRadius: 8, display: 'ALWAYS', bgColor: '#8b3a1a', color: '#fff' } }
    ],

    showBackTop: false,
    typewriterText: '',
    typewriterFull: '',
    anim_sf_ship: true,
    anim_sf_quick: true,
    anim_sf_timeline: true,
    anim_sf_dashboard: true
  },

  handleActionTap(event) {
    const { action, target } = event.currentTarget.dataset;
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

  handleStatTap(event) {
    const { target } = event.currentTarget.dataset;
    if (target.startsWith('/pages/')) {
      wx.switchTab({ url: target });
    } else {
      wx.pageScrollTo({ selector: '#' + target, duration: 300 });
    }
  },

  openSpot(event) {
    const { id } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/scenic-detail/scenic-detail?id=${id}`
    });
  },

  goRandomSpot() {
    wx.navigateTo({
      url: '/pages/ship-3d/ship-3d'
    });
  },

  openGuide(event) {
    const { routeId } = event.currentTarget.dataset;
    const app = getApp();
    app.globalData.activeRouteId = routeId;
    wx.switchTab({ url: '/pages/guide/guide' });
  },

  openActivity() {
    wx.navigateTo({ url: '/pages/activity/activity' });
  },

  openAiGuide() {
    wx.showToast({ title: 'AI向导加载中...', icon: 'loading', duration: 600 });
    setTimeout(function() {
      wx.navigateTo({ url: '/pages/ai-chat/ai-chat' });
    }, 700);
  },

  aiQuickAsk(event) {
    var q = event.currentTarget.dataset.q;
    wx.showToast({ title: 'AI向导加载中...', icon: 'loading', duration: 600 });
    setTimeout(function() {
      wx.navigateTo({ 
        url: '/pages/ai-chat/ai-chat?question=' + encodeURIComponent(q)
      });
    }, 700);
  },

  previewImage(event) {
    const { src } = event.currentTarget.dataset;
    const fs = wx.getFileSystemManager();
    fs.readFile({
      filePath: src,
      success: (res) => {
        const tempPath = `${wx.env.USER_DATA_PATH}/preview_${Date.now()}.jpg`;
        fs.writeFile({
          filePath: tempPath,
          data: res.data,
          success: () => {
            wx.previewImage({ current: tempPath, urls: [tempPath] });
          }
        });
      }
    });
  },

  rotateShip() {
    wx.showToast({ title: '旋转查看红头船', icon: 'none', duration: 1200 });
    var that = this;
    that.setData({ shipRotating: true });
    setTimeout(function() { that.setData({ shipRotating: false }); }, 1200);
  },

  onMarkerTap(event) {
    var markerId = event.detail.markerId;
    var spotMap = { 1: 'ship-museum', 2: 'port-ruins', 3: 'historic-arcade', 4: 'overseas-memory' };
    var spotId = spotMap[markerId];
    if (spotId) {
      wx.navigateTo({ url: '/pages/scenic-detail/scenic-detail?id=' + spotId });
    }
  },

  onPageScroll(event) {
    this.setData({ showBackTop: event.scrollTop > 400 });
  },

  onPullDownRefresh() {
    this.setData({
      homeBanners: newHomeBanners,
      featuredSpots: mapSpotsWithTags(scenicSpots.slice(0, 4)),
      hotActivities: activityNews.slice(0, 2)
    });
    wx.stopPullDownRefresh();
  },

  scrollToTop() {
    wx.pageScrollTo({ scrollTop: 0, duration: 300 });
  }
});

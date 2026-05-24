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
    return { title: '樟林古港文旅服务 — 深度整合红头船文化、侨乡文脉与古港遗址', path: '/pages/index/index' };
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
    shipFeatures: [
      { icon: '🚢', label: '船型', value: '广式红头船' },
      { icon: '📏', label: '船长', value: '约 28 米' },
      { icon: '🌊', label: '航线', value: '东南亚多埠' },
      { icon: '📜', label: '年代', value: '清朝鼎盛期' }
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
      wx.showModal({
        title: 'AI 古港助手',
        content: '你好！我是樟林古港专属AI向导，可以帮你推荐路线、讲解历史、查询活动。请选择下方问题快速体验，或点击"进入对话"开启完整向导。',
        showCancel: false,
        confirmText: '好的'
      });
    }, 700);
  },

  aiQuickAsk(event) {
    var q = event.currentTarget.dataset.q;
    var answers = {
      '推荐一条半日游路线': '为你推荐「古港半日轻游」：从红头船文化展示点出发，经古港遗址漫步，再到侨乡古建筑群打卡，全程约4小时，节奏轻松，适合首次到访游客。可在导览页查看详细路线。',
      '红头船有什么历史故事': '红头船是潮汕地区标志性的海贸船型，因船头饰以朱红色而得名。樟林古港在清代是粤东第一大港，红头船往来于东南亚各埠，带动了侨乡文化、海贸文明和跨海移民的历史进程。',
      '古港附近有什么美食': '樟林古港周边以潮汕风味为主：工夫茶体验、潮式点心、古港茶配、以及各类地方小吃。推荐你在特色风物页面查看更多美食和伴手礼推荐。',
      '最近有什么活动可以参加': '近期活动包括：周末古港沉浸式讲解专场（每周六10:00）、古街夜游与建筑灯影体验（每周六19:30）、亲子研学打卡任务（节假日全天）。可在活动资讯页面查看详情并报名。'
    };
    var answer = answers[q] || '感谢你的提问！AI向导正在努力学习更多古港知识，请稍后再试。';
    wx.showToast({ title: 'AI思考中...', icon: 'loading', duration: 800 });
    setTimeout(function() {
      wx.showModal({
        title: 'AI 古港助手',
        content: answer,
        showCancel: false,
        confirmText: '知道了'
      });
    }, 900);
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

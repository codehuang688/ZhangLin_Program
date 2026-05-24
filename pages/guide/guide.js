const { routePlans, nearbyServices } = require('../../data/site');

function getAiTip(hour) {
  if (hour >= 5 && hour < 10) {
    return { icon: '🌅', text: '清晨古港光影柔和，推荐"人文摄影打卡线"，日出至上午是拍摄建筑细节的黄金时段。' };
  }
  if (hour >= 10 && hour < 14) {
    return { icon: '🚶', text: '上午游客较少，推荐优先游览侨乡建筑群和红头船展示点，体验更从容。' };
  }
  if (hour >= 14 && hour < 17) {
    return { icon: '☀️', text: '下午光线温暖，适合古街漫步与工夫茶体验，"在地风味寻访线"正是好时候。' };
  }
  if (hour >= 17 && hour < 20) {
    return { icon: '🌇', text: '黄昏至傍晚是古港最美时刻，推荐切换"古港夜游光影线"，建筑灯光与夕阳同框。' };
  }
  return { icon: '🌙', text: '夜间古港氛围静谧，适合漫步古街感受灯影夜景，或在茶空间结束一天的旅程。' };
}

function getRouteMapData(route) {
  var baseLat = 23.461;
  var baseLng = 116.780;
  var stops = route.stops || [];
  var markers = stops.map(function(s, i) {
    return {
      id: i,
      latitude: baseLat + i * 0.0008,
      longitude: baseLng + i * 0.0006,
      width: 30,
      height: 30,
      title: s.title,
      callout: { content: s.title, padding: 6, borderRadius: 6, display: 'BYCLICK', bgColor: '#8b3a1a', color: '#fff' },
      label: { content: (i + 1).toString(), color: '#fff', fontSize: 12 }
    };
  });
  var points = markers.map(function(m) {
    return { latitude: m.latitude, longitude: m.longitude };
  });
  return { markers: markers, polyline: [{ points: points, color: '#c89050', width: 4, dottedLine: false, arrowLine: true }] };
}

Page({
  onShareAppMessage() {
    return { title: '樟林古港 — 全域智慧导览，8条主题路线随心选', path: '/pages/guide/guide' };
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 });
    }
    var app = getApp();
    var routeId = app.globalData.activeRouteId;
    var activeRoute = this.data.activeRoute;
    if (routeId) {
      activeRoute = this.data.routePlans.find(function(r) { return r.id === routeId; });
      app.globalData.activeRouteId = null;
    }
    if (activeRoute) {
      var mapData = getRouteMapData(activeRoute);
      this.setData({
        activeRouteId: activeRoute.id,
        activeRoute: activeRoute,
        mapMarkers: mapData.markers,
        mapPolyline: mapData.polyline,
        stopMarkers: mapData.markers
      });
    }
  },

  data: {
    routePlans: routePlans,
    nearbyServices: nearbyServices,
    activeRouteId: routePlans[0].id,
    activeRoute: routePlans[0],
    aiTip: getAiTip(new Date().getHours()),
    mapLat: 23.461,
    mapLng: 116.780,
    mapMarkers: [],
    mapPolyline: [],
    stopMarkers: [],
    showStopDetail: false,
    detailStop: null,
    travelTips: [
      '优先选择上午时段进入古港遗址与建筑片区，步行体验更舒适。',
      '首次到访建议从红头船文化展示点开始，先建立整体文化认知。',
      '如为亲子出行，可优先选择研学体验线，内容更集中也更易理解。',
      '夜游线路建议携带便携光源，注意古街部分路段照明较暗。',
      '摄影爱好者推荐清晨或黄昏时段，光线角度最适合出片。'
    ]
  },

  switchRoute(event) {
    var id = event.currentTarget.dataset.id;
    var activeRoute = this.data.routePlans.find(function(r) { return r.id === id; });
    var mapData = getRouteMapData(activeRoute);
    this.setData({
      activeRouteId: id,
      activeRoute: activeRoute,
      mapMarkers: mapData.markers,
      mapPolyline: mapData.polyline,
      stopMarkers: mapData.markers,
      showStopDetail: false
    });
  },

  onMarkerTap(event) {
    var markerId = event.detail.markerId;
    var stop = this.data.activeRoute.stops[markerId];
    if (stop) {
      this.setData({ showStopDetail: true, detailStop: stop });
    }
  },

  closeStopDetail() {
    this.setData({ showStopDetail: false, detailStop: null });
  },

  onShowLocation() {
    var mapCtx = wx.createMapContext('guideMap', this);
    mapCtx.moveToLocation();
  },

  startVoiceGuide() {
    wx.showToast({ title: '语音讲解加载中...', icon: 'loading', duration: 800 });
    var that = this;
    setTimeout(function() {
      wx.showModal({
        title: '🎙️ 语音讲解',
        content: '正在为你播放「' + that.data.activeRoute.name + '」的全程语音导览。在完整版中将支持潮汕话、普通话双语切换，并可分段收听各点位讲解。',
        showCancel: false,
        confirmText: '好的'
      });
    }, 900);
  },

  previewImage(event) {
    var src = event.currentTarget.dataset.src;
    var fs = wx.getFileSystemManager();
    fs.readFile({
      filePath: src,
      success: function(res) {
        var tempPath = wx.env.USER_DATA_PATH + '/preview_' + Date.now() + '.jpg';
        fs.writeFile({
          filePath: tempPath,
          data: res.data,
          success: function() {
            wx.previewImage({ current: tempPath, urls: [tempPath] });
          }
        });
      }
    });
  },

  onPageScroll(event) {
    this.setData({ showBackTop: event.scrollTop > 400 });
  },

  scrollToTop() {
    wx.pageScrollTo({ scrollTop: 0, duration: 300 });
  }
});
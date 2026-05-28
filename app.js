App({
  globalData: {
    brandName: '樟林归舟',
    serviceNotice: '当前版本为静态演示版，可直接在微信开发者工具中预览页面与交互。',
    activeRouteId: null,
    systemInfo: null
  },

  onLaunch() {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.globalData.systemInfo = res;
      },
      fail: function() {
        that.globalData.systemInfo = {
          screenWidth: 375,
          screenHeight: 667,
          windowWidth: 375,
          windowHeight: 667
        };
      }
    });
  }
});

Component({
  data: {
    selected: 0,
    list: [
      {
        pagePath: '/pages/index/index',
        text: '首页',
        icon: '🏠',
        activeIcon: '🏠'
      },
      {
        pagePath: '/pages/guide/guide',
        text: '导览',
        icon: '🗺️',
        activeIcon: '🗺️'
      },
      {
        pagePath: '/pages/culture/culture',
        text: '文化',
        icon: '📚',
        activeIcon: '📚'
      },
      {
        pagePath: '/pages/specialty/specialty',
        text: '风物',
        icon: '🍵',
        activeIcon: '🍵'
      },
      {
        pagePath: '/pages/profile/profile',
        text: '我的',
        icon: '👤',
        activeIcon: '👤'
      }
    ]
  },

  methods: {
    switchTab(e) {
      const { path, index } = e.currentTarget.dataset;
      if (this.data.selected === index) return;
      wx.switchTab({ url: path });
    }
  }
});
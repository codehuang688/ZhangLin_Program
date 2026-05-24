Component({
  data: {
    selected: 0,
    list: [
      {
        pagePath: '/pages/index/index',
        text: '首页',
        iconPath: '/assets/icons/tab-home.svg',
        selectedIconPath: '/assets/icons/tab-home-active.svg'
      },
      {
        pagePath: '/pages/guide/guide',
        text: '导览',
        iconPath: '/assets/icons/tab-guide.svg',
        selectedIconPath: '/assets/icons/tab-guide-active.svg'
      },
      {
        pagePath: '/pages/culture/culture',
        text: '文化',
        iconPath: '/assets/icons/tab-culture.svg',
        selectedIconPath: '/assets/icons/tab-culture-active.svg'
      },
      {
        pagePath: '/pages/specialty/specialty',
        text: '风物',
        iconPath: '/assets/icons/tab-specialty.svg',
        selectedIconPath: '/assets/icons/tab-specialty-active.svg'
      },
      {
        pagePath: '/pages/profile/profile',
        text: '我的',
        iconPath: '/assets/icons/tab-profile.svg',
        selectedIconPath: '/assets/icons/tab-profile-active.svg'
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
const { routePlans } = require('../../data/site');

Page({
  data: {
    guideImage: '/assets/images/guide-map.jpg',
    routePlans,
    activeRouteId: routePlans[0].id,
    activeRoute: routePlans[0],
    travelTips: [
      '优先选择上午时段进入古港遗址与建筑片区，步行体验更舒适。',
      '首次到访建议从红头船文化展示点开始，先建立整体文化认知。',
      '如为亲子出行，可优先选择研学体验线，内容更集中也更易理解。'
    ]
  },

  switchRoute(event) {
    const { id } = event.currentTarget.dataset;
    const activeRoute = this.data.routePlans.find((route) => route.id === id);
    this.setData({
      activeRouteId: id,
      activeRoute
    });
  }
});

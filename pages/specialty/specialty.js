const { specialtyItems } = require('../../data/site');

const categories = ['全部'].concat(
  specialtyItems.reduce((result, item) => {
    if (!result.includes(item.category)) {
      result.push(item.category);
    }
    return result;
  }, [])
);

Page({
  data: {
    categories,
    activeCategory: '全部',
    specialtyItems,
    visibleItems: specialtyItems
  },

  switchCategory(event) {
    const { category } = event.currentTarget.dataset;
    const visibleItems = category === '全部'
      ? this.data.specialtyItems
      : this.data.specialtyItems.filter((item) => item.category === category);

    this.setData({
      activeCategory: category,
      visibleItems
    });
  }
});

const { cultureTopics } = require('../../data/site');

Page({
  data: {
    cultureTopics,
    activeTopicId: cultureTopics[0].id,
    activeTopic: cultureTopics[0]
  },

  switchTopic(event) {
    const { id } = event.currentTarget.dataset;
    const activeTopic = this.data.cultureTopics.find((topic) => topic.id === id);
    this.setData({
      activeTopicId: id,
      activeTopic
    });
  }
});

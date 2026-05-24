const { scenicSpots } = require('../../data/site');
const {
  addRecentSpot,
  isFavoriteSpot,
  toggleFavoriteSpot
} = require('../../utils/storage');

Page({
  data: {
    loading: true,
    scenicSpot: null,
    gallery: [],
    isFavorite: false,
    isAudioPlaying: false,
    activeAudioIndex: 0,
    audioProgress: 0,
    currentTimeText: '00:00',
    durationText: '00:00',
    audioMode: 'script'
  },

  onLoad(options) {
    const scenicSpot = scenicSpots.find((item) => item.id === options.id) || scenicSpots[0];
    addRecentSpot(scenicSpot);
    this.setData({
      scenicSpot,
      gallery: scenicSpot.gallery || [scenicSpot.image],
      isFavorite: isFavoriteSpot(scenicSpot.id),
      durationText: scenicSpot.audioMeta ? scenicSpot.audioMeta.duration : '00:00',
      audioMode: scenicSpot.audioUrl ? 'audio' : 'script'
    });
    wx.setNavigationBarTitle({ title: scenicSpot.name });
    setTimeout(() => this.setData({ loading: false }), 500);
  },

  onShareAppMessage() {
    const name = this.data.scenicSpot ? this.data.scenicSpot.name : '樟林古港景点';
    const id = this.data.scenicSpot ? this.data.scenicSpot.id : '';
    return {
      title: `樟林古港 — ${name}`,
      path: `/pages/scenic-detail/scenic-detail?id=${id}`
    };
  },

  onUnload() {
    this.clearAudioTimer();
    this.destroyAudio();
  },

  clearAudioTimer() {
    if (this.audioTimer) {
      clearInterval(this.audioTimer);
      this.audioTimer = null;
    }
  },

  destroyAudio() {
    if (this.innerAudioContext) {
      this.innerAudioContext.destroy();
      this.innerAudioContext = null;
    }
  },

  ensureAudioContext() {
    if (this.innerAudioContext || !this.data.scenicSpot.audioUrl) {
      return;
    }

    const context = wx.createInnerAudioContext();
    context.src = this.data.scenicSpot.audioUrl;
    context.obeyMuteSwitch = false;
    context.onPlay(() => {
      this.setData({ isAudioPlaying: true });
    });
    context.onPause(() => {
      this.setData({ isAudioPlaying: false });
    });
    context.onTimeUpdate(() => {
      const now = Date.now();
      if (this.lastAudioUpdate && now - this.lastAudioUpdate < 250) {
        return;
      }
      this.lastAudioUpdate = now;
      const duration = Math.max(1, Math.floor(context.duration || 0));
      const current = Math.floor(context.currentTime || 0);
      this.setData({
        currentTimeText: this.formatTime(current),
        durationText: this.formatTime(duration),
        audioProgress: Math.min(100, Math.round((current / duration) * 100))
      });
    });
    context.onEnded(() => {
      this.setData({
        isAudioPlaying: false,
        audioProgress: 100
      });
    });
    this.innerAudioContext = context;
  },

  formatTime(totalSeconds) {
    const minutes = `${Math.floor(totalSeconds / 60)}`.padStart(2, '0');
    const seconds = `${totalSeconds % 60}`.padStart(2, '0');
    return `${minutes}:${seconds}`;
  },

  toggleAudioGuide() {
    if (this.data.audioMode === 'audio') {
      this.toggleRealAudio();
      return;
    }

    if (this.data.isAudioPlaying) {
      this.clearAudioTimer();
      this.setData({ isAudioPlaying: false });
      wx.showToast({
        title: '已暂停讲解',
        icon: 'none'
      });
      return;
    }

    const total = this.data.scenicSpot.audioGuide.length;
    this.clearAudioTimer();
    this.setData({
      isAudioPlaying: true,
      activeAudioIndex: 0,
      audioProgress: total ? Math.round(100 / total) : 0,
      currentTimeText: '00:00',
      durationText: this.data.scenicSpot.audioMeta ? this.data.scenicSpot.audioMeta.duration : '00:00'
    });
    wx.showToast({
      title: '已开启讲解演示',
      icon: 'none'
    });
    this.audioTimer = setInterval(() => {
      const nextIndex = this.data.activeAudioIndex + 1;
      const pseudoTime = Math.min(nextIndex * 60, 599);
      if (nextIndex >= total) {
        this.clearAudioTimer();
        this.setData({
          isAudioPlaying: false,
          activeAudioIndex: total - 1,
          audioProgress: 100,
          currentTimeText: this.data.durationText
        });
        wx.showToast({
          title: '讲解已播放完成',
          icon: 'none'
        });
        return;
      }

      this.setData({
        activeAudioIndex: nextIndex,
        audioProgress: Math.round(((nextIndex + 1) / total) * 100),
        currentTimeText: this.formatTime(pseudoTime)
      });
    }, 2600);
  },

  toggleRealAudio() {
    this.ensureAudioContext();
    if (!this.innerAudioContext) {
      wx.showToast({
        title: '暂未接入真实音频',
        icon: 'none'
      });
      return;
    }

    if (this.data.isAudioPlaying) {
      this.innerAudioContext.pause();
    } else {
      this.innerAudioContext.play();
    }
  },

  nextParagraph() {
    if (this.data.audioMode === 'audio') {
      wx.showToast({
        title: '真实音频模式下请拖动进度条',
        icon: 'none'
      });
      return;
    }

    const total = this.data.scenicSpot.audioGuide.length;
    const nextIndex = Math.min(this.data.activeAudioIndex + 1, total - 1);
    this.setData({
      activeAudioIndex: nextIndex,
      audioProgress: Math.round(((nextIndex + 1) / total) * 100),
      currentTimeText: this.formatTime(nextIndex * 60)
    });
  },

  toggleFavorite() {
    const isFavorite = toggleFavoriteSpot(this.data.scenicSpot);
    this.setData({ isFavorite });
    wx.showToast({
      title: isFavorite ? '已加入收藏' : '已取消收藏',
      icon: 'none'
    });
  },

  previewGallery(event) {
    const current = event && event.currentTarget && event.currentTarget.dataset.current
      ? event.currentTarget.dataset.current
      : this.data.scenicSpot.image;
    const urls = this.data.gallery;

    const fs = wx.getFileSystemManager();
    let converted = 0;
    const tempUrls = [];
    urls.forEach((url, index) => {
      fs.readFile({
        filePath: url,
        success: (res) => {
          const tempPath = `${wx.env.USER_DATA_PATH}/gallery_${index}_${Date.now()}.jpg`;
          fs.writeFile({
            filePath: tempPath,
            data: res.data,
            success: () => {
              tempUrls[index] = tempPath;
              converted++;
              if (converted === urls.length) {
                const currentIndex = Math.max(0, urls.indexOf(current));
                wx.previewImage({ current: tempUrls[currentIndex], urls: tempUrls });
              }
            }
          });
        }
      });
    });
  }
});

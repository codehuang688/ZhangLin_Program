Page({
  data: {
    shipImages: [
      '/assets/images/2.红头船.jpg',
      '/assets/images/2.红头船1.jpg',
      '/assets/images/red-ship.jpg'
    ],
    currentIndex: 0,
    startX: 0,
    currentX: 0,
    showModal: false,
    modalTitle: '',
    modalContent: ''
  },

  computed: {
    currentImage: function() {
      return this.data.shipImages[this.data.currentIndex]
    }
  },

  onLoad() {
    this.updateCurrentImage()
  },

  updateCurrentImage: function() {
    this.setData({
      currentImage: this.data.shipImages[this.data.currentIndex]
    })
  },

  goBack: function() {
    wx.navigateBack()
  },

  onTouchStart: function(e) {
    this.data.startX = e.touches[0].clientX
    this.data.currentX = this.data.startX
  },

  onTouchMove: function(e) {
    this.data.currentX = e.touches[0].clientX
  },

  onTouchEnd: function() {
    var diff = this.data.currentX - this.data.startX
    if (diff > 50) {
      var newIndex = (this.data.currentIndex + 1) % this.data.shipImages.length
      this.setData({ currentIndex: newIndex })
      this.updateCurrentImage()
    } else if (diff < -50) {
      var newIndex = (this.data.currentIndex - 1 + this.data.shipImages.length) % this.data.shipImages.length
      this.setData({ currentIndex: newIndex })
      this.updateCurrentImage()
    }
  },

  setImage: function(e) {
    var index = e.currentTarget.dataset.index
    this.setData({ currentIndex: index })
    this.updateCurrentImage()
  },

  showDetail: function(e) {
    var type = e.currentTarget.dataset.type
    var details = {
      type: {
        title: '船型：广式红头船',
        content: '红头船是清代广东沿海地区特有的远洋帆船，因船头涂以朱红色而得名。其设计适合长途航海，是海上丝绸之路的重要交通工具。樟林古港作为粤东重要港口，是红头船的主要始发港之一。'
      },
      size: {
        title: '船长：约28米',
        content: '典型的红头船长约28米，宽约8米，载重可达数百吨。船体采用优质木材建造，结构坚固，能够抵御远洋航行中的风浪。船上设有多层甲板和货舱，可装载茶叶、丝绸、瓷器等货物。'
      },
      route: {
        title: '航线：东南亚多埠',
        content: '红头船主要航行于中国沿海与东南亚之间，往返于樟林、汕头、厦门、广州等港口与暹罗（泰国）、新加坡、马来亚等地。这条航线不仅促进了商品贸易，更承载了潮汕人下南洋的移民潮。'
      },
      era: {
        title: '年代：清朝鼎盛期',
        content: '红头船在清朝乾隆至咸丰年间最为兴盛，是樟林古港的黄金时代。这一时期，樟林港商船云集，成为粤东地区最重要的对外贸易口岸，红头船的航行网络遍及整个东南亚。'
      }
    }
    var detail = details[type]
    this.setData({
      modalTitle: detail.title,
      modalContent: detail.content,
      showModal: true
    })
  },

  closeModal: function() {
    this.setData({ showModal: false })
  },

  stopPropagation: function() {}
})
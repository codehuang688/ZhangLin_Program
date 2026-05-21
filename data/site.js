const scenicSpots = [
  {
    id: 'ship-museum',
    name: '红头船文化展示点',
    category: '文化地标',
    image: '/assets/images/red-ship.jpg',
    gallery: ['/assets/images/red-ship.jpg', '/assets/images/guide-map.jpg'],
    audioMeta: {
      narrator: '古港文化讲解员',
      duration: '03:20'
    },
    summary: '围绕船型工艺、海贸航线与出海故事，建立樟林古港文化认知的第一站。',
    duration: '40-60分钟',
    location: '古港核心游线',
    tags: ['智能讲解', '亲子研学', '文化打卡'],
    highlights: ['红头船贸易史', '船体结构展示', '侨乡航海故事'],
    audioGuide: [
      '红头船是潮汕地区极具辨识度的海贸船型，因船头与船尾多饰以朱红色而得名。',
      '樟林古港曾是粤东重要通商口岸，船只往来频繁，带动了侨乡文化与海贸文明的发展。',
      '参观时建议结合展陈中的航线图与故事板，理解“出海谋生”和“侨批家书”之间的联系。'
    ],
    tips: ['建议与文化科普页同步浏览', '适合30分钟以上深度参观']
  },
  {
    id: 'port-ruins',
    name: '古港遗址游览区',
    category: '历史遗址',
    image: '/assets/images/ancient-pier.jpg',
    gallery: ['/assets/images/ancient-pier.jpg', '/assets/images/stone-marker.jpg'],
    audioMeta: {
      narrator: '遗址慢游讲解员',
      duration: '02:45'
    },
    summary: '通过遗址肌理和空间格局，感受古港码头、街巷与商贸活动的历史现场感。',
    duration: '30-45分钟',
    location: '沿河古港片区',
    tags: ['遗址漫游', '拍照推荐', '慢游体验'],
    highlights: ['古港空间脉络', '口岸发展记忆', '街区步行体验'],
    audioGuide: [
      '这里保留着古港发展留下的空间印记，是认识樟林港埠兴衰的重要窗口。',
      '从遗址周边的道路走向和建筑布局，可以大致推测当年码头、仓储与居住之间的组织关系。',
      '建议边走边结合导览路线查看打卡节点，更容易形成完整游览动线。'
    ],
    tips: ['雨天注意地面湿滑', '推荐上午或傍晚步行体验']
  },
  {
    id: 'historic-arcade',
    name: '侨乡古建筑群',
    category: '特色建筑',
    image: '/assets/images/old-building.jpg',
    gallery: ['/assets/images/old-building.jpg', '/assets/images/nanshengli-aerial.jpg'],
    audioMeta: {
      narrator: '建筑风貌讲解员',
      duration: '03:05'
    },
    summary: '集中展现潮汕传统民居、骑楼街巷与侨乡建筑审美，是拍照与建筑观察的热门点位。',
    duration: '45分钟',
    location: '古街建筑带',
    tags: ['建筑美学', '人文摄影', '街区漫步'],
    highlights: ['潮汕建筑装饰', '骑楼街景', '中西融合痕迹'],
    audioGuide: [
      '古建筑群是侨乡历史文脉的直观载体，屋脊、门楼、灰塑和街巷尺度都很有辨识度。',
      '不少建筑细部体现了本土营造技艺与外来审美的融合，也反映出侨乡开放的文化气质。',
      '观察屋檐、山墙和门额题字，能更容易发现建筑中的时代信息。'
    ],
    tips: ['尊重居民生活空间', '推荐搭配街区慢游路线']
  },
  {
    id: 'overseas-memory',
    name: '侨史记忆长廊',
    category: '文化地标',
    image: '/assets/images/culture-corridor.jpg',
    gallery: ['/assets/images/culture-corridor.jpg', '/assets/images/temple.jpg'],
    audioMeta: {
      narrator: '侨乡故事讲解员',
      duration: '02:50'
    },
    summary: '以侨批、家书和人物故事为线索，串联侨乡家庭记忆与地方社会变迁。',
    duration: '25-35分钟',
    location: '文化展示步道',
    tags: ['侨乡故事', '文化阅读', '家庭共游'],
    highlights: ['侨批家书', '人物故事', '时代记忆'],
    audioGuide: [
      '侨史记忆长廊重在讲述“人”的故事，让游客从家庭叙事切入地方历史。',
      '侨批不仅是汇款凭证，也承载着跨海沟通的情感与责任，是侨乡文化的重要符号。',
      '建议在游览后回到文化科普页面继续查看专题内容，形成完整认知。'
    ],
    tips: ['适合家庭游客与学生团体', '可作为深度游的收束节点']
  }
];

const routePlans = [
  {
    id: 'half-day',
    name: '古港半日轻游',
    duration: '约4小时',
    suitable: '首次到访游客',
    description: '围绕文化认知、遗址漫步和建筑打卡组织动线，节奏轻松，适合短时停留。',
    stops: [
      { time: '09:00', title: '游客服务点集合', detail: '查看今日开放信息，领取电子导览建议。' },
      { time: '09:30', title: '红头船文化展示点', detail: '先建立对古港海贸文化的总体认知。' },
      { time: '10:30', title: '古港遗址游览区', detail: '沿步行线体验古港空间格局。' },
      { time: '11:20', title: '侨乡古建筑群', detail: '慢游古街并拍照记录建筑细节。' },
      { time: '12:00', title: '特色风物补给', detail: '前往风物页推荐点选择茶饮和伴手礼。' }
    ]
  },
  {
    id: 'one-day',
    name: '人文深度一日游',
    duration: '约7小时',
    suitable: '文化爱好者',
    description: '把景点讲解、侨乡故事和地方风物串成完整体验，适合想深入了解樟林古港的游客。',
    stops: [
      { time: '09:00', title: '首页推荐线路签到', detail: '查看导览建议，确认今日目标线路。' },
      { time: '09:30', title: '红头船文化展示点', detail: '重点听取海贸与船型专题讲解。' },
      { time: '10:40', title: '侨史记忆长廊', detail: '结合侨批故事理解侨乡历史脉络。' },
      { time: '12:00', title: '古街午间休憩', detail: '就近选择地方风味补给点。' },
      { time: '14:00', title: '古港遗址游览区', detail: '下午时段适合慢节奏步行观察。' },
      { time: '15:00', title: '侨乡古建筑群', detail: '通过建筑装饰细节感受时代变化。' },
      { time: '16:10', title: '文化科普专题回看', detail: '在小程序内继续查看专题内容与知识点。' }
    ]
  },
  {
    id: 'family-study',
    name: '亲子研学体验线',
    duration: '约5小时',
    suitable: '亲子家庭、研学团队',
    description: '内容以知识获取和互动观察为主，兼顾趣味性与可理解性。',
    stops: [
      { time: '09:20', title: '服务页任务开启', detail: '浏览今日适合亲子体验的点位。' },
      { time: '10:00', title: '红头船文化展示点', detail: '围绕船、海和贸易故事进行启蒙讲解。' },
      { time: '11:00', title: '侨史记忆长廊', detail: '从家书故事理解“家”和“远方”的关系。' },
      { time: '12:00', title: '本土风物体验', detail: '结合地方饮食与手作内容建立生活感受。' },
      { time: '14:00', title: '古建筑观察任务', detail: '寻找屋脊、门楼、装饰纹样等建筑元素。' }
    ]
  }
];

const cultureTopics = [
  {
    id: 'ship',
    title: '红头船与海贸记忆',
    intro: '红头船是樟林古港最具代表性的文化符号之一，也是理解地方海贸史的入口。',
    sections: [
      '红头船名称醒目、辨识度高，常被视作潮汕商贸精神与海洋文化的重要象征。',
      '船只往返于不同港埠之间，带动货物流通、人员迁移和文化交流，塑造了侨乡开放格局。',
      '在当代文旅场景中，红头船文化既是历史记忆，也是面向游客传播地方精神的核心媒介。'
    ],
    facts: ['关键词：海贸、航线、移民、通商', '适合搭配红头船展示点讲解内容一起阅读']
  },
  {
    id: 'hometown',
    title: '侨乡历史文脉',
    intro: '侨乡文化关乎人与地方的双向联结，既体现在出洋故事中，也保留在家书、建筑和生活方式里。',
    sections: [
      '樟林古港的兴起与海上贸易密切相关，许多家庭的命运也因此与海外世界发生连接。',
      '侨批、汇款、家书和口述故事，共同构成侨乡社会的情感网络与历史档案。',
      '理解侨乡历史，不只是理解远行，也是在理解地方社会如何在交流中持续生长。'
    ],
    facts: ['建议游客关注“侨批”“家书”“汇兑”这些线索', '适合亲子与研学用户阅读']
  },
  {
    id: 'architecture',
    title: '古港建筑与街巷风貌',
    intro: '街区风貌和古建筑细节保存了地方营造技艺，也反映出侨乡社会开放包容的文化气质。',
    sections: [
      '潮汕传统建筑讲究空间礼序、装饰寓意和工艺细节，是地方文化最直观的物质载体。',
      '在侨乡地区，一些建筑还能看到中西融合的元素，体现出海贸交流带来的审美变化。',
      '游客可通过观察门楼、灰塑、屋脊和窗格纹样，建立更具现场感的建筑认知。'
    ],
    facts: ['推荐与古建筑群打卡线路同步使用', '适合摄影和建筑爱好者']
  }
];

const specialtyItems = [
  {
    id: 'tea',
    name: '潮汕工夫茶体验',
    category: '在地风味',
    description: '以泡茶、闻香、品饮为核心的地方待客方式，适合作为慢游中的休憩体验。',
    recommend: '下午时段体验更放松',
    tags: ['茶文化', '社交体验', '轻休闲']
  },
  {
    id: 'pastry',
    name: '潮式点心与古港茶配',
    category: '在地风味',
    description: '结合地方点心与茶饮补给，适合短时游览中的能量补充和伴手礼挑选。',
    recommend: '适合半日游收尾补给',
    tags: ['伴手礼', '美食推荐', '游客补给']
  },
  {
    id: 'craft',
    name: '侨乡手作与文创',
    category: '文创纪念',
    description: '提炼红头船、古港建筑和侨乡故事元素，形成更适合游客带走的文化纪念品。',
    recommend: '适合亲子游客选购纪念',
    tags: ['文创', '红头船元素', '纪念收藏']
  },
  {
    id: 'life',
    name: '潮汕生活风物观察',
    category: '民俗体验',
    description: '从饮食、器物和街区日常切入，帮助游客理解樟林古港的生活质感与地方气息。',
    recommend: '建议结合街区步行慢慢体验',
    tags: ['生活方式', '民俗观察', '街巷体验']
  }
];

const homeStats = [
  { label: '推荐景点', value: '4+' },
  { label: '主题线路', value: '3' },
  { label: '文化专题', value: '3' },
  { label: '风物推荐', value: '4' }
];

const homeBanners = [
  {
    id: 'banner-aerial',
    image: '/assets/images/nanshengli-aerial.jpg',
    title: '走进百年古港街巷',
    subtitle: '从航拍视角快速建立樟林古港整体印象',
    action: 'tab',
    target: '/pages/guide/guide'
  },
  {
    id: 'banner-ship',
    image: '/assets/images/red-ship.jpg',
    title: '红头船文化沉浸讲解',
    subtitle: '优先推荐首次到访游客从红头船故事开始',
    action: 'detail',
    target: 'ship-museum'
  },
  {
    id: 'banner-culture',
    image: '/assets/images/culture-corridor.jpg',
    title: '侨乡故事与地方记忆',
    subtitle: '结合文化科普与侨史长廊形成完整游览认知',
    action: 'tab',
    target: '/pages/culture/culture'
  }
];

const activityNews = [
  {
    id: 'weekend-tour',
    category: '讲解导览',
    title: '周末古港沉浸式讲解专场',
    date: '每周六 10:00',
    place: '红头船文化展示点',
    status: '报名中',
    image: '/assets/images/red-ship.jpg',
    capacity: 30,
    enrolled: 18,
    summary: '围绕红头船、古港海贸和侨乡故事展开 60 分钟沉浸式讲解，适合首次来访游客。'
  },
  {
    id: 'night-walk',
    category: '夜游活动',
    title: '古街夜游与建筑灯影体验',
    date: '每周六 19:30',
    place: '侨乡古建筑群',
    status: '限时开放',
    image: '/assets/images/old-building.jpg',
    capacity: 40,
    enrolled: 26,
    summary: '结合夜间街巷氛围，串联古建筑风貌、拍照点位和游客休闲动线。'
  },
  {
    id: 'study-family',
    category: '亲子研学',
    title: '亲子研学打卡任务',
    date: '节假日全天',
    place: '古港全域线路',
    status: '持续进行',
    image: '/assets/images/guide-map.jpg',
    capacity: 50,
    enrolled: 33,
    summary: '通过任务卡形式引导亲子家庭识别红头船、古码头、门楼装饰等重点元素。'
  },
  {
    id: 'folk-market',
    category: '市集体验',
    title: '侨乡风物快闪市集',
    date: '本月 25 日 14:00',
    place: '南盛里周边',
    status: '即将开启',
    image: '/assets/images/nanshengli-aerial.jpg',
    capacity: 60,
    enrolled: 41,
    summary: '集合在地茶饮、文创、特色点心与文化展示，适合作为游程收尾体验。'
  }
];

const profileStats = [
  { label: '已浏览景点', value: '4' },
  { label: '推荐活动', value: '4' },
  { label: '收藏线路', value: '3' }
];

const profileServices = [
  {
    id: 'activity',
    title: '活动资讯',
    desc: '查看近期导览、夜游与研学活动安排。',
    type: 'page',
    target: '/pages/activity/activity'
  },
  {
    id: 'culture',
    title: '文化专题',
    desc: '继续浏览红头船、侨乡文脉与古港建筑内容。',
    type: 'tab',
    target: '/pages/culture/culture'
  },
  {
    id: 'specialty',
    title: '特色风物',
    desc: '快速查看在地茶饮、文创与伴手礼推荐。',
    type: 'tab',
    target: '/pages/specialty/specialty'
  },
  {
    id: 'guide',
    title: '我的路线',
    desc: '回到智慧导览页继续规划半日游或一日游路线。',
    type: 'tab',
    target: '/pages/guide/guide'
  }
];

module.exports = {
  scenicSpots,
  routePlans,
  cultureTopics,
  specialtyItems,
  homeStats,
  homeBanners,
  activityNews,
  profileStats,
  profileServices
};

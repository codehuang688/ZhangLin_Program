const scenicSpots = [
  {
    id: 'ship-museum',
    name: '红头船文化展示点',
    category: '文化地标',
    image: '/assets/images/2.红头船.jpg',
    gallery: ['/assets/images/2.红头船.jpg', '/assets/images/2.红头船1.jpg'],
    description: '红头船是樟林古港最具代表性的文化符号，见证了潮汕人民勇闯南洋的历史。展示点通过实物展示、多媒体互动等方式，让游客深入了解红头船的建造工艺、航行历史和文化意义。',
    features: ['实物展示', '多媒体互动', '历史讲解', '文创体验'],
    openTime: '09:00-17:30',
    ticketPrice: '免费',
    location: '樟林古港核心区',
    status: 'open',
    visits: 12580,
    createdAt: '2024-01-15'
  },
  {
    id: 'port-ruins',
    name: '古港遗址游览区',
    category: '历史遗址',
    image: '/assets/images/6.新兴街古码头.jpg',
    gallery: ['/assets/images/6.新兴街古码头.jpg', '/assets/images/6.新兴街古码头(2).jpg', '/assets/images/7.古港石碑.jpg'],
    description: '古港遗址是海上丝绸之路的重要节点，保留了明清时期的码头、仓库和商铺遗址。漫步其间，可以感受到当年"千帆竞渡、商贾云集"的繁华景象。',
    features: ['遗址参观', '考古展示', '导览讲解', '拍照打卡'],
    openTime: '08:30-18:00',
    ticketPrice: '免费',
    location: '新兴街片区',
    status: 'open',
    visits: 8960,
    createdAt: '2024-02-20'
  },
  {
    id: 'historic-arcade',
    name: '侨乡古建筑群',
    category: '特色建筑',
    image: '/assets/images/9.林氏义祖祠.jpg',
    gallery: ['/assets/images/9.林氏义祖祠.jpg', '/assets/images/8.林氏义祖祠建筑群.jpg', '/assets/images/10.永定楼.jpg'],
    description: '侨乡古建筑群融合了潮汕传统建筑与南洋风格，包括林氏义祖祠、永定楼等历史建筑。这里见证了华侨衣锦还乡、建设家园的历史。',
    features: ['建筑欣赏', '历史讲解', '祠堂文化', '建筑摄影'],
    openTime: '09:00-17:00',
    ticketPrice: '免费',
    location: '南盛里片区',
    status: 'open',
    visits: 7230,
    createdAt: '2024-03-10'
  },
  {
    id: 'overseas-memory',
    name: '侨史记忆长廊',
    category: '文化展馆',
    image: '/assets/images/1.文化长廊.jpg',
    gallery: ['/assets/images/1.文化长廊.jpg', '/assets/images/5.秦牧故居.jpg'],
    description: '侨史记忆长廊通过侨批、家书、老照片等珍贵史料，讲述潮汕华侨在海外拼搏奋斗、心系家乡的感人故事，是了解侨乡文化的重要窗口。',
    features: ['史料展示', '多媒体影像', '互动体验', '研学活动'],
    openTime: '09:00-17:30',
    ticketPrice: '免费',
    location: '文化广场旁',
    status: 'open',
    visits: 5680,
    createdAt: '2024-04-05'
  },
  {
    id: 'tianhougong',
    name: '天后宫',
    category: '宗教场所',
    image: '/assets/images/3.天后宫.jpg',
    gallery: ['/assets/images/3.天后宫.jpg', '/assets/images/4.天后宫侧面.jpg'],
    description: '天后宫始建于清代，供奉妈祖娘娘，是樟林古港渔民和商人祈求平安的重要场所。建筑结构严谨，木雕、石雕工艺精湛，具有较高的历史和艺术价值。',
    features: ['宗教朝拜', '建筑艺术', '民俗活动', '祈福仪式'],
    openTime: '08:00-18:00',
    ticketPrice: '免费',
    location: '古港码头旁',
    status: 'open',
    visits: 15320,
    createdAt: '2024-01-01'
  },
  {
    id: 'qiaoxiang-street',
    name: '新兴街古商业街',
    category: '特色街区',
    image: '/assets/images/12.新兴街古商业街.jpg',
    gallery: ['/assets/images/12.新兴街古商业街.jpg', '/assets/images/12.新兴街古商店.jpg'],
    description: '新兴街是樟林古港历史最悠久的商业街，保留了大量骑楼建筑和老字号商铺。这里可以品尝地道潮汕小吃，购买特色手工艺品。',
    features: ['购物体验', '特色美食', '老字号探访', '街区漫步'],
    openTime: '09:00-21:00',
    ticketPrice: '免费',
    location: '古港核心区',
    status: 'open',
    visits: 21560,
    createdAt: '2024-01-01'
  }
];

const activities = [
  {
    id: '1',
    title: '红头船文化沉浸讲解',
    description: '跟随专业讲解员，深入了解红头船的历史背景、建造工艺和海贸故事',
    place: '红头船文化展示点',
    status: 'ongoing',
    image: '/assets/images/2.红头船.jpg',
    capacity: 30,
    enrolled: 18,
    startTime: '2024-06-01 09:00',
    endTime: '2024-06-01 11:00',
    type: 'guided-tour',
    createdAt: '2024-05-10'
  },
  {
    id: '2',
    title: '潮汕工夫茶体验课',
    description: '学习潮汕工夫茶的冲泡技艺，感受"关公巡城、韩信点兵"的独特魅力',
    place: '文化广场茶室',
    status: 'ongoing',
    image: '/assets/images/18.工夫茶.jpg',
    capacity: 20,
    enrolled: 15,
    startTime: '2024-06-01 14:00',
    endTime: '2024-06-01 16:00',
    type: 'workshop',
    createdAt: '2024-05-12'
  },
  {
    id: '3',
    title: '古港夜游',
    description: '夜幕下的古港别有韵味，灯光映照下的古建筑群更显神秘',
    place: '古港全域线路',
    status: 'ongoing',
    image: '/assets/images/0.古港导游图.jpg',
    capacity: 50,
    enrolled: 33,
    startTime: '2024-06-01 19:00',
    endTime: '2024-06-01 21:00',
    type: 'night-tour',
    createdAt: '2024-05-08'
  },
  {
    id: '4',
    title: '侨批文化研学活动',
    description: '了解侨批历史，体验手写家书，感受华侨对家乡的深情',
    place: '侨史记忆长廊',
    status: 'upcoming',
    image: '/assets/images/1.文化长廊.jpg',
    capacity: 40,
    enrolled: 25,
    startTime: '2024-06-08 10:00',
    endTime: '2024-06-08 12:00',
    type: 'study-tour',
    createdAt: '2024-05-15'
  },
  {
    id: '5',
    title: '英歌舞表演',
    description: '国家级非物质文化遗产英歌舞表演，感受潮汕传统文化的魅力',
    place: '南盛里周边',
    status: 'upcoming',
    image: '/assets/images/17.英歌舞.jpg',
    capacity: 60,
    enrolled: 41,
    startTime: '2024-06-15 15:00',
    endTime: '2024-06-15 17:00',
    type: 'performance',
    createdAt: '2024-05-20'
  },
  {
    id: '6',
    title: '建筑摄影大赛',
    description: '用镜头记录古港之美，优秀作品将在文化长廊展出',
    place: '侨乡古建筑群',
    status: 'limited',
    image: '/assets/images/9.林氏义祖祠.jpg',
    capacity: 40,
    enrolled: 26,
    startTime: '2024-06-01 00:00',
    endTime: '2024-06-30 23:59',
    type: 'competition',
    createdAt: '2024-05-05'
  }
];

const users = [
  {
    id: '1',
    username: 'admin',
    password: '$2b$10$EixZaYbB.rK4fl8x2q7Meu6Q6D2V5fF5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q',
    nickname: '管理员',
    avatar: '',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-01',
    lastLogin: '2024-05-26'
  },
  {
    id: '2',
    username: 'guide001',
    password: '$2b$10$EixZaYbB.rK4fl8x2q7Meu6Q6D2V5fF5Q5Q5Q5Q5Q5Q5Q5Q5Q',
    nickname: '讲解员小王',
    avatar: '',
    role: 'guide',
    status: 'active',
    createdAt: '2024-02-15',
    lastLogin: '2024-05-25'
  },
  {
    id: '3',
    username: 'visitor001',
    password: '$2b$10$EixZaYbB.rK4fl8x2q7Meu6Q6D2V5fF5Q5Q5Q5Q5Q5Q5Q5Q5Q',
    nickname: '游客小李',
    avatar: '',
    role: 'visitor',
    status: 'active',
    createdAt: '2024-05-20',
    lastLogin: '2024-05-26'
  }
];

const activityEnrollments = [
  { id: '1', activityId: '1', userId: '3', status: 'confirmed', createdAt: '2024-05-25' },
  { id: '2', activityId: '2', userId: '3', status: 'confirmed', createdAt: '2024-05-26' },
  { id: '3', activityId: '3', userId: '1', status: 'confirmed', createdAt: '2024-05-24' }
];

const stats = {
  overview: {
    totalScenicSpots: 6,
    totalActivities: 6,
    totalUsers: 3,
    totalVisits: 71330,
    todayVisits: 128,
    weeklyVisits: [856, 723, 987, 1056, 1234, 1567, 1342],
    monthlyVisits: [4520, 5120, 6350, 7890, 8230, 9150]
  },
  activityStats: {
    totalEnrollments: 178,
    ongoingActivities: 3,
    upcomingActivities: 2,
    completedActivities: 5
  },
  userStats: {
    newUsers: 12,
    activeUsers: 86,
    registeredUsers: 156
  }
};

module.exports = {
  scenicSpots,
  activities,
  users,
  activityEnrollments,
  stats
};
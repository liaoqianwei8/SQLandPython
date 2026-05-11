export interface TableSchema {
  name: string;
  alias: string;
  columns: {
    name: string;
    type: string;
    description: string;
    isPrimaryKey?: boolean;
    isForeignKey?: boolean;
  }[];
}

export interface PracticeScenario {
  id: number;
  company: string;
  department: string;
  title: string;
  background: string;
  requirement: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  category: string;
  tables: TableSchema[];
  hint: string;
  solution: string;
}

export const practiceScenarios: PracticeScenario[] = [
  // 基础查询 (1-10)
  {
    id: 1,
    company: '字节跳动',
    department: '电商部门',
    title: '用户基本信息查询',
    background: '需要查看用户表中的基本信息',
    requirement: '查询所有用户的ID、用户名和邮箱',
    difficulty: 1,
    category: '基础查询',
    tables: [
      {
        name: 'users',
        alias: '用户表',
        columns: [
          { name: 'id', type: 'INT', description: '用户ID', isPrimaryKey: true },
          { name: 'username', type: 'VARCHAR', description: '用户名' },
          { name: 'email', type: 'VARCHAR', description: '邮箱' },
          { name: 'created_at', type: 'DATETIME', description: '注册时间' }
        ]
      }
    ],
    hint: '使用SELECT查询指定字段喵～',
    solution: 'SELECT id, username, email FROM users;'
  },
  {
    id: 2,
    company: '阿里巴巴',
    department: '淘宝',
    title: '订单状态筛选',
    background: '运营团队需要查看已支付的订单',
    requirement: '查询所有已支付订单的订单号、用户ID和订单金额',
    difficulty: 1,
    category: '条件查询',
    tables: [
      {
        name: 'orders',
        alias: '订单表',
        columns: [
          { name: 'order_id', type: 'INT', description: '订单ID', isPrimaryKey: true },
          { name: 'user_id', type: 'INT', description: '用户ID' },
          { name: 'amount', type: 'DECIMAL', description: '订单金额' },
          { name: 'status', type: 'VARCHAR', description: '订单状态' }
        ]
      }
    ],
    hint: '用WHERE筛选status为已支付的订单喵～',
    solution: "SELECT order_id, user_id, amount FROM orders WHERE status = 'paid';"
  },
  {
    id: 3,
    company: '腾讯',
    department: '微信支付',
    title: '金额范围查询',
    background: '财务需要查看大额交易记录',
    requirement: '查询订单金额在1000元以上的所有订单',
    difficulty: 1,
    category: '条件查询',
    tables: [
      {
        name: 'orders',
        alias: '订单表',
        columns: [
          { name: 'order_id', type: 'INT', description: '订单ID', isPrimaryKey: true },
          { name: 'user_id', type: 'INT', description: '用户ID' },
          { name: 'amount', type: 'DECIMAL', description: '订单金额' },
          { name: 'created_at', type: 'DATETIME', description: '下单时间' }
        ]
      }
    ],
    hint: '使用>比较运算符筛选金额喵～',
    solution: 'SELECT * FROM orders WHERE amount > 1000;'
  },
  {
    id: 4,
    company: '美团',
    department: '外卖',
    title: 'NULL值处理',
    background: '需要查看尚未分配的订单',
    requirement: '查询骑手ID为NULL的订单',
    difficulty: 2,
    category: 'NULL查询',
    tables: [
      {
        name: 'orders',
        alias: '订单表',
        columns: [
          { name: 'order_id', type: 'INT', description: '订单ID', isPrimaryKey: true },
          { name: 'rider_id', type: 'INT', description: '骑手ID' },
          { name: 'status', type: 'VARCHAR', description: '订单状态' }
        ]
      }
    ],
    hint: 'NULL值需要用IS NULL来查询喵～',
    solution: 'SELECT * FROM orders WHERE rider_id IS NULL;'
  },
  {
    id: 5,
    company: '京东',
    department: '物流',
    title: '排序查询',
    background: '需要查看销售排行榜',
    requirement: '查询所有商品，按价格从高到低排序',
    difficulty: 1,
    category: '排序查询',
    tables: [
      {
        name: 'products',
        alias: '商品表',
        columns: [
          { name: 'product_id', type: 'INT', description: '商品ID', isPrimaryKey: true },
          { name: 'product_name', type: 'VARCHAR', description: '商品名称' },
          { name: 'price', type: 'DECIMAL', description: '价格' }
        ]
      }
    ],
    hint: '使用ORDER BY和DESC进行降序排序喵～',
    solution: 'SELECT * FROM products ORDER BY price DESC;'
  },
  {
    id: 6,
    company: '拼多多',
    department: '运营',
    title: '模糊查询',
    background: '需要查找名称中包含"手机"的所有商品',
    requirement: '查询商品名称包含"手机"的商品信息',
    difficulty: 2,
    category: '模糊查询',
    tables: [
      {
        name: 'products',
        alias: '商品表',
        columns: [
          { name: 'product_id', type: 'INT', description: '商品ID', isPrimaryKey: true },
          { name: 'product_name', type: 'VARCHAR', description: '商品名称' },
          { name: 'price', type: 'DECIMAL', description: '价格' }
        ]
      }
    ],
    hint: '使用LIKE和%通配符进行模糊匹配喵～',
    solution: "SELECT * FROM products WHERE product_name LIKE '%手机%';"
  },
  {
    id: 7,
    company: '滴滴',
    department: '出行',
    title: '多字段排序',
    background: '需要查看乘客的出行记录',
    requirement: '查询出行记录，按出行时间降序，同一时间按金额升序',
    difficulty: 2,
    category: '排序查询',
    tables: [
      {
        name: 'trips',
        alias: '出行记录表',
        columns: [
          { name: 'trip_id', type: 'INT', description: '行程ID', isPrimaryKey: true },
          { name: 'passenger_id', type: 'INT', description: '乘客ID' },
          { name: 'trip_time', type: 'DATETIME', description: '出行时间' },
          { name: 'amount', type: 'DECIMAL', description: '金额' }
        ]
      }
    ],
    hint: 'ORDER BY可以指定多个字段，每个字段都可以单独指定升序或降序喵～',
    solution: 'SELECT * FROM trips ORDER BY trip_time DESC, amount ASC;'
  },
  {
    id: 8,
    company: '网易',
    department: '云音乐',
    title: '限制返回数量',
    background: '需要查看最受欢迎的歌曲',
    requirement: '查询播放量最高的前10首歌曲',
    difficulty: 1,
    category: '限制查询',
    tables: [
      {
        name: 'songs',
        alias: '歌曲表',
        columns: [
          { name: 'song_id', type: 'INT', description: '歌曲ID', isPrimaryKey: true },
          { name: 'song_name', type: 'VARCHAR', description: '歌曲名称' },
          { name: 'play_count', type: 'INT', description: '播放量' }
        ]
      }
    ],
    hint: '使用ORDER BY和LIMIT限制结果数量喵～',
    solution: 'SELECT * FROM songs ORDER BY play_count DESC LIMIT 10;'
  },
  {
    id: 9,
    company: '快手',
    department: '直播',
    title: '日期范围查询',
    background: '运营需要查看2024年1月的直播数据',
    requirement: '查询2024年1月1日到1月31日的直播记录',
    difficulty: 2,
    category: '日期查询',
    tables: [
      {
        name: 'live_streams',
        alias: '直播记录表',
        columns: [
          { name: 'stream_id', type: 'INT', description: '直播ID', isPrimaryKey: true },
          { name: 'anchor_id', type: 'INT', description: '主播ID' },
          { name: 'start_time', type: 'DATETIME', description: '开始时间' },
          { name: 'duration', type: 'INT', description: '时长(分钟)' }
        ]
      }
    ],
    hint: '使用BETWEEN AND查询日期范围喵～',
    solution: "SELECT * FROM live_streams WHERE start_time BETWEEN '2024-01-01' AND '2024-01-31 23:59:59';"
  },
  {
    id: 10,
    company: '哔哩哔哩',
    department: '视频',
    title: '枚举查询',
    background: '需要查看特定分区的视频',
    requirement: '查询分区为"动画"、"音乐"或"游戏"的视频',
    difficulty: 2,
    category: '枚举查询',
    tables: [
      {
        name: 'videos',
        alias: '视频表',
        columns: [
          { name: 'video_id', type: 'INT', description: '视频ID', isPrimaryKey: true },
          { name: 'title', type: 'VARCHAR', description: '标题' },
          { name: 'category', type: 'VARCHAR', description: '分区' }
        ]
      }
    ],
    hint: '使用IN查询多个值的枚举喵～',
    solution: "SELECT * FROM videos WHERE category IN ('动画', '音乐', '游戏');"
  },

  // 聚合函数 (11-20)
  {
    id: 11,
    company: '字节跳动',
    department: '抖音',
    title: 'COUNT统计',
    background: '需要统计用户总数',
    requirement: '统计所有注册用户数量',
    difficulty: 1,
    category: '聚合统计',
    tables: [
      {
        name: 'users',
        alias: '用户表',
        columns: [
          { name: 'user_id', type: 'INT', description: '用户ID', isPrimaryKey: true },
          { name: 'username', type: 'VARCHAR', description: '用户名' }
        ]
      }
    ],
    hint: '使用COUNT函数统计行数喵～',
    solution: 'SELECT COUNT(*) FROM users;'
  },
  {
    id: 12,
    company: '阿里巴巴',
    department: '天猫',
    title: 'SUM求和',
    background: '财务需要统计月度收入',
    requirement: '计算所有已完成订单的总金额',
    difficulty: 1,
    category: '聚合统计',
    tables: [
      {
        name: 'orders',
        alias: '订单表',
        columns: [
          { name: 'order_id', type: 'INT', description: '订单ID', isPrimaryKey: true },
          { name: 'amount', type: 'DECIMAL', description: '订单金额' },
          { name: 'status', type: 'VARCHAR', description: '订单状态' }
        ]
      }
    ],
    hint: '使用SUM函数对金额求和喵～',
    solution: "SELECT SUM(amount) FROM orders WHERE status = 'completed';"
  },
  {
    id: 13,
    company: '腾讯',
    department: '游戏',
    title: 'AVG平均值',
    background: '运营需要查看玩家平均等级',
    requirement: '计算所有玩家的平均等级',
    difficulty: 1,
    category: '聚合统计',
    tables: [
      {
        name: 'players',
        alias: '玩家表',
        columns: [
          { name: 'player_id', type: 'INT', description: '玩家ID', isPrimaryKey: true },
          { name: 'level', type: 'INT', description: '等级' }
        ]
      }
    ],
    hint: '使用AVG函数计算平均值喵～',
    solution: 'SELECT AVG(level) FROM players;'
  },
  {
    id: 14,
    company: '美团',
    department: '餐饮',
    title: 'MAX最大值',
    background: '需要查看最贵的菜品',
    requirement: '找出价格最高的菜品及其价格',
    difficulty: 1,
    category: '聚合统计',
    tables: [
      {
        name: 'dishes',
        alias: '菜品表',
        columns: [
          { name: 'dish_id', type: 'INT', description: '菜品ID', isPrimaryKey: true },
          { name: 'dish_name', type: 'VARCHAR', description: '菜品名称' },
          { name: 'price', type: 'DECIMAL', description: '价格' }
        ]
      }
    ],
    hint: '使用MAX函数找最大值喵～',
    solution: 'SELECT dish_name, MAX(price) FROM dishes;'
  },
  {
    id: 15,
    company: '京东',
    department: '电商',
    title: 'DISTINCT去重',
    background: '需要统计有多少个不同的商品类别',
    requirement: '统计商品表中共有多少个不同的类别',
    difficulty: 2,
    category: '去重统计',
    tables: [
      {
        name: 'products',
        alias: '商品表',
        columns: [
          { name: 'product_id', type: 'INT', description: '商品ID', isPrimaryKey: true },
          { name: 'category', type: 'VARCHAR', description: '商品类别' }
        ]
      }
    ],
    hint: '使用COUNT和DISTINCT配合去重喵～',
    solution: 'SELECT COUNT(DISTINCT category) FROM products;'
  },
  {
    id: 16,
    company: '拼多多',
    department: '运营',
    title: 'MIN最小值',
    background: '需要查看最低价的商品',
    requirement: '找出价格最低的商品信息',
    difficulty: 1,
    category: '聚合统计',
    tables: [
      {
        name: 'products',
        alias: '商品表',
        columns: [
          { name: 'product_id', type: 'INT', description: '商品ID', isPrimaryKey: true },
          { name: 'product_name', type: 'VARCHAR', description: '商品名称' },
          { name: 'price', type: 'DECIMAL', description: '价格' }
        ]
      }
    ],
    hint: '使用MIN函数找最小值喵～',
    solution: 'SELECT * FROM products ORDER BY price ASC LIMIT 1;'
  },
  {
    id: 17,
    company: '滴滴',
    department: '出行',
    title: '组合聚合',
    background: '需要全面了解订单情况',
    requirement: '统计订单总数、总金额、平均订单金额',
    difficulty: 2,
    category: '聚合统计',
    tables: [
      {
        name: 'orders',
        alias: '订单表',
        columns: [
          { name: 'order_id', type: 'INT', description: '订单ID', isPrimaryKey: true },
          { name: 'amount', type: 'DECIMAL', description: '订单金额' }
        ]
      }
    ],
    hint: 'SELECT后面可以写多个聚合函数喵～',
    solution: 'SELECT COUNT(*) as order_count, SUM(amount) as total_amount, AVG(amount) as avg_amount FROM orders;'
  },
  {
    id: 18,
    company: '网易',
    department: '云音乐',
    title: '条件聚合',
    background: '需要统计VIP用户的播放量',
    requirement: '计算VIP用户的总播放时长',
    difficulty: 2,
    category: '条件聚合',
    tables: [
      {
        name: 'users',
        alias: '用户表',
        columns: [
          { name: 'user_id', type: 'INT', description: '用户ID', isPrimaryKey: true },
          { name: 'is_vip', type: 'BOOLEAN', description: '是否VIP' }
        ]
      },
      {
        name: 'play_logs',
        alias: '播放记录表',
        columns: [
          { name: 'log_id', type: 'INT', description: '记录ID', isPrimaryKey: true },
          { name: 'user_id', type: 'INT', description: '用户ID', isForeignKey: true },
          { name: 'duration', type: 'INT', description: '播放时长(秒)' }
        ]
      }
    ],
    hint: '需要连接两表，然后筛选VIP用户再聚合喵～',
    solution: 'SELECT SUM(p.duration) FROM users u INNER JOIN play_logs p ON u.user_id = p.user_id WHERE u.is_vip = TRUE;'
  },
  {
    id: 19,
    company: '快手',
    department: '直播',
    title: 'COUNT与WHERE',
    background: '需要统计未读消息数量',
    requirement: '统计每个用户的未读消息数量',
    difficulty: 2,
    category: '条件聚合',
    tables: [
      {
        name: 'messages',
        alias: '消息表',
        columns: [
          { name: 'message_id', type: 'INT', description: '消息ID', isPrimaryKey: true },
          { name: 'user_id', type: 'INT', description: '用户ID' },
          { name: 'is_read', type: 'BOOLEAN', description: '是否已读' }
        ]
      }
    ],
    hint: '先用WHERE筛选未读消息，再按用户分组统计喵～',
    solution: 'SELECT user_id, COUNT(*) as unread_count FROM messages WHERE is_read = FALSE GROUP BY user_id;'
  },
  {
    id: 20,
    company: '哔哩哔哩',
    department: '视频',
    title: '聚合函数组合',
    background: '需要分析视频数据',
    requirement: '统计每个UP主的视频数量、总播放量、最高播放量',
    difficulty: 3,
    category: '分组聚合',
    tables: [
      {
        name: 'videos',
        alias: '视频表',
        columns: [
          { name: 'video_id', type: 'INT', description: '视频ID', isPrimaryKey: true },
          { name: 'up_id', type: 'INT', description: 'UP主ID' },
          { name: 'views', type: 'INT', description: '播放量' }
        ]
      }
    ],
    hint: '使用GROUP BY分组，然后多个聚合函数组合喵～',
    solution: 'SELECT up_id, COUNT(*) as video_count, SUM(views) as total_views, MAX(views) as max_views FROM videos GROUP BY up_id;'
  },

  // 分组查询 (21-30)
  {
    id: 21,
    company: '字节跳动',
    department: 'TikTok',
    title: 'GROUP BY基础',
    background: '需要按类别统计商品',
    requirement: '统计每个商品类别的商品数量',
    difficulty: 2,
    category: '分组查询',
    tables: [
      {
        name: 'products',
        alias: '商品表',
        columns: [
          { name: 'product_id', type: 'INT', description: '商品ID', isPrimaryKey: true },
          { name: 'category', type: 'VARCHAR', description: '商品类别' }
        ]
      }
    ],
    hint: '使用GROUP BY按类别分组，然后用COUNT统计喵～',
    solution: 'SELECT category, COUNT(*) as product_count FROM products GROUP BY category;'
  },
  {
    id: 22,
    company: '阿里巴巴',
    department: '蚂蚁集团',
    title: '多字段分组',
    background: '需要分析交易数据',
    requirement: '按用户和月份分组统计交易金额',
    difficulty: 3,
    category: '分组查询',
    tables: [
      {
        name: 'transactions',
        alias: '交易表',
        columns: [
          { name: 'trans_id', type: 'INT', description: '交易ID', isPrimaryKey: true },
          { name: 'user_id', type: 'INT', description: '用户ID' },
          { name: 'amount', type: 'DECIMAL', description: '交易金额' },
          { name: 'trans_date', type: 'DATE', description: '交易日期' }
        ]
      }
    ],
    hint: '可以使用YEAR()和MONTH()函数提取年月喵～',
    solution: 'SELECT user_id, YEAR(trans_date) as year, MONTH(trans_date) as month, SUM(amount) FROM transactions GROUP BY user_id, YEAR(trans_date), MONTH(trans_date);'
  },
  {
    id: 23,
    company: '腾讯',
    department: '微信',
    title: 'HAVING筛选分组',
    background: '需要找出高价值用户',
    requirement: '找出订单数量超过10的用户及其订单数',
    difficulty: 3,
    category: '分组筛选',
    tables: [
      {
        name: 'orders',
        alias: '订单表',
        columns: [
          { name: 'order_id', type: 'INT', description: '订单ID', isPrimaryKey: true },
          { name: 'user_id', type: 'INT', description: '用户ID' }
        ]
      }
    ],
    hint: '先用GROUP BY分组，再用HAVING筛选聚合结果喵～',
    solution: 'SELECT user_id, COUNT(*) as order_count FROM orders GROUP BY user_id HAVING COUNT(*) > 10;'
  },
  {
    id: 24,
    company: '美团',
    department: '外卖',
    title: 'HAVING与聚合',
    background: '需要找出活跃商家',
    requirement: '找出订单数量超过100的商家及其平均订单金额',
    difficulty: 3,
    category: '分组筛选',
    tables: [
      {
        name: 'orders',
        alias: '订单表',
        columns: [
          { name: 'order_id', type: 'INT', description: '订单ID', isPrimaryKey: true },
          { name: 'shop_id', type: 'INT', description: '商家ID' },
          { name: 'amount', type: 'DECIMAL', description: '订单金额' }
        ]
      }
    ],
    hint: 'HAVING中可以同时使用COUNT和AVG喵～',
    solution: 'SELECT shop_id, COUNT(*) as order_count, AVG(amount) as avg_amount FROM orders GROUP BY shop_id HAVING COUNT(*) > 100;'
  },
  {
    id: 25,
    company: '京东',
    department: '物流',
    title: 'WHERE与HAVING区别',
    background: '需要理解筛选时机',
    requirement: '先筛选金额>100的订单，再按用户分组统计数量>5',
    difficulty: 3,
    category: '综合查询',
    tables: [
      {
        name: 'orders',
        alias: '订单表',
        columns: [
          { name: 'order_id', type: 'INT', description: '订单ID', isPrimaryKey: true },
          { name: 'user_id', type: 'INT', description: '用户ID' },
          { name: 'amount', type: 'DECIMAL', description: '订单金额' }
        ]
      }
    ],
    hint: 'WHERE在分组前筛选，HAVING在分组后筛选喵～',
    solution: 'SELECT user_id, COUNT(*) FROM orders WHERE amount > 100 GROUP BY user_id HAVING COUNT(*) > 5;'
  },
  {
    id: 26,
    company: '拼多多',
    department: '社交电商',
    title: '分组排序',
    background: '需要找出每个品类的热销商品',
    requirement: '找出每个品类销售额最高的商品',
    difficulty: 4,
    category: '分组查询',
    tables: [
      {
        name: 'products',
        alias: '商品表',
        columns: [
          { name: 'product_id', type: 'INT', description: '商品ID', isPrimaryKey: true },
          { name: 'category', type: 'VARCHAR', description: '商品类别' },
          { name: 'sales', type: 'DECIMAL', description: '销售额' }
        ]
      }
    ],
    hint: '需要找出每个分类中销售额最大的商品，可以用子查询喵～',
    solution: 'SELECT * FROM products p1 WHERE sales = (SELECT MAX(sales) FROM products p2 WHERE p2.category = p1.category);'
  },
  {
    id: 27,
    company: '滴滴',
    department: '自动驾驶',
    title: '分组统计最值',
    background: '需要分析行程数据',
    requirement: '统计每种车型的最大行程距离',
    difficulty: 2,
    category: '分组聚合',
    tables: [
      {
        name: 'trips',
        alias: '行程表',
        columns: [
          { name: 'trip_id', type: 'INT', description: '行程ID', isPrimaryKey: true },
          { name: 'car_type', type: 'VARCHAR', description: '车型' },
          { name: 'distance', type: 'DECIMAL', description: '行程距离(公里)' }
        ]
      }
    ],
    hint: '按车型分组，用MAX找最大距离喵～',
    solution: 'SELECT car_type, MAX(distance) as max_distance FROM trips GROUP BY car_type;'
  },
  {
    id: 28,
    company: '网易',
    department: '有道',
    title: '多条件分组',
    background: '需要分析学习数据',
    requirement: '按学习模式和难度分组统计平均分',
    difficulty: 3,
    category: '分组查询',
    tables: [
      {
        name: 'study_records',
        alias: '学习记录表',
        columns: [
          { name: 'record_id', type: 'INT', description: '记录ID', isPrimaryKey: true },
          { name: 'mode', type: 'VARCHAR', description: '学习模式' },
          { name: 'difficulty', type: 'VARCHAR', description: '难度' },
          { name: 'score', type: 'INT', description: '得分' }
        ]
      }
    ],
    hint: 'GROUP BY可以指定多个字段喵～',
    solution: 'SELECT mode, difficulty, AVG(score) as avg_score FROM study_records GROUP BY mode, difficulty;'
  },
  {
    id: 29,
    company: '快手',
    department: '短视频',
    title: '分组后排序',
    background: '需要找出每个创作者的最佳作品',
    requirement: '按创作者分组，找出点赞数最高的作品',
    difficulty: 3,
    category: '分组查询',
    tables: [
      {
        name: 'videos',
        alias: '视频表',
        columns: [
          { name: 'video_id', type: 'INT', description: '视频ID', isPrimaryKey: true },
          { name: 'creator_id', type: 'INT', description: '创作者ID' },
          { name: 'likes', type: 'INT', description: '点赞数' }
        ]
      }
    ],
    hint: '子查询中找出每个创作者的最高点赞，然后关联查询喵～',
    solution: 'SELECT * FROM videos WHERE (creator_id, likes) IN (SELECT creator_id, MAX(likes) FROM videos GROUP BY creator_id);'
  },
  {
    id: 30,
    company: '哔哩哔哩',
    department: '专栏',
    title: '分组聚合练习',
    background: '需要分析专栏数据',
    requirement: '按发布时间统计每天发布的文章数量',
    difficulty: 2,
    category: '分组查询',
    tables: [
      {
        name: 'articles',
        alias: '文章表',
        columns: [
          { name: 'article_id', type: 'INT', description: '文章ID', isPrimaryKey: true },
          { name: 'title', type: 'VARCHAR', description: '标题' },
          { name: 'published_at', type: 'DATETIME', description: '发布时间' }
        ]
      }
    ],
    hint: '使用DATE()函数提取日期部分喵～',
    solution: 'SELECT DATE(published_at) as publish_date, COUNT(*) as article_count FROM articles GROUP BY DATE(published_at);'
  },

  // JOIN连接 (31-40)
  {
    id: 31,
    company: '字节跳动',
    department: '教育',
    title: 'INNER JOIN基础',
    background: '需要关联学生和成绩信息',
    requirement: '查询每个学生的姓名和对应的成绩',
    difficulty: 2,
    category: '表连接',
    tables: [
      {
        name: 'students',
        alias: '学生表',
        columns: [
          { name: 'student_id', type: 'INT', description: '学生ID', isPrimaryKey: true },
          { name: 'name', type: 'VARCHAR', description: '姓名' }
        ]
      },
      {
        name: 'scores',
        alias: '成绩表',
        columns: [
          { name: 'score_id', type: 'INT', description: '成绩ID', isPrimaryKey: true },
          { name: 'student_id', type: 'INT', description: '学生ID', isForeignKey: true },
          { name: 'score', type: 'INT', description: '分数' }
        ]
      }
    ],
    hint: '使用INNER JOIN连接两表喵～',
    solution: 'SELECT s.name, sc.score FROM students s INNER JOIN scores sc ON s.student_id = sc.student_id;'
  },
  {
    id: 32,
    company: '阿里巴巴',
    department: '饿了么',
    title: 'LEFT JOIN查询',
    background: '需要查看所有用户及其订单（包含无订单用户）',
    requirement: '查询所有用户，显示其订单信息（无订单的用户也显示）',
    difficulty: 2,
    category: '表连接',
    tables: [
      {
        name: 'users',
        alias: '用户表',
        columns: [
          { name: 'user_id', type: 'INT', description: '用户ID', isPrimaryKey: true },
          { name: 'username', type: 'VARCHAR', description: '用户名' }
        ]
      },
      {
        name: 'orders',
        alias: '订单表',
        columns: [
          { name: 'order_id', type: 'INT', description: '订单ID', isPrimaryKey: true },
          { name: 'user_id', type: 'INT', description: '用户ID', isForeignKey: true },
          { name: 'amount', type: 'DECIMAL', description: '订单金额' }
        ]
      }
    ],
    hint: 'LEFT JOIN会保留左表所有记录喵～',
    solution: 'SELECT u.username, o.order_id, o.amount FROM users u LEFT JOIN orders o ON u.user_id = o.user_id;'
  },
  {
    id: 33,
    company: '腾讯',
    department: 'QQ',
    title: '多表连接',
    background: '需要查看聊天记录及发送者信息',
    requirement: '查询聊天记录，包括发送者昵称和群名称',
    difficulty: 3,
    category: '多表连接',
    tables: [
      {
        name: 'messages',
        alias: '消息表',
        columns: [
          { name: 'message_id', type: 'INT', description: '消息ID', isPrimaryKey: true },
          { name: 'user_id', type: 'INT', description: '发送者ID' },
          { name: 'group_id', type: 'INT', description: '群ID' },
          { name: 'content', type: 'TEXT', description: '消息内容' }
        ]
      },
      {
        name: 'users',
        alias: '用户表',
        columns: [
          { name: 'user_id', type: 'INT', description: '用户ID', isPrimaryKey: true },
          { name: 'nickname', type: 'VARCHAR', description: '昵称' }
        ]
      },
      {
        name: 'groups',
        alias: '群表',
        columns: [
          { name: 'group_id', type: 'INT', description: '群ID', isPrimaryKey: true },
          { name: 'group_name', type: 'VARCHAR', description: '群名称' }
        ]
      }
    ],
    hint: '连续使用多个JOIN连接多个表喵～',
    solution: 'SELECT u.nickname, g.group_name, m.content FROM messages m INNER JOIN users u ON m.user_id = u.user_id INNER JOIN groups g ON m.group_id = g.group_id;'
  },
  {
    id: 34,
    company: '美团',
    department: '酒店',
    title: 'JOIN与聚合',
    background: '需要统计每个酒店的订单数量',
    requirement: '查询每个酒店名称及其订单数量',
    difficulty: 3,
    category: '连接聚合',
    tables: [
      {
        name: 'hotels',
        alias: '酒店表',
        columns: [
          { name: 'hotel_id', type: 'INT', description: '酒店ID', isPrimaryKey: true },
          { name: 'hotel_name', type: 'VARCHAR', description: '酒店名称' }
        ]
      },
      {
        name: 'bookings',
        alias: '预订表',
        columns: [
          { name: 'booking_id', type: 'INT', description: '预订ID', isPrimaryKey: true },
          { name: 'hotel_id', type: 'INT', description: '酒店ID', isForeignKey: true }
        ]
      }
    ],
    hint: '先JOIN连接，再GROUP BY分组统计喵～',
    solution: 'SELECT h.hotel_name, COUNT(b.booking_id) as booking_count FROM hotels h LEFT JOIN bookings b ON h.hotel_id = b.hotel_id GROUP BY h.hotel_id, h.hotel_name;'
  },
  {
    id: 35,
    company: '京东',
    department: '金融',
    title: 'JOIN条件筛选',
    background: '需要查找逾期还款的订单',
    requirement: '查询超过还款日期但未还款的订单详情',
    difficulty: 3,
    category: '连接筛选',
    tables: [
      {
        name: 'orders',
        alias: '订单表',
        columns: [
          { name: 'order_id', type: 'INT', description: '订单ID', isPrimaryKey: true },
          { name: 'user_id', type: 'INT', description: '用户ID' },
          { name: 'amount', type: 'DECIMAL', description: '金额' }
        ]
      },
      {
        name: 'payments',
        alias: '支付表',
        columns: [
          { name: 'payment_id', type: 'INT', description: '支付ID', isPrimaryKey: true },
          { name: 'order_id', type: 'INT', description: '订单ID', isForeignKey: true },
          { name: 'due_date', type: 'DATE', description: '应还日期' },
          { name: 'paid_date', type: 'DATE', description: '实还日期' }
        ]
      }
    ],
    hint: 'JOIN后用WHERE筛选逾期未还的记录喵～',
    solution: 'SELECT o.*, p.due_date FROM orders o INNER JOIN payments p ON o.order_id = p.order_id WHERE p.paid_date IS NULL AND p.due_date < CURRENT_DATE;'
  },
  {
    id: 36,
    company: '拼多多',
    department: '社交',
    title: '自连接',
    background: '需要找出关注了同一用户的用户对',
    requirement: '找出同时关注了用户A的所有用户',
    difficulty: 4,
    category: '自连接',
    tables: [
      {
        name: 'follows',
        alias: '关注表',
        columns: [
          { name: 'follow_id', type: 'INT', description: '关注ID', isPrimaryKey: true },
          { name: 'follower_id', type: 'INT', description: '关注者ID' },
          { name: 'followee_id', type: 'INT', description: '被关注者ID' }
        ]
      }
    ],
    hint: '同一张表可以JOIN自己喵～',
    solution: 'SELECT f1.follower_id as user_id FROM follows f1 INNER JOIN follows f2 ON f1.followee_id = f2.followee_id WHERE f2.follower_id = 1 AND f1.follower_id != 1;'
  },
  {
    id: 37,
    company: '滴滴',
    department: '顺风车',
    title: '三表连接',
    background: '需要完整的行程信息',
    requirement: '查询行程信息，包括乘客姓名、司机姓名和车辆信息',
    difficulty: 3,
    category: '多表连接',
    tables: [
      {
        name: 'trips',
        alias: '行程表',
        columns: [
          { name: 'trip_id', type: 'INT', description: '行程ID', isPrimaryKey: true },
          { name: 'passenger_id', type: 'INT', description: '乘客ID' },
          { name: 'driver_id', type: 'INT', description: '司机ID' },
          { name: 'car_id', type: 'INT', description: '车辆ID' }
        ]
      },
      {
        name: 'users',
        alias: '用户表',
        columns: [
          { name: 'user_id', type: 'INT', description: '用户ID', isPrimaryKey: true },
          { name: 'name', type: 'VARCHAR', description: '姓名' }
        ]
      },
      {
        name: 'cars',
        alias: '车辆表',
        columns: [
          { name: 'car_id', type: 'INT', description: '车辆ID', isPrimaryKey: true },
          { name: 'plate_number', type: 'VARCHAR', description: '车牌号' }
        ]
      }
    ],
    hint: '连续JOIN三次，每次关联不同的表喵～',
    solution: 'SELECT p.name as passenger, d.name as driver, c.plate_number, t.* FROM trips t INNER JOIN users p ON t.passenger_id = p.user_id INNER JOIN users d ON t.driver_id = d.user_id INNER JOIN cars c ON t.car_id = c.car_id;'
  },
  {
    id: 38,
    company: '网易',
    department: '邮箱',
    title: 'LEFT JOIN应用',
    background: '需要查看邮件发送统计',
    requirement: '统计每个用户发送的邮件数量（包括从未发送的用户）',
    difficulty: 2,
    category: '连接聚合',
    tables: [
      {
        name: 'users',
        alias: '用户表',
        columns: [
          { name: 'user_id', type: 'INT', description: '用户ID', isPrimaryKey: true },
          { name: 'email', type: 'VARCHAR', description: '邮箱地址' }
        ]
      },
      {
        name: 'emails',
        alias: '邮件表',
        columns: [
          { name: 'email_id', type: 'INT', description: '邮件ID', isPrimaryKey: true },
          { name: 'sender_id', type: 'INT', description: '发送者ID' }
        ]
      }
    ],
    hint: 'LEFT JOIN后COUNT会包含NULL，用COALESCE处理喵～',
    solution: 'SELECT u.email, COUNT(e.email_id) as email_count FROM users u LEFT JOIN emails e ON u.user_id = e.sender_id GROUP BY u.user_id, u.email;'
  },
  {
    id: 39,
    company: '快手',
    department: '电商',
    title: 'JOIN排序',
    background: '需要查看最新的商品评价',
    requirement: '查询每个商品的最新一条评价及评价时间',
    difficulty: 4,
    category: '连接查询',
    tables: [
      {
        name: 'products',
        alias: '商品表',
        columns: [
          { name: 'product_id', type: 'INT', description: '商品ID', isPrimaryKey: true },
          { name: 'product_name', type: 'VARCHAR', description: '商品名称' }
        ]
      },
      {
        name: 'reviews',
        alias: '评价表',
        columns: [
          { name: 'review_id', type: 'INT', description: '评价ID', isPrimaryKey: true },
          { name: 'product_id', type: 'INT', description: '商品ID', isForeignKey: true },
          { name: 'content', type: 'TEXT', description: '评价内容' },
          { name: 'created_at', type: 'DATETIME', description: '评价时间' }
        ]
      }
    ],
    hint: '子查询找出每个商品的最大时间，然后JOIN喵～',
    solution: 'SELECT p.product_name, r.content, r.created_at FROM products p INNER JOIN reviews r ON p.product_id = r.product_id WHERE r.created_at = (SELECT MAX(created_at) FROM reviews WHERE product_id = p.product_id);'
  },
  {
    id: 40,
    company: '哔哩哔哩',
    department: '直播',
    title: 'RIGHT JOIN应用',
    background: '需要找出没有直播过的主播',
    requirement: '查询所有主播中从未开播过的主播信息',
    difficulty: 3,
    category: '表连接',
    tables: [
      {
        name: 'anchors',
        alias: '主播表',
        columns: [
          { name: 'anchor_id', type: 'INT', description: '主播ID', isPrimaryKey: true },
          { name: 'anchor_name', type: 'VARCHAR', description: '主播名称' }
        ]
      },
      {
        name: 'live_streams',
        alias: '直播记录表',
        columns: [
          { name: 'stream_id', type: 'INT', description: '直播ID', isPrimaryKey: true },
          { name: 'anchor_id', type: 'INT', description: '主播ID', isForeignKey: true }
        ]
      }
    ],
    hint: 'RIGHT JOIN保留右表所有记录，或者用LEFT JOIN反转喵～',
    solution: 'SELECT a.* FROM live_streams l RIGHT JOIN anchors a ON l.anchor_id = a.anchor_id WHERE l.stream_id IS NULL;'
  },

  // 子查询 (41-50)
  {
    id: 41,
    company: '字节跳动',
    department: '游戏',
    title: '子查询基础',
    background: '需要找出高于平均分的玩家',
    requirement: '查询分数高于所有玩家平均分的玩家信息',
    difficulty: 2,
    category: '子查询',
    tables: [
      {
        name: 'players',
        alias: '玩家表',
        columns: [
          { name: 'player_id', type: 'INT', description: '玩家ID', isPrimaryKey: true },
          { name: 'player_name', type: 'VARCHAR', description: '玩家名称' },
          { name: 'score', type: 'INT', description: '分数' }
        ]
      }
    ],
    hint: '子查询先计算平均分，然后WHERE筛选喵～',
    solution: 'SELECT * FROM players WHERE score > (SELECT AVG(score) FROM players);'
  },
  {
    id: 42,
    company: '阿里巴巴',
    department: '淘宝',
    title: 'IN子查询',
    background: '需要找出购买过某商品的用户',
    requirement: '查询购买过商品ID为100的所有用户姓名',
    difficulty: 2,
    category: '子查询',
    tables: [
      {
        name: 'users',
        alias: '用户表',
        columns: [
          { name: 'user_id', type: 'INT', description: '用户ID', isPrimaryKey: true },
          { name: 'username', type: 'VARCHAR', description: '用户名' }
        ]
      },
      {
        name: 'orders',
        alias: '订单表',
        columns: [
          { name: 'order_id', type: 'INT', description: '订单ID', isPrimaryKey: true },
          { name: 'user_id', type: 'INT', description: '用户ID' },
          { name: 'product_id', type: 'INT', description: '商品ID' }
        ]
      }
    ],
    hint: 'IN后面跟子查询查找购买过该商品的用户ID喵～',
    solution: 'SELECT username FROM users WHERE user_id IN (SELECT user_id FROM orders WHERE product_id = 100);'
  },
  {
    id: 43,
    company: '腾讯',
    department: '微信',
    title: 'EXISTS子查询',
    background: '需要找出有过支付记录的用户',
    requirement: '查询有过支付记录的所有用户',
    difficulty: 3,
    category: '子查询',
    tables: [
      {
        name: 'users',
        alias: '用户表',
        columns: [
          { name: 'user_id', type: 'INT', description: '用户ID', isPrimaryKey: true },
          { name: 'nickname', type: 'VARCHAR', description: '昵称' }
        ]
      },
      {
        name: 'payments',
        alias: '支付表',
        columns: [
          { name: 'payment_id', type: 'INT', description: '支付ID', isPrimaryKey: true },
          { name: 'user_id', type: 'INT', description: '用户ID' }
        ]
      }
    ],
    hint: 'EXISTS检查子查询是否有结果喵～',
    solution: 'SELECT * FROM users u WHERE EXISTS (SELECT 1 FROM payments p WHERE p.user_id = u.user_id);'
  },
  {
    id: 44,
    company: '美团',
    department: '外卖',
    title: 'FROM子查询',
    background: '需要统计各类别的平均价格',
    requirement: '计算每个商品类别的平均价格，并筛选高于全局平均的商品类别',
    difficulty: 3,
    category: '子查询',
    tables: [
      {
        name: 'products',
        alias: '商品表',
        columns: [
          { name: 'product_id', type: 'INT', description: '商品ID', isPrimaryKey: true },
          { name: 'category', type: 'VARCHAR', description: '类别' },
          { name: 'price', type: 'DECIMAL', description: '价格' }
        ]
      }
    ],
    hint: '子查询作为临时表，然后外层再筛选喵～',
    solution: 'SELECT category, avg_price FROM (SELECT category, AVG(price) as avg_price FROM products GROUP BY category) as cat_avg WHERE avg_price > (SELECT AVG(price) FROM products);'
  },
  {
    id: 45,
    company: '京东',
    department: '3C数码',
    title: '比较子查询',
    background: '需要找出价格低于同类平均的商品',
    requirement: '查询价格低于其所属类别平均价格的商品',
    difficulty: 4,
    category: '子查询',
    tables: [
      {
        name: 'products',
        alias: '商品表',
        columns: [
          { name: 'product_id', type: 'INT', description: '商品ID', isPrimaryKey: true },
          { name: 'product_name', type: 'VARCHAR', description: '商品名称' },
          { name: 'category', type: 'VARCHAR', description: '类别' },
          { name: 'price', type: 'DECIMAL', description: '价格' }
        ]
      }
    ],
    hint: '子查询计算每个类别的平均价格，然后与当前商品价格比较喵～',
    solution: 'SELECT * FROM products p WHERE price < (SELECT AVG(price) FROM products WHERE category = p.category);'
  },
  {
    id: 46,
    company: '拼多多',
    department: '农产品',
    title: '标量子查询',
    background: '需要显示每笔订单的占总金额比例',
    requirement: '查询每笔订单及其金额占所有订单总金额的比例',
    difficulty: 3,
    category: '子查询',
    tables: [
      {
        name: 'orders',
        alias: '订单表',
        columns: [
          { name: 'order_id', type: 'INT', description: '订单ID', isPrimaryKey: true },
          { name: 'amount', type: 'DECIMAL', description: '订单金额' }
        ]
      }
    ],
    hint: '在SELECT中使用子查询计算总金额喵～',
    solution: 'SELECT order_id, amount, amount / (SELECT SUM(amount) FROM orders) * 100 as percentage FROM orders;'
  },
  {
    id: 47,
    company: '滴滴',
    department: '快车',
    title: 'NOT EXISTS应用',
    background: '需要找出从未使用过优惠券的用户',
    requirement: '查询所有从未使用过优惠券的用户',
    difficulty: 3,
    category: '子查询',
    tables: [
      {
        name: 'users',
        alias: '用户表',
        columns: [
          { name: 'user_id', type: 'INT', description: '用户ID', isPrimaryKey: true },
          { name: 'name', type: 'VARCHAR', description: '姓名' }
        ]
      },
      {
        name: 'coupon_usage',
        alias: '优惠券使用表',
        columns: [
          { name: 'usage_id', type: 'INT', description: '使用记录ID', isPrimaryKey: true },
          { name: 'user_id', type: 'INT', description: '用户ID' },
          { name: 'coupon_id', type: 'INT', description: '优惠券ID' }
        ]
      }
    ],
    hint: 'NOT EXISTS与EXISTS相反，检查子查询是否无结果喵～',
    solution: 'SELECT * FROM users u WHERE NOT EXISTS (SELECT 1 FROM coupon_usage c WHERE c.user_id = u.user_id);'
  },
  {
    id: 48,
    company: '网易',
    department: '云课堂',
    title: 'ALL子查询',
    background: '需要找出成绩最高的学生',
    requirement: '查询分数大于所有班级平均分的学生',
    difficulty: 3,
    category: '子查询',
    tables: [
      {
        name: 'students',
        alias: '学生表',
        columns: [
          { name: 'student_id', type: 'INT', description: '学生ID', isPrimaryKey: true },
          { name: 'name', type: 'VARCHAR', description: '姓名' },
          { name: 'class_id', type: 'INT', description: '班级ID' },
          { name: 'score', type: 'INT', description: '分数' }
        ]
      }
    ],
    hint: 'ALL关键字表示满足所有子查询结果的条件喵～',
    solution: 'SELECT * FROM students WHERE score > ALL (SELECT AVG(score) FROM students GROUP BY class_id);'
  },
  {
    id: 49,
    company: '快手',
    department: '短视频',
    title: '相关子查询',
    background: '需要找出每个类别的最新视频',
    requirement: '查询每个类别中发布时间最晚的视频',
    difficulty: 4,
    category: '子查询',
    tables: [
      {
        name: 'videos',
        alias: '视频表',
        columns: [
          { name: 'video_id', type: 'INT', description: '视频ID', isPrimaryKey: true },
          { name: 'category', type: 'VARCHAR', description: '类别' },
          { name: 'title', type: 'VARCHAR', description: '标题' },
          { name: 'publish_time', type: 'DATETIME', description: '发布时间' }
        ]
      }
    ],
    hint: '相关子查询中引用外层表的字段喵～',
    solution: 'SELECT * FROM videos v WHERE publish_time = (SELECT MAX(publish_time) FROM videos WHERE category = v.category);'
  },
  {
    id: 50,
    company: '哔哩哔哩',
    department: '会员',
    title: '综合查询',
    background: '需要分析会员续费情况',
    requirement: '查询所有会员及其最后续费时间，筛选出超过30天未续费的会员',
    difficulty: 5,
    category: '综合查询',
    tables: [
      {
        name: 'members',
        alias: '会员表',
        columns: [
          { name: 'member_id', type: 'INT', description: '会员ID', isPrimaryKey: true },
          { name: 'member_name', type: 'VARCHAR', description: '会员名称' },
          { name: 'level', type: 'VARCHAR', description: '会员等级' }
        ]
      },
      {
        name: 'renewals',
        alias: '续费记录表',
        columns: [
          { name: 'renewal_id', type: 'INT', description: '续费ID', isPrimaryKey: true },
          { name: 'member_id', type: 'INT', description: '会员ID', isForeignKey: true },
          { name: 'renewal_date', type: 'DATE', description: '续费日期' }
        ]
      }
    ],
    hint: '综合运用JOIN、子查询、聚合函数和日期函数喵～',
    solution: 'SELECT m.member_name, m.level, r.last_renewal_date FROM members m LEFT JOIN (SELECT member_id, MAX(renewal_date) as last_renewal_date FROM renewals GROUP BY member_id) r ON m.member_id = r.member_id WHERE DATEDIFF(CURRENT_DATE, r.last_renewal_date) > 30 OR r.last_renewal_date IS NULL;'
  }
];

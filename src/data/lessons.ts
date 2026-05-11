import { Scenario } from '../types';

export const learningScenarios: Scenario[] = [
  {
    id: 'chapter-1',
    company: '喵SQL学院',
    department: '入门课程',
    title: '初识数据库 - 猫咪图书馆的故事',
    background: '想象你有一个超级大的书架📚，上面放满了各种猫咪的信息。',
    requirement: '理解数据库、表、字段、记录的概念',
    difficulty: 1,
    category: '数据库基础',
    tables: [],
    correctAnswer: '',
    wrongPoints: [],
    similarQuestions: []
  }
];

export const chapterLessons = [
  {
    id: 'chapter-1',
    title: '初识数据库 - 猫咪图书馆的故事',
    emoji: '🏠',
    sections: [
      {
        type: 'concept',
        title: '概念讲解',
        content: `喵～欢迎来到喵SQL的世界！首先我们来认识一下什么是数据库吧！

想象你有一个超级大的书架📚，上面放满了各种猫咪的信息。这个书架就是**数据库**，而每一本小册子就是**表（Table）**。

比如我们有一本叫 \`cats\` 的小册子，里面记录着每只小猫咪的名字、年龄、喜欢的食物等信息：`,
        tableData: {
          headers: ['name', 'age', 'favorite'],
          rows: [
            ['橘喵', '3', '鱼干'],
            ['布偶', '2', '猫罐头'],
            ['狸花', '5', '小鱼']
          ]
        }
      },
      {
        type: 'analogy',
        title: '生活比喻',
        items: [
          { term: '数据库', definition: '就像是一个城市，里面有很多栋楼（表）' },
          { term: '表', definition: '就像是一个楼层，里面有很多房间（每行数据）' },
          { term: '字段（列）', definition: '就像是房间的不同属性，比如面积、用途、价格' },
          { term: '记录（行）', definition: '就是具体的某一个房间' }
        ]
      }
    ],
    exercise: {
      task: '假设你有一个 `students` 学生信息表，包含 name（姓名）、age（年龄）、grade（年级）字段，请思考：这个表里"三年级"、"10岁"、"小明"分别是什么？',
      answer: '填空题（无标准SQL答案）',
      explanation: [
        '"三年级" → grade字段的一个可能的值',
        '"10岁" → age字段的一个可能的值',
        '"小明" → name字段的一个可能的值，也是某一行记录的名字'
      ]
    },
    achievements: ['初学者']
  },
  {
    id: 'chapter-2',
    title: 'SELECT初体验 - 挑选你想要的猫咪',
    emoji: '🐾',
    sections: [
      {
        type: 'concept',
        title: '概念讲解',
        content: `SELECT 是SQL中最最最重要的命令了！它的意思就是"挑选"，从表中挑选出我们想要的数据。`,
        examples: [
          {
            sql: 'SELECT * FROM cats;',
            explanation: '从 cats 表里，把所有的猫咪信息都给我找出来！',
            note: '星号 * 代表"所有字段"'
          },
          {
            sql: 'SELECT name, age FROM cats;',
            explanation: '从 cats 表里，我只需要猫咪的名字和年龄，其他的不用告诉我喵～'
          },
          {
            sql: 'SELECT name FROM cats WHERE age > 3;',
            explanation: '小鱼干！这条是说，从 cats 表里，找出年龄大于3岁的猫咪，只给我看它们的姓名！'
          }
        ]
      },
      {
        type: 'concept',
        title: '排序与限制',
        content: '',
        examples: [
          {
            sql: 'SELECT name, age FROM cats ORDER BY age DESC;',
            explanation: '从 cats 表里，把猫咪按年龄从大到小排个序，然后告诉我名字和年龄喵～',
            note: 'ASC = 从小到大，DESC = 从大到小'
          },
          {
            sql: 'SELECT name FROM cats ORDER BY age DESC LIMIT 2;',
            explanation: '找出最年长的2只猫咪的名字！'
          }
        ]
      },
      {
        type: 'analogy',
        title: '生活比喻',
        subtitle: 'SELECT 就像是你去超市买东西：',
        items: [
          { code: 'SELECT *', definition: '买下整个货架的所有东西' },
          { code: 'SELECT name, price', definition: '只买名字和价格标签' },
          { code: 'WHERE price < 100', definition: '只要100元以下的' },
          { code: 'ORDER BY price ASC', definition: '按价格从低到高排队' },
          { code: 'LIMIT 5', definition: '只买前5个' }
        ]
      }
    ],
    exercise: {
      task: '从 `products` 商品表中，查询价格（price）低于50元的产品名称（product_name），按价格从低到高排序，只显示前10个。',
      template: 'SELECT ________ FROM ________ WHERE ________ ORDER BY ________ ________ LIMIT ________;',
      answer: 'SELECT product_name FROM products WHERE price < 50 ORDER BY price ASC LIMIT 10;',
      explanation: [
        'product_name - 要查询的产品名称字段',
        'products - 商品表名称',
        'price < 50 - 筛选价格低于50元的条件',
        'price ASC - 按价格升序排序',
        '10 - 限制返回10条记录'
      ]
    },
    achievements: ['SQL小喵']
  },
  {
    id: 'chapter-3',
    title: 'WHERE详解 - 精准筛选的艺术',
    emoji: '🔍',
    sections: [
      {
        type: 'concept',
        title: '概念讲解',
        content: `WHERE 是用来"筛选"的命令，就像你用筛子筛面粉一样，只留下符合条件的东西。`,
        tableData: {
          headers: ['运算符', '含义', '举例'],
          rows: [
            ['=', '等于', 'WHERE age = 3'],
            ['!= 或 <>', '不等于', 'WHERE age != 3'],
            ['>', '大于', 'WHERE age > 3'],
            ['<', '小于', 'WHERE age < 3'],
            ['>=', '大于等于', 'WHERE age >= 3'],
            ['<=', '小于等于', 'WHERE age <= 3']
          ]
        }
      },
      {
        type: 'concept',
        title: '多重条件',
        content: '',
        examples: [
          {
            sql: 'SELECT * FROM cats WHERE age > 2 AND favorite = \'鱼干\';',
            explanation: '找出年龄大于2岁、且喜欢鱼干的猫咪喵～',
            note: 'AND：所有条件都要满足'
          },
          {
            sql: 'SELECT * FROM cats WHERE age < 2 OR age > 5;',
            explanation: '找出年龄小于2岁、或者年龄大于5岁的猫咪喵～',
            note: 'OR：满足任意一个条件就行'
          }
        ]
      },
      {
        type: 'concept',
        title: '高级筛选',
        content: '',
        examples: [
          {
            sql: 'SELECT * FROM cats WHERE name LIKE \'橘%\';',
            explanation: '找出名字以\'橘\'开头的所有猫咪喵～（%代表任意多个字符）',
            note: 'LIKE 用于模糊匹配'
          },
          {
            sql: 'SELECT * FROM cats WHERE age BETWEEN 2 AND 5;',
            explanation: '找出年龄在2到5岁之间的猫咪喵～（包括2和5）'
          },
          {
            sql: 'SELECT * FROM cats WHERE favorite IN (\'鱼干\', \'猫罐头\');',
            explanation: '找出喜欢吃鱼干、或者猫罐头的猫咪喵～'
          }
        ]
      },
      {
        type: 'analogy',
        title: '生活比喻',
        subtitle: 'WHERE 就像是你在租房软件上筛选房子：',
        items: [
          { code: 'WHERE price < 3000', definition: '价格低于3000' },
          { code: 'WHERE area > 30 AND area < 100', definition: '面积在30到100平米' },
          { code: 'WHERE location LIKE \'%地铁%\'', definition: '位置包含"地铁"' },
          { code: 'WHERE price IN (2000, 2500, 3000)', definition: '价格是2000、2500或3000' }
        ]
      }
    ],
    exercise: {
      task: '从 `orders` 订单表中，查询2024年1月1日之后下单的、订单金额（amount）在100到1000元之间的、已支付的（status = \'paid\'）所有订单。',
      template: `SELECT * FROM ________ 
WHERE ________ > '2024-01-01' 
AND ________ BETWEEN ________ AND ________ 
AND ________ = '________';`,
      answer: `SELECT * FROM orders 
WHERE order_date > '2024-01-01' 
AND amount BETWEEN 100 AND 1000 
AND status = 'paid';`,
      explanation: [
        'orders - 订单表名称',
        'order_date > \'2024-01-01\' - 筛选2024年1月1日之后的订单',
        'amount - 订单金额字段',
        '100 AND 1000 - 金额范围',
        "status = 'paid' - 筛选已支付状态"
      ]
    },
    achievements: ['SQL小喵']
  },
  {
    id: 'chapter-4',
    title: '聚合函数 - 统计小能手上线',
    emoji: '📊',
    sections: [
      {
        type: 'concept',
        title: '概念讲解',
        content: `聚合函数就是"汇总统计"的工具，可以帮你算总数、平均值、最大最小值等。就像你数一数钱包里有多少钱一样喵～`,
        tableData: {
          headers: ['函数', '作用', '举例'],
          rows: [
            ['COUNT()', '计数', 'SELECT COUNT(*) FROM cats'],
            ['SUM()', '求和', 'SELECT SUM(price) FROM products'],
            ['AVG()', '求平均', 'SELECT AVG(age) FROM cats'],
            ['MAX()', '最大值', 'SELECT MAX(price) FROM products'],
            ['MIN()', '最小值', 'SELECT MIN(price) FROM products']
          ]
        }
      },
      {
        type: 'concept',
        title: '函数详解',
        content: '',
        examples: [
          {
            sql: 'SELECT COUNT(*) FROM cats;',
            explanation: '告诉我表里一共有多少只猫咪喵～'
          },
          {
            sql: 'SELECT SUM(price) FROM orders WHERE status = \'paid\';',
            explanation: '算算所有已支付订单的总金额是多少喵～'
          },
          {
            sql: 'SELECT AVG(age) FROM cats;',
            explanation: '所有猫咪的平均年龄是多少岁喵～'
          },
          {
            sql: 'SELECT COUNT(DISTINCT category) FROM products;',
            explanation: '告诉我商品一共有多少个不同的类别喵～（重复的只算一次）'
          }
        ]
      },
      {
        type: 'analogy',
        title: '生活比喻',
        subtitle: '聚合函数就像是你在月底看账单：',
        items: [
          { code: 'COUNT(*)', definition: '这个月一共买了多少次东西' },
          { code: 'SUM(amount)', definition: '这个月一共花了多少钱' },
          { code: 'AVG(amount)', definition: '每次平均花多少钱' },
          { code: 'MAX(amount)', definition: '单笔最大花了多少' },
          { code: 'MIN(amount)', definition: '单笔最少花了多少' }
        ]
      }
    ],
    exercise: {
      task: '从 `employees` 员工表中，计算：1. 公司一共有多少员工 2. 员工平均工资（salary）是多少 3. 最高工资和最低工资分别是多少',
      template: `SELECT 
    COUNT(*) AS ________,
    AVG(________) AS avg_salary,
    MAX(________) AS max_salary,
    MIN(________) AS min_salary
FROM ________;`,
      answer: `SELECT 
    COUNT(*) AS total_employees,
    AVG(salary) AS avg_salary,
    MAX(salary) AS max_salary,
    MIN(salary) AS min_salary
FROM employees;`,
      explanation: [
        'total_employees - 总员工数的别名',
        'salary - 平均工资字段',
        'salary - 最高工资字段',
        'salary - 最低工资字段',
        'employees - 员工表名称'
      ]
    },
    achievements: ['SQL小喵']
  },
  {
    id: 'chapter-5',
    title: 'GROUP BY分组 - 分类统计的艺术',
    emoji: '🎯',
    sections: [
      {
        type: 'concept',
        title: '概念讲解',
        content: `GROUP BY 的意思是"按什么分组"，就像你把衣柜里的衣服按季节分类、按颜色分类一样。分组后，每一组都会产生一个统计结果。`,
        examples: [
          {
            sql: 'SELECT category, COUNT(*) FROM products GROUP BY category;',
            explanation: '按商品类别分组，告诉我每个类别分别有多少个商品喵～'
          },
          {
            sql: `SELECT 
    category, 
    COUNT(*) as product_count,
    AVG(price) as avg_price
FROM products 
GROUP BY category;`,
            explanation: '按类别分组，告诉我每个类别有多少商品、平均价格喵～'
          }
        ]
      },
      {
        type: 'analogy',
        title: '生活比喻',
        subtitle: 'GROUP BY 就像是你在整理书架：',
        items: [
          { code: 'GROUP BY author', definition: '把书先按作者分组' },
          { code: 'COUNT(*)', definition: '每组有多少本书' },
          { code: 'AVG(thickness)', definition: '每组书的平均厚度' },
          { code: 'MAX(thickness)', definition: '每组最厚的一本' }
        ]
      }
    ],
    exercise: {
      task: '从 `orders` 订单表中，按订单状态（status）分组，统计每个状态下的订单数量和平均订单金额（amount）。',
      template: `SELECT 
    status,
    COUNT(*) AS ________,
    AVG(________) AS avg_amount
FROM orders
GROUP BY ________;`,
      answer: `SELECT 
    status,
    COUNT(*) AS order_count,
    AVG(amount) AS avg_amount
FROM orders
GROUP BY status;`,
      explanation: [
        'order_count - 订单数量的别名',
        'amount - 平均金额字段',
        'status - 按状态分组'
      ]
    },
    achievements: ['SQL达人']
  },
  {
    id: 'chapter-6',
    title: 'HAVING筛选 - 分组后的精准过滤',
    emoji: '🎯',
    sections: [
      {
        type: 'concept',
        title: '概念讲解',
        content: `HAVING 是用来筛选"分组后的结果"的，就像你先用筛子筛选，再用放大镜仔细看。HAVING 总是和 GROUP BY 一起用！`,
        important: 'WHERE 是在分组之前筛选（筛选原始数据）\nHAVING 是在分组之后筛选（筛选分组结果）'
      },
      {
        type: 'concept',
        title: '示例',
        content: '',
        examples: [
          {
            sql: `SELECT category, COUNT(*) 
FROM products 
WHERE price > 100
GROUP BY category
HAVING COUNT(*) > 5;`,
            explanation: '小鱼干！这条是说：\n1. 先从所有商品里，把价格大于100的挑出来\n2. 然后按类别分组\n3. 最后只看那些商品数量大于5个的类别喵～'
          }
        ]
      },
      {
        type: 'warning',
        title: '常见错误',
        items: [
          { wrong: 'WHERE COUNT(*) > 5', right: 'HAVING COUNT(*) > 5', reason: 'WHERE不能筛选聚合结果，HAVING专门筛选聚合结果' }
        ]
      },
      {
        type: 'analogy',
        title: '生活比喻',
        subtitle: 'WHERE 和 HAVING 的区别：',
        items: [
          { code: 'WHERE', definition: '进教室之前先点名，只要认真听讲的同学' },
          { code: 'HAVING', definition: '老师点评时，只表扬平均分大于90分的班级' }
        ]
      }
    ],
    exercise: {
      task: '从 `orders` 订单表中，找出订单数量超过10笔的所有客户（customer_id），并显示每个客户的订单数量。',
      template: `SELECT 
    customer_id,
    COUNT(*) AS order_count
FROM orders
GROUP BY ________
HAVING ________ > ________;`,
      answer: `SELECT 
    customer_id,
    COUNT(*) AS order_count
FROM orders
GROUP BY customer_id
HAVING COUNT(*) > 10;`,
      explanation: [
        'customer_id - 按客户ID分组',
        "COUNT(*) - 筛选聚合结果",
        "10 - 超过10笔订单"
      ]
    },
    achievements: ['SQL达人']
  },
  {
    id: 'chapter-7',
    title: 'JOIN连接 - 跨表查询的艺术',
    emoji: '🔗',
    sections: [
      {
        type: 'concept',
        title: '概念讲解',
        content: `JOIN 就像是你有两本电话本，一本有姓名和电话，另一本有姓名和地址，JOIN就是把它们合并成一本完整的通讯录！`,
        tableData: {
          headers: ['id', 'name'],
          rows: [
            ['1', '小明'],
            ['2', '小红'],
            ['3', '小刚']
          ],
          caption: '用户表 users'
        },
        secondTable: {
          headers: ['id', 'user_id', 'amount'],
          rows: [
            ['1', '1', '100'],
            ['2', '1', '200'],
            ['3', '2', '150'],
            ['4', '4', '300']
          ],
          caption: '订单表 orders'
        }
      },
      {
        type: 'concept',
        title: 'INNER JOIN 内连接',
        content: '',
        examples: [
          {
            sql: `SELECT users.name, orders.amount
FROM users
INNER JOIN orders ON users.id = orders.user_id;`,
            explanation: '把两个表连接起来，只保留两边都有对应记录的数据喵～（小刚和user_id=4都没有显示）'
          }
        ]
      },
      {
        type: 'concept',
        title: 'LEFT JOIN 左连接',
        content: '',
        examples: [
          {
            sql: `SELECT users.name, orders.amount
FROM users
LEFT JOIN orders ON users.id = orders.user_id;`,
            explanation: '以左边的表（users）为主，即使没有对应记录也要保留喵～（小刚没有订单，但还是显示出来了，只是订单金额是NULL喵～）'
          }
        ]
      },
      {
        type: 'analogy',
        title: '生活比喻',
        items: [
          { code: 'INNER JOIN', definition: '两个人互相认识才牵手' },
          { code: 'LEFT JOIN', definition: '不管对方认不认识你，你都要牵' },
          { code: 'RIGHT JOIN', definition: '不管你认不认识对方，对方都要牵' }
        ]
      }
    ],
    exercise: {
      task: '有三张表：students (id, name, class_id)、classes (id, class_name, teacher)、scores (id, student_id, score)。请查询每个学生姓名、所在班级和总成绩。',
      template: `SELECT 
    s.name,
    c.class_name,
    ________(sc.score) as total_score
FROM students s
INNER JOIN classes c ON s.________ = c.id
LEFT JOIN scores sc ON s.id = sc.________
GROUP BY s.id, c.class_name;`,
      answer: `SELECT 
    s.name,
    c.class_name,
    SUM(sc.score) as total_score
FROM students s
INNER JOIN classes c ON s.class_id = c.id
LEFT JOIN scores sc ON s.id = sc.student_id
GROUP BY s.id, c.class_name;`,
      explanation: [
        'SUM - 汇总每个学生的成绩',
        'class_id = c.id - 学生表与班级表关联',
        'student_id - 成绩表与学生表关联'
      ]
    },
    achievements: ['SQL达人']
  },
  {
    id: 'chapter-8',
    title: '子查询 - SQL中的俄罗斯套娃',
    emoji: '🎁',
    sections: [
      {
        type: 'concept',
        title: '概念讲解',
        content: `子查询就是"查询里面再套查询"，就像俄罗斯套娃一样，一个查询里面有另一个查询。子查询让SQL变得更加强大！`,
        list: [
          '在 WHERE 后面',
          '在 FROM 后面（作为临时表）',
          '在 SELECT 后面（作为字段）'
        ]
      },
      {
        type: 'concept',
        title: 'WHERE 中的子查询',
        content: '',
        examples: [
          {
            sql: 'SELECT * FROM cats WHERE age > (SELECT AVG(age) FROM cats);',
            explanation: '先算出所有猫咪的平均年龄，然后找出年龄大于平均值的猫咪喵～'
          },
          {
            sql: `SELECT * FROM users 
WHERE id IN (SELECT DISTINCT user_id FROM orders);`,
            explanation: '先找出所有有过购买记录的用户ID，然后在用户表里找出这些用户喵～'
          }
        ]
      },
      {
        type: 'concept',
        title: 'FROM 中的子查询',
        content: '',
        examples: [
          {
            sql: `SELECT category, avg_price
FROM (
    SELECT category, AVG(price) as avg_price
    FROM products
    GROUP BY category
) as category_stats
WHERE avg_price > 100;`,
            explanation: '先按类别算出平均价格，然后从结果里筛选平均价格大于100的类别喵～'
          }
        ]
      },
      {
        type: 'analogy',
        title: '生活比喻',
        subtitle: '子查询就像是你问朋友问题：',
        items: [
          { code: '普通查询', definition: '"今天谁请我吃饭了？"' },
          { code: 'WHERE子查询', definition: '"今天谁请我吃饭了？而且他还比我有钱"' },
          { code: '聚合子查询', definition: '"你们班平均分多少？"' }
        ]
      }
    ],
    exercise: {
      task: '从 `products` 表中，找出价格高于所有商品平均价格的商品名称和价格。',
      template: `SELECT product_name, price
FROM products
WHERE price > (
    SELECT ________(price)
    FROM ________
);`,
      answer: `SELECT product_name, price
FROM products
WHERE price > (
    SELECT AVG(price)
    FROM products
);`,
      explanation: [
        'AVG - 计算平均价格',
        'products - 在商品表内计算平均价格'
      ]
    },
    achievements: ['SQL大师']
  }
];

export const achievementList = [
  { id: '初学者', emoji: '🐣', name: '初学者', description: '完成第1章' },
  { id: 'SQL小喵', emoji: '🐱', name: 'SQL小喵', description: '完成前3章' },
  { id: 'SQL达人', emoji: '🐯', name: 'SQL达人', description: '完成前5章' },
  { id: 'SQL大师', emoji: '🦁', name: 'SQL大师', description: '完成全部8章' },
  { id: '练习之星', emoji: '🎯', name: '练习之星', description: '完成所有练习题' }
];

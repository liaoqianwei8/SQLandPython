import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight } from 'lucide-react';

export default function SummaryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: '全部', emoji: '📚' },
    { id: 'query', label: '查询基础', emoji: '🔍' },
    { id: 'aggregate', label: '聚合函数', emoji: '📊' },
    { id: 'join', label: '多表查询', emoji: '🔗' },
    { id: 'dml', label: '数据操作', emoji: '✏️' },
  ];

  const summaryItems = [
    {
      id: 1,
      category: 'query',
      title: 'SELECT 查询基础',
      difficulty: 1,
      points: [
        'SELECT 用于从表中选取数据',
        'FROM 指定要查询的表',
        '* 表示选择所有列',
        '可以使用 AS 给列起别名',
      ],
      memoryTip: 'SELECT 就像去超市挑选商品，告诉店员你要买什么喵～',
      example: 'SELECT name, age FROM users;',
    },
    {
      id: 2,
      category: 'query',
      title: 'WHERE 条件筛选',
      difficulty: 2,
      points: [
        'WHERE 用于过滤记录',
        '可以使用比较运算符：=, !=, >, <, >=, <=',
        'AND 和 OR 用于组合多个条件',
        'LIKE 用于模糊匹配',
      ],
      memoryTip: 'WHERE 就像是用筛子过滤面粉，只留下你需要的喵～',
      example: "SELECT * FROM users WHERE age > 18 AND name LIKE '张%';",
    },
    {
      id: 3,
      category: 'query',
      title: 'ORDER BY 排序',
      difficulty: 1,
      points: [
        'ORDER BY 用于对结果排序',
        'ASC 表示升序（从小到大）',
        'DESC 表示降序（从大到小）',
        '可以按多个字段排序',
      ],
      memoryTip: 'ORDER BY 就像排队，按身高从低到高或从高到低喵～',
      example: 'SELECT * FROM users ORDER BY age DESC, name ASC;',
    },
    {
      id: 4,
      category: 'aggregate',
      title: '聚合函数详解',
      difficulty: 2,
      points: [
        'COUNT() 统计数量',
        'SUM() 计算总和',
        'AVG() 计算平均值',
        'MAX() 和 MIN() 求最大最小值',
      ],
      memoryTip: '聚合函数就像月底算账，统计你这个月花了多少钱喵～',
      example: 'SELECT COUNT(*), AVG(price) FROM orders;',
    },
    {
      id: 5,
      category: 'aggregate',
      title: 'GROUP BY 分组',
      difficulty: 3,
      points: [
        'GROUP BY 用于分组统计',
        '分组后每个组产生一条记录',
        '可以和聚合函数一起使用',
        'SELECT 中的字段必须是分组的字段',
      ],
      memoryTip: 'GROUP BY 就像把衣服按季节分类，同类放一起喵～',
      example: 'SELECT category, COUNT(*) FROM products GROUP BY category;',
    },
    {
      id: 6,
      category: 'aggregate',
      title: 'HAVING 筛选',
      difficulty: 3,
      points: [
        'HAVING 用于筛选分组结果',
        'WHERE 在分组前筛选原始数据',
        'HAVING 在分组后筛选分组结果',
        'HAVING 可以使用聚合函数',
      ],
      memoryTip: 'WHERE 是初选，HAVING 是复选喵～',
      example: 'SELECT category, COUNT(*) as cnt FROM products GROUP BY category HAVING cnt > 5;',
    },
    {
      id: 7,
      category: 'join',
      title: 'INNER JOIN 内连接',
      difficulty: 3,
      points: [
        'INNER JOIN 返回两个表都有的记录',
        '使用 ON 指定连接条件',
        '只保留匹配成功的记录',
        '可以用别名简化表名',
      ],
      memoryTip: 'INNER JOIN 就像两人互相认识才牵手喵～',
      example: 'SELECT u.name, o.amount FROM users u INNER JOIN orders o ON u.id = o.user_id;',
    },
    {
      id: 8,
      category: 'join',
      title: 'LEFT JOIN 左连接',
      difficulty: 3,
      points: [
        'LEFT JOIN 以左表为基准',
        '左表所有记录都会保留',
        '右表没有匹配的显示为 NULL',
        '常用于查找"有没有"类型的查询',
      ],
      memoryTip: 'LEFT JOIN 就像单相思，不管对方认不认识你，你都要牵喵～',
      example: 'SELECT u.name, o.amount FROM users u LEFT JOIN orders o ON u.id = o.user_id;',
    },
    {
      id: 9,
      category: 'dml',
      title: 'INSERT 插入数据',
      difficulty: 2,
      points: [
        'INSERT INTO 用于插入新记录',
        '可以指定要插入的字段',
        'VALUES 后跟具体的值',
        '字符串值需要用单引号',
      ],
      memoryTip: 'INSERT 就像在名单上添加新名字喵～',
      example: "INSERT INTO users (name, age) VALUES ('小明', 20);",
    },
    {
      id: 10,
      category: 'dml',
      title: 'UPDATE 更新数据',
      difficulty: 2,
      points: [
        'UPDATE 用于修改已有数据',
        'SET 指定要修改的字段和新值',
        'WHERE 条件非常重要！',
        '缺少 WHERE 会更新所有记录',
      ],
      memoryTip: 'UPDATE 就像修改作业本上的答案，但小心别改错了喵～',
      example: "UPDATE users SET age = 21 WHERE name = '小明';",
    },
  ];

  const filteredItems = selectedCategory === 'all' 
    ? summaryItems 
    : summaryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen pb-20">
      <motion.div
        className="bg-gradient-to-r from-success-500 to-success-600 text-white py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center space-x-3">
              <span>📖</span>
              <span>规律总结本</span>
            </h1>
            <p className="text-success-100 text-lg">
              系统性地总结MySQL高频考点和记忆技巧
            </p>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-success-500 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-white rounded-xl shadow-soft overflow-hidden hover:shadow-hover transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    {item.title}
                  </h3>
                  <div className="flex">
                    {Array.from({ length: item.difficulty }).map((_, i) => (
                      <span key={i} className="text-warning-400">⭐</span>
                    ))}
                  </div>
                </div>

                <ul className="space-y-2 mb-4">
                  {item.points.map((point, i) => (
                    <li key={i} className="flex items-start space-x-2 text-sm text-gray-600">
                      <span className="text-success-500 mt-0.5">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="bg-primary-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-primary-700">
                    💡 {item.memoryTip}
                  </p>
                </div>

                <div className="bg-gray-900 rounded-lg p-3">
                  <pre className="text-xs text-gray-100 font-mono overflow-x-auto">
                    {item.example}
                  </pre>
                </div>
              </div>

              <div className="bg-gray-50 px-6 py-3">
                <Link
                  to="/learn"
                  className="flex items-center justify-between text-success-600 hover:text-success-700 text-sm font-medium"
                >
                  <span>去学习相关章节</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🐱</div>
            <p className="text-gray-500">暂无该分类的内容喵～</p>
          </div>
        )}
      </div>
    </div>
  );
}

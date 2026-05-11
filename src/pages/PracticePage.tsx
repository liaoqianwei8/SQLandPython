import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, CheckCircle, XCircle, ChevronRight } from 'lucide-react';

const practiceScenarios = [
  {
    id: 1,
    company: '字节跳动',
    department: '电商部门',
    title: '高价值用户分析',
    background: '运营团队需要分析用户的购买行为，优化推荐算法',
    requirement: '找出购买次数超过5次且累计消费超过1000元的"高价值用户"',
    difficulty: 2,
    category: '分组聚合',
    tables: [
      {
        name: 'users',
        alias: '用户表',
        columns: [
          { name: 'id', type: 'INT', description: '用户ID', isPrimaryKey: true },
          { name: 'name', type: 'VARCHAR', description: '用户名' },
          { name: 'email', type: 'VARCHAR', description: '邮箱' },
        ],
      },
      {
        name: 'orders',
        alias: '订单表',
        columns: [
          { name: 'id', type: 'INT', description: '订单ID', isPrimaryKey: true },
          { name: 'user_id', type: 'INT', description: '用户ID', isForeignKey: true },
          { name: 'amount', type: 'DECIMAL', description: '订单金额' },
          { name: 'created_at', type: 'DATETIME', description: '下单时间' },
        ],
      },
    ],
    hint: '提示：需要使用GROUP BY对用户分组，然后使用HAVING筛选聚合结果喵～',
    solution: `SELECT 
    u.id,
    u.name,
    COUNT(o.id) as order_count,
    SUM(o.amount) as total_amount
FROM users u
INNER JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name
HAVING COUNT(o.id) > 5 AND SUM(o.amount) > 1000;`,
  },
  {
    id: 2,
    company: '阿里巴巴',
    department: '物流部门',
    title: '订单超时分析',
    background: '物流团队需要分析订单超时情况，优化配送效率',
    requirement: '统计每个店铺的订单超时数量和超时率（超时率=超时数/总数）',
    difficulty: 3,
    category: '多表查询',
    tables: [
      {
        name: 'orders',
        alias: '订单表',
        columns: [
          { name: 'id', type: 'INT', description: '订单ID', isPrimaryKey: true },
          { name: 'shop_id', type: 'INT', description: '店铺ID', isForeignKey: true },
          { name: 'status', type: 'VARCHAR', description: '订单状态' },
          { name: 'delivered_at', type: 'DATETIME', description: '实际送达时间' },
          { name: 'expected_at', type: 'DATETIME', description: '期望送达时间' },
        ],
      },
      {
        name: 'shops',
        alias: '店铺表',
        columns: [
          { name: 'id', type: 'INT', description: '店铺ID', isPrimaryKey: true },
          { name: 'name', type: 'VARCHAR', description: '店铺名称' },
        ],
      },
    ],
    hint: '提示：需要LEFT JOIN连接两表，计算超时数量和比例喵～',
    solution: `SELECT 
    s.name as shop_name,
    COUNT(o.id) as total_orders,
    SUM(CASE WHEN o.delivered_at > o.expected_at THEN 1 ELSE 0 END) as late_orders,
    ROUND(
        SUM(CASE WHEN o.delivered_at > o.expected_at THEN 1 ELSE 0 END) * 100.0 / 
        COUNT(o.id), 
        2
    ) as late_rate
FROM shops s
LEFT JOIN orders o ON s.id = o.shop_id
GROUP BY s.id, s.name;`,
  },
  {
    id: 3,
    company: '腾讯',
    department: '游戏部门',
    title: '玩家活跃度分析',
    background: '运营团队需要分析玩家的活跃度，制定运营策略',
    requirement: '统计每个玩家的登录次数、总充值金额，并标记VIP等级（累计充值>1000为VIP）',
    difficulty: 2,
    category: '条件判断',
    tables: [
      {
        name: 'players',
        alias: '玩家表',
        columns: [
          { name: 'id', type: 'INT', description: '玩家ID', isPrimaryKey: true },
          { name: 'name', type: 'VARCHAR', description: '玩家昵称' },
          { name: 'level', type: 'INT', description: '玩家等级' },
        ],
      },
      {
        name: 'login_logs',
        alias: '登录日志表',
        columns: [
          { name: 'id', type: 'INT', description: '日志ID', isPrimaryKey: true },
          { name: 'player_id', type: 'INT', description: '玩家ID', isForeignKey: true },
          { name: 'login_at', type: 'DATETIME', description: '登录时间' },
        ],
      },
      {
        name: 'recharges',
        alias: '充值记录表',
        columns: [
          { name: 'id', type: 'INT', description: '记录ID', isPrimaryKey: true },
          { name: 'player_id', type: 'INT', description: '玩家ID', isForeignKey: true },
          { name: 'amount', type: 'DECIMAL', description: '充值金额' },
        ],
      },
    ],
    hint: '提示：使用COUNT和SUM聚合函数，可以用CASE WHEN做条件判断喵～',
    solution: `SELECT 
    p.id,
    p.name,
    COUNT(l.id) as login_count,
    COALESCE(SUM(r.amount), 0) as total_recharge,
    CASE 
        WHEN COALESCE(SUM(r.amount), 0) > 1000 THEN 'VIP'
        ELSE '普通'
    END as vip_level
FROM players p
LEFT JOIN login_logs l ON p.id = l.player_id
LEFT JOIN recharges r ON p.id = r.player_id
GROUP BY p.id, p.name;`,
  },
];

export default function PracticePage() {
  const [selectedScenario, setSelectedScenario] = useState<number | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [completedScenarios, setCompletedScenarios] = useState<number[]>([]);

  const currentScenario = selectedScenario !== null 
    ? practiceScenarios.find(s => s.id === selectedScenario) 
    : null;

  const handleComplete = () => {
    if (selectedScenario && !completedScenarios.includes(selectedScenario)) {
      setCompletedScenarios([...completedScenarios, selectedScenario]);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <motion.div
        className="bg-gradient-to-r from-warning-500 to-warning-600 text-white py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center space-x-3">
              <span>🎯</span>
              <span>场景练习场</span>
            </h1>
            <p className="text-warning-100 text-lg">
              互联网大厂真实面试题库，让喵喵陪你一起攻克难关
            </p>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-8">
        {!currentScenario ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {practiceScenarios.map((scenario, index) => (
              <motion.div
                key={scenario.id}
                className="bg-white rounded-xl shadow-soft overflow-hidden hover:shadow-hover transition-all cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedScenario(scenario.id)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                        {scenario.company}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                        {scenario.department}
                      </span>
                    </div>
                    {completedScenarios.includes(scenario.id) && (
                      <CheckCircle className="text-success-500" size={24} />
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {scenario.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4">
                    {scenario.background}
                  </p>

                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Target size={16} />
                      <span>难度：{'⭐'.repeat(scenario.difficulty)}</span>
                    </div>
                    <div>
                      考点：{scenario.category}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-6 py-3 flex items-center justify-between">
                  <span className="text-sm text-gray-500">开始练习</span>
                  <ChevronRight className="text-gray-400" size={20} />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button
              onClick={() => {
                setSelectedScenario(null);
                setUserAnswer('');
                setShowSolution(false);
              }}
              className="mb-6 text-gray-600 hover:text-gray-800 flex items-center space-x-2"
            >
              <span>←</span>
              <span>返回题目列表</span>
            </button>

            <div className="bg-white rounded-xl shadow-soft p-8 mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                  {currentScenario.company}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                  {currentScenario.department}
                </span>
                <span className="text-sm text-gray-500">
                  {'⭐'.repeat(currentScenario.difficulty)}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {currentScenario.title}
              </h2>

              <div className="bg-primary-50 rounded-lg p-4 mb-6">
                <p className="text-primary-800">
                  <strong>业务背景：</strong>{currentScenario.background}
                </p>
              </div>

              <div className="bg-warning-50 rounded-lg p-4 mb-6">
                <p className="text-warning-800">
                  <strong>📋 任务需求：</strong>{currentScenario.requirement}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-3">数据库结构：</h3>
                <div className="space-y-4">
                  {currentScenario.tables.map((table) => (
                    <div key={table.name} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-100 px-4 py-2 font-mono text-sm font-bold">
                        {table.name}（{table.alias}）
                      </div>
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2 text-left font-medium">字段名</th>
                            <th className="px-4 py-2 text-left font-medium">类型</th>
                            <th className="px-4 py-2 text-left font-medium">说明</th>
                          </tr>
                        </thead>
                        <tbody>
                          {table.columns.map((col) => (
                            <tr key={col.name} className="border-t">
                              <td className="px-4 py-2 font-mono text-primary-600">{col.name}</td>
                              <td className="px-4 py-2 font-mono text-gray-600">{col.type}</td>
                              <td className="px-4 py-2 text-gray-600">{col.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-accent-50 rounded-lg p-4 mb-6">
                <p className="text-accent-800">
                  💡 <strong>喵喵提示：</strong>{currentScenario.hint}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-soft p-8 mb-6">
              <h3 className="font-bold text-gray-800 mb-4">📝 你的答案</h3>
              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="在这里编写你的SQL答案..."
                className="w-full h-48 p-4 border-2 border-gray-200 rounded-lg font-mono text-sm resize-none focus:border-primary-500 focus:outline-none"
              />

              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => setShowSolution(true)}
                  className="btn-secondary"
                >
                  查看答案
                </button>
                <button
                  onClick={handleComplete}
                  className="btn-primary"
                  disabled={completedScenarios.includes(currentScenario.id)}
                >
                  {completedScenarios.includes(currentScenario.id) ? (
                    <>
                      <CheckCircle size={20} className="inline mr-2" />
                      已完成
                    </>
                  ) : (
                    '标记为完成'
                  )}
                </button>
              </div>
            </div>

            {showSolution && (
              <motion.div
                className="bg-white rounded-xl shadow-soft p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-800 flex items-center space-x-2">
                    <CheckCircle className="text-success-500" size={24} />
                    <span>参考答案</span>
                  </h3>
                </div>

                <div className="bg-gray-900 rounded-lg p-4 mb-6">
                  <pre className="text-sm text-gray-100 font-mono overflow-x-auto">
                    {currentScenario.solution}
                  </pre>
                </div>

                <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg p-6">
                  <div className="flex items-start space-x-3">
                    <span className="text-3xl">🐱</span>
                    <div>
                      <p className="font-bold mb-2">喵喵讲解</p>
                      <p className="text-primary-100">
                        这道题考察的是{currentScenario.category}的能力！
                        关键点是要理解分组和聚合的配合使用喵～
                        {completedScenarios.includes(currentScenario.id) 
                          ? '太棒了，你已经完成了这道题！继续加油喵～💪'
                          : '记得点击"标记为完成"来记录你的学习进度哦！'}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

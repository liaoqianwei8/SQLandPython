import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Copy, Wand2, Star, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SQLTranslator() {
  const [sqlInput, setSqlInput] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const translateSQL = () => {
    if (!sqlInput.trim()) return;

    setIsLoading(true);

    setTimeout(() => {
      const sql = sqlInput.toLowerCase();
      let result = '';

      if (sql.includes('select') && sql.includes('from')) {
        result = `🐱 **喵喵翻译**：

这条SQL的意思是"从某个表中查询数据"喵～

`;

        if (sql.includes('where')) {
          result += `✨ **WHERE子句**：添加了筛选条件，就像用筛子过滤东西一样喵～
`;
        }

        if (sql.includes('order by')) {
          result += `📊 **ORDER BY子句**：对结果进行排序，就像排队一样喵～
`;
        }

        if (sql.includes('group by')) {
          result += `📦 **GROUP BY子句**：将结果分组统计，就像把东西分类整理一样喵～
`;
        }

        if (sql.includes('join')) {
          result += `🔗 **JOIN操作**：连接多个表，就像把两本书拼在一起看一样喵～
`;
        }

        if (sql.includes('limit')) {
          result += `🎯 **LIMIT子句**：限制返回的数量，就像只拿前几个一样喵～
`;
        }

        result += `\n💡 **小贴士**：喵喵建议你可以把SQL拆成小块理解，每一部分都有它特定的作用哦！`;

        if (sql.includes('select') && !sql.includes('from')) {
          result = `🐱 **喵喵翻译**：

这条SQL看起来不完整喵～

⚠️ **缺少FROM子句**：SELECT语句需要告诉数据库"从哪里"查询数据哦！

✅ **正确格式**：
\`\`\`sql
SELECT 字段名 FROM 表名;
\`\`\``;
        }

        if (sql.includes('insert')) {
          result = `🐱 **喵喵翻译**：

这条SQL的意思是"插入新数据"喵～

📝 **INSERT INTO**：向表中添加新的记录，就像在名单上添加新名字一样喵～`;
        }

        if (sql.includes('update')) {
          result = `🐱 **喵喵翻译**：

这条SQL的意思是"更新数据"喵～

✏️ **UPDATE**：修改表中已存在的数据，就像修改作业本上的答案一样喵～

⚠️ **注意**：记得加WHERE条件，否则会把整张表的数据都改掉哦！`;
        }

        if (sql.includes('delete')) {
          result = `🐱 **喵喵翻译**：

这条SQL的意思是"删除数据"喵～

🗑️ **DELETE**：从表中删除记录，就像撕掉笔记本上的一页纸一样喵～

⚠️ **危险警告**：一定要加WHERE条件！否则会删掉所有数据！`;
        }

      } else if (sql.includes('create table')) {
        result = `🐱 **喵喵翻译**：

这条SQL的意思是"创建新表"喵～

🏗️ **CREATE TABLE**：在数据库中创建一个新的表格，就像建一个新的文件夹一样喵～`;
      } else if (sql.includes('alter table')) {
        result = `🐱 **喵喵翻译**：

这条SQL的意思是"修改表结构"喵～

🔧 **ALTER TABLE**：修改已经存在的表的结构，比如添加新字段，就像给书架加新一层一样喵～`;
      } else {
        result = `🐱 **喵喵翻译**：

喵～这条SQL有点特殊，喵喵来分析一下喵！

💡 建议：你可以告诉喵喵你具体想做什么，或者尝试输入一个标准的SELECT查询语句喵～

**常见SQL类型**：
- SELECT - 查询数据
- INSERT - 插入数据  
- UPDATE - 更新数据
- DELETE - 删除数据
- CREATE TABLE - 创建表`;
      }

      setExplanation(result);
      setIsLoading(false);
    }, 800);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(explanation);
  };

  const formatSQL = () => {
    let formatted = sqlInput
      .replace(/select/gi, 'SELECT')
      .replace(/from/gi, '\nFROM')
      .replace(/where/gi, '\nWHERE')
      .replace(/and/gi, '\n  AND')
      .replace(/or/gi, '\n  OR')
      .replace(/order by/gi, '\nORDER BY')
      .replace(/group by/gi, '\nGROUP BY')
      .replace(/having/gi, '\nHAVING')
      .replace(/limit/gi, '\nLIMIT')
      .replace(/join/gi, '\nJOIN')
      .replace(/inner join/gi, 'INNER JOIN')
      .replace(/left join/gi, 'LEFT JOIN')
      .replace(/right join/gi, 'RIGHT JOIN');

    setSqlInput(formatted);
  };

  return (
    <div className="min-h-screen pb-20">
      <motion.div
        className="bg-gradient-to-r from-accent-500 to-accent-600 text-white py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center space-x-3">
              <span>🐱</span>
              <span>SQL翻译官</span>
            </h1>
            <p className="text-accent-100 text-lg">
              输入任意SQL语句，让喵喵用可爱的方式帮你解释含义喵～
            </p>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
                  <span>💻</span>
                  <span>输入你的SQL</span>
                </h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={formatSQL}
                    className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
                    title="格式化SQL"
                  >
                    <Wand2 size={20} />
                  </button>
                  <Link
                    to="/learn"
                    className="p-2 text-gray-500 hover:text-success-600 hover:bg-gray-100 rounded-lg transition-colors"
                    title="学习SQL"
                  >
                    <BookOpen size={20} />
                  </Link>
                </div>
              </div>

              <textarea
                value={sqlInput}
                onChange={(e) => setSqlInput(e.target.value)}
                placeholder="在这里输入你的SQL语句...
例如：SELECT name, age FROM users WHERE age > 18"
                className="w-full h-64 p-4 border-2 border-gray-200 rounded-lg font-mono text-sm resize-none focus:border-primary-500 focus:outline-none transition-colors"
              />

              <button
                onClick={translateSQL}
                disabled={!sqlInput.trim() || isLoading}
                className="w-full btn-primary flex items-center justify-center space-x-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <span>🐱</span>
                    </motion.div>
                    <span>喵喵正在翻译...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>翻译SQL</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg p-4">
              <h3 className="font-bold text-gray-800 mb-2">💡 喵喵提示</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 点击格式化按钮可以美化你的SQL</li>
                <li>• 想要学习SQL基础？点击书本图标前往学习路径</li>
                <li>• 支持 SELECT、INSERT、UPDATE、DELETE 等常见语句</li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="card min-h-[500px]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
                  <span>🐱</span>
                  <span>喵喵的解释</span>
                </h2>
                {explanation && (
                  <button
                    onClick={copyToClipboard}
                    className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
                    title="复制解释"
                  >
                    <Copy size={20} />
                  </button>
                )}
              </div>

              {explanation ? (
                <motion.div
                  className="prose prose-gray max-w-none"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="bg-gray-50 rounded-lg p-6">
                    {explanation.split('\n').map((line, i) => (
                      <p key={i} className="mb-2 text-gray-700 whitespace-pre-wrap">
                        {line}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center h-96 text-center">
                  <motion.div
                    className="text-8xl mb-6"
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    🐱
                  </motion.div>
                  <p className="text-gray-500 text-lg">
                    喵～快输入你的SQL语句，喵喵来帮你翻译吧！
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    点击"翻译SQL"按钮开始喵～
                  </p>
                </div>
              )}
            </div>

            <div className="card bg-gradient-to-br from-success-50 to-primary-50 border-2 border-success-200">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center space-x-2">
                <Star className="text-warning-500" size={20} />
                <span>收藏夹功能</span>
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                觉得某个解释很有用？收藏起来随时复习喵～
              </p>
              <button className="btn-secondary w-full text-sm">
                ⭐ 收藏到学习笔记
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

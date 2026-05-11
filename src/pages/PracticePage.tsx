import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, CheckCircle, ChevronRight, ChevronLeft, Star, Zap, BookOpen } from 'lucide-react';
import { practiceScenarios, PracticeScenario } from '../data/scenarios';

export default function PracticePage() {
  const [selectedScenario, setSelectedScenario] = useState<number | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [completedScenarios, setCompletedScenarios] = useState<number[]>([]);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState<number | 'all'>('all');

  const categories = ['all', ...new Set(practiceScenarios.map(s => s.category))];
  const difficulties = [1, 2, 3, 4, 5];

  const filteredScenarios = practiceScenarios.filter(scenario => {
    const categoryMatch = filterCategory === 'all' || scenario.category === filterCategory;
    const difficultyMatch = filterDifficulty === 'all' || scenario.difficulty === filterDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const currentScenario = selectedScenario !== null 
    ? practiceScenarios.find(s => s.id === selectedScenario) 
    : null;

  const currentIndex = currentScenario 
    ? filteredScenarios.findIndex(s => s.id === currentScenario.id)
    : -1;

  const handleComplete = () => {
    if (selectedScenario && !completedScenarios.includes(selectedScenario)) {
      setCompletedScenarios([...completedScenarios, selectedScenario]);
    }
  };

  const goToNext = () => {
    if (currentIndex < filteredScenarios.length - 1) {
      setSelectedScenario(filteredScenarios[currentIndex + 1].id);
      setUserAnswer('');
      setShowSolution(false);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setSelectedScenario(filteredScenarios[currentIndex - 1].id);
      setUserAnswer('');
      setShowSolution(false);
    }
  };

  const difficultyColors = {
    1: 'bg-emerald-100 text-emerald-700',
    2: 'bg-teal-100 text-teal-700',
    3: 'bg-amber-100 text-amber-700',
    4: 'bg-orange-100 text-orange-700',
    5: 'bg-red-100 text-red-700',
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <motion.div
        className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center">
            <motion.div
              className="text-6xl mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🎯
            </motion.div>
            <h1 className="text-4xl font-bold mb-4">场景练习场</h1>
            <p className="text-orange-100 text-lg mb-6">
              互联网大厂真实面试题库，共 {practiceScenarios.length} 道精选题目
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2">
                <span className="font-bold">{completedScenarios.length}</span> / <span>{practiceScenarios.length}</span> 已完成
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2">
                完成度: {Math.round((completedScenarios.length / practiceScenarios.length) * 100)}%
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-8">
        {!currentScenario ? (
          <>
            {/* Filters */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">按类别筛选</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setFilterCategory(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          filterCategory === cat
                            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                            : 'bg-white text-gray-600 hover:bg-orange-50 border border-gray-200'
                        }`}
                      >
                        {cat === 'all' ? '全部类别' : cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">按难度筛选</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setFilterDifficulty('all')}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        filterDifficulty === 'all'
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                          : 'bg-white text-gray-600 hover:bg-orange-50 border border-gray-200'
                      }`}
                    >
                      全部
                    </button>
                    {difficulties.map(d => (
                      <button
                        key={d}
                        onClick={() => setFilterDifficulty(d)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          filterDifficulty === d
                            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                            : 'bg-white text-gray-600 hover:bg-orange-50 border border-gray-200'
                        }`}
                      >
                        {d}⭐
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Scenarios Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredScenarios.map((scenario, index) => (
                <motion.div
                  key={scenario.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedScenario(scenario.id)}
                  whileHover={{ y: -5 }}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-full text-xs font-medium">
                          {scenario.company}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColors[scenario.difficulty]}`}>
                          {scenario.difficulty}⭐
                        </span>
                      </div>
                      {completedScenarios.includes(scenario.id) && (
                        <CheckCircle className="text-emerald-500" size={24} />
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-red-500 group-hover:bg-clip-text transition-all">
                      {scenario.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {scenario.background}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="bg-gray-100 px-3 py-1 rounded-full">{scenario.category}</span>
                      <span className="flex items-center gap-1">
                        <BookOpen size={14} />
                        {scenario.tables.length}张表
                      </span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 flex items-center justify-between group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-pink-500 transition-all">
                    <span className="text-sm font-medium">
                      {completedScenarios.includes(scenario.id) ? '查看详情' : '开始练习'}
                    </span>
                    <ChevronRight size={20} />
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredScenarios.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-gray-500">没有找到符合条件的题目喵～</p>
              </div>
            )}
          </>
        ) : (
          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Navigation */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => {
                  setSelectedScenario(null);
                  setUserAnswer('');
                  setShowSolution(false);
                }}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ChevronLeft size={20} />
                <span>返回题目列表</span>
              </button>

              <div className="flex items-center space-x-4">
                <button
                  onClick={goToPrev}
                  disabled={currentIndex === 0}
                  className="p-2 rounded-full bg-white shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft size={24} />
                </button>
                <span className="text-gray-600 font-medium">
                  {currentIndex + 1} / {filteredScenarios.length}
                </span>
                <button
                  onClick={goToNext}
                  disabled={currentIndex === filteredScenarios.length - 1}
                  className="p-2 rounded-full bg-white shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-4 py-1 rounded-full text-sm font-medium ${difficultyColors[currentScenario.difficulty]}`}>
                  {currentScenario.difficulty}⭐难度
                </span>
              </div>
            </div>

            {/* Scenario Card */}
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-full font-medium">
                  {currentScenario.company}
                </span>
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full">
                  {currentScenario.department}
                </span>
                <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full">
                  {currentScenario.category}
                </span>
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                {currentScenario.title}
              </h2>

              <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-6 mb-6">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <Zap className="text-violet-500" />
                  业务背景
                </h3>
                <p className="text-gray-700 text-lg">{currentScenario.background}</p>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 mb-6">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <Target className="text-orange-500" />
                  任务需求
                </h3>
                <p className="text-gray-700 text-lg">{currentScenario.requirement}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <BookOpen className="text-blue-500" />
                  数据库结构
                </h3>
                <div className="space-y-4">
                  {currentScenario.tables.map((table, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-2xl overflow-hidden">
                      <div className="bg-gradient-to-r from-gray-100 to-gray-50 px-6 py-3">
                        <code className="font-bold text-gray-800">{table.name}</code>
                        <span className="text-gray-500 ml-2">({table.alias})</span>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left font-semibold text-gray-700">字段名</th>
                              <th className="px-6 py-3 text-left font-semibold text-gray-700">类型</th>
                              <th className="px-6 py-3 text-left font-semibold text-gray-700">说明</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {table.columns.map((col, colIdx) => (
                              <tr key={colIdx} className="hover:bg-violet-50 transition-colors">
                                <td className="px-6 py-3 font-mono text-violet-600">{col.name}</td>
                                <td className="px-6 py-3 font-mono text-gray-600">{col.type}</td>
                                <td className="px-6 py-3 text-gray-600">{col.description}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <span className="text-2xl">💡</span>
                  喵喵提示
                </h3>
                <p className="text-gray-700">{currentScenario.hint}</p>
              </div>
            </div>

            {/* Answer Section */}
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
              <h3 className="font-bold text-gray-800 mb-4 text-xl flex items-center gap-2">
                <span className="text-2xl">✏️</span>
                你的答案
              </h3>
              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="在这里编写你的SQL答案..."
                className="w-full h-48 p-4 border-2 border-gray-200 rounded-xl font-mono text-sm resize-none focus:border-violet-500 focus:outline-none transition-colors"
              />

              <div className="flex flex-wrap gap-4 mt-4">
                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl font-medium hover:from-gray-200 hover:to-gray-300 transition-all flex items-center gap-2"
                >
                  {showSolution ? '隐藏答案' : '查看答案'}
                </button>
                <button
                  onClick={handleComplete}
                  className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all ${
                    completedScenarios.includes(currentScenario.id)
                      ? 'bg-emerald-100 text-emerald-700 cursor-default'
                      : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600'
                  }`}
                >
                  <CheckCircle size={20} />
                  {completedScenarios.includes(currentScenario.id) ? '已完成' : '标记完成'}
                </button>
              </div>
            </div>

            {/* Solution Section */}
            {showSolution && (
              <motion.div
                className="bg-white rounded-3xl shadow-xl p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="font-bold text-gray-800 mb-4 text-xl flex items-center gap-2 text-emerald-600">
                  <CheckCircle size={24} />
                  参考答案
                </h3>

                <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 mb-6">
                  <pre className="text-sm text-gray-100 font-mono overflow-x-auto">
                    {currentScenario.solution}
                  </pre>
                </div>

                <div className="bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 text-white rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <span className="text-5xl">🐱</span>
                    <div>
                      <p className="font-bold text-lg mb-2">喵喵讲解</p>
                      <p className="text-purple-100 leading-relaxed">
                        这道题考察的是<span className="font-bold text-white">{currentScenario.category}</span>的能力！
                        掌握了这个知识点，你离SQL大师又近了一步喵～🎉
                      </p>
                      {completedScenarios.includes(currentScenario.id) 
                        ? <p className="mt-2 text-yellow-300">太棒了！你已经完成了这道题！🐾</p>
                        : <p className="mt-2 text-purple-200">记得点击"标记完成"来记录你的学习进度哦！</p>
                      }
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Next Button */}
            {currentIndex < filteredScenarios.length - 1 && (
              <div className="mt-6">
                <button
                  onClick={goToNext}
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl font-bold text-lg hover:from-orange-600 hover:to-red-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  下一题
                  <ChevronRight size={24} />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

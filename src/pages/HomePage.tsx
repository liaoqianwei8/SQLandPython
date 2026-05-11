import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Code, Target, FileText, TrendingUp, Calendar, Trophy, Sparkles, Zap, Heart } from 'lucide-react';
import { chapterLessons } from '../data/lessons';

export default function HomePage() {
  const [completedChapters, setCompletedChapters] = useState<string[]>([]);
  const [streak, setStreak] = useState(1);

  useEffect(() => {
    const saved = localStorage.getItem('completedChapters');
    if (saved) {
      setCompletedChapters(JSON.parse(saved));
    }
    
    const savedStreak = localStorage.getItem('learningStreak');
    if (savedStreak) {
      setStreak(parseInt(savedStreak));
    }
  }, []);

  const progress = (completedChapters.length / chapterLessons.length) * 100;

  const features = [
    {
      icon: BookOpen,
      title: '从零到一学习',
      description: '为SQL零基础小白打造的系统学习路径',
      path: '/learn',
      gradient: 'from-violet-500 via-purple-500 to-pink-500',
      emoji: '📚',
      glow: 'group-hover:shadow-purple-500/30',
    },
    {
      icon: Code,
      title: 'SQL翻译官',
      description: '输入SQL语句，喵喵帮你解释含义',
      path: '/translator',
      gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
      emoji: '🐱',
      glow: 'group-hover:shadow-blue-500/30',
    },
    {
      icon: FileText,
      title: '规律总结',
      description: '高频考点和记忆技巧一网打尽',
      path: '/summary',
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
      emoji: '📖',
      glow: 'group-hover:shadow-emerald-500/30',
    },
    {
      icon: Target,
      title: '场景练习',
      description: '互联网大厂真实面试题库',
      path: '/practice',
      gradient: 'from-orange-500 via-red-500 to-pink-500',
      emoji: '🎯',
      glow: 'group-hover:shadow-orange-500/30',
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-100 via-purple-50 to-pink-100" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="text-8xl mb-8"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              🐱
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              喵SQL
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              MySQL面试训练营 🐾
            </motion.p>

            <motion.p
              className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              专为计算机专业学生和初级开发者打造<br />
              AI小猫助手"喵喵"全程陪伴 ✨
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link
                to="/learn"
                className="group relative px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  开始学习
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>

              <Link
                to="/translator"
                className="px-8 py-4 bg-white text-purple-600 border-2 border-purple-200 rounded-full font-bold text-lg hover:bg-purple-50 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                🐱 体验SQL翻译官
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                  📚
                </div>
                <div>
                  <h3 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                    {chapterLessons.length}
                  </h3>
                  <p className="text-gray-500">系统学习章节</p>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.5, duration: 1 }}
                />
              </div>
            </motion.div>

            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                  🔥
                </div>
                <div>
                  <h3 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    {streak}天
                  </h3>
                  <p className="text-gray-500">连续学习</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 flex items-center gap-1">
                <Heart className="w-4 h-4 text-red-400" />
                坚持学习，超越自我
              </p>
            </motion.div>

            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                  🎯
                </div>
                <div>
                  <h3 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    {completedChapters.length}
                  </h3>
                  <p className="text-gray-500">已完成章节</p>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ delay: 0.5, duration: 1 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
                四大核心模块
              </span>
            </h2>
            <p className="text-gray-500 text-lg">助你成为SQL高手</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={feature.path}
                    className={`group block p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 hover:shadow-2xl transition-all duration-500 ${feature.glow} hover:-translate-y-2`}
                  >
                    <div className="flex items-start gap-6">
                      <motion.div
                        className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-3xl flex items-center justify-center text-4xl shadow-xl group-hover:scale-110 transition-transform duration-300`}
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                      >
                        {feature.emoji}
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 group-hover:text-gray-700">
                          {feature.description}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Zap className="w-6 h-6 text-gray-300 group-hover:text-violet-500 transition-colors duration-300" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      {completedChapters.length > 0 && (
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              className="bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 rounded-3xl p-10 text-white shadow-2xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-3xl font-bold mb-2 flex items-center gap-3">
                    <Trophy className="w-8 h-8 text-yellow-300" />
                    学习进度
                  </h3>
                  <p className="text-purple-200">继续加油，SQL大师就在眼前！</p>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-bold">{Math.round(progress)}%</div>
                  <p className="text-purple-200">完成度</p>
                </div>
              </div>

              <div className="bg-white/20 rounded-full h-4 mb-8 backdrop-blur-sm">
                <motion.div
                  className="bg-gradient-to-r from-yellow-300 to-yellow-400 h-full rounded-full shadow-lg"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1 }}
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/10 rounded-2xl p-4 text-center backdrop-blur-sm">
                  <div className="text-3xl font-bold">{completedChapters.length}</div>
                  <div className="text-sm text-purple-200">已完成</div>
                </div>
                <div className="bg-white/10 rounded-2xl p-4 text-center backdrop-blur-sm">
                  <div className="text-3xl font-bold">{chapterLessons.length - completedChapters.length}</div>
                  <div className="text-sm text-purple-200">待完成</div>
                </div>
                <div className="bg-white/10 rounded-2xl p-4 text-center backdrop-blur-sm">
                  <div className="text-3xl font-bold">{Math.round(progress / 10)}</div>
                  <div className="text-sm text-purple-200">成就点</div>
                </div>
                <div className="bg-white/10 rounded-2xl p-4 text-center backdrop-blur-sm">
                  <div className="text-3xl font-bold">{streak}</div>
                  <div className="text-sm text-purple-200">连续天数</div>
                </div>
              </div>

              <Link
                to="/learn"
                className="block w-full py-4 bg-white text-purple-600 rounded-full font-bold text-lg text-center hover:bg-purple-50 transition-all duration-300 shadow-xl"
              >
                继续学习 →
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="bg-gradient-to-br from-violet-100 via-purple-50 to-pink-100 rounded-3xl p-12 text-center border border-violet-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              className="text-7xl mb-6"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🐱
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              准备好开始你的SQL学习之旅了吗？
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              喵喵会一直陪伴你，帮助你成为SQL高手喵～✨
            </p>
            <Link
              to="/learn"
              className="inline-block px-10 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              🚀 立即开始学习
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-gray-500 flex items-center justify-center gap-2">
            <span className="text-2xl">🐱</span>
            喵SQL - 让学习SQL变得有趣喵～
          </p>
        </div>
      </footer>
    </div>
  );
}

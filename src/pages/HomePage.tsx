import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Code, Target, FileText, TrendingUp, Calendar, Trophy } from 'lucide-react';
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
      color: 'from-primary-500 to-primary-600',
      bgColor: 'bg-primary-50',
      emoji: '📚',
    },
    {
      icon: Code,
      title: 'SQL翻译官',
      description: '输入SQL语句，喵喵帮你解释含义',
      path: '/translator',
      color: 'from-accent-500 to-accent-600',
      bgColor: 'bg-accent-50',
      emoji: '🐱',
    },
    {
      icon: FileText,
      title: '规律总结',
      description: '高频考点和记忆技巧一网打尽',
      path: '/summary',
      color: 'from-success-500 to-success-600',
      bgColor: 'bg-success-50',
      emoji: '📖',
    },
    {
      icon: Target,
      title: '场景练习',
      description: '互联网大厂真实面试题库',
      path: '/practice',
      color: 'from-warning-500 to-warning-600',
      bgColor: 'bg-warning-50',
      emoji: '🎯',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary-500 via-primary-600 to-accent-600 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-9xl">🐱</div>
          <div className="absolute top-20 right-20 text-7xl">📚</div>
          <div className="absolute bottom-20 left-1/4 text-8xl">🐾</div>
          <div className="absolute bottom-10 right-10 text-9xl">✨</div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              className="text-8xl mb-6"
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              🐱
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              喵SQL - MySQL面试训练营
            </h1>

            <p className="text-xl md:text-2xl text-primary-100 mb-8 leading-relaxed">
              专为计算机专业学生和初级开发者打造的MySQL学习平台 ✨<br />
              AI小猫助手"喵喵"全程陪伴，用可爱的方式帮你掌握MySQL核心技能 🐾
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/learn"
                className="px-8 py-4 bg-white text-primary-600 rounded-full font-bold text-lg hover:shadow-2xl transition-all transform hover:-translate-y-1"
              >
                🚀 开始学习
              </Link>
              <Link
                to="/translator"
                className="px-8 py-4 bg-white/20 text-white rounded-full font-bold text-lg hover:bg-white/30 transition-all"
              >
                🐱 体验SQL翻译官
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-primary-50 to-accent-50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                {chapterLessons.length}
              </h3>
              <p className="text-gray-600">系统学习章节</p>
            </motion.div>

            <motion.div
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-success-50 to-primary-50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-5xl mb-4">🔥</div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                {streak}天
              </h3>
              <p className="text-gray-600">连续学习</p>
            </motion.div>

            <motion.div
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-warning-50 to-success-50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                {completedChapters.length}
              </h3>
              <p className="text-gray-600">已完成章节</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              🐾 核心功能
            </h2>
            <p className="text-xl text-gray-600">
              四大核心模块，助你成为SQL高手
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                    className="block p-8 bg-white rounded-2xl shadow-soft hover:shadow-hover transition-all duration-300 group"
                  >
                    <div className="flex items-start space-x-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-3xl group-hover:scale-110 transition-transform`}>
                        {feature.emoji}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {completedChapters.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-primary-50 to-accent-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center space-x-3">
                <Trophy className="text-warning-500" />
                <span>学习进度</span>
              </h2>
            </div>

            <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600">完成进度</span>
                <span className="text-2xl font-bold text-primary-600">
                  {Math.round(progress)}%
                </span>
              </div>

              <div className="bg-gray-200 rounded-full h-4 overflow-hidden mb-6">
                <motion.div
                  className="bg-gradient-to-r from-primary-500 to-accent-500 h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1 }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-primary-50 rounded-xl">
                  <div className="text-3xl font-bold text-primary-600">
                    {completedChapters.length}
                  </div>
                  <div className="text-sm text-gray-600">已完成章节</div>
                </div>
                <div className="p-4 bg-accent-50 rounded-xl">
                  <div className="text-3xl font-bold text-accent-600">
                    {chapterLessons.length - completedChapters.length}
                  </div>
                  <div className="text-sm text-gray-600">待完成章节</div>
                </div>
              </div>

              <Link
                to="/learn"
                className="block w-full btn-primary text-center mt-6"
              >
                继续学习 →
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-primary-500 to-accent-600 rounded-3xl p-12 text-white text-center">
            <motion.div
              className="text-6xl mb-6"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🐱
            </motion.div>
            <h2 className="text-3xl font-bold mb-4">
              准备好开始你的SQL学习之旅了吗？
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              喵喵会一直陪伴你，帮助你成为SQL高手喵～✨
            </p>
            <Link
              to="/learn"
              className="inline-block px-8 py-4 bg-white text-primary-600 rounded-full font-bold text-lg hover:shadow-2xl transition-all transform hover:-translate-y-1"
            >
              🚀 立即开始学习
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, BookOpen, Trophy } from 'lucide-react';
import { chapterLessons, achievementList } from '../data/lessons';
import { Lesson } from '../types';

export default function LessonPage() {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const [currentChapter, setCurrentChapter] = useState(0);
  const [completedChapters, setCompletedChapters] = useState<string[]>([]);
  const [showExercise, setShowExercise] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('completedChapters');
    if (saved) {
      setCompletedChapters(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (chapterId) {
      const index = chapterLessons.findIndex(l => l.id === chapterId);
      if (index !== -1) {
        setCurrentChapter(index);
      }
    }
  }, [chapterId]);

  const currentLesson = chapterLessons[currentChapter];
  const progress = (completedChapters.length / chapterLessons.length) * 100;

  const markComplete = () => {
    const newCompleted = [...completedChapters, currentLesson.id];
    setCompletedChapters(newCompleted);
    localStorage.setItem('completedChapters', JSON.stringify(newCompleted));

    setTimeout(() => {
      if (currentChapter < chapterLessons.length - 1) {
        navigate(`/learn/${chapterLessons[currentChapter + 1].id}`);
      }
    }, 1000);
  };

  const goToChapter = (index: number) => {
    navigate(`/learn/${chapterLessons[index].id}`);
    setShowExercise(false);
  };

  return (
    <div className="min-h-screen pb-20">
      <motion.div
        className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="container mx-auto px-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-primary-100 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>返回首页</span>
          </button>

          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {currentLesson.emoji} {currentLesson.title}
              </h1>
              <p className="text-primary-100">
                第 {currentChapter + 1} / {chapterLessons.length} 章
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {completedChapters.includes(currentLesson.id) && (
                <div className="flex items-center space-x-2 bg-success-500 px-4 py-2 rounded-full">
                  <Check size={20} />
                  <span className="font-medium">已完成</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white/20 rounded-full h-2 overflow-hidden">
            <motion.div
              className="bg-white h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-primary-100 mt-2 text-sm">
            学习进度: {completedChapters.length} / {chapterLessons.length} 章
          </p>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="card">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center space-x-2">
                  <BookOpen className="text-primary-500" size={20} />
                  <span>课程目录</span>
                </h3>
                <div className="space-y-2">
                  {chapterLessons.map((lesson, index) => (
                    <button
                      key={lesson.id}
                      onClick={() => goToChapter(index)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                        index === currentChapter
                          ? 'bg-primary-500 text-white shadow-md'
                          : completedChapters.includes(lesson.id)
                          ? 'bg-success-50 text-success-600 hover:bg-success-100'
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span>{lesson.emoji}</span>
                          <span className="font-medium text-sm">{lesson.title}</span>
                        </div>
                        {completedChapters.includes(lesson.id) && <Check size={16} />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="card bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center space-x-2">
                  <Trophy className="text-warning-500" size={20} />
                  <span>成就展示</span>
                </h3>
                <div className="space-y-2">
                  {achievementList.map(achievement => {
                    const isUnlocked = completedChapters.length >= 
                      (achievement.id === '初学者' ? 1 :
                       achievement.id === 'SQL小喵' ? 3 :
                       achievement.id === 'SQL达人' ? 5 :
                       achievement.id === 'SQL大师' ? 8 : 0);
                    
                    return (
                      <div
                        key={achievement.id}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${
                          isUnlocked ? 'bg-white' : 'bg-gray-100 opacity-50'
                        }`}
                      >
                        <span className="text-2xl">{achievement.emoji}</span>
                        <div>
                          <p className={`font-medium ${isUnlocked ? 'text-gray-800' : 'text-gray-500'}`}>
                            {achievement.name}
                          </p>
                          <p className="text-xs text-gray-500">{achievement.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            {!showExercise ? (
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={currentChapter}
              >
                {currentLesson.sections.map((section, index) => (
                  <motion.div
                    key={index}
                    className="card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                      <span className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      <span>{section.title}</span>
                    </h2>

                    {section.content && (
                      <div className="prose prose-gray max-w-none">
                        {section.content.split('\n\n').map((para, i) => (
                          <p key={i} className="text-gray-600 mb-4 leading-relaxed whitespace-pre-line">
                            {para}
                          </p>
                        ))}
                      </div>
                    )}

                    {section.tableData && (
                      <div className="overflow-x-auto mb-4">
                        <table className="w-full table-bordered">
                          <thead>
                            <tr>
                              {section.tableData.headers.map((header, i) => (
                                <th key={i}>{header}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {section.tableData.rows.map((row, i) => (
                              <tr key={i}>
                                {row.map((cell, j) => (
                                  <td key={j} className="font-mono text-sm">{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {section.tableData.caption && (
                          <p className="text-sm text-gray-500 mt-2 text-center">
                            {section.tableData.caption}
                          </p>
                        )}
                      </div>
                    )}

                    {section.secondTable && (
                      <div className="overflow-x-auto mb-4">
                        <table className="w-full table-bordered">
                          <thead>
                            <tr>
                              {section.secondTable.headers.map((header, i) => (
                                <th key={i}>{header}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {section.secondTable.rows.map((row, i) => (
                              <tr key={i}>
                                {row.map((cell, j) => (
                                  <td key={j} className="font-mono text-sm">{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {section.secondTable.caption && (
                          <p className="text-sm text-gray-500 mt-2 text-center">
                            {section.secondTable.caption}
                          </p>
                        )}
                      </div>
                    )}

                    {section.examples && (
                      <div className="space-y-4 mb-4">
                        {section.examples.map((example, i) => (
                          <div key={i} className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                            <pre className="text-sm text-gray-100 font-mono">{example.sql}</pre>
                            <div className="mt-3 flex items-start space-x-2">
                              <span className="text-2xl">🐱</span>
                              <p className="text-primary-300 text-sm flex-1">
                                {example.explanation}
                              </p>
                            </div>
                            {example.note && (
                              <p className="mt-2 text-xs text-gray-400 italic">
                                💡 {example.note}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {section.items && (
                      <div className="space-y-3 mb-4">
                        {section.items.map((item, i) => (
                          <div key={i} className="flex items-start space-x-3 bg-gray-50 p-3 rounded-lg">
                            {item.code ? (
                              <code className="px-2 py-1 bg-primary-100 text-primary-700 rounded font-mono text-sm">
                                {item.code}
                              </code>
                            ) : (
                              <span className="font-semibold text-primary-600 min-w-[100px]">
                                {item.term}
                              </span>
                            )}
                            <span className="text-gray-600">=</span>
                            <span className="text-gray-700">{item.definition}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {section.important && (
                      <div className="bg-warning-50 border-l-4 border-warning-500 p-4 rounded-lg mb-4">
                        <p className="text-warning-800 font-medium">⚠️ 重要区别</p>
                        <pre className="text-warning-700 mt-2 whitespace-pre-wrap font-sans">
                          {section.important}
                        </pre>
                      </div>
                    )}
                  </motion.div>
                ))}

                <motion.div
                  className="card bg-gradient-to-br from-success-50 to-primary-50 border-2 border-success-200"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
                      <span>🎯</span>
                      <span>章节练习</span>
                    </h3>
                    <span className="text-sm text-gray-500">
                      完成后可解锁下一章
                    </span>
                  </div>

                  <div className="bg-white rounded-lg p-6">
                    <p className="text-gray-700 mb-4">
                      {currentLesson.exercise.task}
                    </p>

                    {currentLesson.exercise.template && (
                      <div className="bg-gray-100 rounded-lg p-4 mb-4">
                        <pre className="text-gray-600 font-mono text-sm whitespace-pre-wrap">
                          {currentLesson.exercise.template}
                        </pre>
                      </div>
                    )}

                    <button
                      onClick={() => setShowExercise(true)}
                      className="btn-primary w-full"
                    >
                      查看答案
                    </button>
                  </div>
                </motion.div>

                {!completedChapters.includes(currentLesson.id) && (
                  <button
                    onClick={markComplete}
                    className="w-full btn-primary flex items-center justify-center space-x-2 text-lg py-4"
                  >
                    <Check size={24} />
                    <span>完成本章学习</span>
                  </button>
                )}

                <div className="flex items-center justify-between pt-4">
                  {currentChapter > 0 ? (
                    <button
                      onClick={() => goToChapter(currentChapter - 1)}
                      className="btn-secondary flex items-center space-x-2"
                    >
                      <ArrowLeft size={20} />
                      <span>上一章</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {currentChapter < chapterLessons.length - 1 && (
                    <button
                      onClick={() => goToChapter(currentChapter + 1)}
                      className="btn-primary flex items-center space-x-2"
                    >
                      <span>下一章</span>
                      <ArrowRight size={20} />
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="card bg-gradient-to-br from-success-50 to-primary-50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                    <span>✅</span>
                    <span>答案解析</span>
                  </h3>
                  <button
                    onClick={() => setShowExercise(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    返回学习
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="bg-white rounded-lg p-6">
                    <h4 className="font-bold text-gray-800 mb-3">正确答案：</h4>
                    <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                      {currentLesson.exercise.answer}
                    </pre>
                  </div>

                  {currentLesson.exercise.explanation && (
                    <div className="bg-white rounded-lg p-6">
                      <h4 className="font-bold text-gray-800 mb-3">答案解析：</h4>
                      <ul className="space-y-2">
                        {currentLesson.exercise.explanation.map((exp, i) => (
                          <li key={i} className="flex items-start space-x-2 text-gray-600">
                            <span className="text-success-500">✓</span>
                            <span>{exp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg p-6">
                    <div className="flex items-start space-x-3">
                      <span className="text-3xl">🐱</span>
                      <div>
                        <p className="font-bold mb-2">喵喵小贴士</p>
                        <p className="text-primary-100">
                          理解了这道题吗？如果还有疑问，可以再看一遍上面的讲解哦！
                          多练习几遍，就能熟练掌握了喵～💪
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={markComplete}
                    className="w-full btn-primary"
                  >
                    我学会了，继续下一章 →
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

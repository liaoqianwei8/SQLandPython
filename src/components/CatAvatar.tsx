import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface CatAvatarProps {
  className?: string;
}

const catEmojis = ['😺', '😸', '😻', '😽', '🙀'];

export default function CatAvatar({ className = '' }: CatAvatarProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentEmoji, setCurrentEmoji] = useState(0);

  return (
    <>
      <motion.div
        className={`fixed bottom-24 right-6 z-40 cursor-pointer ${className}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsChatOpen(true)}
      >
        <motion.div
          className="text-6xl drop-shadow-lg"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {catEmojis[currentEmoji]}
        </motion.div>
        <motion.div
          className="absolute -top-1 -right-1 w-4 h-4 bg-success-500 rounded-full border-2 border-white"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </motion.div>

      <AnimatePresence>
        {isChatOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/20 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsChatOpen(false)}
            />

            <motion.div
              className="fixed bottom-32 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
            >
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🐱</span>
                  <div>
                    <h3 className="font-bold">喵喵助手</h3>
                    <p className="text-xs text-primary-100">随时为你解答SQL问题</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="p-1 hover:bg-primary-400 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🐱</span>
                  <div className="cat-bubble flex-1">
                    <p className="text-gray-700">
                      喵～欢迎来到喵SQL的世界！🐾
                    </p>
                    <p className="text-gray-700 mt-2">
                      我是你们的AI小猫助手"喵喵"～
                      有什么SQL问题都可以问我哦！
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🐱</span>
                  <div className="cat-bubble flex-1">
                    <p className="text-gray-700 mb-3">
                      我可以帮你：
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center space-x-2">
                        <span>✨</span>
                        <span>解释SQL语句的含义</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span>📚</span>
                        <span>讲解SQL知识点</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span>💡</span>
                        <span>提供学习建议</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span>🎯</span>
                        <span>帮你解答练习题</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 p-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="输入你的问题..."
                    className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-full focus:border-primary-500 focus:outline-none"
                  />
                  <button className="btn-primary px-4 py-2 rounded-full">
                    发送
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

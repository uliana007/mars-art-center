import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ loading }) {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 bg-gradient-to-br from-[#0055FF] via-[#7B2FF2] to-[#0055FF] flex items-center justify-center z-[9999]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8 } }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="w-24 h-24 rounded-full border-8 border-blue-400 border-t-transparent animate-spin"
            initial={{ scale: 0.6 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
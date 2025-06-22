import { motion } from "framer-motion";

const LoadingDots = () => {
    return (
        <motion.span
            className="inline-block w-5 text-left"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.5, 1],
            }}
        >
            <motion.span
                initial={{ opacity: 0.2 }}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut", times: [0, 0.5, 1] }}
            >
                .&nbsp;
            </motion.span>
            <motion.span
                initial={{ opacity: 0.2 }}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{
                    repeat: Infinity,
                    duration: 1.2,
                    ease: "easeInOut",
                    times: [0.2, 0.6, 1],
                    delay: 0.2,
                }}
            >
                .&nbsp;
            </motion.span>
            <motion.span
                initial={{ opacity: 0.2 }}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{
                    repeat: Infinity,
                    duration: 1.2,
                    ease: "easeInOut",
                    times: [0.4, 0.8, 1],
                    delay: 0.4,
                }}
            >
                .
            </motion.span>
        </motion.span>
    );
};
export default LoadingDots;
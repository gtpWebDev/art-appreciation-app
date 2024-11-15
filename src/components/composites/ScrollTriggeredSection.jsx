// animation library that enables scroll riggered animations
import { motion } from "framer-motion";

// To be extracted to composites
const ScrollTriggeredSection = ({
  children,
  visThreshold = 0.3, // Fraction of component within viewport to trigger visibility
  transitionDuration = 1.5, // in seconds
}) => {
  // used only if no image provided, defaults to dark

  return (
    // Motion animation settings for section content
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      exit={{ opacity: 0 }} // Fade out effect
      transition={{ duration: transitionDuration }}
      viewport={{ once: false, amount: visThreshold }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollTriggeredSection;

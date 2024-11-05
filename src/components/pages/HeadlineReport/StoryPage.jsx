import React from "react";
import { useInView } from "react-intersection-observer";
import { Typography, Box } from "@mui/material";

const StoryParagraph = ({ text }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Show each paragraph only once
    threshold: 0.7, // Trigger when 10% of the element is visible
  });

  return (
    <Box
      ref={ref}
      sx={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        mb: 4,
      }}
    >
      <Typography variant="body1">{text}</Typography>
    </Box>
  );
};

const StoryPage = () => {
  const paragraphs = [
    "This is the first paragraph of the story, introducing the context. This is the first paragraph of the story, introducing the context. This is the first paragraph of the story, introducing the context. This is the first paragraph of the story, introducing the context.",
    "This is the first paragraph of the story, introducing the context. This is the first paragraph of the story, introducing the context. This is the first paragraph of the story, introducing the context. This is the first paragraph of the story, introducing the context.",
    "This is the first paragraph of the story, introducing the context. This is the first paragraph of the story, introducing the context. This is the first paragraph of the story, introducing the context. This is the first paragraph of the story, introducing the context.",
    "This is the first paragraph of the story, introducing the context. This is the first paragraph of the story, introducing the context. This is the first paragraph of the story, introducing the context. This is the first paragraph of the story, introducing the context.",
    "This is the first paragraph of the story, introducing the context. This is the first paragraph of the story, introducing the context. This is the first paragraph of the story, introducing the context. This is the first paragraph of the story, introducing the context.",
    "This is the first paragraph of the story, introducing the context. This is the first paragraph of the story, introducing the context. This is the first paragraph of the story, introducing the context. This is the first paragraph of the story, introducing the context.",
    "This is the first paragraph of the story, introducing the context. This is the first paragraph of the story, introducing the context. This is the first paragraph of the story, introducing the context. This is the first paragraph of the story, introducing the context.",
    "This is the first paragraph of the story, introducing the context. This is the first paragraph of the story, introducing the context. This is the first paragraph of the story, introducing the context. This is the first paragraph of the story, introducing the context.",
    "This is the first paragraph of the story, introducing the context. This is the first paragraph of the story, introducing the context. This is the first paragraph of the story, introducing the context. This is the first paragraph of the story, introducing the context.",
    "This is the first paragraph of the story, introducing the context. This is the first paragraph of the story, introducing the context. This is the first paragraph of the story, introducing the context. This is the first paragraph of the story, introducing the context.",
    "This is the first paragraph of the story, introducing the context.",
    "This is the first paragraph of the story, introducing the context.",
    "This is the first paragraph of the story, introducing the context.",
    "This is the first paragraph of the story, introducing the context.",
    "The second paragraph dives deeper into the narrative, adding details.",
    "As we progress, this third paragraph builds up suspense or explanation.",
    "Finally, the fourth paragraph concludes this section of the story.",
  ];

  return (
    <Box sx={{ p: 4 }}>
      {paragraphs.map((paragraph, index) => (
        <StoryParagraph key={index} text={paragraph} />
      ))}
    </Box>
  );
};

export default StoryPage;

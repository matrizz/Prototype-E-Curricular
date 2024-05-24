import Box from "@mui/joy/Box";

export const ResumeCard = ({ ...rest }) => {
  return (
    <Box className="max-w-xs p-4 m-2 border-2 border-slate-300 dark:border-gray-600 rounded-lg">
      <h1>ResumeCard</h1>
      <p>{rest.name}</p>
      <p>{rest.description}</p>
      <p>{rest.url}</p>
      <p>{rest.student}</p>
      <p>{rest.birth}</p>
      <p>{rest.image}</p>
    </Box>
  );
};

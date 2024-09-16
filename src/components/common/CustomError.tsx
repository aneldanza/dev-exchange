// Custom Error Component
export const CustomError: React.FC<{ message: string }> = ({ message }) => (
  <div style={{ color: "red" }}>
    <h2>An error occurred!</h2>
    <p>{message}</p>
  </div>
);

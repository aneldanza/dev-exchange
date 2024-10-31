// Custom Error Component
export const CustomError: React.FC<{ message: string }> = ({ message }) => (
  <div className="error-text w-full text-center p-6">
    <p>{message}</p>
  </div>
);

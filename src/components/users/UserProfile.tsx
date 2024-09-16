import { FullUserData } from "./types";

interface UserProfileProps {
  data: FullUserData;
}

export const UserProfile: React.FC<UserProfileProps> = ({ data }) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="grid">
        <button className="btn-secondary justify-end">Edit Profile</button>
        <div>
          <div className="text-3xl font-semibold">{data.username}</div>
        </div>
      </div>
      <p>{JSON.stringify(data)}</p>
      {/* Render the user profile information here */}
    </div>
  );
};

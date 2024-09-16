import Button from "../common/Button";
import { FullUserData } from "./types";
import { PencilIcon } from "@heroicons/react/20/solid";

interface UserProfileProps {
  data: FullUserData;
}

export const UserProfile: React.FC<UserProfileProps> = ({ data }) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="grid">
        <div className="justify-items-end grid">
          <Button
            title="Edit Profile"
            onClick={() => {}}
            className="btn-outline"
            icon={<PencilIcon className="w-4" />}
          />
          {/* <button className="btn-outline justify-end">Edit Profile</button> */}
        </div>
        <div>
          <div className="text-2xl font-semibold">{data.username}</div>
        </div>
      </div>
      <p>{JSON.stringify(data)}</p>
      {/* Render the user profile information here */}
    </div>
  );
};

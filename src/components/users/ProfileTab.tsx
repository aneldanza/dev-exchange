import React from "react";
import { FullUserData } from "./types";

interface ProfileTabProps {
  data: FullUserData;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({ data }) => {
  return (
    <div className="flex flex-col space-y-4">
      <div>
        <div className="text-lg">Stats</div>
        <div className="card">
          <div className="flex gap-4">
            <div className="list">
              <div>0</div>
              <div className="text-xs text-appGray-100">answers</div>
            </div>
            <div className="list">
              <div>0</div>
              <div className="text-xs text-appGray-100">questions</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="text-lg">About</div>
        {data.description ? (
          <div className="prose prose-sm">
            <div
              dangerouslySetInnerHTML={{
                __html: data.description,
              }}
            />
          </div>
        ) : (
          <div className="card">
            <div className="text-appGray-100 text-sm">
              Your about me section is empty
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

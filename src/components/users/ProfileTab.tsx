import React from "react";

export const ProfileTab: React.FC = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div>
        <div>Stats</div>
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
        <div>About</div>
        <div className="card">
          <div className="text-appGray-100 text-sm">
            Your about me section is empty
          </div>
        </div>
      </div>
    </div>
  );
};

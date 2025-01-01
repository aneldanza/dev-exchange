import { useRef, useCallback, useEffect } from "react";
import { Menu } from "../layout/Menu";

export const Sidebar: React.FC<{ isOpen: boolean; toggle: () => void }> = ({
  isOpen,
  toggle,
}) => {
  const sideBarRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        sideBarRef.current &&
        !sideBarRef.current.contains(event.target as Node)
      ) {
        toggle();
      }
    },
    [toggle]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  if (!isOpen) return null;

  return (
    <div
      ref={sideBarRef}
      className="absolute bg-white py-6 left-0 shadow-md w-64 border-t border-t-appGray-100 z-30"
    >
      <Menu handleOptionSelect={toggle} />
    </div>
  );
};

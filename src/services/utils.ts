import { PostData, PostsByTag } from "../components/users/types";

export const formatCountString = (
  count: number,
  singular: string,
  plural: string
): string => {
  return Math.abs(count) === 1 ? `${count} ${singular}` : `${count} ${plural}`;
};

export const removeSelectElement = (body: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(body, "text/html");

  // Remove all <select> elements
  const selects = doc.querySelectorAll("select");
  selects.forEach((select) => select.remove());

  // Serialize the modified HTML back to a string
  return doc.body.innerHTML;
};

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const sortItems = <T>(items: T[], tabName: string): T[] => {
  const sorted = [...items].sort((a, b) => {
    if (tabName === "Newest") {
      // sort PostData[] by created_at
      return sortByNewest(a as PostData, b as PostData);
    }
    if (tabName === "Oldest") {
      return sortByOldest(a as PostData, b as PostData);
    }
    if (tabName === "Score") {
      // sort PostData[] by votes
      return (b as PostData).votes - (a as PostData).votes;
    }
    if (tabName === "Name") {
      // sort PostsByTag[] by tag name
      return (a as PostsByTag).tag.name.localeCompare(
        (b as PostsByTag).tag.name
      );
    }
    if (tabName === "Count") {
      // sort PostsByTag[] by number of posts
      return (b as PostsByTag).posts.length - (a as PostsByTag).posts.length;
    }
    return 0;
  });

  return sorted;
};

const sortByNewest = (a: PostData, b: PostData) => {
  return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
};

const sortByOldest = (a: PostData, b: PostData) => {
  return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
};

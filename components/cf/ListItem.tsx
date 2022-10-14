import Link from "next/link";
import { it } from "node:test";
import React, { useEffect, useState } from "react"

export interface ItemInfo {
  userName: string;
  id: string;
  creationTimeSeconds: number;
  verdict: string;
  problem: {
    contestId: number;
    tags: string[];
    name: string;
    contest: string;
    index: string;
    rating?: number;
  };
}
function getColor (rating: number) {
  if (rating == undefined) {
    return " black ";
  }
  if (rating < 1200) {
    return " gray ";
  }
  if (rating < 1400) {
    return " green ";
  }
  if (rating < 1600) {
    return " cyan ";
  }
  if (rating < 1800) {
    return " #4952ce "
  }
  if (rating < 2100) {
    return " #a0a ";
  }
  if (rating < 2500) {
    return " orange "
  }
  return " red ";
}

function genTags (tags: string[]): string {
  let k = "";
  tags.forEach((elem) => {
    k += ' ' + elem;
  });
  return k;
}

export default function ListItem (props: { item: ItemInfo }) {
  const item = props.item;
  const [ratingStr, setRating] = useState("UNRATED");
  const [color, setColor] = useState(getColor(item.problem.rating));
  const [tags, setTags] = useState(genTags(item.problem.tags));

  useEffect(() => {
    if (item.problem.rating) {
      setRating(item.problem.rating.toString());
      setColor(getColor(item.problem.rating));
      setTags(genTags(item.problem.tags));
    }
  }, [item.problem]);
  return (
    <tr>
      <td>{item.userName}</td>
      <td>{item.problem.contestId + item.problem.index}</td>
      <td>
        <Link href={`https://codeforces.com/contest/${item.problem.contestId}/problem/${item.problem.index}`}>
          <a style={{ color: `${color}` }}>
            {item.problem.name}
          </a>
        </Link>
      </td>
      <td style={{ color: `${color}` }}>
        {ratingStr}
      </td>
      <td>
        {tags}
      </td>
      <td>
        {new Date(item.creationTimeSeconds * 1000).toLocaleString()}
      </td>
    </tr >
  );
}

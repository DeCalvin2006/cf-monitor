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
function getColor (rating) {
  if (rating == undefined) {
    return "black!important";
  }
  if (rating < 1200) {
    return "gray!important";
  }
  if (rating < 1400) {
    return "green!important";
  }
  if (rating < 1600) {
    return "cyan!important";
  }
  if (rating < 1800) {
    return "#4952ce!important"
  }
  if (rating < 2100) {
    return "#a0a!important";
  }
  if (rating < 2500) {
    return "orange!important"
  }
  return "red!important";
}
export default function ListItem (props: { item: ItemInfo }) {
  const item = props.item;
  const [ratingStr, setRating] = useState("UNRATED");
  const [color, setColor] = useState("black");

  useEffect(() => {
    if (item.problem.rating) {
      setRating(item.problem.rating.toString());
      setColor(getColor(item.problem.rating));
    }
  }, [item.problem.rating]);
  return (
    <tr>
      <td>{item.userName}</td>
      <td style={{ color: getColor(item.problem.rating) }}>
        <Link href={`https://codeforces.com/contest/${item.problem.contestId}/problem/${item.problem.index}`}>
          {item.problem.name}
        </Link>
      </td>
      <td>
        {item.problem.rating ? `Rating:${item.problem.rating}` : "UNRATED"}
      </td>
      <td>
        {JSON.stringify(item.problem.tags)}
      </td>
      <td>
        {new Date(item.creationTimeSeconds * 1000).toLocaleString()}
      </td>
      <td>
        {item.verdict}
      </td>
    </tr>
  );
}
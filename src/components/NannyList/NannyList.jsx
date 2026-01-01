import { useEffect, useState } from "react";
import { getNannies } from "../../services/nannyService";
import NannyCard from "../NannyCard/NannyCard.jsx";

const NannyList = () => {
  const [nannies, setNannies] = useState([]);
  const [lastKey, setLastKey] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const LIMIT = 3;

  useEffect(() => {
    loadNannies();
  }, []);

  const loadNannies = async () => {
    const data = await getNannies(LIMIT, lastKey);

    if (!data) {
      setHasMore(false);
      return;
    }

    const entries = Object.entries(data);

    const newNannies = entries.map(([key, value]) => ({
      id: key,
      ...value,
    }));

    setNannies((prev) => [...prev, ...newNannies]);
    setLastKey(entries[entries.length - 1][0]);

    if (entries.length < LIMIT) {
      setHasMore(false);
    }
  };

  console.log("Fetched nannies:", nannies);

  return (
    <section className="nanny-list">
      <ul className="nanny-list__items">
        {nannies.map((nanny, index) => (
          <NannyCard key={index} nanny={nanny} />
        ))}
      </ul>

      {hasMore && (
        <button
          type="button"
          className="nanny-list__load-more"
          onClick={loadNannies}
        >
          Load more
        </button>
      )}
    </section>
  );
};

export default NannyList;

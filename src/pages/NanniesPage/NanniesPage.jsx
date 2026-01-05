import React, { useEffect, useState } from "react";
import css from "./NanniesPage.module.css";
import { NavBar } from "../../components/NavBar/NavBar.jsx";
import NannyList from "../../components/NannyList/NannyList.jsx";
import { Filters } from "../../components/Filters/Filters.jsx";
import { getNannies } from "../../services/nannyService.js";

const LIMIT = 3;

const NanniesPage = () => {
  const [filter, setFilter] = useState("all");
  const [nannies, setNannies] = useState([]);
  const [lastKey, setLastKey] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const loadNannies = async () => {
    const data = await getNannies({
      limit: LIMIT,
      lastKey,
      filter,
    });

    if (!data || data.length === 0) {
      setHasMore(false);
      return;
    }

    setNannies((prev) => [...prev, ...data]);
    setLastKey(data[data.length - 1].id);

    if (data.length < LIMIT) {
      setHasMore(false);
    }
  };

  // 🔄 filter değişince reset
  useEffect(() => {
    setNannies([]);
    setLastKey(null);
    setHasMore(true);
    loadNannies();
  }, [filter]);

  return (
    <div className={css.pageContainer}>
      <div className={css.navBar}>
        <NavBar variant="nannies" />
      </div>
      <div className={css.content}>
        <Filters value={filter} onChange={setFilter} />
        <NannyList
          nannies={nannies}
          hasMore={hasMore}
          onLoadMore={loadNannies}
          filter={filter}
        />
      </div>
    </div>
  );
};

export default NanniesPage;

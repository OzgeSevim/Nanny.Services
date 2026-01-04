import { useEffect, useState } from "react";
import { getNannies } from "../../services/nannyService";
import NannyCard from "../NannyCard/NannyCard.jsx";
import css from "./NannyList.module.css";

const NannyList = ({ nannies, hasMore, onLoadMore, filter }) => {
  return (
    // <div className={css.nannyListContainer}>
    //   <div className={css.nannyLis}>
    //     <ul className={css.nannyListItem}>
    //       {nannies.map((nanny, index) => (
    //         <NannyCard key={index} nanny={nanny} />
    //       ))}
    //     </ul>
    //   </div>
    //   <div className={css.loadMore}>
    //     {hasMore && (
    //       <button
    //         type="button"
    //         className={css.loadMoreBtn}
    //         onClick={onLoadMore}
    //       >
    //         Load more
    //       </button>
    //     )}
    //   </div>
    // </div>

    <div className={css.nannyListContainer}>
      {nannies.length === 0 ? (
        <p className={css.noResults}>
          Sorry, we couldn’t find any nannies matching "{filter}".
          <br />
          Please try a different filter.
        </p>
      ) : (
        <>
          <ul className={css.nannyListItem}>
            {nannies.map((nanny) => (
              <NannyCard key={nanny.id} nanny={nanny} />
            ))}
          </ul>

          {hasMore && (
            <div className={css.loadMore}>
              <button
                type="button"
                className={css.loadMoreBtn}
                onClick={onLoadMore}
              >
                Load more
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NannyList;

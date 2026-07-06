import { Search } from "lucide-react";
import { memo, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { searchLearningContent } from "../../utils/progress";
import { searchResultTypeLabels } from "../../constants/labels";
import { Badge } from "../ui/Badge";
import styles from "./GlobalSearch.module.css";

export const GlobalSearch = memo(function GlobalSearch() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchLearningContent(query), [query]);

  return (
    <div className={styles.search}>
      <label className={styles.inputWrap}>
        <Search size={17} aria-hidden="true" />
        <input
          className={styles.input}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Глобальний пошук: курси, уроки, практики"
          aria-label="Глобальний пошук"
        />
      </label>
      {query.trim() ? (
        <div className={styles.panel}>
          {results.length ? (
            results.map((result) => (
              <Link className={styles.result} to={result.href} key={`${result.type}-${result.href}-${result.title}`} onClick={() => setQuery("")}>
                <strong>{result.title}</strong>
                <span>{result.description}</span>
                <div className={styles.meta}>
                  <Badge>{searchResultTypeLabels[result.type] ?? result.type}</Badge>
                  {result.tags.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </Link>
            ))
          ) : (
            <p>Нічого не знайдено. Спробуй інший запит.</p>
          )}
        </div>
      ) : null}
    </div>
  );
});

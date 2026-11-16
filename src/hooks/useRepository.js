import { useCallback, useEffect, useState } from "react";
import { subscribeToRepositories } from "../services/repositories/mockRepository.js";

export function useRepository(repository, options) {
  const { search, status, page, pageSize } = options || {};
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [total, setTotal] = useState(0);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await repository.getAll({ search, status, page, pageSize });
      setRecords(Array.isArray(result) ? result : result.data);
      setTotal(Array.isArray(result) ? result.length : result.total);
    } catch (requestError) {
      setError(requestError.message || "Unable to load records.");
    } finally {
      setLoading(false);
    }
  }, [repository, search, status, page, pageSize]);

  useEffect(() => {
    const timer = window.setTimeout(refresh, 0);
    const unsubscribe = subscribeToRepositories(refresh);
    return () => {
      window.clearTimeout(timer);
      unsubscribe();
    };
  }, [refresh]);

  return { records, total, loading, error, refresh };
}

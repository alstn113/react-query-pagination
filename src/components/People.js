import { useState } from "react";
import { useQuery } from "react-query";
import * as api from "../lib/api";
import Person from "./Person";

const Planets = () => {
  const [page, setPage] = useState(1);
  const { isLoading, isError, error, data, isFetching, isPreviousData } = useQuery(["people", page], () => api.getPeople(page), {
    keepPreviousData: true,
  });

  return (
    <div>
      <h2>People</h2>
      <button onClick={() => setPage((old) => Math.max(old - 1, 1))} disabled={page === 1}>
        Previous Page
      </button>
      <span>{page}</span>
      <button
        onClick={() => {
          if (!isPreviousData && data.next) {
            setPage((old) => old + 1);
          }
        }}
        // Disable the Next Page button until we know a next page is available
        disabled={isPreviousData || !data?.next}
      >
        Next Page
      </button>
      {isFetching ? <span> Loading...</span> : null}{" "}
      {isLoading ? (
        <div>Loading data</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          {data.results.map((person) => (
            <Person key={person.name} person={person} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Planets;

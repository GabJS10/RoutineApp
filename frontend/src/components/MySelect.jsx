import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";
function MySelect({ title, fnQuery, handleChange }) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: [title],
    queryFn: () => fnQuery(),
  });
  if (isLoading) {
    return <Loader />;
  }

  const renderOptions = (items) =>
    items.map((item) => (
      <option key={item.id} value={item.id}>
        {item.name || item.now?.slice(0, 10)}
      </option>
    ));

  return (
    <div className="my-select-container">
      <label htmlFor={title} className="my-select-label">
        {title}
      </label>
      <select
        name={title}
        id={title}
        onChange={(e) => {
          handleChange(e);
          refetch();
        }}
        className="select select-ghost w-full max-w-xs"
      >
        <option value="">{title}</option>
        {renderOptions(data?.days || data)}
      </select>
    </div>
  );
}

export default MySelect;

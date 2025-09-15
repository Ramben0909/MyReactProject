import PropTypes from "prop-types";

const Tab = ({
  id,
  title,
  poster_path,
  release_date,
  IMAGE_BASE,
  onShowMore,
  onRemove,
  showRemove = false,
  overview,
  vote_average,
  popularity,
}) => {
  const handleRemove = () => {
    if (!onRemove) return;
      onRemove(id);
  };

  return (
    <div className="p-2 border rounded shadow-md">
      <img
        src={
          poster_path
            ? `${IMAGE_BASE}/w300${poster_path}`
            : "https://via.placeholder.com/300x450?text=No+Image"
        }
        alt={title}
        className="rounded-lg mb-2 w-full h-[450px] object-cover"
      />

      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">
        {release_date ? release_date.split("-")[0] : "N/A"}
      </p>

      {overview && (
        <p className="text-sm text-gray-700 line-clamp-3">{overview}</p>
      )}

      <p className="text-sm text-gray-500 mt-1">
        ⭐ {vote_average ?? "N/A"} | 🔥 {popularity ? Math.round(popularity) : 0}
      </p>

      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onShowMore && onShowMore(id)}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Show More
        </button>

        {showRemove && (
          <button
            onClick={handleRemove}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

Tab.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  title: PropTypes.string.isRequired,
  poster_path: PropTypes.string,
  release_date: PropTypes.string,
  IMAGE_BASE: PropTypes.string.isRequired,
  onShowMore: PropTypes.func,
  onRemove: PropTypes.func,
  showRemove: PropTypes.bool,
  overview: PropTypes.string,
  vote_average: PropTypes.number,
  popularity: PropTypes.number,
};

export default Tab;

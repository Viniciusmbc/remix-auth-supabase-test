export default function Title({ title, bookmarkedtvSeries }) {
  return (
    <h1
      className={`text-xl text-white mb-4 pb-9 pl-4 ${
        bookmarkedtvSeries && "pt-9"
      }  text-xl text-white`}
    >
      {title}
    </h1>
  );
}

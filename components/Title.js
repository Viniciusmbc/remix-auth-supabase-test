export default function Title({ title, bookmarkedtvSeries }) {
  return (
    <h1
      className={`pb-9 pl-4 ${
        bookmarkedtvSeries && "pt-9"
      }  text-xl text-white`}>
      {title}
    </h1>
  );
}

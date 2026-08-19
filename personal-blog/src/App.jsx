import Header from "./Components/Header";
import About from "./Components/About";
import ArticleList from "./Components/ArticleList";

const posts = [
  {
    id: 1,
    title: "Arsenal's Title Defence",
    date: "16th August 2026",
    preview:
      "Arsenal's start to this season's title defence has started of to agreat start",
  },
  {
    id: 2,
    title: "Enzo Maresca's shaky beginning",
    date: "16th August 2026",
    preview:
      "Man City looks way off their best as they were thrashed by Arsenal",
  },
  {
    id: 3,
    title: "Carrick needs backing",
    date: "16th August 2026",
    preview:
      "The board needs to back Carrick with some new signings, especially in the no. 6 position",
  },
  {
    id: 4,
    title: "Xabi Alonso's new tenure",
    date: "14th August 2026",
    preview:
      "Xabi Alonso has an uphill battle to get Chelsea back to former heights after losing out to Champions League football",
  },
];

function App() {
  return (
    <div className="App">
      <Header name="Premier League" />
      <About
        image="https://resources.premierleague.pulselive.com/photo-resources/2018/05/06/9d2a4c84-d68f-47b8-bda6-ac39f1aaf42d/955249480.jpg?width=1440"
        about="Premier League thoughts"
      />
      <ArticleList posts={posts} />
    </div>
  );
}

export default App;

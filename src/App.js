import React from "react";
import "./App.css";
import data from "./data.js";

function App() {
  const [ stData, setStData ] = React.useState(data.elements);

  const stElement = stData.map(el => {
    return (
      <div className="element">
        <h3 className="element__title">{el.title}</h3>
        <p className="element__date">{el.date}</p>
        <p className="element__description">{el.description}</p>
      </div>
    );
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Drag'n Drop</h1>
      </header>
      <main className="dragApp">
        <section className="dragApp__wrapper">
          <h2 className="dragApp__title">1st container</h2>
          <div className="dragApp__container">{stElement}</div>
        </section>
        <section className="dragApp__wrapper">
          <h2 className="dragApp__title">2st container</h2>
          <div className="dragApp__container" />
        </section>
      </main>
    </div>
  );
}

export default App;

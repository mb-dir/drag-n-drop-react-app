import React from "react";
import "./App.css";
import data from "./data.js";

function App() {
  const [ stData, setStData ] = React.useState(data.elements);
  const [ transferedElement, setTransferedElement ] = React.useState(null);

  //Allow to drop - you need to prevent default action of "dragover" event to that moveing items was possible
  const allowTransfer = event => {
    event.preventDefault();
  };
  //I followed this code - https://www.pluralsight.com/guides/event-listeners-in-react-components
  React.useEffect(() => {
    document.addEventListener("dragover", allowTransfer);

    // cleanup this component
    return () => {
      document.removeEventListener("dragover", allowTransfer);
    };
  }, []);

  function getDraggedElement(el) {
    setTransferedElement(el);
  }

  const stElement = stData.map(el => {
    return (
      <div
        key={el.id}
        draggable="true"
        className="element"
        onDragStart={() => getDraggedElement(el)}
      >
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

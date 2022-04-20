import React from "react";
import "./App.css";
import data from "./data.js";

function App() {
  //In my approach to problem of styling currently drag element "isCurrentlyDrag" property is so useful, based on this the speciall css class is added, so I add this property "manually" - I assume that in real project we have no influence when it comes to data structure
  data.elements.map(el => {
    el.isCurrentlyDrag = false;
  });

  const [ stData, setStData ] = React.useState(data.elements);
  const [ ndData, setNdData ] = React.useState([]);
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

  function transferToNd() {
    //Delete transfered item from 1st container
    setStData(prevElements => {
      return prevElements.filter(el => el.id !== transferedElement.id);
    });
    //Add transfered item to 2nd container
    setNdData(prevElements => {
      //Block to multiply item if droped in the same container
      let doesElementAlreadyExist = false;
      prevElements.forEach(el => {
        if (el.id === transferedElement.id) {
          doesElementAlreadyExist = true;
        }
      });
      if (doesElementAlreadyExist) {
        return [ ...prevElements ];
      } else {
        return [ ...prevElements, transferedElement ];
      }
    });
    //Reset transfered element
    setTransferedElement(null);
  }

  function transferToSt() {
    //Delete transfered item from 2nd container
    setNdData(prevElements => {
      return prevElements.filter(el => el.id !== transferedElement.id);
    });
    //Add transfered item to 1st container
    setStData(prevElements => {
      //Block to multiply item if droped in the same container
      let doesElementAlreadyExist = false;
      prevElements.forEach(el => {
        if (el.id === transferedElement.id) {
          doesElementAlreadyExist = true;
        }
      });
      if (doesElementAlreadyExist) {
        return [ ...prevElements ];
      } else {
        return [ ...prevElements, transferedElement ];
      }
    });
    //Reset transfered element
    setTransferedElement(null);
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

  const ndElement = ndData.map(el => {
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
          <div className="dragApp__container" onDrop={transferToSt}>
            {stElement}
          </div>
        </section>
        <section className="dragApp__wrapper">
          <h2 className="dragApp__title">2st container</h2>
          <div className="dragApp__container" onDrop={transferToNd}>
            {ndElement}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;

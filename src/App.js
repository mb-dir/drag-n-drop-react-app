import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Drag'n Drop</h1>
      </header>
      <main className="dragApp">
        <section className="dragApp__wrapper">
          <h2 className="dragApp__title">1st container</h2>
          <div className="dragApp__container" />
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

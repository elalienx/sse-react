// Node modules
import { useState } from "react";

export default function App() {
  // Local state
  const [messages, setMessages] = useState<string[]>([]);
  const [status, setStatus] = useState("On Stand by 🧊");

  // Properties
  const port = 8000;
  let eventSource: EventSource;

  // Methods
  function onStart() {
    setStatus("Starting connection 📡");
    setMessages([]);

    // Properties
    eventSource = new EventSource(`http://localhost:${port}`);

    eventSource.onmessage = function (event) {
      updateMessage(event.data);
    };

    eventSource.onerror = function () {
      endMessage();
      eventSource.close();
    };
  }

  function updateMessage(newMessage: string) {
    setMessages((previousState) => [...previousState, newMessage]);
  }

  function endMessage() {
    setStatus("Finished connection 🏁");
  }

  // Components
  const Items = messages.map((item, index) => <li key={index}>{item}</li>);

  return (
    <div id="app">
      <h1>SSE React</h1>
      <p>{status}</p>
      <ol>{Items}</ol>
      <button onClick={() => onStart()}>Start Connection 🏁</button>
    </div>
  );
}

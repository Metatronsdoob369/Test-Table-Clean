import React, { useState } from 'react';

const App = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: input }]
      })
    });

    const data = await res.json();
    setResponse(data.choices?.[0]?.message?.content || 'No response');
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: '#0f0f1a',
      color: '#fff',
      fontFamily: 'system-ui, sans-serif',
      padding: '2rem'
    }}>
      <h1>Ask NativeNodes</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask me something..."
        style={{
          width: '100%',
          maxWidth: '600px',
          padding: '1rem',
          fontSize: '1rem',
          marginBottom: '1rem',
          background: '#1e1e2f',
          border: '1px solid #444',
          borderRadius: '6px',
          color: '#fff'
        }}
      />
      <button onClick={handleSubmit} style={{
        padding: '0.5rem 1rem',
        fontSize: '1rem',
        cursor: 'pointer'
      }}>Ask</button>

      {loading && <p>⏳ Thinking...</p>}

      {response && (
        <div style={{ marginTop: '2rem', maxWidth: '600px', textAlign: 'center' }}>
          <strong>Response:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default App;


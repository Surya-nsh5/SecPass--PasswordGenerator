import React, { useState, useEffect, useCallback } from 'react';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' });

  const generatePassword = useCallback(() => {
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
      setMessage({ text: 'Select at least one character type.', type: 'error' });
      return;
    }

    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let validChars = '';
    if (includeUppercase) validChars += uppercaseChars;
    if (includeLowercase) validChars += lowercaseChars;
    if (includeNumbers) validChars += numberChars;
    if (includeSymbols) validChars += symbolChars;

    let generatedPassword = '';
    const requiredChars = [];
    if (includeUppercase) requiredChars.push(uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)]);
    if (includeLowercase) requiredChars.push(lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)]);
    if (includeNumbers) requiredChars.push(numberChars[Math.floor(Math.random() * numberChars.length)]);
    if (includeSymbols) requiredChars.push(symbolChars[Math.floor(Math.random() * symbolChars.length)]);

    for (let i = 0; i < requiredChars.length; i++) {
      generatedPassword += requiredChars[i];
    }

    for (let i = requiredChars.length; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * validChars.length);
      generatedPassword += validChars[randomIndex];
    }

    generatedPassword = generatedPassword.split('').sort(() => 0.5 - Math.random()).join('');
    generatedPassword = generatedPassword.substring(0, length);

    setPassword(generatedPassword);
    setMessage({ text: '', type: '' });
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password).then(() => {
      setMessage({ text: 'Password copied to clipboard!', type: 'success' });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    }).catch(err => {
      console.error("Failed to copy text: ", err);
      setMessage({ text: 'Failed to copy.', type: 'error' });
    });
  };

  return (
    <div className="app-container">
      <div className="password-card">
        <h1 className="title">Secure Password Generator</h1>

        <div className="display-container">
          <input
            type="text"
            className="password-display"
            value={password}
            readOnly
            placeholder="P4$5W0rD!"
          />
          <button className="copy-btn" onClick={handleCopy} title="Copy to Clipboard" aria-label="Copy Password">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
        </div>

        <div className={`message ${message.type || 'hidden'}`}>
          {message.text || '\u00A0'}
        </div>

        <div className="controls-section">
          <div className="slider-container">
            <div className="slider-header">
              <span>Password Length</span>
              <span className="length-val">{length}</span>
            </div>
            <input
              type="range"
              min="4"
              max="32"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="slider"
            />
          </div>

          <div className="checkbox-group">
            <label className="checkbox-label">
              <span>Uppercase</span>
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
              />
              <span className="toggle-switch"></span>
            </label>

            <label className="checkbox-label">
              <span>Lowercase</span>
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
              />
              <span className="toggle-switch"></span>
            </label>

            <label className="checkbox-label">
              <span>Numbers</span>
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
              />
              <span className="toggle-switch"></span>
            </label>

            <label className="checkbox-label">
              <span>Symbols</span>
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
              />
              <span className="toggle-switch"></span>
            </label>
          </div>
        </div>

        <button
          className="generate-btn"
          onClick={generatePassword}
          disabled={!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols}
        >
          Generate Password
        </button>
      </div>

      <div className="footer-section">
        <div className="user-info">
          Developed by <strong>Surya-nsh5</strong>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;

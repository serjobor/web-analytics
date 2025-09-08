import styles from "./MyForm.module.css"
import React, { useState } from 'react';

const TARGET_FULL_NAME: string = 'ИВАНОВ ИВАН ИВАНОВИЧ';
const TARGET_PHONE_DIGITS: string = '35';

const keyboardRows: string[] = [
  'ЙЦУКЕНГШЩЗХЪ',
  'ФЫВАПРОЛДЖЭ',
  'ЯЧСМИТЬБЮ'
];

const MyForm = () => {
  const [fullName, setFullName] = useState<string>('');
  const [value, setValue] = useState<string>('00');
  const [min] = useState<string>('00');
  const [max] = useState<string>('99');

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleCharClick = (char: string) => {
    setFullName(prev => (prev + char).slice(0, TARGET_FULL_NAME.length));
  };

  const handleBackspace = () => {
    setFullName(prev => prev.slice(0, -1));
  };

  const handleSpace = () => {
    setFullName(prev => (prev + ' ').slice(0, TARGET_FULL_NAME.length));
  };

  const handleClear = () => {
    setFullName('');
  };

  function formatPhone(phoneNumber: string) {
    const digits = (phoneNumber || '').padEnd(2, '0').slice(0, 2);
    return `+7 (800) 555-35-${digits.slice(0, 2)}`;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isNameCorrect = fullName === TARGET_FULL_NAME;
    const isPhoneCorrect = value === TARGET_PHONE_DIGITS;
    alert(isNameCorrect && isPhoneCorrect ? 'Все правильно' : 'Данные введены неверно');
  };

  return (
    <>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.formCard}>
          <div className={styles.input}>
            <label htmlFor="fullName" className={styles.label}>Введите: {TARGET_FULL_NAME}</label>
            <input id="fullName" className={styles.textInput} type="text" placeholder={TARGET_FULL_NAME} readOnly value={fullName} />
            <div className={styles.keyboard}>
              {keyboardRows.map((row, rowIndex) => (
                <div key={rowIndex} className={styles.row}>
                  {row.split('').map((char, index) => (
                    <div key={`${rowIndex}-${index}`} className={styles.char} onClick={() => handleCharClick(char)} role="button" tabIndex={0}>
                      {char}
                    </div>
                  ))}
                </div>
              ))}
              <div className={styles.row}>
                <div className={styles.char} onClick={handleSpace} role="button" tabIndex={0}>
                  ПРОБЕЛ
                </div>
                <div className={styles.char} onClick={handleBackspace} role="button" tabIndex={0}>
                  ⌫
                </div>
                <div className={styles.char} onClick={handleClear} role="button" tabIndex={0}>
                  ОЧИСТИТЬ
                </div>
              </div>
            </div>
          </div>

          <div className={styles.input}>
            <label htmlFor="phoneNumber" className={styles.label}>Введите: +7 (800) 555-35-35</label>
            <input id="phoneNumber" className={styles.textInput} type="text" placeholder="+7 (800) 555-35-35" readOnly value={formatPhone(value)} />
          </div>

          <div className={styles.section}>
            <div>
              <div className={styles.rangeLine}>
                <input
                  id="slider"
                  className={styles.range}
                  type="range"
                  min={min}
                  max={max}
                  step={1}
                  value={value}
                  onChange={handleSliderChange}
                />
              </div>
              <div className={styles.rangeLabelLine}>
                <span>{formatPhone(min)}</span>
                <span>{formatPhone(max)}</span>
              </div>
            </div>
          </div>

          <button className={styles.submitButton} type="submit">Проверить</button>
        </form>
      </div>
    </>
  )
}

export default MyForm

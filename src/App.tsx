import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const App: React.FC = () => {
  const [visibleGoods, setVisibleGoods] = useState([...goodsFromServer]);
  const [isSortedByName, setIsSortedByName] = useState(false);
  const [isSortedByLength, setIsSortedByLength] = useState(false);
  const [isReversed, setIsReversed] = useState(false);

  // Sort alphabetically, starting from the original goods list
  function sortByName() {
    const sortedGoods = [...goodsFromServer].sort(); // Always sort from original array
    const finalGoods = isReversed ? sortedGoods.reverse() : sortedGoods;

    setVisibleGoods(finalGoods); // Update visible goods
    setIsSortedByName(true);
    setIsSortedByLength(false);
  }

  // Sort by length, starting from the original goods list
  function sortByLength() {
    const sortedGoods = [...goodsFromServer].sort(
      (a, b) => a.length - b.length,
    );
    const finalGoods = isReversed ? sortedGoods.reverse() : sortedGoods;

    setVisibleGoods(finalGoods); // Update visible goods
    setIsSortedByLength(true);
    setIsSortedByName(false);
  }

  // Reverse the current visible list
  function reverseOrder() {
    const reversedGoods = [...visibleGoods].reverse();

    setVisibleGoods(reversedGoods);
    setIsReversed(!isReversed);
  }

  // Reset to the original order
  function resetOrder() {
    setVisibleGoods([...goodsFromServer]); // Reset to original list
    setIsSortedByName(false);
    setIsSortedByLength(false);
    setIsReversed(false); // Reset all states
  }

  // Show reset button only if any sorting or reversing has been applied
  const showResetButton = isSortedByName || isSortedByLength || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortByName}
          type="button"
          className={`button is-info ${!isSortedByName ? 'is-light' : ''}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={`button is-success ${!isSortedByLength ? 'is-light' : ''}`}
        >
          Sort by length
        </button>

        <button
          onClick={reverseOrder}
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
        >
          Reverse
        </button>

        {showResetButton && (
          <button
            onClick={resetOrder}
            type="button"
            className="button is-danger"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};

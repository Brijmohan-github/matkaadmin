import { useState } from "react";
const doublePanas = [
  118, 226, 244, 334, 550, 299, 488, 668, 677, 100, 119, 155, 227, 335, 344,
  399, 588, 669, 110, 200, 228, 255, 336, 660, 499, 688, 778, 300, 166, 229,
  337, 355, 445, 599, 779, 788, 112, 220, 400, 266, 338, 446, 455, 770, 699,
  113, 122, 500, 177, 339, 366, 447, 799, 889, 114, 330, 600, 277, 448, 466,
  556, 880, 899, 115, 133, 223, 700, 188, 377, 449, 557, 566, 116, 224, 233,
  440, 800, 288, 477, 558, 990, 199, 388, 559, 577, 667, 117, 144, 225, 900,
];
const singlePanas = generateSinglePana();
function generateJodi() {
  const jodi = [];
  for (let i = 0; i < 100; i++) {
    jodi.push(i.toString().padStart(2, "0"));
  }
  return jodi;
}
const jodiDigit = generateJodi();
const triplePanas = [
  "000",
  "777",
  "444",
  "111",
  "888",
  "555",
  "222",
  "999",
  "666",
  "333",
];
const singleDigit = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const GameControl = () => {
  const [betAmounts, setBetAmounts] = useState({});
  const fetchBetAmounts = async () => {
    const initialBetAmounts = {};
    singlePanas.forEach((pana) => {
      initialBetAmounts[pana] = Math.floor(Math.random() * 100);
    });
    setBetAmounts(initialBetAmounts);
  };

  return (
    <div>
      <StatisticsSection
        title="Single Digit Statistics"
        data={singleDigit}
        betAmounts={betAmounts}
      />
      <StatisticsSection
        title="Jodi Digit Statistics"
        data={jodiDigit}
        betAmounts={betAmounts}
      />
      <StatisticsSection
        title="Single Pana Statistics"
        data={singlePanas}
        betAmounts={betAmounts}
      />
      <StatisticsSection
        title="Double Pana Statistics"
        data={doublePanas}
        betAmounts={betAmounts}
      />
      <StatisticsSection
        title="Triple Pana Statistics"
        data={triplePanas}
        betAmounts={betAmounts}
      />
    </div>
  );
};

export default GameControl;

// functions
const StatisticsSection = ({ title, data, betAmounts }) => (
  <div>
    <div className="font-medium text-center text-2xl mt-4">{title}</div>
    <div className="p-5 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
      {data.map((number, index) => (
        <div
          key={index}
          className="p-4 shadow-lg rounded-lg flex justify-between items-center"
        >
          <span className="text-base font-semibold">{number}</span>
          <span
            className={`text-sm px-2 py-1 rounded-full ${
              betAmounts[number]
                ? "bg-blue-100 text-blue-800"
                : "bg-purple-100 text-blue-600"
            }`}
          >
            ₹{betAmounts[number] || 0}
          </span>
        </div>
      ))}
    </div>
  </div>
);

//other function
function generateSinglePana() {
  let allSinglePana = [];
  for (let firstDigit = 1; firstDigit <= 9; firstDigit++) {
    for (let secondDigit = 2; secondDigit <= 9; secondDigit++) {
      for (let thirdDigit = 0; thirdDigit <= 9; thirdDigit++) {
        if (firstDigit < secondDigit && secondDigit < thirdDigit) {
          const singlePanaNumber = `${firstDigit}${secondDigit}${thirdDigit}`;
          allSinglePana.push(singlePanaNumber);
        } else if (firstDigit < secondDigit && thirdDigit == 0) {
          const singlePanaNumber = `${firstDigit}${secondDigit}0`;
          allSinglePana.push(singlePanaNumber);
        }
      }
    }
  }
  return allSinglePana;
}

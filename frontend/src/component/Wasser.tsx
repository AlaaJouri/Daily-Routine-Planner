import { useState } from "react";
import "./Wasser.css";

interface CupProps {
    amount: number;
    index: number;
    onClick: (index: number) => void;
}

function Wasser({ amount, index, onClick }: CupProps) {
    const isFull = amount > 0;

    function handleClick() {
        onClick(index);
    }

    return (
        <div
            className={`water-cup ${isFull ? "full" : ""}`}
            onClick={handleClick}
            data-index={index}
        >
            {isFull ? `${amount} ml` : "250 ml"}
        </div>
    );
}

export default function DrinkWater() {
    const [cups, setCups] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0]);
    const totalAmount = cups.reduce((acc, cur) => acc + cur, 0);
    const targetAmount = 2000;

    function handleCupClick(index: number) {
        const newCups = [...cups];
        newCups[index] = newCups[index] === 0 ? 250 : 0;
        setCups(newCups);

        console.log(totalAmount +250 )
    }

    return (
        <div className="Profile">
            <h1>Wasser trinken</h1>
            <h2>Ziel: 2 Liter / Tag</h2>
            <div id="totalJar">
                <div id="total">{`${((totalAmount / targetAmount) * 100) / 1000}L left`}</div>
                <div
                    id="percentage"
                    style={{ height: `${(totalAmount / targetAmount) * 100}%` }}
                ></div>
            </div>
            <h2>Wie viele hast du heute getrunken</h2>
            <div className="cups">
                {cups.map((amount, index) => (
                    <Wasser
                        key={index}
                        amount={amount}
                        index={index}
                        onClick={handleCupClick}

                    />
                ))}
            </div>
        </div>
    );
}
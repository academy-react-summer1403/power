"use client";

import React, { useEffect, useState } from "react";
import { StepOne } from "./step/one";
import { StepTow } from "./step/two"; 
import { StepThree } from "./step/three";
import { Four } from "./step/Four";

export const SignUpStep: React.FC = () => {
    const [count, setCount] = useState<number>(1);
    const [number, setNumber] = useState<number | undefined>();



    return (
        <>
            {count === 1 && (
                <StepOne setCount={setCount} setNumber={setNumber} />
            )}
            {count === 2 && <StepTow setCount={setCount} setNumber={number} />}
            {count === 3 && <StepThree setCount={setCount} setNumber={number} />}
            {count === 4 && <Four setCount={setCount} />}
        </>
    );
};

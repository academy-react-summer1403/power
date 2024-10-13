"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { AuthContent } from "../authDefualt";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

interface SignUpStepProps {
  initialValues: any;
  validationSchema: any;
  onSubmit: (values: any) => void;
  stepTitle: string;
  stepDescription: string;
  fieldNames: string[];
  buttonLabel: string;
  stepNumber: number;
}

export const SignUpStep: React.FC<SignUpStepProps> = ({
  initialValues,
  validationSchema,
  onSubmit,
  stepTitle,
  stepDescription,
  fieldNames,
  buttonLabel,
  stepNumber,
}) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "#5751E1",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: { enable: true, mode: "push" },
          onHover: { enable: true, mode: "repulse" },
        },
        modes: {
          push: { quantity: 4 },
          repulse: { distance: 200, duration: 0.4 },
        },
      },
      particles: {
        color: { value: "#ffffff" },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: { default: OutMode.out },
          random: false,
          speed: 6,
          straight: false,
        },
        number: {
          density: { enable: true },
          value: 80,
        },
        opacity: { value: 0.5 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 5 } },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <div className="h-screen flex justify-center items-center relative overflow-hidden">
      {init && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
          className="absolute inset-0 z-0"
        />
      )}
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <div className="relative z-10 flex justify-center items-center h-full">
            <div className="w-[95%] flex-wrap h-auto lg:flex-nowrap md:w-[85%] 2xl:w-[1645px] lg:h-[85%] bg-white/50 rounded-[50px] flex">
              <div className="w-full overflow-y-auto md:w-[40%] h-[615px] flex flex-wrap justify-center items-center bg-white rounded-[50px] p-8 md:p-20 shadow-[10px_8px_0_0] shadow-[#000000]">
                <h1 className="w-full text-[30px] md:text-[35px] 2xl:text-[40px]">{stepTitle}</h1>
                <p className="w-full text-[#6D6C80] text-[16px] md:text-[20px] mb-4">{stepDescription}</p>

                {fieldNames.map((fieldName) => (
                  <div key={fieldName}>
                    <Field
                      name={fieldName}
                      className="bg-[#FBFBFB] w-[90%] md:w-[450px] h-[60px] outline-none rounded-[50px] shadow-[0_1px_2px_0] shadow-black p-4"
                      placeholder={`لطفا ${fieldName} خود را وارد کنید`}
                    />
                    <ErrorMessage className="text-sm text-red-700" component="p" name={fieldName} />
                  </div>
                ))}

                <button
                  type="submit"
                  className="w-full md:w-[480px] mt-10 h-[60px] rounded-[50px] bg-[#FFC224] border border-black shadow-[4px_4px_0_0] shadow-[#3D3D3D]"
                >
                  {buttonLabel}
                </button>
              </div>
              <AuthContent />
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

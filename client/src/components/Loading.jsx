import React from "react";
import Header from "@components/Header";

const Loading = () => {
  return (
    <div className="w-full h-screen">
      <div className="max-w-4xl pb-32 mx-auto bg-gray-100">
        <Header bgColor="bg-purple-700" img="/loading.png"></Header>
        <section className="mx-2 mt-8 max-w-3xl">
          <h1 className="font-semibold antialiased font-mono text-4xl text-gray-800 mt-2 ">
            Loading
          </h1>
        </section>
      </div>
    </div>
  );
};

export default Loading;
